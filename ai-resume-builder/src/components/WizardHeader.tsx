import React from 'react';
import { Box, Typography } from '@mui/material';
import { CheckCircle } from 'lucide-react';

const WizardHeader = ({ steps, activeStep }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        p: 3, 
        borderBottom: '1px solid #e2e8f0' 
      }}
    >
      {steps.map((label, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        return (
          <Box 
            key={label}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center' 
            }}
          >
            <Box 
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 0.5,
                background: isActive ? '#7e22ce' : (isCompleted ? '#9333ea' : '#f3e8ff'),
                color: isActive || isCompleted ? 'white' : '#7e22ce',
                border: isActive ? '2px solid #c084fc' : 'none',
              }}
            >
              {isCompleted ? <CheckCircle size={18} /> : (
                <Typography sx={{ fontWeight: 'bold' }}>{index + 1}</Typography>
              )}
            </Box>
            <Typography 
              variant="caption"
              sx={{ 
                fontWeight: isActive || isCompleted ? 'bold' : 'normal',
                color: isActive || isCompleted ? '#6d28d9' : '#555' 
              }}
            >
              {label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default WizardHeader;