import { Box } from '@mui/material';
import { ResumeProvider, useResume } from '../context/ResumeContext';
import ResumeForm from './ResumeForm';
import ResumePreview from './ResumePreview';
import TemplateSelector from './TemplateSelector';
import { useAutoSave } from '../hooks/useAutoSave';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './Layout';

const BuilderInner = () => {
  const { resume, loadFromATS, selectedTemplate, setSelectedTemplate } = useResume();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.resumeText) {
      loadFromATS(location.state.resumeText);
    }
  }, [location.state, loadFromATS]);

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
          <ResumePreview />
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
