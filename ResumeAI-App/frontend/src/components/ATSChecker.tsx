import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, TextField, Button, Paper, 
  CircularProgress, Stack, Alert, Grid,
  Card // ❌ Lock yahan se hata diya
} from '@mui/material';
import { 
  UploadCloud, FileText, Wand2, FileSearch, Lock // ✅ Lock yahan add kiya
} from 'lucide-react';
// @ts-ignore
import { extractTextFromPDF } from '../utils/pdfUtils'; 
import { Helmet } from 'react-helmet-async';
import Layout from './Layout';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const LOCAL_NGROK_URL = "https://yuri-nonmagnetized-procrastinatively.ngrok-free.dev/api/generate";
const GROQ_API_KEY = (import.meta as any).env?.VITE_GROQ_API_KEY || '';
const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

interface BulletPointImprovement {
  original: string;
  improved: string;
  reason: string;
}

interface ATSResult {
  score: number;
  match_status: string;
  summary: string;
  missing_keywords: string[];
  formatting_issues: string[];
  bullet_point_improvements: BulletPointImprovement[];
}

const cleanAIResponse = (text: string): any => {
  if (!text) return null;
  let cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
  try {
    const startIndex = cleanedText.indexOf('{');
    const endIndex = cleanedText.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      return JSON.parse(cleanedText.substring(startIndex, endIndex + 1));
    }
    return JSON.parse(cleanedText);
  } catch (err) {
    return null;
  }
};

const ATSChecker: React.FC = () => {
  const { user, login } = useAuth();
  
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 4);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const LOADING_TEXTS = [
    "Scanning document structure...",
    "Extracting keywords from JD...",
    "Analyzing ATS compatibility...",
    "Generating AI improvements..."
  ];

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post(`${API_URL}/auth/google`, {
        token: credentialResponse.credential
      });
      if (res.data.success) {
        login(res.data.user, res.data.token);
      }
    } catch (err) {
      console.error("Login Failed", err);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      setError("");
      try {
        const text = await extractTextFromPDF(file);
        setResumeText(text);
      } catch (err) {
        setError("Error reading PDF.");
      }
    } else {
      setError("Please upload a PDF file only");
    }
  };

  const handleCheck = async () => {
    if (!resumeText || !jobDescription) {
      setError("Please upload both Resume and Job Description");
      return;
    }
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const prompt = `
        You are an expert ATS scanner. Compare RESUME with JOB DESCRIPTION.
        RESUME: ${resumeText.substring(0, 10000)}
        JD: ${jobDescription.substring(0, 5000)}
        
        TASK:
        1. Calculate ATS Score (0-100).
        2. Identify missing keywords.
        3. Identify formatting issues.
        4. CRITICAL: Find 3 weak bullet points and rewrite them.

        Output valid JSON only: 
        { 
          "score": number, 
          "match_status": string, 
          "summary": string, 
          "missing_keywords": ["keyword1", "keyword2"], 
          "formatting_issues": ["issue1", "issue2"],
          "bullet_point_improvements": [
            { "original": "weak text", "improved": "strong text", "reason": "why better" }
          ]
        }
      `;

      let data;
      try {
          const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: { 
              "Authorization": `Bearer ${GROQ_API_KEY}`,
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({
              model: "llama-3.3-70b-versatile",
              messages: [{ role: "user", content: prompt }],
              temperature: 0.1,
              response_format: { type: "json_object" }
            })
          });

          if (!response.ok) throw new Error("Groq API Failed");
          const json = await response.json();
          data = { response: json.choices?.[0]?.message?.content };
      } catch (groqErr) {
          const response = await fetch(LOCAL_NGROK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json", "ngrok-skip-browser-warning": "true" },
            body: JSON.stringify({ model: "llama3", prompt: prompt, stream: false, format: "json" })
          });
          data = await response.json();
      }

      const parsedResult = cleanAIResponse(data.response);
      if (!parsedResult) throw new Error("Failed to parse AI response.");

      setResult({
        score: parsedResult.score || 0,
        match_status: parsedResult.match_status || "Low",
        summary: parsedResult.summary || "",
        missing_keywords: parsedResult.missing_keywords || [],
        formatting_issues: parsedResult.formatting_issues || [],
        bullet_point_improvements: parsedResult.bullet_point_improvements || []
      });

    } catch (err: any) {
      setError(err.message || "Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => score >= 80 ? '#22c55e' : score >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <Layout>
      <Helmet>
        <title>ATS Resume Checker | ResumeAI</title>
      </Helmet>

      <style>{`
        .glass-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);
        }
        .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #c084fc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .upload-zone {
          background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%233B82F640' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
          transition: all 0.3s ease;
        }
        .upload-zone:hover {
          background-color: rgba(59, 130, 246, 0.05);
        }
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .scan-line {
          position: absolute; left: 0; right: 0; height: 2px;
          background: #3b82f6;
          box-shadow: 0 0 15px #3b82f6, 0 0 5px #fff;
          animation: scan 2s linear infinite; z-index: 10;
        }
        .blur-content { filter: blur(6px); pointer-events: none; user-select: none; }
      `}</style>

      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, bgcolor: '#020617' }}>
        <Box sx={{ position: 'absolute', top: '-10%', right: '-5%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 4, md: 8 } }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '2.5rem', md: '3.5rem' }, color: 'white' }}>
            ATS Resume <span className="gradient-text">Scanner</span>
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          <Grid size={{ xs: 12, lg:5 }} sx={{ display: 'flex' }}>
            <Paper className="glass-card" sx={{ p: 4, borderRadius: 4, width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box mb={4} flexGrow={0}>
                <Typography variant="h6" color="white" fontWeight={700} mb={2}>1. Upload Resume</Typography>
                <Box component="label" className="upload-zone" sx={{ height: 140, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <input type="file" hidden accept="application/pdf" onChange={handleFileChange} />
                  {fileName ? (
                    <><FileText size={32} color="#22c55e" /><Typography mt={1} color="#22c55e" fontWeight={600} noWrap sx={{ maxWidth: '90%' }}>{fileName}</Typography></>
                  ) : (
                    <><UploadCloud size={32} color="#64748b" /><Typography mt={1} color="#94a3b8">Upload PDF Resume</Typography></>
                  )}
                </Box>
              </Box>

              <Box mb={4} flexGrow={1} display="flex" flexDirection="column">
                <Typography variant="h6" color="white" fontWeight={700} mb={2}>2. Job Description</Typography>
                <TextField multiline fullWidth placeholder="Paste JD here..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} sx={{ flexGrow: 1, bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 2, '& .MuiInputBase-root': { height: '100%', alignItems: 'flex-start' }, '& .MuiInputBase-input': { color: '#e2e8f0', height: '100% !important', overflow: 'auto !important' } }} />
              </Box>

              <Button fullWidth variant="contained" size="large" onClick={handleCheck} disabled={loading || !resumeText} sx={{ py: 2, borderRadius: 3, fontSize: '1.1rem', fontWeight: 700, background: 'linear-gradient(to right, #3b82f6, #2563eb)' }}>
                {loading ? "Scanning..." : "Analyze Resume"}
              </Button>
              {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg:7 }} sx={{ display: 'flex' }}>
            <Paper className="glass-card" sx={{ p: 0, borderRadius: 4, width: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 600 }}>
              {loading ? (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                  <Box sx={{ position: 'relative', width: 100, height: 140, mb: 6 }}>
                    <Box sx={{ width: '100%', height: '100%', bgcolor: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FileText size={48} color="rgba(255,255,255,0.2)" />
                    </Box>
                    <Box className="scan-line" />
                  </Box>
                  <Typography variant="h5" color="white" fontWeight={700} gutterBottom>{LOADING_TEXTS[loadingStep]}</Typography>
                  <Box sx={{ width: '60%', mt: 4 }}><CircularProgress variant="indeterminate" size={30} thickness={4} sx={{ color: '#3b82f6', display: 'block', mx: 'auto' }} /></Box>
                </Box>
              ) : result ? (
                <Box className="animate-fade" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ p: 4, background: `linear-gradient(180deg, ${getScoreColor(result.score)}15 0%, transparent 100%)`, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Box>
                        <Typography variant="h2" fontWeight={900} sx={{ color: getScoreColor(result.score) }}>{result.score}/100</Typography>
                        <Typography variant="h6" color="white">ATS Score</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" color="#ef4444" fontWeight="bold">{result.missing_keywords.length} Missing</Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Box sx={{ p: 4, flex: 1, overflowY: 'auto', position: 'relative' }}>
                    {!user && (
                      <Box sx={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(2, 6, 23, 0.6)', backdropFilter: 'blur(4px)' }}>
                        <Card sx={{ p: 4, maxWidth: 400, textAlign: 'center', bgcolor: '#0f172a', border: '1px solid #3b82f6' }}>
                          <Lock size={40} color="#3b82f6" style={{ margin: '0 auto 16px' }} />
                          <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>Unlock AI Fixes</Typography>
                          <Typography color="#94a3b8" mb={3}>Sign in to see detailed AI improvements and formatting fixes.</Typography>
                          <Box display="flex" justifyContent="center">
                            <GoogleLogin onSuccess={handleGoogleSuccess} theme="filled_black" shape="pill" />
                          </Box>
                        </Card>
                      </Box>
                    )}

                    <Box className={!user ? 'blur-content' : ''}>
                        <Box mb={5}>
                            <Typography variant="h6" color="white" fontWeight={700} mb={2} display="flex" gap={1}><Wand2 size={20} color="#a855f7" /> AI Fixes</Typography>
                            <Stack spacing={2}>
                            {result.bullet_point_improvements.map((item, idx) => (
                                <Box key={idx} sx={{ borderRadius: 2, border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                                <Grid container>
                                    <Grid size={{ xs: 12, md:6 }} sx={{ p: 2, borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                                    <Typography variant="caption" color="#ef4444" fontWeight={700}>ORIGINAL</Typography>
                                    <Typography color="#94a3b8" fontSize="0.9rem">"{item.original}"</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, md:6 }} sx={{ p: 2, bgcolor: 'rgba(34,197,94,0.05)', position: 'relative' }}>
                                    <Typography variant="caption" color="#22c55e" fontWeight={700}>AI IMPROVED</Typography>
                                    <Typography color="white" fontSize="0.9rem">"{item.improved}"</Typography>
                                    </Grid>
                                </Grid>
                                </Box>
                            ))}
                            </Stack>
                        </Box>

                        <Box mb={4}>
                            <Typography variant="h6" color="white" fontWeight={700} mb={2}>Formatting Issues</Typography>
                            <Stack spacing={1}>
                                {result.formatting_issues.map((issue, i) => (
                                    <Alert key={i} severity="warning" sx={{ bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>{issue}</Alert>
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', p: 4, opacity: 0.6 }}>
                  <FileSearch size={80} color="#64748b" strokeWidth={1} />
                  <Typography variant="h5" color="white" mt={3} fontWeight={700}>Ready to Scan</Typography>
                  <Typography color="#94a3b8" align="center">Upload your resume to see the magic.</Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default ATSChecker;