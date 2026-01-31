import { Stack, Box } from '@mui/material';
import BuilderPanel from './BuilderPanel';
import PreviewPanel from './PreviewPanel';

const DesktopBuilder = ({ resumeData, handlers, previewRef, selectedTemplate }: any) => {
  return (
    <Box sx={{ height: '100%', overflow: 'hidden' }}>
      <Stack direction="row" spacing={3} sx={{ height: '100%', alignItems: 'stretch' }}>
        {/* LEFT: SETTINGS */}
        <Box sx={{ width: 420, flexShrink: 0, display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto', pr: 1 }}>
          <BuilderPanel resumeData={resumeData} handlers={handlers} variant="desktop" />
        </Box>

        {/* RIGHT: PREVIEW (Now Scrollable) */}
        <Box sx={{ 
          flex: 1, 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column', 
          overflowY: 'auto', // ✅ Enabled Scroll
          bgcolor: 'rgba(0,0,0,0.05)',
          p: 2,
          borderRadius: '12px'
        }}>
          <PreviewPanel
            resumeData={resumeData}
            handlers={handlers}
            previewRef={previewRef}
            selectedTemplate={selectedTemplate}
            variant="desktop"
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default DesktopBuilder;