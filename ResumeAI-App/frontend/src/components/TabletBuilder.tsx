import { Box } from '@mui/material';
import BuilderPanel from './BuilderPanel';
import PreviewPanel from './PreviewPanel';

const TabletBuilder = ({ resumeData, previewRef, selectedTemplate }: any) => {
  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      <Box sx={{ width: 400, overflowY: 'auto' }}>
        <BuilderPanel />
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', bgcolor: '#fff' }}>
        <PreviewPanel
          ref={previewRef}
          resumeData={resumeData}
          selectedTemplate={selectedTemplate}
        />
      </Box>
    </Box>
  );
};

export default TabletBuilder;
