import React from 'react';
import { Box } from '@mui/material';
import ResumeScore from './common/ResumeScore';

interface PreviewScoreProps {
  resumeData: any;
}

const PreviewScore = ({ resumeData }: PreviewScoreProps) => {
  return (
    <Box sx={{ mb: 2 }}>
      {/* Hum wahi ResumeScore use kar rahe hain jo humne pehle fix kiya tha */}
      <ResumeScore resumeData={resumeData} />
    </Box>
  );
};

export default PreviewScore;