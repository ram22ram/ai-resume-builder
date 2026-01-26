// StepActions.tsx - REPLACE ENTIRE FILE
import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { ChevronLeft, ChevronRight, Plus, Save } from 'lucide-react';

const StepActions = ({ activeStep, totalSteps, onBack, onNext, onSave, onAddSection, onDownload, variant }: any) => {
  const isLastStep = activeStep === totalSteps;
  const isMobile = variant === 'mobile';

  return (
    <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(15, 23, 42, 0.5)' }}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button
          startIcon={<ChevronLeft size={18} />}
          onClick={onBack}
          disabled={activeStep === 0}
          sx={{ color: 'white', '&.Mui-disabled': { color: 'rgba(255,255,255,0.2)' } }}
        >
          {!isMobile && 'Back'}
        </Button>

        {!isLastStep && (
          <Button
            variant="outlined"
            startIcon={<Plus size={18} />}
            onClick={onAddSection}
            sx={{ 
              color: '#94a3b8', 
              borderStyle: 'dashed', 
              textTransform: 'none',
              // ✅ REMOVED: display: { xs: 'none', sm: 'flex' }
            }}
          >
            Add Section
          </Button>
        )}

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            endIcon={!isLastStep && <ChevronRight size={18} />}
            onClick={onNext}
            sx={{ 
              bgcolor: '#3b82f6', 
              borderRadius: '8px',
              textTransform: 'none',
              px: 3
            }}
          >
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default StepActions;