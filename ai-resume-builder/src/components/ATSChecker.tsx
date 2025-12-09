// src/components/ATSChecker.tsx
import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, Paper, 
  CircularProgress, Chip, Stack, Alert, Divider 
} from '@mui/material';
import { UploadCloud, ArrowLeft, AlertTriangle, Search, FileText, Zap, Sparkles } from 'lucide-react';
// @ts-ignore
import { extractTextFromPDF } from '../utils/pdfUtils'; 
import { Helmet } from 'react-helmet-async';

// 👇 YOUR NGROK URL & GROQ API KEY
const LOCAL_NGROK_URL = "https://yuri-nonmagnetized-procrastinatively.ngrok-free.dev/api/generate";
const GROQ_API_KEY = (import.meta as any).env?.VITE_GROQ_API_KEY || ''; // Falls back to env var

interface ATSCheckerProps {
  onBack: () => void;
}

interface ATSResult {
  score: number;
  match_status: string;
  summary: string;
  missing_keywords: string[];
  formatting_issues: string[];
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

const ATSChecker: React.FC<ATSCheckerProps> = ({ onBack }) => {
  const [resumeText, setResumeText] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ATSResult | null>(null);
  const [error, setError] = useState<string>("");

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
      setError("Please upload Resume and add Job Description");
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
        Output valid JSON only: { "score": number, "match_status": string, "summary": string, "missing_keywords": [], "formatting_issues": [] }
      `;

      // Try Groq API First (Faster & Free)
      let data;
      try {
          console.log("Attempting Groq API...");
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
          const content = json.choices?.[0]?.message?.content;
          if (!content) throw new Error("Empty Groq Response");
          data = { response: content };

      } catch (groqErr) {
          console.warn("Groq failed, falling back to Local Ngrok...", groqErr);
          // Fallback to Local Ngrok
          const response = await fetch(LOCAL_NGROK_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json", 
                "ngrok-skip-browser-warning": "true" 
            },
            body: JSON.stringify({ model: "llama3", prompt: prompt, stream: false, format: "json" })
          });

          if (!response.ok) throw new Error("Both APIs Failed");
          data = await response.json();
      }

      const parsedResult = cleanAIResponse(data.response);
      if (!parsedResult) throw new Error("Failed to parse AI response.");

      setResult({
        score: parsedResult.score || 0,
        match_status: parsedResult.match_status || "Low",
        summary: parsedResult.summary || "",
        missing_keywords: parsedResult.missing_keywords || [],
        formatting_issues: parsedResult.formatting_issues || []
      });

    } catch (err: any) {
      setError(err.message || "Analysis Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet><title>Free ATS Resume Checker India</title></Helmet>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER */}
        <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'white', borderBottom: '1px solid #eee' }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', textDecoration: 'none' }}>
                <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 32, height: 32, borderRadius: '8px', objectFit: 'cover' }} />
                <Typography variant="h5" fontWeight="800" color="#1e293b">Resume<span style={{color:'#7c3aed'}}>AI</span></Typography>
              </Box>
              <Button onClick={onBack} startIcon={<ArrowLeft />}>Back to Home</Button>
            </Box>
          </Container>
        </Box>

        {/* CONTENT */}
        <Box sx={{ flexGrow: 1, py: 6 }}>
          <Container maxWidth="xl">
            <Box textAlign="center" mb={6}>
              <Typography variant="h3" fontWeight="900" color="#0f172a">Free ATS Resume Score Checker</Typography>
              {/* <Typography color="text.secondary" fontSize="1.1rem">Powered by <strong>Llama 3 (Groq)</strong></Typography> */}
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, maxWidth: 1100, mx: 'auto' }}>
              
              {/* LEFT: INPUTS */}
              <Box>
                <Paper sx={{ p: 4, borderRadius: '16px', height: '100%', border: '1px solid #e2e8f0' }}>
                  <Typography fontWeight="bold" mb={2}>1. Upload Resume (PDF)</Typography>
                  <Box component="label" sx={{ border: '2px dashed', borderColor: fileName ? '#16a34a' : '#cbd5e1', borderRadius: '12px', p: 4, textAlign: 'center', cursor: 'pointer', display: 'block', bgcolor: fileName ? '#f0fdf4' : 'transparent', '&:hover': { borderColor: '#7c3aed' } }}>
                    <input type="file" hidden accept="application/pdf" onChange={handleFileChange} />
                    <UploadCloud size={32} color={fileName ? '#16a34a' : '#94a3b8'} style={{ margin: '0 auto' }} />
                    <Typography mt={1} color={fileName ? '#16a34a' : 'text.secondary'} fontWeight="500">{fileName || "Click to Upload PDF"}</Typography>
                  </Box>
                  
                  {resumeText && <Alert severity="success" sx={{ mt: 2, borderRadius: '8px' }}>Resume loaded</Alert>}

                  <Typography fontWeight="bold" mt={4} mb={2}>2. Job Description</Typography>
                  <TextField multiline rows={8} fullWidth placeholder="Paste JD here..." value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} sx={{ bgcolor: '#f1f5f9' }} />
                  {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

                  <Button fullWidth variant="contained" size="large" onClick={handleCheck} disabled={loading || !resumeText || !jobDescription} sx={{ mt: 4, bgcolor: '#7c3aed', '&:hover': { bgcolor: '#6d28d9' } }}>
                    {loading ? "Processing..." : "Check Score"}
                  </Button>
                </Paper>
              </Box>

              {/* RIGHT: RESULTS */}
              <Box>
                <Paper sx={{ p: 4, borderRadius: '16px', minHeight: 500, border: '1px solid #e2e8f0' }}>
                  {result ? (
                    <Box>
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

                      {/* 🔥 SALES HOOK BUTTON (Only if score < 80) */}
                      {result.score < 80 && (
                        <Box sx={{ mb: 4, p: 3, bgcolor: '#f0fdf4', borderRadius: '12px', border: '1px solid #bbf7d0', textAlign: 'center' }}>
                           <Typography variant="h6" fontWeight="bold" color="#166534" mb={1}>
                             Want to boost this score to 90+? 🚀
                           </Typography>
                           <Typography variant="body2" color="#15803d" mb={2}>
                             Use our AI Builder to auto-fix formatting & keywords instantly.
                           </Typography>
                           <Button 
                             variant="contained" 
                             size="large"
                             startIcon={<Sparkles />}
                             onClick={() => window.location.href = '/builder'} // 👉 Redirects to Builder
                             sx={{ 
                               bgcolor: '#16a34a', 
                               fontWeight: 'bold',
                               px: 4,
                               '&:hover': { bgcolor: '#15803d' }
                             }}
                           >
                             Build Optimized Resume Now
                           </Button>
                        </Box>
                      )}

                      <Typography fontWeight="bold" mt={2} color="#ef4444">Missing Keywords:</Typography>
                      <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                        {result.missing_keywords.map((k, i) => <Chip key={i} label={k} color="error" variant="outlined" />)}
                      </Box>

                      <Typography fontWeight="bold" mt={3} color="#f59e0b">Fix These Issues:</Typography>
                      <Stack spacing={1} mt={1}>
                        {result.formatting_issues.map((issue, i) => (
                           <Typography key={i} variant="body2" display="flex" gap={1}>❌ {issue}</Typography>
                        ))}
                      </Stack>
                    </Box>
                  ) : (
                    <Box textAlign="center" py={10} color="gray">
                      <Search size={48} style={{opacity: 0.3}} />
                      <Typography mt={2}>Ready to Analyze</Typography>
                    </Box>
                  )}
                </Paper>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* FOOTER */}
        <Box sx={{ py: 4, textAlign: 'center', bgcolor: '#f8fafc', borderTop: '1px solid #eee' }}>
           <Typography variant="caption" color="text.secondary">© 2025 ResumeAI Builder.</Typography>
        </Box>

      </Box>
    </>
  );
};

export default ATSChecker;