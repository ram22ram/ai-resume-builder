import React from 'react';
import { Container, Box } from '@mui/material';
import DesktopBuilder from './DesktopBuilder';
import MobileBuilder from './MobileBuilder';
import TabletBuilder from './TabletBuilder';
import { ResumeData } from '../types';

type PreviewMode = 'mobile' | 'desktop';

interface BuilderLayoutProps {
  resumeData: ResumeData;
  previewRef: React.RefObject<HTMLDivElement>;
  selectedTemplate?: string;

  previewMode: PreviewMode;
  setPreviewMode: React.Dispatch<React.SetStateAction<PreviewMode>>;

  isMobile: boolean;
  isTablet: boolean;
}

export const BuilderLayout = ({
  resumeData,
  previewRef,
  selectedTemplate,
  previewMode,
  setPreviewMode,
  isMobile,
  isTablet,
}: BuilderLayoutProps) => {

  const effectivePreviewMode: PreviewMode =
    isMobile ? 'mobile' : previewMode;

  const renderContent = () => {
    if (effectivePreviewMode === 'mobile') {
      return (
        <MobileBuilder
          resumeData={resumeData}
          previewRef={previewRef}
          selectedTemplate={selectedTemplate}
        />
      );
    }

    if (isTablet) {
      return (
        <TabletBuilder
          resumeData={resumeData}
          previewRef={previewRef}
          selectedTemplate={selectedTemplate}
        />
      );
    }

    return (
      <DesktopBuilder
        resumeData={resumeData}
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
        height: 'calc(100vh - 80px)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {!isMobile && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, gap: 1 }}>
          <button onClick={() => setPreviewMode('mobile')}>Mobile</button>
          <button onClick={() => setPreviewMode('desktop')}>Desktop</button>
        </Box>
      )}

      <Box sx={{ flex: 1, minHeight: 0 }}>
        {renderContent()}
      </Box>
    </Container>
  );
};
