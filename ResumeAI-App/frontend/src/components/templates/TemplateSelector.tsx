import React, { Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';
import ThemeWrapper from './ThemeWrapper';

// Lazy load all templates
const TemplateModern = React.lazy(() => import('./TemplateModern'));
const TemplateClassic = React.lazy(() => import('./TemplateClassic'));
const TemplateCorporate = React.lazy(() => import('./TemplateCorporate'));
const TemplateEileen = React.lazy(() => import('./TemplateEileen'));
const TemplateElena = React.lazy(() => import('./TemplateElena'));
const TemplateFred = React.lazy(() => import('./TemplateFred'));
const TemplateHarvey = React.lazy(() => import('./TemplateHarvey'));
const TemplateKristy = React.lazy(() => import('./TemplateKristy'));
const TemplateSwiss = React.lazy(() => import('./TemplateSwiss'));

interface TemplateSelectorProps {
  templateName: string;
  data: any; // Now contains { sections: [], theme: {} }
  theme: any;
  isPreview?: boolean;
  scale?: number;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templateName,
  data,
  theme,
  isPreview = false
}) => {
  
  const getTemplateComponent = () => {
    const templateLower = templateName?.toLowerCase() || 'modern';
    
    switch (templateLower) {
      case 'modern': return TemplateModern;
      case 'classic': return TemplateClassic;
      case 'corporate': return TemplateCorporate;
      case 'eileen': return TemplateEileen;
      case 'elena': return TemplateElena;
      case 'fred': return TemplateFred;
      case 'harvey': return TemplateHarvey;
      case 'kristy': return TemplateKristy;
      case 'swiss': return TemplateSwiss;
      default: return TemplateModern;
    }
  };

  const SelectedTemplate = getTemplateComponent();

  return (
    <ThemeWrapper theme={theme}>
      {() => (
        <Suspense fallback={
          <Box display="flex" justifyContent="center" alignItems="center" height="100%" minHeight="400px">
            <CircularProgress color="primary" />
          </Box>
        }>
          {/* LEGO FIX: Humne visibleSections aur sectionOrder props ko remove kar diya hai 
              kyunki TemplateModern ab seedha 'data.sections' array ko map karta hai.
          */}
          <SelectedTemplate
            data={data}
            theme={theme}
            isPreview={isPreview}
          />
        </Suspense>
      )}
    </ThemeWrapper>
  );
};

export default TemplateSelector;