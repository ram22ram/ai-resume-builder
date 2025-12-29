import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Router link for navigation
import GoogleIcon from '@mui/icons-material/Google'; // Google icon for better UX

const FinalCTA: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 14,
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      {/* BACKGROUND IMAGE WITH SMOOTH OVERLAY */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/final-cta.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* GRADIENT OVERLAY - Better than simple solid color */}
      <Box 
        sx={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to bottom, rgba(2,6,23,0.7), rgba(2,6,23,0.9))',
          zIndex: 1 
        }} 
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Typography
          variant="h2"
          fontWeight={700}
          mb={3}
          sx={{ 
            color: 'white',
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            letterSpacing: '-0.02em'
          }}
        >
          Start Your Career Journey Today
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ color: '#cbd5e1', mb: 6, fontWeight: 400, opacity: 0.9 }}
        >
          Join thousands of professionals getting more interview calls with AI-powered resumes.
        </Typography>

       <Stack spacing={2} alignItems="center">
  {/* The "Power" Action Button */}
  <Button 
    component={RouterLink}
    to="/builder"
    variant="contained"
    sx={{
      background: 'white', // Bright contrast against dark bg
      color: 'black',
      fontWeight: 800,
      px: { xs: 6, md: 10 },
      py: 2.5,
      borderRadius: '50px', // Capsule shape
      fontSize: '1.2rem',
      textTransform: 'none',
      boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      '&:hover': { 
        background: '#fff',
        transform: 'scale(1.05)',
        boxShadow: '0 0 35px rgba(124, 58, 237, 0.6)', // Purple glow on hover
      }
    }}
  >
    Build My Resume Now — It's Free
  </Button>

  {/* Privacy Trust Message */}
  <Typography 
    variant="caption" 
    sx={{ 
      color: '#94a3b8', 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      fontSize: '0.9rem'
    }}
  >
    <span style={{ color: '#10B981' }}>●</span> No Database, 100% Private. We don't store your data.
  </Typography>

  {/* Subtle Pricing Link */}
  <Typography 
    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
    sx={{ 
      color: '#475569', 
      cursor: 'pointer', 
      fontSize: '0.85rem',
      mt: 1,
      '&:hover': { color: '#94a3b8', textDecoration: 'underline' }
    }}
  >
    View Pricing Details
  </Typography>
</Stack>
      </Container>
    </Box>
  );
};

export default FinalCTA;