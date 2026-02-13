import React from 'react';
import { getTemplateComponent } from '../../templates/TemplateRegistry';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
  templateId: string;
}

const ResumeRenderer: React.FC<Props> = ({ data, templateId }) => {
  const TemplateComponent = getTemplateComponent(templateId);
  return <TemplateComponent data={data} />;
};

export default ResumeRenderer;
