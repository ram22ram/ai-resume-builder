import React from 'react';
import { getTemplateComponent } from '../../templates/TemplateRegistry';
import { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
  templateId: string;
}

const ResumeRenderer: React.FC<Props> = ({ data, templateId }) => {
  const TemplateComponent = getTemplateComponent(templateId);
  
  // COMPATIBILITY LAYER: Inject fullName if missing (for legacy templates)
  const processedData = React.useMemo(() => {
    return {
      ...data,
      sections: data.sections.map(section => {
        if (section.id === 'personal' || section.type === 'personal') {
          return {
            ...section,
            items: section.items.map(item => ({
              ...item,
              fullName: item.fullName || `${item.firstName || ''} ${item.lastName || ''}`.trim()
            }))
          };
        }
        return section;
      })
    };
  }, [data]);

  return <TemplateComponent data={processedData} />;
};

export default ResumeRenderer;
