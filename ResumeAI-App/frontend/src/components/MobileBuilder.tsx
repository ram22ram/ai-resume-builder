import { Box } from '@mui/material';
import BuilderPanel from './BuilderPanel';
import PreviewPanel from './PreviewPanel';

const MobileBuilder = ({ resumeData, previewRef, selectedTemplate }: any) => {
  return (
    <Box sx={{ height: '100vh', overflow: 'hidden' }}>
      <BuilderPanel />
      <Box sx={{ height: '50vh', overflowY: 'auto', bgcolor: '#fff' }}>
        <PreviewPanel
          ref={previewRef}
          resumeData={resumeData}
          selectedTemplate={selectedTemplate}
        />
      </Box>
    </Box>
  );
};

export default MobileBuilder;
