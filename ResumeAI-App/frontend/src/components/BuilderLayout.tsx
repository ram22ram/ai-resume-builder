// BuilderLayout.tsx
import React from 'react';
import { Container, Box } from '@mui/material';
import DesktopBuilder from './DesktopBuilder';
import MobileBuilder from './MobileBuilder';
import TabletBuilder from './TabletBuilder';
import { ResumeData, ResumeHandlers } from '../resume.types';

type PreviewMode = 'mobile' | 'desktop';

interface BuilderLayoutProps {
  resumeData: ResumeData;
  handlers: ResumeHandlers;
  previewRef: React.RefObject<HTMLDivElement>;
  selectedTemplate?: string;

  /* ✅ NEW – Preview First UX */
  previewMode: PreviewMode;
  setPreviewMode: React.Dispatch<React.SetStateAction<PreviewMode>>;

  isMobile: boolean;
  isTablet: boolean;
  breakpoint: any;
}

export const BuilderLayout = ({
  resumeData,
  handlers,
  previewRef,
  selectedTemplate,
  previewMode,
  setPreviewMode,
  isMobile,
  isTablet,
}: BuilderLayoutProps) => {

  /* 🔒 Real mobile device = force mobile preview */
  const effectivePreviewMode: PreviewMode =
    isMobile ? 'mobile' : previewMode;

  const renderContent = () => {
    /* ✅ MOBILE PREVIEW (USER OR DEVICE) */
    if (effectivePreviewMode === 'mobile') {
      return (
        <Box sx={{ flex: 1, overflowY: 'auto' }}>
          <MobileBuilder
            resumeData={resumeData}
            handlers={handlers}
            previewRef={previewRef}
            selectedTemplate={selectedTemplate}
          />
        </Box>
      );
    }

    /* ✅ TABLET LOGIC (OPTIONAL / HYBRID) */
    if (isTablet) {
      return (
        <TabletBuilder
          resumeData={resumeData}
          handlers={handlers}
          previewRef={previewRef}
          selectedTemplate={selectedTemplate}
        />
      );
    }

    /* ✅ DESKTOP PREVIEW */
    return (
      <DesktopBuilder
        resumeData={resumeData}
        handlers={handlers}
        previewRef={previewRef}
        selectedTemplate={selectedTemplate}
      />
    );
  };

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        height: 'calc(100vh - 80px)', // ✅ HARD HEIGHT CONSTRAINT
        display: 'flex',
        flexDirection: 'column',
        px: { xs: 0, sm: 1, md: 2 },
        py: { xs: 0, md: 2 },
        overflow: 'hidden', // ✅ IMPORTANT (prevents double scroll)
      }}
    >
      {/* 🔝 TOP BAR (Preview Toggle – Desktop Only) */}
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 1,
            gap: 1,
          }}
        >
          <button
            onClick={() => setPreviewMode('mobile')}
            disabled={previewMode === 'mobile'}
          >
            Mobile Preview
          </button>

          <button
            onClick={() => setPreviewMode('desktop')}
            disabled={previewMode === 'desktop'}
          >
            Desktop Preview
          </button>
        </Box>
      )}

      {/* 🔥 MAIN CONTENT */}
      <Box sx={{ flex: 1, minHeight: 0 }}>
        {renderContent()}
      </Box>
    </Container>
  );
};
