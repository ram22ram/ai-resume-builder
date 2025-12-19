import React, { useMemo } from 'react';
import { Box, Paper, Typography, CircularProgress, Alert, Stack, CircularProgressProps } from '@mui/material';
import { AlertTriangle } from 'lucide-react';

// Inlined helper to prevent import errors
const calculateScoreAndTips = (resumeData: any) => {
  let score = 0;
  const tips = [];
  if (resumeData.personalInfo?.fullName) score += 10;
  else tips.push({ id: 1, message: "Add your full name." });
  
  if (resumeData.summary?.length > 30) score += 15;
  else tips.push({ id: 2, message: "Add a professional summary." });

  if (resumeData.experience?.length > 0) score += 25;
  else tips.push({ id: 3, message: "Add work experience." });

  if (resumeData.skills?.length >= 3) score += 20;
  else tips.push({ id: 4, message: "Add at least 3 skills." });

  return { score: Math.min(score, 100), tips };
};

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" disableShrink size={60} thickness={5} sx={{ color: props.value > 50 ? '#22c55e' : '#f59e0b' }} {...props} />
      <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="caption" component="div" sx={{ color: 'white', fontWeight: 'bold' }}>{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const ResumeScore = ({ resumeData }: { resumeData: any }) => {
  const { score, tips } = useMemo(() => calculateScoreAndTips(resumeData), [resumeData]);

  return (
    <Paper sx={{ p: 2, mb: 3, borderRadius: 3, background: 'rgba(30, 41, 59, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: tips.length > 0 ? 2 : 0 }}>
        <CircularProgressWithLabel value={score} />
        <Box>
          <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>Resume Score</Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>Here are some tips to improve:</Typography>
        </Box>
      </Box>
      
      {tips.length > 0 && (
        <Stack spacing={1}>
          {tips.map(tip => (
            <Alert key={tip.id} severity="warning" icon={<AlertTriangle size={16} />} sx={{ borderRadius: 2, py: 0, bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              {tip.message}
            </Alert>
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default ResumeScore;