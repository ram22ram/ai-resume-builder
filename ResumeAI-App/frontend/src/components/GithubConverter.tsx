import { useState } from 'react';
import { 
  Container, Paper, Typography, TextField, 
  Button, Box, CircularProgress, Card, 
  Stack, Chip, Alert
} from '@mui/material';
import { 
  Github, Check, Copy, Zap, Code, Eye, Sparkles 
} from 'lucide-react';
// @ts-ignore
import { generateContent } from '../utils/aiService';
import Layout from './Layout';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

const GithubConverter = () => {
  const { user, login } = useAuth();
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showLoginGate, setShowLoginGate] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post(`${API_URL}/auth/google`, {
        token: credentialResponse.credential
      });
      if (res.data.success) {
        login(res.data.user, res.data.token);
        setShowLoginGate(false);
      }
    } catch (err) {
      console.error("Login Failed", err);
    }
  };

  const handleConvert = async () => {
    if (!user) {
        setShowLoginGate(true);
        return;
    }

    setLoading(true);
    // @ts-ignore
    const res = await generateContent(
      `Act as a Tech Resume Writer. Convert this project description into 3-4 high-impact bullet points using the 'Google XYZ' format (Accomplished [X] as measured by [Y], by doing [Z]). Focus on metrics, technologies used, and business impact.\n\nProject Data: "${text.substring(0, 4000)}"`,
      "Professional Resume Writer"
    );
    setResult(res);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade { animation: fadeIn 0.5s ease-out; }
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .code-block { background: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); font-family: 'JetBrains Mono', monospace; border-radius: 8px; }
      `}</style>

      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, bgcolor: '#020617' }}>
        <Box sx={{ position: 'absolute', top: '30%', right: '15%', width: 300, height: 300, bgcolor: '#22c55e', borderRadius: '50%', filter: 'blur(120px)', opacity: 0.15 }} />
      </Box>

      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={8} className="animate-fade">
          <Chip label="GITHUB TO RESUME CONVERTER" sx={{ bgcolor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.3)', mb: 3 }} icon={<Code size={14} />} />
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 900, mb: 2, color: 'white' }}>Turn Code into <br /> Career Currency</Typography>
        </Box>

        <Stack spacing={4}>
          <Paper className="glass-panel" sx={{ p: { xs: 3, md: 4 }, borderRadius: 4, background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(20px)' }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}><Github size={24} /></Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>Paste Your Project Details</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>GitHub Readme, Code Snippets, or Project Summary</Typography>
              </Box>
            </Stack>
            
            <TextField 
              multiline rows={8} fullWidth 
              placeholder={`Example: "Built a React application with TypeScript and Redux..."`}
              value={text} onChange={(e) => setText(e.target.value)} 
              sx={{ mb: 3, '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255, 255, 255, 0.05)', color: '#e2e8f0' } }}
            />
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
              <Chip label={`${text.length} characters`} size="small" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)', color: '#94a3b8' }} />
              
              {showLoginGate ? (
                <Stack direction="row" alignItems="center" spacing={2} sx={{ bgcolor: 'rgba(255,255,255,0.05)', p: 1, borderRadius: 2 }}>
                    <Typography variant="caption" color="error" fontWeight="bold">Login required to generate:</Typography>
                    <GoogleLogin onSuccess={handleGoogleSuccess} theme="filled_black" size="medium" />
                </Stack>
              ) : (
                <Button 
                    variant="contained" size="large" onClick={handleConvert} disabled={loading || !text} 
                    startIcon={loading ? <CircularProgress size={20} color="inherit"/> : <Zap size={20} />}
                    sx={{ bgcolor: '#22c55e', px: 4, py: 1.5, fontWeight: 'bold' }}
                >
                    {loading ? "Analyzing Code..." : "Generate Resume Bullets"}
                </Button>
              )}
            </Stack>
          </Paper>

          {result && (
            <Paper className="glass-panel" sx={{ borderRadius: 4, border: '1px solid rgba(34, 197, 94, 0.3)', background: 'rgba(34, 197, 94, 0.05)', backdropFilter: 'blur(20px)', overflow: 'hidden', animation: 'fadeIn 0.5s ease-out' }}>
              <Box sx={{ p: 3, borderBottom: '1px solid rgba(34, 197, 94, 0.2)', background: 'rgba(34, 197, 94, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}><Check size={20} /></Box>
                  <Typography variant="h6" fontWeight="bold">ATS-Optimized Bullet Points</Typography>
                </Stack>
                <Button variant="outlined" size="small" startIcon={copied ? <Check size={16} /> : <Copy size={16} />} onClick={handleCopy} sx={{ borderColor: 'rgba(34, 197, 94, 0.3)', color: copied ? '#86efac' : '#22c55e' }}>{copied ? 'Copied!' : 'Copy All'}</Button>
              </Box>
              <Box className="code-block" sx={{ p: { xs: 3, md: 4 } }}>
               <Typography sx={{ whiteSpace: 'pre-line', color: '#d1fae5', fontFamily: '"Outfit", sans-serif', fontSize: '1rem', lineHeight: 1.8 }}>
                  {result.split('\n').map((line, index) => {
                    const cleanLine = line.replace(/^[\s\*\-\•]+/, '').trim();
                    if (!cleanLine) return null;
                    return (
                    <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}>
                      <Box sx={{ color: '#22c55e', mr: 2, mt: 0.5 }}>•</Box>
                      <Box sx={{ flex: 1 }}>{cleanLine}</Box>
                    </Box>
                  )})}
                </Typography>
              </Box>
            </Paper>
          )}

          <Alert severity="info" icon={<Sparkles />} sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', borderRadius: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>Best Practices:</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">• <strong>Include metrics:</strong> "Increased performance by 40%" instead of "Improved performance"</Typography>
              <Typography variant="body2">• <strong>Mention technologies:</strong> List specific tools, frameworks, and languages used</Typography>
            </Stack>
          </Alert>

          <Paper className="glass-panel" sx={{ p: 3, borderRadius: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Eye size={20} color="#94a3b8" />
              <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>Quick Examples</Typography>
            </Stack>
            <Stack spacing={2}>
              {[{ title: "E-commerce Platform", text: "Built a full-stack e-commerce app...", tech: ["React", "Node.js"] }].map((example, index) => (
                <Card key={index} sx={{ p: 2.5, bgcolor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: 2, cursor: 'pointer' }} onClick={() => setText(example.text)}>
                  <Typography fontWeight="bold" mb={1} color="white">{example.title}</Typography>
                  <Typography variant="body2" color="#94a3b8" mb={2}>{example.text}</Typography>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default GithubConverter;