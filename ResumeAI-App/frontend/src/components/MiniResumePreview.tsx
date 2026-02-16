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

// A4 Dimensions (Standard at 96 DPI)
// 210mm = ~793.7px. We use a slightly smaller value (793) to force a tiny overscale,
// ensuring the content strictly fills the container without sub-pixel gaps.
const A4_WIDTH = 793; 
const A4_HEIGHT = 1123;

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
            const parentWidth = containerRef.current.getBoundingClientRect().width; // More precise than clientWidth
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
            bgcolor: 'white', // Changed to white to blend with paper
            display: 'block', // Changed from flex to block for absolute positioning behavior
            position: 'relative',
            userSelect: 'none'
        }}
    >
        {/* Scaled Container */}
        <Box sx={{
            width: A4_WIDTH,
            minHeight: A4_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: 'top left', // Scale from top-left to ensure it fills from edge
            bgcolor: 'white',
            boxShadow: 'none', // Remove shadow inside preview to flat look
            overflow: 'hidden', 
            pointerEvents: 'none',
        }}>
            <TemplateComponent data={resumeData} />
        </Box>
    </Box>
  );
};

export default MiniResumePreview;
