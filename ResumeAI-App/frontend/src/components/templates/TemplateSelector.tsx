import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import ThemeWrapper from './ThemeWrapper';

const TemplateModern = React.lazy(() => import('./TemplateModern'));
const TemplateClassic = React.lazy(() => import('./TemplateClassic'));
const TemplateSwiss = React.lazy(() => import('./TemplateSwiss'));

const templates: any = {
  modern: TemplateModern,
  classic: TemplateClassic,
  swiss: TemplateSwiss,
};

const TemplateSelector = ({ templateName, data, theme }: any) => {
  const Template = templates[templateName] || TemplateModern;

  return (
    <ThemeWrapper theme={theme}>
      {() => (
        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" mt={5}>
              <CircularProgress />
            </Box>
          }
        >
          <Template data={data} theme={theme} />
        </Suspense>
      )}
    </ThemeWrapper>
  );
};

export default TemplateSelector;
