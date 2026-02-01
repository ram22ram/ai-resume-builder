import { useMemo } from 'react';
import { Box, Paper, Typography, CircularProgress, Stack, Divider } from '@mui/material';
import { AlertTriangle, TrendingUp, CheckCircle2 } from 'lucide-react';
import { calculateResumeScore } from '../../utils/resume.helpers';

const ResumeScore = ({ resumeData }: { resumeData: any }) => {
  // ✅ Direct sync with advanced helper
  const { score, tips } = useMemo(() => calculateResumeScore(resumeData), [resumeData]);

  const getStatusColor = (s: number) => s > 75 ? '#22c55e' : s > 50 ? '#f59e0b' : '#ef4444';

  return (
    <Paper sx={{ 
  p: 2, 
  mb: 0, // Margin bottom zero kyunki hum Stack gap use kar rahe hain
  borderRadius: 3, 
  background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))', 
  border: '1px solid rgba(124, 58, 237, 0.3)', // Purple glow border
  backdropFilter: 'blur(10px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between' // Content spread out karega
}}>
      <Stack direction="row" spacing={2.5} alignItems="center" sx={{ mb: 2.5 }}>
        <Box sx={{ position: 'relative', display: 'flex' }}>
          <CircularProgress 
            variant="determinate" 
            value={score} 
            size={70} 
            thickness={4.5} 
            sx={{ color: getStatusColor(score), filter: `drop-shadow(0 0 6px ${getStatusColor(score)}44)` }} 
          />
          <Box sx={{ top: 0, left: 0, bottom: 0, right: 0, position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="caption" sx={{ color: 'white', fontWeight: 900, fontSize: '1rem' }}>{score}%</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 800, lineHeight: 1.2 }}>ATS Power</Typography>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>
            {score > 75 ? 'Ready to Interview' : 'Needs Optimization'}
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={1} sx={{ mb: 2.5 }}>
        {tips.length > 0 ? tips.map((tip, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <AlertTriangle size={14} color="#f59e0b" style={{ marginTop: 2 }} />
            <Typography variant="caption" sx={{ color: '#cbd5e1' }}>{tip}</Typography>
          </Box>
        )) : (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <CheckCircle2 size={16} color="#22c55e" />
            <Typography variant="caption" sx={{ color: '#22c55e' }}>Resume is perfectly optimized!</Typography>
          </Box>
        )}
      </Stack>

      <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.05)' }} />

      <Box sx={{ p: 1.5, borderRadius: 2.5, bgcolor: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <TrendingUp size={14} color="#60a5fa" />
          <Typography variant="caption" sx={{ color: '#60a5fa', fontWeight: 900, textTransform: 'uppercase' }}>Market Insight</Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
          {score > 70 ? "High demand for this profile in UK/Europe." : "Add more tech skills to increase visibility."}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ResumeScore;