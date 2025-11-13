import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowLeft, Save, Download } from 'lucide-react';

// --- Styled Buttons (Naye Design ke liye) ---

const BackButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  borderColor: theme.palette.primary.main,
  borderRadius: '8px',
  textTransform: 'none',
  padding: '10px 16px',
}));

const SaveButton = styled(Button)(({ theme }) => ({
  color: 'white',
  fontWeight: 'bold',
  background: 'linear-gradient(to right, #a855f7, #9333ea)',
  borderRadius: '8px',
  textTransform: 'none',
  padding: '10px 16px',
  '&:hover': {
    background: 'linear-gradient(to right, #9333ea, #a855f7)',
  }
}));

const DownloadButton = styled(Button)(({ theme }) => ({
  color: 'white',
  fontWeight: 'bold',
  background: 'linear-gradient(to right, #16a34a, #15803d)', // Green gradient
  borderRadius: '8px',
  textTransform: 'none',
  padding: '10px 16px',
  '&:hover': {
    background: 'linear-gradient(to right, #15803d, #16a34a)',
  }
}));

// --- Footer Component ---

const WizardFooter = ({ activeStep, stepsLength, handleBack, handleSave, handleNext, handleDownloadPDF }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: 3, 
        borderTop: '1px solid #e2e8f0',
        background: '#f8fafc' 
      }}
    >
      <BackButton 
        startIcon={<ArrowLeft />}
        onClick={handleBack}
        disabled={activeStep === 0}
        variant="outlined"
      >
        Back
      </BackButton>

      <SaveButton 
        startIcon={<Save />}
        onClick={handleSave}
      >
        Save
      </SaveButton>

      {activeStep === stepsLength - 1 ? (
        <DownloadButton 
          startIcon={<Download />}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </DownloadButton>
      ) : (
        // Aage badhne ke liye main SaveButton waala style istemaal kar raha hoon
        <SaveButton 
          onClick={handleNext}
        >
          Next Step
        </SaveButton>
      )}
    </Box>
  );
};

export default WizardFooter;