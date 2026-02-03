import React, { useRef, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ResumePreview from './ResumePreview';
import DownloadPDFButton from './DownloadPDFButton';
import TemplateSelector from './TemplateSelector';
import TemplateRenderer from './TemplateRenderer';

const ResumeBuilder = () => {
  const previewRef = useRef<HTMLDivElement>(null);

  const [selectedTemplate, setSelectedTemplate] = useState('classic');

  // 🔥 for now dummy data, later ResumeContext se aayega
  const resumeData = {
    personalInfo: {
      fullName: 'Ramendra Vishwakarma',
      email: 'ramendra.vishwakarma@gmail.com',
      phone: '+91 7000012345',
      jobTitle: 'Software Engineer',
    },
    summary:
      'Full Stack Developer with experience in React, Node.js and ATS optimized resumes.',
    experience: [
      {
        id: 1,
        company: 'ResumeAI',
        position: 'Frontend Developer',
        description: 'Built ATS friendly resume builder using React.',
      },
    ],
    education: [],
    skills: ['React', 'TypeScript', 'Node.js'],
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Resume Builder</Typography>
        <DownloadPDFButton previewRef={previewRef} />
      </Stack>

      <TemplateSelector
        selected={selectedTemplate}
        onChange={setSelectedTemplate}
      />

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <ResumePreview ref={previewRef}>
          <TemplateRenderer
            template={selectedTemplate}
            data={resumeData}
          />
        </ResumePreview>
      </Box>
    </Box>
  );
};

export default ResumeBuilder;
