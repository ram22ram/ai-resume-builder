import React from 'react';
import { Box } from '@mui/material';

interface Props {
  layout: 'simple' | 'sidebar' | 'modern' | 'executive' | 'code';
  color?: string;
  isActive?: boolean;
}

const DummyText = ({ width, mb = 0.5 }: { width: string | number; mb?: number }) => (
  <Box sx={{ height: 2, bgcolor: 'currentColor', opacity: 0.4, width, mb, borderRadius: 1 }} />
);

const SectionBlock = () => (
    <Box sx={{ mb: 1 }}>
        <Box sx={{ height: 3, width: '40%', bgcolor: 'currentColor', opacity: 0.7, mb: 0.5 }} />
        <DummyText width="100%" />
        <DummyText width="90%" />
        <DummyText width="60%" />
    </Box>
);

const MiniResumePreview: React.FC<Props> = ({ layout, color = '#666', isActive }) => {
  const bg = isActive ? '#fff' : '#ffffff';
  const fg = '#1e293b'; // Slate 800
  const accent = isActive ? '#3b82f6' : color;

  const commonStyles = {
    width: '100%',
    height: '100%',
    bgcolor: bg,
    overflow: 'hidden',
    position: 'relative' as const,
    color: fg,
    p: 1.5,
    borderRadius: '2px', // Slight radius for card feel inside the paper
  };

  // --- SIMPLE / CLASSIC ---
  if (layout === 'simple') {
    return (
      <Box sx={commonStyles}>
         <Box sx={{ textAlign: 'center', mb: 1.5 }}>
            <Box sx={{ height: 6, width: '50%', bgcolor: 'currentColor', mx: 'auto', mb: 0.5, fontWeight: 'bold' }} />
            <Box sx={{ height: 2, width: '30%', bgcolor: 'currentColor', mx: 'auto', opacity: 0.6 }} />
         </Box>
         <SectionBlock />
         <SectionBlock />
         <SectionBlock />
      </Box>
    );
  }

  // --- EXECUTIVE (Serif, Traditional) ---
  if (layout === 'executive') {
    return (
      <Box sx={commonStyles}>
         <Box sx={{ borderBottom: `1px solid ${accent}`, pb: 0.5, mb: 1 }}>
            <Box sx={{ height: 7, width: '60%', bgcolor: 'currentColor', mb: 0.5, fontFamily: 'serif' }} />
         </Box>
         <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
             <Box>
                 <SectionBlock />
                 <SectionBlock />
             </Box>
             <Box>
                 <SectionBlock />
                 <SectionBlock />
             </Box>
         </Box>
      </Box>
    );
  }

  // --- SIDEBAR ---
  if (layout === 'sidebar') {
    return (
      <Box sx={{ ...commonStyles, display: 'flex', p: 0 }}>
        {/* Sidebar */}
        <Box sx={{ width: '30%', bgcolor: accent, height: '100%', p: 0.5, color: '#fff' }}>
             <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.4)', mx: 'auto', mb: 1 }} />
             <Box sx={{ height: 2, width: '80%', bgcolor: 'white', opacity: 0.5, mx: 'auto', mb: 2 }} />
             
             {[1,2,3].map(i => (
                 <Box key={i} sx={{ mb: 1 }}>
                     <Box sx={{ height: 2, width: '40%', bgcolor: 'white', opacity: 0.8, mb: 0.2 }} />
                     <Box sx={{ height: 1.5, width: '90%', bgcolor: 'white', opacity: 0.4 }} />
                 </Box>
             ))}
        </Box>
        {/* Main Content */}
        <Box sx={{ width: '70%', p: 1 }}>
            <Box sx={{ height: 5, width: '60%', bgcolor: 'currentColor', mb: 1 }} />
            <SectionBlock />
            <SectionBlock />
            <SectionBlock />
        </Box>
      </Box>
    );
  }

  // --- MODERN ---
  if (layout === 'modern') {
    return (
      <Box sx={commonStyles}>
         <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
             <Box sx={{ width: 24, height: 24, bgcolor: accent, borderRadius: 1, mr: 1 }} />
             <Box>
                 <Box sx={{ height: 5, width: 60, bgcolor: 'currentColor', mb: 0.5 }} />
                 <Box sx={{ height: 2, width: 40, bgcolor: accent }} />
             </Box>
         </Box>
         <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 1 }}>
             <Box>
                 <SectionBlock />
                 <SectionBlock />
             </Box>
             <Box sx={{ bgcolor: '#f1f5f9', p: 0.5, borderRadius: 0.5 }}>
                 <SectionBlock />
                 <SectionBlock />
             </Box>
         </Box>
      </Box>
    );
  }

  // --- CODE / TECH ---
  if (layout === 'code') {
     return (
       <Box sx={{ ...commonStyles, bgcolor: '#0f172a', color: '#e2e8f0' }}>
          <Box sx={{ borderLeft: `2px solid ${accent}`, pl: 1, mb: 1.5 }}>
              <Box sx={{ height: 5, width: '50%', bgcolor: accent, opacity: 0.9, mb: 0.5 }} />
              <Box sx={{ height: 2, width: '30%', bgcolor: '#94a3b8' }} />
          </Box>
          <Box sx={{ fontFamily: 'monospace', fontSize: 3 }}>
              <Box sx={{ display: 'flex', gap: 0.5, mb: 0.5, color: accent }}>
                  <span>const</span> <span>profile</span> =
              </Box>
              <Box sx={{ pl: 1, color: '#94a3b8' }}>
                  <SectionBlock />
              </Box>
              <Box sx={{ mt: 1, color: accent }}>{'}'}</Box>
          </Box>
       </Box>
     );
  }

  return <Box sx={{ width: '100%', height: '100%', bgcolor: '#eee' }} />;
};

export default MiniResumePreview;
