import React from 'react';
import { Box, Typography } from '@mui/material';

const TemplatePreviewCard = ({ templateId, color }) => {
  // Different preview designs for different templates
  const getPreviewDesign = (id) => {
    switch(id) {
      case 'modern':
        return (
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ width: '60%', height: 12, bgcolor: 'rgba(255,255,255,0.8)', borderRadius: 2 }} />
              <Box sx={{ width: '30%', height: 12, bgcolor: 'rgba(255,255,255,0.5)', borderRadius: 2 }} />
            </Box>
            <Box sx={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
              <Box sx={{ bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
            </Box>
          </Box>
        );
      case 'classic':
        return (
          <Box sx={{ height: '100%', p: 2 }}>
            <Box sx={{ width: '40%', height: 16, bgcolor: 'rgba(255,255,255,0.9)', borderRadius: 2, mb: 2 }} />
            <Box sx={{ height: 8, width: '80%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: 2, mb: 1 }} />
            <Box sx={{ height: 8, width: '70%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: 2, mb: 1 }} />
            <Box sx={{ height: 8, width: '60%', bgcolor: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
          </Box>
        );
      case 'swiss':
        return (
          <Box sx={{ height: '100%', display: 'flex', p: 2 }}>
            <Box sx={{ width: '30%', mr: 1, bgcolor: 'rgba(255,255,255,0.4)', borderRadius: 1 }} />
            <Box sx={{ flex: 1 }}>
              <Box sx={{ height: 10, width: '100%', bgcolor: 'rgba(255,255,255,0.7)', borderRadius: 2, mb: 1 }} />
              <Box sx={{ height: 10, width: '80%', bgcolor: 'rgba(255,255,255,0.5)', borderRadius: 2, mb: 1 }} />
            </Box>
          </Box>
        );
      default:
        return (
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
              {templateId.charAt(0).toUpperCase() + templateId.slice(1)}
            </Typography>
          </Box>
        );
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        bgcolor: color,
        borderRadius: '12px',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
        border: '2px solid rgba(255,255,255,0.2)'
      }}
    >
      {getPreviewDesign(templateId)}
    </Box>
  );
};

export default TemplatePreviewCard;