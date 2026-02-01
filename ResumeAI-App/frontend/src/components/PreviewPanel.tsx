import React, { forwardRef } from 'react';
import TemplateSelector from './templates/TemplateSelector';
import { ResumeData } from '../types';

interface PreviewPanelProps {
  resumeData: ResumeData;
  selectedTemplate?: string;
}

const PreviewPanel = forwardRef<HTMLDivElement, PreviewPanelProps>(
  ({ resumeData, selectedTemplate }, ref) => {
    if (!resumeData) return null;

    return (
      <div
        ref={ref}
        style={{ width: '100%', minHeight: '100%', background: '#fff' }}
      >
        <TemplateSelector
          templateName={selectedTemplate || 'modern'}
          data={resumeData}
          theme={resumeData.theme}
        />
      </div>
    );
  }
);

export default PreviewPanel;
