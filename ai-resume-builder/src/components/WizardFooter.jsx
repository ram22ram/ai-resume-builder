import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowLeft, Save, Download } from 'lucide-react';

// --- Styled Buttons (Aapke original styled components) ---

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
    // FIX 1: Ek Fragment (khaali tag) istemaal karein taaki 2 Box return kar sakein
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
          <SaveButton 
            onClick={handleNext}
          >
            Next Step
          </SaveButton>
        )}
      </Box>

      {/* --- FIX 2: Policy links ko yahaan add karein --- */}
      <Box sx={{ 
        textAlign: 'center', 
        pb: 2, // Padding bottom
        px: 2, // Padding sides
        background: '#f8fafc', // Footer ke background se match karein
        display: 'flex',
        gap: { xs: 1, sm: 2 }, // Mobile par thoda kam gap
        justifyContent: 'center',
        flexWrap: 'wrap' // Taaki mobile par break ho jaaye
      }}>
        <a 
          href="YAHAN_PRIVACY_POLICY_KA_LINK_PASTE_KAREIN" 
          target="_blank" rel="noopener noreferrer" 
          style={{color: '#666', fontSize: '12px', textDecoration: 'underline'}}
        >
          Privacy Policy
        </a>
        <a 
          href="YAHAN_TERMS_KA_LINK_PASTE_KAREIN" 
          target="_blank" rel="noopener noreferrer" 
          style={{color: '#666', fontSize: '12px', textDecoration: 'underline'}}
        >
          Terms & Conditions
        </a>
        <a 
          href="YAHAN_REFUND_POLICY_KA_LINK_PASTE_KAREIN" 
          target="_blank" rel="noopener noreferrer" 
          style={{color: '#666', fontSize: '12px', textDecoration: 'underline'}}
        >
          Refund Policy
        </a>
      </Box>
    </>
  );
};

export default WizardFooter;