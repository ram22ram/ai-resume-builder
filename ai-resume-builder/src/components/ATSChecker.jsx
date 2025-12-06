// src/components/ATSChecker.jsx
import React, { useState } from 'react';
import { 
  Box, Container, Typography, TextField, Button, Paper, Grid, 
  CircularProgress, Chip, Stack, Alert, Divider 
} from '@mui/material';
import { UploadCloud, ArrowLeft, AlertTriangle, CheckCircle2, Search, FileText, Zap } from 'lucide-react';
import { extractTextFromPDF } from '../utils/pdfUtils'; 
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ATSChecker = ({ onBack }) => {
  const navigate = useNavigate();
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
      try {
        const text = await extractTextFromPDF(file);
        setResumeText(text);
      } catch (err) {
        setError("Error reading PDF");
      }
    } else {
      setError("Please upload PDF only");
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
      const res = await fetch('/.netlify/functions/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          section: 'ats_check', 
          resumeText, 
          jobDescription 
        }),
      });
      
      const data = await res.json();
      
      // Backend se 'content' aa raha hai, usse parse karein
      const parsedResult = JSON.parse(data.content); 
      setResult(parsedResult);

    } catch (err) {
      setError("Analysis Failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* === SEO METADATA === */}
      <Helmet>
        <title>Free ATS Resume Checker India | Check Resume Score AI 2025</title>
        <meta name="description" content="Upload your resume PDF and check your ATS score against job descriptions for free. Best AI Resume Scanner for freshers in India to find missing keywords." />
        <meta name="keywords" content="Free ATS Resume Checker India, Check Resume Score Free AI, Resume Scanner for Freshers, CV Keyword Matcher, ATS Score Calculator" />
      </Helmet>

      <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
        
        {/* ================= 1. HEADER (NAVBAR) ================= */}
        <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}>
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={onBack}>
                <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 32, height: 32, borderRadius: '8px' }} />
                <Typography variant="h5" sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: -0.5 }}>
                  Resume<span style={{ color: '#7c3aed' }}>AI</span>
                </Typography>
              </Box>
              
              <Button 
                variant="text" 
                startIcon={<ArrowLeft />} 
                onClick={onBack}
                sx={{ color: '#64748b', fontWeight: 'bold' }}
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
                  
                  {/* Upload Box */}
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

                  {/* JD Input */}
                  <Typography fontWeight="bold" mt={4} mb={2}>2. Job Description</Typography>
                  <TextField
                    multiline rows={8} fullWidth placeholder="Paste the Job Description here..."
                    value={jobDescription} onChange={(e) => setJobDescription(e.target.value)}
                    sx={{ bgcolor: '#f1f5f9', '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
                  />

                  {error && <Alert severity="error" sx={{ mt: 2, borderRadius: '8px' }}>{error}</Alert>}

                  <Button 
                    fullWidth variant="contained" size="large" onClick={handleCheck} disabled={loading}
                    sx={{ 
                      mt: 4, bgcolor: '#7c3aed', py: 1.5, fontWeight: 'bold', borderRadius: '12px',
                      boxShadow: '0 10px 20px -5px rgba(124, 58, 237, 0.3)',
                      '&:hover': { bgcolor: '#6d28d9' }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Check My Score"}
                  </Button>
                </Paper>
              </Grid>

              {/* === RIGHT: RESULTS === */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 4, borderRadius: '16px', height: '100%', minHeight: 500, display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                  {result ? (
                    <Box>
                      {/* Score */}
                      <Box textAlign="center" mb={4}>
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                          <CircularProgress variant="determinate" value={result.score} size={140} thickness={4} 
                            sx={{ color: result.score > 70 ? '#16a34a' : result.score > 40 ? '#facc15' : '#ef4444' }} 
                          />
                          <Box sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Typography variant="h3" fontWeight="900">{result.score}</Typography>
                            <Typography variant="caption" fontWeight="bold" color="text.secondary">SCORE</Typography>
                          </Box>
                        </Box>
                        <Typography variant="h6" mt={2} fontWeight="bold" color={result.score > 70 ? '#16a34a' : '#ef4444'}>
                          {result.match_status} Match
                        </Typography>
                        <Typography variant="body1" color="text.secondary" mt={1}>
                          {result.summary}
                        </Typography>
                      </Box>

                      <Divider sx={{ my: 3 }} />

                      {/* === SALES HOOK (Conversion) === */}
                      <Box sx={{ bgcolor: '#f0fdf4', p: 3, borderRadius: '12px', mb: 3, border: '1px solid #bbf7d0' }}>
                        <Typography variant="subtitle1" fontWeight="bold" color="#166534" mb={1}>
                            Want to increase this score to 90+?
                        </Typography>
                        <Typography variant="body2" color="#15803d" mb={2}>
                            Use our AI Builder to auto-fix formatting and keywords instantly.
                        </Typography>
                        <Button 
                            variant="contained" 
                            fullWidth 
                            onClick={() => navigate('/builder')} 
                            sx={{ 
                            bgcolor: '#16a34a', fontWeight: 'bold',
                            '&:hover': { bgcolor: '#15803d' } 
                            }}
                        >
                            Build Optimized Resume Now
                        </Button>
                      </Box>

                      {/* Missing Keywords */}
                      <Typography fontWeight="bold" mb={2} color="#ef4444" display="flex" gap={1} alignItems="center">
                        <AlertTriangle size={18} /> Missing Keywords
                      </Typography>
                      <Box display="flex" flexWrap="wrap" gap={1} mb={4}>
                        {result.missing_keywords?.length > 0 ? (
                          result.missing_keywords.map((k, i) => (
                            <Chip key={i} label={k} sx={{ bgcolor: '#fee2e2', color: '#b91c1c', fontWeight: 'bold', borderRadius: '8px' }} />
                          ))
                        ) : (
                          <Typography variant="body2" color="text.secondary">No missing keywords found!</Typography>
                        )}
                      </Box>

                      {/* Issues */}
                      <Typography fontWeight="bold" mb={2} color="#f59e0b" display="flex" gap={1} alignItems="center">
                        <Search size={18} /> AI Suggestions
                      </Typography>
                      <Stack spacing={1.5}>
                        {result.formatting_issues?.map((issue, i) => (
                          <Paper key={i} elevation={0} sx={{ p: 1.5, bgcolor: '#fff7ed', borderLeft: '4px solid #f59e0b', borderRadius: '4px' }}>
                            <Typography variant="body2" color="#9a3412">
                              {issue}
                            </Typography>
                          </Paper>
                        ))}
                      </Stack>
                    </Box>
                  ) : (
                    <Box textAlign="center" color="#94a3b8">
                      <Box sx={{ bgcolor: '#f1f5f9', width: 80, height: 80, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                        <Search size={40} style={{ opacity: 0.5 }} />
                      </Box>
                      <Typography variant="h6" fontWeight="bold" color="#64748b">Ready to Analyze</Typography>
                      <Typography variant="body2">Upload your Resume and paste the Job Description<br/>to get a detailed AI score.</Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* === 3. SEO CONTENT SECTION (NEW ADDITION) === */}
        <Box sx={{ py: 8, bgcolor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
          <Container maxWidth="lg">
            <Typography variant="h4" fontWeight="800" mb={4} color="#0f172a" textAlign="center">
              How our ATS Resume Checker works?
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" fontWeight="bold" mb={1} color="#334155" display="flex" alignItems="center" gap={1}>
                    <FileText size={20} color="#7c3aed" /> Beat the Bots in India
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                    Most Indian companies (TCS, Wipro, Infosys) use Applicant Tracking Systems (ATS) to filter resumes. Our <strong>Free ATS Resume Checker India</strong> scans your PDF just like a bot. It identifies parsing errors, formatting issues, and low readability that could get your application rejected instantly.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ p: 2 }}>
                  <Typography variant="h6" fontWeight="bold" mb={1} color="#334155" display="flex" alignItems="center" gap={1}>
                    <Zap size={20} color="#7c3aed" /> Keyword Optimization
                  </Typography>
                  <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                    To get hired, your resume must match the Job Description (JD). Our tool performs a real-time <strong>Resume Score Check AI</strong> to compare your CV against the JD. It highlights <strong>Missing Keywords</strong> (like Python, Sales, Leadership) so you can add them and boost your score to 90+.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ================= 4. FOOTER ================= */}
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