import { Stack, Box } from '@mui/material';
import BuilderPanel from './BuilderPanel';
import PreviewPanel from './PreviewPanel';

const DesktopBuilder = ({ resumeData, previewRef, selectedTemplate }: any) => {
  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <Stack direction="row" sx={{ height: '100%' }}>
        <Box sx={{ flex: 1.4, overflowY: 'auto', p: 3 }}>
          <BuilderPanel />
        </Box>

        <Box sx={{ flex: 1, overflow: 'hidden', p: 2 }}>
          <Box sx={{ height: '100%', overflowY: 'auto', bgcolor: '#fff' }}>
            <PreviewPanel
              ref={previewRef}
              resumeData={resumeData}
              selectedTemplate={selectedTemplate}
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default DesktopBuilder;
