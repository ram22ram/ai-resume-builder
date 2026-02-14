import React from 'react';
import { getTemplateComponent } from '../../templates/TemplateRegistry';
import { ResumeData } from '../../types/resume';
import { normalizeResumeData } from '../../utils/normalizeResumeData';

interface Props {
  data: ResumeData;
  templateId: string;
}

const ResumeRenderer: React.FC<Props> = ({ data, templateId }) => {
  const TemplateComponent = getTemplateComponent(templateId);

  const normalizedData = React.useMemo(() => {
    return normalizeResumeData(data);
  }, [data]);

  return <TemplateComponent data={normalizedData} />;
};

export default ResumeRenderer;
