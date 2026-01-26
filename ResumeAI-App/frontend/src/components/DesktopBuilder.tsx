// DesktopBuilder.tsx – FINAL SCROLL-FIXED VERSION
import { Stack, Box } from '@mui/material';
import BuilderPanel from './BuilderPanel';
import PreviewPanel from './PreviewPanel';

const DesktopBuilder = ({
  resumeData,
  handlers,
  previewRef,
  selectedTemplate,
}: any) => {
  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'hidden', // 🔥 ROOT scroll yahin band
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        sx={{
          height: '100%',
          alignItems: 'stretch',
        }}
      >
        {/* ---------------- LEFT: SETTINGS (SCROLLABLE) ---------------- */}
        <Box
          sx={{
            width: 420,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowY: 'auto', // ✅ ONLY SCROLL HERE
            pr: 1,
          }}
        >
          <BuilderPanel
            resumeData={resumeData}
            handlers={handlers}
            variant="desktop"
          />
        </Box>

        {/* ---------------- RIGHT: PREVIEW (FIXED) ---------------- */}
        <Box
          sx={{
            flex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', // ❌ NO SCROLL
          }}
        >
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
