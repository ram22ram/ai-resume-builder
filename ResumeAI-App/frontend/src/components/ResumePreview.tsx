import React, { forwardRef } from 'react';

const ResumePreview = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        id="resume-preview"
        style={{
          width: '210mm',
          minHeight: '297mm',
          background: '#ffffff',
          padding: '20mm',
          boxSizing: 'border-box',
          color: '#000',
          fontFamily: 'Inter, Arial, sans-serif',
        }}
      >
        {children}
      </div>
    );
  }
);

export default ResumePreview;
