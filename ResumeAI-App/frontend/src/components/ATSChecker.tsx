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

const ATSChecker = () => {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState('');
  const [result, setResult] = useState<any>(null);
  const navigate = useNavigate();

  const checkATS = async () => {
    if (!file) return;

    const fd = new FormData();
    fd.append('file', file);
    fd.append('jd', jd);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/ats/check`,
      fd
    );
    setResult(res.data);
  };

  return (
    <Layout>
      <Paper sx={{ p: 4, maxWidth: 700, mx: 'auto', mt: 6 }}>
        <Typography variant="h4" mb={2}>
          ATS Resume Checker
        </Typography>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          sx={{ mt: 2 }}
          placeholder="Optional Job Description"
          value={jd}
          onChange={(e) => setJd(e.target.value)}
        />

        <Button sx={{ mt: 2 }} variant="contained" onClick={checkATS}>
          Check ATS Score
        </Button>

        {result && (
          <Box mt={4}>
            <Typography variant="h5">
              ATS Score: {result.total}%
            </Typography>

            <LinearProgress
              variant="determinate"
              value={result.total}
              sx={{ my: 2 }}
            />

            {Object.entries(result.breakdown).map(([k, v]) => (
              <Typography key={k}>
                {k}: {v as number}/100
              </Typography>
            ))}

            {result.missingKeywords?.length > 0 && (
              <>
                <Typography mt={2} fontWeight="bold">
                  Missing Keywords
                </Typography>
                <Typography color="error">
                  {result.missingKeywords.join(', ')}
                </Typography>
              </>
            )}

            <Button
              sx={{ mt: 3 }}
              variant="outlined"
              onClick={() =>
                navigate('/builder', {
                  state: { resumeText: result.resumeText },
                })
              }
            >
              Improve in Resume Builder
            </Button>
          </Box>
        )}
      </Paper>
    </Layout>
  );
};

export default ATSChecker;
