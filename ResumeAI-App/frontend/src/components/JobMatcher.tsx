import { Box, Typography, LinearProgress } from '@mui/material';

const JobMatcher = ({ resumeSkills, jobJD }: any) => {
  // Simple logic for Match Score
  const matched = resumeSkills.filter((s: string) => jobJD.toLowerCase().includes(s.toLowerCase()));
  const score = Math.round((matched.length / (resumeSkills.length || 1)) * 100);

  return (
    <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
      <Typography variant="subtitle2">ATS Match Score: {score}%</Typography>
      <LinearProgress variant="determinate" value={score} sx={{ my: 1, height: 8, borderRadius: 5 }} />
      <Typography variant="caption" color="gray">
        Tip: USA market favors quantitative results. Use numbers!
      </Typography>
    </Box>
  );
};