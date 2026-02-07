import React from 'react';
import { ResumeData } from '../../types/resume';
import { getTemplateComponent } from '../../templates/TemplateRegistry.ts';

interface Props {
    data: ResumeData;
    template?: string; // Optional because legacy usage might not pass it, but BuilderPage does.
}

const ResumeRenderer: React.FC<Props> = ({ data, template }) => {
    // Fallback to data.templateId if prop not passed
    const activeTemplateId = template || data.templateId || 'simple_clean';
    
    // STRICT REGISTRY LOOKUP
    const TemplateComponent = getTemplateComponent(activeTemplateId);

    return <TemplateComponent data={data} />;
};

export default ResumeRenderer;
