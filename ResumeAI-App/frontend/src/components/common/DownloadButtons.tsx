import React, { useState } from 'react';
import { 
  Box, Button, CircularProgress, Typography 
} from '@mui/material';
import { Download, FileText, FileType } from 'lucide-react';

// ✅ FIX 1: Defined Interface to solve "implicitly has an any type" errors
interface DownloadButtonsProps {
  previewRef: React.RefObject<HTMLDivElement>;
  resumeData: any; // Using 'any' to start, replace with your ResumeData type if available
  handleDownloadPDF: () => void;
}

// ✅ FIX 2: Added the missing generateTxt function
const generateTxt = (data: any) => {
  const { personalInfo, summary, experience, education, skills } = data;
  
  let text = `Name: ${personalInfo.fullName}\n`;
  text += `Email: ${personalInfo.email}\n`;
  text += `Phone: ${personalInfo.phone}\n\n`;
  
  if (summary) text += `SUMMARY:\n${summary}\n\n`;
  
  if (experience && experience.length > 0) {
    text += `EXPERIENCE:\n`;
    experience.forEach((exp: any) => {
      text += `${exp.title} at ${exp.company} (${exp.startDate} - ${exp.endDate})\n`;
      text += `${exp.description}\n\n`;
    });
  }
  
  if (education && education.length > 0) {
    text += `EDUCATION:\n`;
    education.forEach((edu: any) => {
      text += `${edu.degree}, ${edu.school} (${edu.year})\n`;
    });
  }

  if (skills && skills.length > 0) {
    text += `SKILLS:\n${skills.join(', ')}\n`;
  }

  const element = document.createElement("a");
  const file = new Blob([text], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = `${personalInfo.fullName || 'resume'}.txt`;
  document.body.appendChild(element); 
  element.click();
  document.body.removeChild(element);
};

const DownloadButtons: React.FC<DownloadButtonsProps> = ({ previewRef, resumeData, handleDownloadPDF }) => {
  const [loadingDocx, setLoadingDocx] = useState(false);

  // This function is now used in the button below
  const handleDownloadTXT = () => {
    generateTxt(resumeData);
  };

  // This function is now used in the button below
  const handleDownloadDOCX = async () => {
    setLoadingDocx(true);
    try {
      const htmlString = previewRef.current?.innerHTML;
      if (!htmlString) {
        throw new Error("Preview element not found.");
      }

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
      <Typography variant="h6" sx={{ mb: 2 }}>Download Options</Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        
        {/* PDF Button */}
        <Button 
          variant="contained" 
          startIcon={<Download size={18} />} 
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>

        {/* ✅ FIX 3: Added DOCX Button (Fixes 'loadingDocx' and 'handleDownloadDOCX' unused warnings) */}
        <Button 
          variant="outlined" 
          startIcon={loadingDocx ? <CircularProgress size={18} /> : <FileType size={18} />} 
          onClick={handleDownloadDOCX}
          disabled={loadingDocx}
        >
          {loadingDocx ? 'Generating...' : 'Word (DOCX)'}
        </Button>

        {/* ✅ FIX 4: Added TXT Button (Fixes 'FileText' and 'handleDownloadTXT' unused warnings) */}
        <Button 
          variant="outlined" 
          startIcon={<FileText size={18} />} 
          onClick={handleDownloadTXT}
        >
          Text (TXT)
        </Button>

      </Box>
    </Box>
  );
};

export default DownloadButtons;