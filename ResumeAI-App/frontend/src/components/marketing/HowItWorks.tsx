import React from 'react';
import { Box, Container, Typography, Stack } from '@mui/material';

type Step = {
  num: number;
  title: string;
  desc: string;
  image: string;
};

const steps: Step[] = [
  {
    num: 1,
    title: 'Sign Up',
    desc: 'Login instantly using Google. No forms, no friction.',
    image: '/images/Sign Up.webp',
  },
  {
    num: 2,
    title: 'Optimize',
    desc: 'Use AI-powered tools to optimize your resume for ATS.',
    image: '/images/Optimize.webp',
  },
  {
    num: 3,
    title: 'Download',
    desc: 'Pay only when you download your final resume.',
    image: '/images/Download.webp',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, backgroundColor: '#020617' }}>
      <Container maxWidth="lg">
        {/* SECTION TITLE */}
        <Typography
          variant="h2"
          textAlign="center"
          mb={10}
          sx={{
            color: '#fff',
            fontWeight: 700,
            background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          How It Works
        </Typography>

        {/* STEPS */}
        {steps.map((step, index) => (
          <Stack
            key={step.num}
            direction={{ xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' }}
            spacing={6}
            alignItems="center"
            mb={12}
          >
            {/* IMAGE */}
            <Box
              component="img"
              src={step.image}
              alt={step.title}
              sx={{
                width: { xs: '100%', md: 480 },
                borderRadius: 4,
                boxShadow: '0 25px 80px rgba(124, 58, 237, 0.35)',
                transition: 'all 0.4s ease',
                '&:hover': {
                  transform: 'scale(1.04)',
                },
              }}
            />

            {/* TEXT CONTENT */}
            <Box maxWidth={420}>
              {/* STEP NUMBER */}
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #7C3AED, #EC4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 700,
                  color: '#fff',
                  mb: 3,
                }}
              >
                {step.num}
              </Box>

              {/* TITLE */}
              <Typography
                variant="h5"
                sx={{ color: '#fff', fontWeight: 600, mb: 1.5 }}
              >
                {step.title}
              </Typography>

              {/* DESCRIPTION */}
              <Typography sx={{ color: '#94A3B8', fontSize: 16 }}>
                {step.desc}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Container>
    </Box>
  );
};

export default HowItWorks;
