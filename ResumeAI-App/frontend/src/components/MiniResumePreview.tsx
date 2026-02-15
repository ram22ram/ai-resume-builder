import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { getTemplateComponent } from '../templates/TemplateRegistry';
import { ResumeData } from '../types/resume';
import { PREVIEW_RESUME } from '../data/previewResume';

interface Props {
  templateId: string;
  scale?: number;
  fitContainer?: boolean;
  data?: ResumeData;
}

// A4 Dimensions (Standard)
const A4_WIDTH = 595; // px (at 72 DPI approx)
const A4_HEIGHT = 842;

const MiniResumePreview: React.FC<Props> = ({ 
    templateId, 
    scale: initialScale = 0.4, 
    fitContainer = false,
    data: customData 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(initialScale);

  // Auto-scale logic
  useEffect(() => {
    if (!fitContainer || !containerRef.current) return;

    const updateScale = () => {
        if (containerRef.current) {
            const parentWidth = containerRef.current.offsetWidth;
            // Add a small buffer/padding calculation if needed, 
            // but usually direct ratio is best for "fit width"
            const newScale = parentWidth / A4_WIDTH;
            setScale(newScale);
        }
    };

    // Initial calculation
    updateScale();

    const resizeObserver = new ResizeObserver(() => {
        updateScale();
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [fitContainer]);

  // Memoize the data to prevent unnecessary re-renders
  const resumeData = useMemo(() => {
     // Use custom data if provided, otherwise use the rich PREVIEW_RESUME
     const baseData = customData || PREVIEW_RESUME;
     
     return { 
         ...baseData, 
         templateId,
         // Ensure metadata matches template defaults if they exist in baseData, 
         // though usually the renderer handles font/color. 
         // If we want to enforce template defaults here we could, 
         // but the TemplateRegistry usually handles defaults if metadata is missing.
         // For preview, we might want to override font/color from the template definition 
         // but PREVIEW_RESUME has its own. Let's keep PREVIEW_RESUME as is for consistency.
     }; 
  }, [templateId, customData]);

  // Get the specific component for this template
  let TemplateComponent;
  try {
      TemplateComponent = getTemplateComponent(templateId);
  } catch (e) {
      console.error(`Preview failed for template: ${templateId}`, e);
      return <Box sx={{ width: '100%', height: '100%', bgcolor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>Error</Box>;
  }

  return (
    <Box 
        ref={containerRef}
        sx={{ 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden',
            bgcolor: '#e5e7eb', // Slightly darker bg for contrast
            display: 'flex',
            alignItems: 'start', // Align start so top of resume is visible
            justifyContent: 'center',
            position: 'relative',
            userSelect: 'none'
        }}
    >
        {/* Scaled Container */}
        <Box sx={{
            width: A4_WIDTH,
            height: A4_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top center', // Scale from top center
            bgcolor: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            overflow: 'hidden', 
            pointerEvents: 'none',
            // If we are fitting container, we might want a margin top if it scales down a lot, 
            // but usually filling the card is the goal.
        }}>
            <TemplateComponent data={resumeData} />
        </Box>
    </Box>
  );
};

export default MiniResumePreview;
