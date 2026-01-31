import { Stack, Box } from '@mui/material';
import BuilderPanel from './BuilderPanel';
import PreviewPanel from './PreviewPanel';

const DesktopBuilder = ({ resumeData, handlers, previewRef, selectedTemplate }: any) => {
  return (
    <Box sx={{ height: 'calc(100vh - 70px)', overflow: 'hidden', bgcolor: '#020617' }}>
      <Stack direction="row" spacing={0} sx={{ height: '100%' }}>
        
        {/* LEFT: FULL FORM FEED (60%) */}
        <Box sx={{ 
          flex: 1.4, 
          height: '100%', 
          overflowY: 'auto', 
          borderRight: '1px solid rgba(255,255,255,0.1)',
          p: { md: 3, lg: 5 },
          '&::-webkit-scrollbar': { width: '6px' },
          '&::-webkit-scrollbar-thumb': { bgcolor: '#1e293b', borderRadius: '10px' }
        }}>
          <BuilderPanel resumeData={resumeData} handlers={handlers} variant="desktop" />
        </Box>

        {/* RIGHT: STICKY PREVIEW (40%) */}
        <Box sx={{ 
          flex: 1, 
          height: '100%', 
          display: 'flex', 
          bgcolor: '#0f172a', 
          p: 4, 
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <Box sx={{ 
            width: '100%', 
            maxWidth: '800px', 
            height: '100%', 
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            borderRadius: '4px'
          }}>
            <PreviewPanel
              resumeData={resumeData}
              handlers={handlers}
              previewRef={previewRef}
              selectedTemplate={selectedTemplate}
              variant="desktop"
            />
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default DesktopBuilder;