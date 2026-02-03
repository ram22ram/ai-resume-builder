import React from 'react';
import { ResumeData } from '../types';
import { getTemplateComponent } from './TemplateResolver';
import './resume-a4.css';

interface Props {
  resumeData: ResumeData;
  templateId: string;
}

const ResumeRenderer: React.FC<Props> = ({ resumeData, templateId }) => {
  const Template = getTemplateComponent(templateId);

  return (
    <div className="resume-a4-wrapper">
      <div className="resume-a4">
        <Template data={resumeData} />
      </div>
    </div>
  );
};

export default ResumeRenderer;
