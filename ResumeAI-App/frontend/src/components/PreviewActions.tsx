import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { Share2, Sparkles, Download } from 'lucide-react';

interface PreviewActionsProps {
  onGenerateMagicLink: () => void;
  onDownload?: () => void; // Added optional onDownload prop
  variant: 'desktop' | 'mobile' | 'tablet';
}

const handleShareResume = async () => {
  const shareData = {
    title: 'My Resume',
    text: 'Check out my resume',
    url: window.location.href, // ya magic link
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error('Share cancelled', err);
    }
  } else {
    // Fallback: copy link
    await navigator.clipboard.writeText(shareData.url);
    alert('Link copied! Share it manually.');
  }
};


const PreviewActions = ({ 
  onGenerateMagicLink, 
  onDownload, 
  variant 
}: PreviewActionsProps) => {
  const isMobile = variant === 'mobile';
  const isTablet = variant === 'tablet';

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      console.warn('Download function not provided');
    }
  };

  return (
    <Box sx={{ 
      mt: 3, 
      textAlign: 'center', 
      pb: isMobile ? 4 : 0,
      width: '100%'
    }}>
      <Stack 
        direction={isMobile ? "column" : "row"} 
        spacing={2} 
        justifyContent="center"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        {/* Download Button - Conditionally render if onDownload is provided */}
        {onDownload && (
          <Button
            variant="outlined"
            onClick={handleDownload}
            startIcon={<Download size={18} />}
            sx={{
              borderColor: '#3b82f6',
              color: '#3b82f6',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '12px',
              px: 4,
              py: 1.2,
              width: isMobile ? '100%' : 'auto',
              '&:hover': {
                borderColor: '#2563eb',
                backgroundColor: 'rgba(59, 130, 246, 0.04)',
              }
            }}
          >
            Download PDF
          </Button>
        )}

        {/* Magic Link Button */}
        <Button
          variant="contained"
          onClick={onGenerateMagicLink}
          startIcon={<Sparkles size={18} />}
          sx={{
            background: 'linear-gradient(45deg, #7c3aed 0%, #3b82f6 100%)',
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: '12px',
            px: 4,
            py: 1.2,
            width: isMobile ? '100%' : 'auto',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #6d28d9 0%, #2563eb 100%)',
              boxShadow: '0 6px 20px rgba(124, 58, 237, 0.4)',
            }
          }}
        >
          Generate Magic Link
        </Button>

        {/* Share Button - Optional */}
        <Button
          variant="text"
          startIcon={<Share2 size={18} />}
          onClick={handleShareResume}
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 500,
            textTransform: 'none',
            borderRadius: '12px',
            px: 3,
            py: 1.2,
            width: isMobile ? '100%' : 'auto',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
            }
          }}
        >
          Share Resume
        </Button>

      </Stack>
      
      {/* Informative text */}
      <Typography 
        variant="caption" 
        sx={{ 
          display: 'block', 
          mt: 1.5, 
          color: 'rgba(255,255,255,0.5)',
          fontSize: '0.75rem',
          maxWidth: isMobile ? '100%' : '600px',
          mx: 'auto',
          lineHeight: 1.5
        }}
      >
        {isMobile 
          ? "Magic link syncs data across devices instantly. Share link allows others to view your resume."
          : "Generate a magic link to continue editing on another device, or share a view-only link with recruiters."}
      </Typography>

      {/* Additional info for tablets and desktops */}
      {(isTablet || variant === 'desktop') && (
        <Box sx={{ mt: 2, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.7rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            <Sparkles size={12} />
            Magic Link: Edit & Sync
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.7rem',
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            <Download size={12} />
            Download: PDF Format
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PreviewActions;