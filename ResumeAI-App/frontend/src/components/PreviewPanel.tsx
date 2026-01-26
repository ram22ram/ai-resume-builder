// PreviewPanel.tsx – FINAL (SCROLL + TEMPLATE FIXED)
import React from 'react';
import { Box, Typography } from '@mui/material';
import PreviewActions from './PreviewActions';
import PreviewScore from './PreviewScore';
import TemplateSelector from './templates/TemplateSelector';
import { ResumeData, ResumeHandlers, LegacyResumeData } from '../resume.types';

interface PreviewPanelProps {
  resumeData: ResumeData;
  handlers: ResumeHandlers;
  previewRef: React.RefObject<HTMLDivElement>;
  selectedTemplate?: string;
  variant: 'desktop' | 'mobile' | 'tablet';
}

const PreviewPanel = ({
  resumeData,
  handlers,
  previewRef,
  selectedTemplate = 'modern',
  variant,
}: PreviewPanelProps) => {
  const isMobile = variant === 'mobile';
  const isTablet = variant === 'tablet';
  const isDesktop = variant === 'desktop';

  const templateName = selectedTemplate || 'modern';


  const visibleSections = resumeData.sections.filter(s => s.isVisible);

  const handleGenerateMagicLink = () => {
    const link = handlers.generateMagicLink();
    if (link) {
      navigator.clipboard.writeText(link);
      alert('Magic link copied!');
    }
  };

  const handleDownload = () => {
    handlers.generatePDF();
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // 🔥 IMPORTANT
      }}
    >
      {/* Resume Score – Desktop / Tablet only */}
      {(isDesktop || isTablet) && (
        <Box sx={{ flexShrink: 0, mb: 2 }}>
          <PreviewScore resumeData={handlers.legacyData as LegacyResumeData} />
        </Box>
      )}

      {/* MAIN PREVIEW AREA */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Resume Preview Box */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            bgcolor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid #e0e0e0',
            position: 'relative',

            /* ✅ SCROLL RULE */
            overflowY: isMobile ? 'auto' : 'hidden',
            overflowX: 'hidden',

            /* Mobile scaling */
            transform: isMobile ? 'scale(0.95)' : 'none',
            transformOrigin: 'top center',
            transition: 'all 0.3s ease',
            mb: isMobile ? 2 : 0,
          }}
        >
          {/* 🔥 FORCE FULL RERENDER ON TEMPLATE CHANGE */}
          <Box
            key={`${templateName}-${variant}`}
            ref={previewRef}
            sx={{
              minHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TemplateSelector
              templateName={templateName}
              data={resumeData}
              theme={resumeData.theme}
              isPreview={isMobile}
            />

            {/* Empty State */}
            {visibleSections.length === 0 && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '300px',
                  flexDirection: 'column',
                  gap: 2,
                  color: '#64748b',
                }}
              >
                <Typography variant="body1">
                  Add content to see your resume preview
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* ACTIONS – FIXED POSITION */}
        <Box
          sx={{
            flexShrink: 0,
            mt: 2,
            position: 'sticky',
            bottom: 0,
            pt: 1,
            zIndex: 1,
          }}
        >
          <PreviewActions
            variant={variant}
            onDownload={handleDownload}
            onGenerateMagicLink={handleGenerateMagicLink}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewPanel;
