import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowLeft, Save, Download } from 'lucide-react';

interface WizardFooterProps {
  activeStep: number;
  stepsLength: number;
  handleBack: () => void;
  handleSave: () => void;
  handleNext: () => void;
  handleDownloadPDF: () => void;
}

// --- Styled Buttons ---
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
  background: 'linear-gradient(to right, #16a34a, #15803d)',
  borderRadius: '8px',
  textTransform: 'none',
  padding: '10px 16px',
  '&:hover': {
    background: 'linear-gradient(to right, #15803d, #16a34a)',
  }
}));

const WizardFooter: React.FC<WizardFooterProps> = ({ 
  activeStep, stepsLength, handleBack, handleSave, handleNext, handleDownloadPDF 
}) => {
  return (
    <>
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
            Download PDF (₹30) 
          </DownloadButton>
        ) : (
          <SaveButton onClick={handleNext}>
            Next Step
          </SaveButton>
        )}
      </Box>

      {/* --- Legal Links Section --- */}
      <Box sx={{ 
        textAlign: 'center', 
        pb: 2, 
        px: 2, 
        background: '#f8fafc',
        display: 'flex',
        gap: { xs: 1, sm: 2 },
        justifyContent: 'center',
        flexWrap: 'wrap',
        borderTop: '1px dashed #e2e8f0',
        pt: 1
      }}>
        <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{color: '#666', fontSize: '12px', textDecoration: 'underline'}}>Privacy Policy</a>
        <a href="/terms" target="_blank" rel="noopener noreferrer" style={{color: '#666', fontSize: '12px', textDecoration: 'underline'}}>Terms & Conditions</a>
        <a href="/refund" target="_blank" rel="noopener noreferrer" style={{color: '#666', fontSize: '12px', textDecoration: 'underline'}}>Refund Policy</a>
      </Box>
    </>
  );
};

export default WizardFooter;