import React, { useState } from 'react';
import { 
  // FIX 1: 'Typography' ko yahaan import list mein add kiya gaya hai
  Box, Button, CircularProgress, Typography 
} from '@mui/material';
import { Download, FileText, File } from 'lucide-react';

const DownloadButtons = ({ previewRef, resumeData, handleDownloadPDF }) => {
  const [loadingDocx, setLoadingDocx] = useState(false);

  const handleDownloadTXT = () => {
    generateTxt(resumeData);
  };

  const handleDownloadDOCX = async () => {
    setLoadingDocx(true);
    try {
      const htmlString = previewRef.current?.innerHTML;
      if (!htmlString) {
        throw new Error("Preview element not found.");
      }

      // FIX 2: API path ko Netlify functions ke relative path se badal diya gaya hai
      // Purana: '/api/generate-docx'
      const response = await fetch('/.netlify/functions/generate-docx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ htmlString }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate DOCX file.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resumeData.personalInfo.fullName || 'resume'}.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("DOCX Download Error:", error);
      alert("Error: Could not generate .docx file.");
    } finally {
      setLoadingDocx(false);
    }
  };

  return (
    <Box>
      {/* Yeh <Typography> component ab defined hai */}
      <Typography variant="h6" sx={{ mb: 2 }}>Download Options</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button 
          variant="contained" 
          startIcon={<Download size={18} />} 
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
        
      </Box>
    </Box>
  );
};

export default DownloadButtons;