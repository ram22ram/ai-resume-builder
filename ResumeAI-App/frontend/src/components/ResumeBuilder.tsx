import { Box } from '@mui/material';
import { ResumeProvider, useResume } from '../context/ResumeContext';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import TemplateSelector from './TemplateSelector';
import DownloadResumeButton from './DownloadResumeButton';
import { useAutoSave } from '../hooks/useAutoSave';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './Layout';

const BuilderInner = () => {
  const { resume, loadFromATS, selectedTemplate, setSelectedTemplate } = useResume();
  const location = useLocation();

  useEffect(() => {
    // 1. Handle ATS Data
    if (location.state?.resumeText) {
      loadFromATS(location.state.resumeText);
    }

    // 2. Handle Template Selection from URL
    const params = new URLSearchParams(location.search);
    const templateId = params.get('template');
    if (templateId) {
       setSelectedTemplate(templateId);
    }
  }, [location.state, location.search, loadFromATS, setSelectedTemplate]);

  useAutoSave('resume_draft', resume);

  return (
    <Box sx={{ p: 3 }}>
      <TemplateSelector
        selected={selectedTemplate}
        onChange={setSelectedTemplate}
      />

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 4,
          mt: 4,
        }}
      >
        <ResumeForm />

        <Box sx={{ position: 'sticky', top: 90 }}>
          <Box sx={{ mb: 2 }}>
            <DownloadResumeButton />
          </Box>
          <ResumePreview />
          <Box sx={{ mt: 2 }} />
        </Box>
      </Box>
    </Box>
  );
};

const ResumeBuilder = () => (
  <ResumeProvider>
    <Layout>
      <BuilderInner />
    </Layout>
  </ResumeProvider>
);

export default ResumeBuilder;
