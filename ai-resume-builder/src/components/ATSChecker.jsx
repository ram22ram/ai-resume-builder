// src/components/ATSChecker.jsx
import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, Paper, Grid, 
  CircularProgress, Chip, Stack, Alert, Divider 
} from '@mui/material';
import { UploadCloud, ArrowLeft, AlertTriangle, Search, FileText, Zap } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfUtils'; 
import { Helmet } from 'react-helmet-async';

// 👇 YOUR NGROK URL (Local Server)
// Jab bhi laptop restart karo, naya link yahan daal dena
const LOCAL_API_URL = "https://yuri-nonmagnetized-procrastinatively.ngrok-free.dev/api/generate";

// Helper function to clean AI response
const cleanAIResponse = (text) => {
  if (!text) return null;
  // Remove markdown code blocks if present
  text = text.replace(/```json/g, '').replace(/```/g, '').trim();
  try {
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      const jsonString = text.substring(startIndex, endIndex + 1);
      return JSON.parse(jsonString);
    }
    return JSON.parse(text);
  } catch (err) {
    console.error("JSON parsing error:", err);
    return null;
  }
};

const ATSChecker = ({ onBack }) => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFileName(file.name);
      setError("");
      try {
        const text = await extractTextFromPDF(file);
        setResumeText(text);
      } catch (err) {
        setError("Error reading PDF. Please ensure it's a valid PDF file.");
      }
    } else {
      setError("Please upload a PDF file only");
    }
  };

  const handleCheck = async () => {
    if (!resumeText || !jobDescription) {
      setError("Please upload Resume and add Job Description");
      return;
    }
    
    if (resumeText.length < 50) {
      setError("Resume text seems too short. Please upload a valid resume PDF.");
      return;
    }
    
    setLoading(true);
    setResult(null);
    setError("");

    try {
      const prompt = `
        You are an expert ATS (Applicant Tracking System) scanner.
        TASK: Compare the RESUME with the JOB DESCRIPTION (JD).
        
        RESUME CONTENT:
        ${resumeText.substring(0, 10000)}
        
        JOB DESCRIPTION:
        ${jobDescription.substring(0, 5000)}
        
        IMPORTANT: output valid JSON only. Structure:
        {
          "score": <number 0-100>,
          "match_status": "High" or "Medium" or "Low",
          "summary": "<short feedback>",
          "missing_keywords": ["skill1", "skill2", "skill3", "skill4", "skill5"],
          "formatting_issues": ["issue1", "issue2"]
        }
      `;

      console.log("Sending request to Local Server (Ngrok)...");
      
      const response = await fetch(LOCAL_API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3", // Ensure 'ollama run llama3' runs on laptop
          prompt: prompt,
          stream: false,
          format: "json"
        })
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}. Check if Ngrok/Ollama is running.`);
      }

      const data = await response.json();
      
      if (!data.response) {
        throw new Error("Invalid response from local server");
      }

      const parsedResult = cleanAIResponse(data.response);
      
      if (!parsedResult) {
        throw new Error("Failed to parse AI response. Try again.");
      }

      // Validate result structure
      const validatedResult = {
        score: Math.min(100, Math.max(0, parseInt(parsedResult.score) || 0)),
        match_status: parsedResult.match_status || "Low",
        summary: parsedResult.summary || "Analysis completed.",
        missing_keywords: Array.isArray(parsedResult.missing_keywords) 
          ? parsedResult.missing_keywords.slice(0, 5) 
          : [],
        formatting_issues: Array.isArray(parsedResult.formatting_issues) 
          ? parsedResult.formatting_issues 
          : []
      };
      
      setResult(validatedResult);

    } catch (err) {
      console.error("Analysis Failed:", err);
      let msg = err.message;
      if (msg.includes("Failed to fetch")) {
        msg = "Cannot connect to AI Server. Ensure your laptop is running Ollama & Ngrok.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Free ATS Resume Checker India | Check Resume Score AI 2025</title>
        <meta name="description" content="Upload your resume PDF and check your ATS score against job descriptions for free. Best AI Resume Scanner for freshers in India to find missing keywords." />
      </Helmet>

      <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
        
        {/* ================= 1. HEADER (NAVBAR) ================= */}
        <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* Logo Click -> Home */}
              <Box 
                component="a" 
                href="/" 
                sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', cursor: 'pointer' }}
              >
                <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 32, height: 32, borderRadius: '8px' }} />
                <Typography variant="h5" sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: -0.5 }}>
                  Resume<span style={{ color: '#7c3aed' }}>AI</span>
                </Typography>
              </Box>
              
              <Button 
                component="a" 
                href="/" 
                variant="text" 
                startIcon={<ArrowLeft />} 
                sx={{ color: '#64748b', fontWeight: 'bold', textTransform: 'none' }}
              >
                Back to Home
              </Button>
            </Box>
          </Container>
        </Box>

        {/* ================= 2. MAIN CONTENT ================= */}
        <Box sx={{ flexGrow: 1, py: 6 }}>
          <Container maxWidth="xl">
            <Box textAlign="center" mb={6}>
              <Typography variant="h3" fontWeight="900" color="#0f172a">
                Free ATS Resume Score Checker
              </Typography>
              <Typography color="text.secondary" fontSize="1.1rem">
                Paste your Job Description below to see if you match the requirements.
              </Typography>
            </Box>

            <Grid container spacing={4} sx={{ maxWidth: 1100, mx: 'auto' }}>
              
              {/* === LEFT: INPUTS === */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 4, borderRadius: '16px', height: '100%', border: '1px solid #e2e8f0' }}>
                  <Typography fontWeight="bold" mb={2}>1. Upload Resume (PDF)</Typography>
                  <Box 
                    component="label"
                    sx={{ 
                      border: '2px dashed', borderColor: fileName ? '#16a34a' : '#cbd5e1', 
                      borderRadius: '12px', p: 4, textAlign: 'center', cursor: 'pointer', display: 'block',
                      bgcolor: fileName ? '#f0fdf4' : 'transparent',
                      transition: 'all 0.2s',
                      '&:hover': { borderColor: '#7c3aed', bgcolor: '#f3e8ff' }
                    }}
                  >
                    <input type="file" hidden accept="application/pdf" onChange={handleFileChange} />
                    <UploadCloud size={32} color={fileName ? '#16a34a' : '#94a3b8'} style={{ margin: '0 auto' }} />
                    <Typography mt={1} color={fileName ? '#16a34a' : 'text.secondary'} fontWeight="500">
                      {fileName || "Click to Upload PDF"}
                    </Typography>
                  </Box>
                  
                  {resumeText && (
                    <Alert severity="success" sx={{ mt: 2, borderRadius: '8px' }}>
                      Resume loaded ({Math.ceil(resumeText.length / 1000)}KB)
                    </Alert>
                  )}

                  <Typography fontWeight="bold" mt={4} mb={2}>2. Job Description</Typography>
                  <TextField
                    multiline rows={8} fullWidth placeholder="Paste Job Description..."
                    value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                    sx={{ bgcolor: '#f1f5f9', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />
                  
                  {error && <Alert severity="error" sx={{ mt: 2, borderRadius: '8px' }}>{error}</Alert>}

                  <Button 
                    fullWidth variant="contained" size="large" onClick={handleCheck} 
                    disabled={loading || !resumeText || !jobDescription}
                    sx={{ 
                      mt: 4, bgcolor: '#7c3aed', py: 1.5, fontWeight: 'bold', borderRadius: '12px',
                      '&:hover': { bgcolor: '#6d28d9' }
                    }}
                  >
                    {loading ? <><CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />Processing (Laptop)...</> : "Check My ATS Score"}
                  </Button>
                </Paper>
              </Grid>

              {/* === RIGHT: RESULTS === */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 4, borderRadius: '16px', height: '100%', minHeight: 500, display: 'flex', flexDirection: 'column', justifyContent: loading ? 'center' : 'flex-start', border: '1px solid #e2e8f0' }}>
                  {loading ? (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <CircularProgress size={60} sx={{ color: '#7c3aed', mb: 3 }} />
                      <Typography variant="h6" fontWeight="bold">Local AI is Thinking...</Typography>
                      <Typography variant="body2" color="text.secondary">Running on Acer Nitro 4 🚀<br/>Please wait...</Typography>
                    </Box>
                  ) : result ? (
                    <Box>
                      {/* Score */}
                      <Box textAlign="center" mb={4}>
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                          <CircularProgress variant="determinate" value={result.score} size={140} thickness={4} sx={{ color: result.score > 75 ? '#16a34a' : result.score > 50 ? '#facc15' : '#ef4444' }} />
                          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Typography variant="h3" fontWeight="900">{result.score}</Typography>
                            <Typography variant="caption" fontWeight="bold">SCORE</Typography>
                          </Box>
                        </Box>
                        <Typography variant="h6" mt={2} fontWeight="bold">{result.match_status} Match</Typography>
                        <Typography variant="body1" color="text.secondary">{result.summary}</Typography>
                      </Box>
                      <Divider sx={{ my: 3 }} />
                      
                      <Box sx={{ bgcolor: '#f0fdf4', p: 3, borderRadius: '12px', mb: 3, border: '1px solid #bbf7d0' }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="#166534">Want 90+ Score?</Typography>
                        <Button variant="contained" fullWidth onClick={() => window.location.href = '/builder'} sx={{ mt: 1, bgcolor: '#16a34a', fontWeight: 'bold' }}>Build Optimized Resume</Button>
                      </Box>

                      <Typography fontWeight="bold" mb={2} color="#ef4444" display="flex" gap={1}><AlertTriangle size={18} /> Missing Keywords</Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} mb={4}>
                        {result.missing_keywords?.map((k, i) => <Chip key={i} label={k} sx={{ bgcolor: '#fee2e2', color: '#b91c1c', fontWeight: 'bold' }} />)}
                      </Box>
                    </Box>
                  ) : (
                    <Box textAlign="center" color="#94a3b8" sx={{ py: 4 }}>
                      <Search size={64} style={{ opacity: 0.5 }} />
                      <Typography variant="h6" fontWeight="bold">Ready to Analyze</Typography>
                      <Typography variant="body2">Server: {LOCAL_API_URL.includes('ngrok') ? '🟢 Local AI (Ngrok)' : '🔴 Check Config'}</Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
            
            {/* SEO Content Section */}
            <Box sx={{ mt: 8, p: 3, bgcolor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
               <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight="bold" mb={1} display="flex" gap={1}><FileText size={20} /> Beat the Bots</Typography>
                    <Typography variant="body2" color="text.secondary">Most Indian companies use ATS. This tool checks your resume against standard algorithms to ensure you pass the first screening.</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" fontWeight="bold" mb={1} display="flex" gap={1}><Zap size={20} /> Local Privacy</Typography>
                    <Typography variant="body2" color="text.secondary">Your resume is processed on a secure private server. We do not store your personal data.</Typography>
                  </Grid>
               </Grid>
            </Box>

          </Container>
        </Box>

        {/* ================= 3. FOOTER ================= */}
        <Box sx={{ py: 6, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 32, height: 32, borderRadius: '8px', objectFit: 'cover' }} />
              <Typography variant="h6" sx={{ fontWeight: '800', color: '#1e293b' }}>Resume<span style={{ color: '#7c3aed' }}>AI</span></Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={4}>
              Build a professional resume in minutes. Fast, Easy, and Effective.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              © 2025 ResumeAI Builder. All rights reserved.
            </Typography>
          </Container>
        </Box>

      </Box>
    </>
  );
};

export default ATSChecker;