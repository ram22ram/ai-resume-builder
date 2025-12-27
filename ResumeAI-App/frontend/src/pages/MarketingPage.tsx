import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Layout from '../components/Layout';

import HeroCarousel from '../components/marketing/HeroCarousel';
import Hero from '../components/marketing/Hero';
import Services from '../components/marketing/Services';
import HowItWorks from '../components/marketing/HowItWorks';
import Results from '../components/marketing/Results';
import Pricing from '../components/marketing/Pricing';
import Trust from '../components/marketing/Trust';
import FinalCTA from '../components/marketing/FinalCTA';

const theme = createTheme({
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#020617',
      paper: '#0f172a',
    },
  },
});

const MarketingPage: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: '#020617', color: '#f8fafc', overflowX: 'hidden' }}>
        <Layout>
          <HeroCarousel />
          <Hero />
          <Services />
          <HowItWorks />
          <Results />
          <Pricing />
          <Trust />
          <FinalCTA />
        </Layout>
      </Box>
    </ThemeProvider>
  );
};

export default MarketingPage;
