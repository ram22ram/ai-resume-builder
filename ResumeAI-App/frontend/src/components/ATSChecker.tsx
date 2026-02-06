import { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  LinearProgress,
  TextField,
} from '@mui/material';
import Layout from './Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ATSChecker = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { user } = useAuth(); // Auth context for role logic
  const isPremium = user?.isPremium;

  const checkATS = async () => {
    if (!file) {
      setError('Please upload a PDF resume');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('jd', jd);

      // 🔥 FIX: Clean URL construction (remove double slashes AND double /api)
      const baseUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, '').replace(/\/api$/, '') || '';
      const validUrl = `${baseUrl}/api/ats/check`;

      const res = await axios.post(validUrl, fd);
      setResult(res.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to check ATS score. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to generate recommendations based on score
  const getRecommendations = (_score: number) => {
    const minor = [
      "Ensure file name is 'FirstName_LastName_Resume.pdf'",
      "Use standard fonts like Arial, Calibri, or Times New Roman",
      "Avoid using tables or columns for layout"
    ];
    
    // Detailed analysis for premium users
    const major = [
      "Missing industry-standard keywords from JD",
      "Quantify your achievements (e.g., 'Increased sales by 20%')",
      "Section headers are not standard (Use 'Experience', not 'My Journey')",
      "Resume length is not optimized for your experience level"
    ];

    return { minor, major };
  };

  const renderRecommendations = () => {
    if (!result) return null;
    const { minor, major } = getRecommendations(result.total);

    return (
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>Analysis Report</Typography>
        
        {/* PUBLIC / FREE / PREMIUM: Always show Minor Hints */}
        <Box mb={2}>
          <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
            Basic Checks (Visible to all)
          </Typography>
          <ul style={{ color: '#aaa' }}>
            {minor.map((rec, i) => <li key={i}>{rec}</li>)}
          </ul>
        </Box>

        {/* LOGGED USERS (Free & Premium): Generic Content Tips */}
        {user ? (
            <Box mb={2}>
                <Typography variant="subtitle1" fontWeight="bold" color="info.main">
                    📝 Content Improvements (Logged In)
                </Typography>
                <ul style={{ color: '#e0f2fe' }}>
                    {major.map((rec, i) => <li key={i}>{rec}</li>)}
                </ul>
            </Box>
        ) : (
            <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: 'rgba(255,255,255,0.05)', borderColor: '#333' }}>
                <Typography color="info.main" fontWeight="bold" gutterBottom>
                    🔓 Login to see Content Analysis
                </Typography>
                <Button variant="outlined" size="small" onClick={() => navigate('/login', { state: { from: '/ats' } })}>
                    Login to Unlock
                </Button>
            </Paper>
        )}

        {/* PREMIUM ONLY: Deep Keyword Analysis */}
        {isPremium ? (
          <Box mb={2}>
            <Typography variant="subtitle1" fontWeight="bold" color="primary">
              🚀 Keyword Gap Analysis (Premium Only)
            </Typography>
            <ul style={{ color: '#fff' }}>
              {result.missingKeywords?.length > 0 ? (
                  result.missingKeywords.map((k: string) => (
                    <li key={k} style={{ color: '#f87171' }}>Missing keyword: "{k}"</li>
                  ))
              ) : (
                  <li style={{ color: '#4ade80' }}>Great job! No major keywords missing.</li>
              )}
            </ul>
          </Box>
        ) : (
          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'rgba(255,158,11,0.1)', borderColor: '#f59e0b' }}>
            <Typography color="warning.main" fontWeight="bold">
              🔒 Premium Keyword Insights Hidden
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              See exactly which keywords your resume is missing to pass ATS scanners.
            </Typography>
            <Button variant="contained" color="warning" size="small" onClick={() => navigate('/pricing')}>
              Upgrade to Unlock
            </Button>
          </Paper>
        )}
      </Box>
    );
  };

  return (
    <Layout>
      <Paper sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 6 }}>
        <Typography variant="h4" mb={2}>ATS Resume Checker</Typography>
        
        {error && <Typography color="error" mb={2}>{error}</Typography>}

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ marginBottom: '16px', display: 'block' }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Paste Job Description (Optional) for keyword matching..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />

        <Button 
          sx={{ mt: 2 }} 
          variant="contained" 
          onClick={checkATS} 
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Check ATS Score'}
        </Button>

        {result && (
          <Box mt={4}>
            <Typography variant="h3" color="primary" fontWeight="bold">
              {result.total}%
            </Typography>
            <Typography color="text.secondary" gutterBottom>Overall Match Score</Typography>

            <LinearProgress
              variant="determinate"
              value={result.total}
              sx={{ my: 2, height: 10, borderRadius: 5 }}
            />

            <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
              {Object.entries(result.breakdown).map(([k, v]) => (
                <Box key={k}>
                  <Typography variant="caption" textTransform="capitalize" color="text.secondary">{k}</Typography>
                  <Typography variant="h6">{v as number}/100</Typography>
                </Box>
              ))}
            </Box>

            {renderRecommendations()}

            <Button
              sx={{ mt: 4 }}
              variant="outlined"
              fullWidth
              onClick={() => navigate('/builder', { state: { resumeText: result.resumeText } })}
            >
              Edit & Improve in Resume Builder
            </Button>
          </Box>
        )}
      </Paper>
    </Layout>
  );
};

export default ATSChecker;
