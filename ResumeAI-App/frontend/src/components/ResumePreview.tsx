import { Box, Paper } from '@mui/material';
import TemplateRenderer from './TemplateRenderer';
import { useResume } from '../context/ResumeContext';

const ResumePreview = () => {
  const { resume, selectedTemplate } = useResume();

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Box id="resume-preview">
        <TemplateRenderer template={selectedTemplate} data={resume} />
      </Box>
    </Paper>
  );
};

export default ResumePreview;
