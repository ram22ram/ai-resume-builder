import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import Lottie from 'lottie-react';

// Import JSON files directly
import resumeAnim from '../../../public/icons/resume.json';
import micAnim from '../../../public/icons/mic.json';
import githubAnim from '../../../public/icons/github.json';
import shieldAnim from '../../../public/icons/shield.json';

const services = [
  { 
    title: 'AI Resume Builder', 
    desc: 'Generate ATS-optimized resume content.', 
    animation: resumeAnim  // Use imported object
  },
  { 
    title: 'AI Interview', 
    desc: 'Practice interviews with AI voice.', 
    animation: micAnim
  },
  { 
    title: 'GitHub to Resume', 
    desc: 'Convert projects into impact bullets.', 
    animation: githubAnim
  },
  { 
    title: 'ATS Optimization', 
    desc: 'High compatibility with top ATS.', 
    animation: shieldAnim
  },
];

const Services: React.FC = () => {
  return (
    <Box sx={{ py: 12, bgcolor: '#0f172a' }}>
      <Container>
        <Typography variant="h3" textAlign="center" mb={6} sx={{ color: 'white', fontWeight: 'bold' }}>
          Complete AI Career Toolkit
        </Typography>

        <Grid container spacing={4}>
          {services.map((s) => (
            <Grid  size={{ xs: 12, sm:6, md:3 }}  key={s.title}>
              <Box
                sx={{
                  bgcolor: '#020617',
                  p: 4,
                  borderRadius: '24px',
                  border: '1px solid #1e293b',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    borderColor: '#7C3AED', 
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 30px -10px rgba(124, 58, 237, 0.3)'
                  },
                }}
              >
                <Box sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}>
                  <Lottie
                    animationData={s.animation}
                    loop={true}
                    autoplay={true}
                    style={{ height: 120 }}
                  />
                </Box>
                <Typography variant="h6" mb={1} color="white">{s.title}</Typography>
                <Typography variant="body2" color="#94a3b8">{s.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;