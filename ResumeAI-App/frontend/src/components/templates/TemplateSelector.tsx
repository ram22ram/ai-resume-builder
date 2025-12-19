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
  data: any;
  theme: any;
  visibleSections: any;
  sectionOrder: any;
  isPreview?: boolean;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templateName,
  data,
  theme,
  visibleSections,
  sectionOrder,
  isPreview = false
}) => {
  
  // Note: Fonts are now loaded globally via main.tsx using @fontsource packages

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
      {(processedTheme) => (
        <Suspense fallback={
          <Box display="flex" justifyContent="center" alignItems="center" height="100%" minHeight="400px">
            <CircularProgress />
          </Box>
        }>
          <SelectedTemplate
            data={data}
            theme={theme}
            visibleSections={visibleSections}
            sectionOrder={sectionOrder}
            isPreview={isPreview}
          />
        </Suspense>
      )}
    </ThemeWrapper>
  );
};

export default TemplateSelector;