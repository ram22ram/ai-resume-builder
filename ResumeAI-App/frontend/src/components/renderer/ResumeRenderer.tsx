import React from 'react';
import { ResumeData } from '../../types/resume';
import TemplateRenderer from '../TemplateRenderer';

interface Props {
    data: ResumeData;
    template?: string; // Optional because legacy usage might not pass it, but BuilderPage does.
}

const ResumeRenderer: React.FC<Props> = ({ data, template }) => {
    // Fallback to data.templateId if prop not passed
    const activeTemplate = template || data.templateId || 'simple_clean';
    
    return <TemplateRenderer template={activeTemplate} data={data} />;
};

export default ResumeRenderer;
