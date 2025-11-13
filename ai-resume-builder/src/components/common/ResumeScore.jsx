import React, { useMemo } from 'react';
import { Box, Paper, Typography, CircularProgress, Alert } from '@mui/material';
// FIX 1: Warning icon ko 'lucide-react' se import karein
import { AlertTriangle } from 'lucide-react';
import { calculateScoreAndTips } from '../../utils/resumeUtils';

function CircularProgressWithLabel(props) {
  const { value } = props;
  
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        disableShrink
        color="success" // Hamesha green (success)
        size={60} 
        thickness={5} 
        {...props}
      />
      
      <Box
        sx={{
          top: 0, left: 0, bottom: 0, right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography 
          variant="h6" 
          component="div" 
          color="text.primary" 
          fontWeight="bold"
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

const ResumeScore = ({ resumeData }) => {
  const { score, tips } = useMemo(() => calculateScoreAndTips(resumeData), [resumeData]);

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        mb: 2, 
        borderRadius: '1.5rem', 
        background: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: tips.length > 0 ? 1 : 0 }}>
        <CircularProgressWithLabel value={score} />
        <Box>
          <Typography variant="h6" fontWeight="bold">Resume Score</Typography>
          <Typography variant="body2" color="text.secondary">
            Here are some tips:
          </Typography>
        </Box>
      </Box>
      
      {tips.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {tips.map(tip => (
            <Alert 
              key={tip.id} 
              severity="warning" 
              // FIX 2: Icon add karein (jo aapke screenshot mein tha)
              icon={<AlertTriangle size={20} />}
              sx={{ 
                borderRadius: '12px',
                background: '#FFFBEB', // Halka yellow background
                color: '#B45309',      // Darker yellow text
                
                // FIX 3: Yeh rahi vertical "PATTI" (border)
                borderLeft: '4px solid #F59E0B', // Yellow border (patti)
                
                '& .MuiAlert-icon': {
                  color: '#F59E0B', // Icon ka color
                }
              }}
            >
              {tip.message}
            </Alert>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default ResumeScore;