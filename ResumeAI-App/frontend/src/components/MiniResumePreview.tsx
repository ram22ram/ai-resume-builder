import React from 'react';
import { Box } from '@mui/material';

interface Props {
  layout: 'simple' | 'sidebar' | 'modern' | 'executive' | 'code';
  color?: string;
  isActive?: boolean;
}

const MiniResumePreview: React.FC<Props> = ({ layout, color = '#666', isActive }) => {
  const bg = isActive ? '#fff' : '#f9f9f9';
  const fg = isActive ? '#e0e0e0' : '#e5e5e5';
  const accent = isActive ? '#3b82f6' : color;

  // Simple / Standard
  if (layout === 'simple' || layout === 'executive') {
    return (
      <Box sx={{ width: '100%', height: '100%', bgcolor: bg, p: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        {/* Header Center */}
        <Box sx={{ width: '60%', height: 4, bgcolor: layout === 'executive' ? 'transparent' : fg, mx: 'auto', borderBottom: layout === 'executive' ? `1px solid ${accent}` : 'none' }} />
        <Box sx={{ width: '40%', height: 2, bgcolor: fg, mx: 'auto', mb: 1 }} />
        
        {/* Lines */}
        {[1, 2, 3].map((i) => (
          <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
            <Box sx={{ width: '100%', height: 3, bgcolor: fg }} />
            <Box sx={{ width: '90%', height: 2, bgcolor: fg }} />
          </Box>
        ))}
      </Box>
    );
  }

  // Sidebar
  if (layout === 'sidebar') {
    return (
      <Box sx={{ width: '100%', height: '100%', bgcolor: bg, display: 'flex' }}>
        {/* Sidebar */}
        <Box sx={{ width: '30%', height: '100%', bgcolor: accent, opacity: 0.2 }} />
        {/* Main */}
        <Box sx={{ width: '70%', height: '100%', p: 1, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ width: '80%', height: 4, bgcolor: fg }} />
          {[1, 2, 3].map((i) => (
             <Box key={i} sx={{ width: '100%', height: 3, bgcolor: fg, mt: 0.5 }} />
          ))}
        </Box>
      </Box>
    );
  }

  // Modern / Code
  if (layout === 'modern' || layout === 'code') {
    return (
      <Box sx={{ width: '100%', height: '100%', bgcolor: layout === 'code' ? '#1a202c' : bg, p: 1 }}>
         {/* Modern Header */}
         <Box sx={{ width: '100%', height: 8, bgcolor: accent, opacity: 0.3, mb: 1, borderRadius: 0.5 }} />
         
         <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.5 }}>
             <Box sx={{ height: 20, bgcolor: fg, opacity: layout === 'code' ? 0.3 : 1 }} />
             <Box sx={{ height: 20, bgcolor: fg, opacity: layout === 'code' ? 0.3 : 1 }} />
         </Box>
      </Box>
    );
  }

  return <Box sx={{ width: '100%', height: '100%', bgcolor: '#eee' }} />;
};

export default MiniResumePreview;
