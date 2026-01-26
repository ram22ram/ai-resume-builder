import React from 'react';
import { Box, Typography, IconButton, Tabs, Tab } from '@mui/material';
import { X } from 'lucide-react';

const StepNavigator = ({ sections, activeStep, onStepClick, variant, onClose }: any) => {
  const isMobile = variant === 'mobile';

  return (
    <Box sx={{ 
      borderBottom: '1px solid rgba(255,255,255,0.1)', 
      bgcolor: 'rgba(15, 23, 42, 0.5)',
      p: isMobile ? 1 : 0 
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 1 }}>
        <Typography variant="overline" sx={{ color: '#94a3b8', fontWeight: 700, letterSpacing: 1.5 }}>
          Resume Wizard
        </Typography>
        {isMobile && onClose && (
          <IconButton onClick={onClose} sx={{ color: 'white' }}><X size={20} /></IconButton>
        )}
      </Box>

      <Tabs
        value={activeStep}
        onChange={(_, newValue) => onStepClick(newValue)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          '& .MuiTabs-indicator': { bgcolor: '#3b82f6', height: 3 },
          '& .MuiTab-root': { 
            color: '#64748b', 
            minWidth: 100,
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'none',
            '&.Mui-selected': { color: 'white' }
          }
        }}
      >
        {sections.map((section: any, index: number) => (
          <Tab key={section.id} label={section.title} />
        ))}
        <Tab label="Settings" />
      </Tabs>
    </Box>
  );
};

export default StepNavigator;