import { Box, Typography } from '@mui/material';
import { CheckCircle } from 'lucide-react';

// 1. Interfaces define karein (Sare 'any' errors yahan se khatam honge)
interface WizardHeaderProps {
  steps: string[];
  activeStep: number;
  onStepClick: (index: number) => void;
}

const WizardHeader = ({ steps, activeStep, onStepClick }: WizardHeaderProps) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        p: 3, 
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        flexWrap: 'wrap',
        gap: 1
      }}
    >
      {steps.map((label: string, index: number) => { // Type explicitly defined here
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        return (
          <Box 
            key={label}
            onClick={() => onStepClick(index)} // Click handler
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              cursor: 'pointer',
              '&:hover': { opacity: 0.8 },
              flex: 1,
              minWidth: '60px'
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
                background: isActive ? '#7e22ce' : (isCompleted ? '#4c1d95' : 'rgba(255,255,255,0.1)'),
                color: isActive || isCompleted ? 'white' : 'rgba(255,255,255,0.5)',
                border: isActive ? '2px solid #c084fc' : '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              {isCompleted ? <CheckCircle size={18} /> : (
                <Typography sx={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{index + 1}</Typography>
              )}
            </Box>
            <Typography 
              variant="caption"
              sx={{ 
                fontSize: '0.7rem',
                fontWeight: isActive || isCompleted ? 'bold' : 'normal',
                color: isActive || isCompleted ? '#a78bfa' : 'rgba(255,255,255,0.5)',
                whiteSpace: 'nowrap'
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