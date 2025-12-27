import React from 'react';
import { Box, Typography, Button, Container, Stack, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const Hero: React.FC = () => {
  return (
    <Box 
      sx={{ 
        pt: { xs: 15, md: 20 }, 
        pb: { xs: 10, md: 15 }, 
        textAlign: 'center',
        position: 'relative',
        background: 'radial-gradient(circle at 50% -20%, rgba(124, 58, 237, 0.15) 0%, rgba(2, 6, 23, 0) 50%)',
      }}
    >
      <Container maxWidth="lg">
        {/* Feature Announcement - Connects to GitHub feature specifically */}
        <Chip 
          component={RouterLink}
          to="/github"
          icon={<AutoAwesomeIcon sx={{ fontSize: '1rem !important', color: '#A855F7' }} />}
          label="New: GitHub to Resume AI is now live" 
          clickable
          sx={{ 
            bgcolor: 'rgba(124, 58, 237, 0.1)', 
            color: '#A855F7', 
            mb: 4, 
            border: '1px solid rgba(124, 58, 237, 0.3)',
            fontWeight: 500,
            backdropFilter: 'blur(10px)',
            '&:hover': { bgcolor: 'rgba(124, 58, 237, 0.2)' }
          }} 
        />

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.8rem', md: '4.5rem' },
            fontWeight: 800,
            lineHeight: 1.1,
            mb: 3,
            color: '#fff'
          }}
        >
          Get Shortlisted <span style={{ 
            background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Faster.</span> <br />
          Crack Interviews With Confidence.
        </Typography>

        <Typography 
          sx={{ 
            color: '#94a3b8', 
            maxWidth: 650, 
            mx: 'auto', 
            mb: 6, 
            fontSize: { xs: '1rem', md: '1.25rem' }
          }}
        >
          AI-powered ecosystem for developers. Generate <b>ATS-ready resumes</b> from GitHub, practice with <b>AI mock interviews</b>, and land your dream job.
        </Typography>

        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={2} 
          justifyContent="center"
          alignItems="center"
        >
          {/* Primary Action: Goes to Resume Builder */}
          <Button 
            component={RouterLink}
            to="/builder"
            variant="contained" 
            sx={{ 
              bgcolor: '#7C3AED', 
              px: 6, 
              py: 2, 
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.4)',
              '&:hover': { bgcolor: '#6D28D9', transform: 'scale(1.05)' },
              transition: '0.2s'
            }}
          >
            Start Building for Free
          </Button>
          
          {/* Secondary Action: Scrolls to Features or goes to Templates */}
          <Button 
            component={RouterLink}
            to="/templates"
            variant="outlined" 
            startIcon={<PlayCircleOutlineIcon />}
            sx={{ 
              borderColor: '#334155', 
              color: '#fff', 
              px: 5, 
              py: 2,
              borderRadius: '50px',
              fontSize: '1.1rem',
              textTransform: 'none',
              '&:hover': { borderColor: '#7C3AED', bgcolor: 'rgba(124, 58, 237, 0.05)' }
            }}
          >
            Explore Templates
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;