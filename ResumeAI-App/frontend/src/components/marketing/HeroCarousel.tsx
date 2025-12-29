import React, { useEffect, useState } from 'react';
import { Box, IconButton, Stack, Typography, Button, Container } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * HERO CAROUSEL WITH TEXT OVERLAYS
 * Each slide has unique selling proposition text
 */

const slides = [
  {
    image: '/images/hero-1.webp',
    title: 'AI-Powered Resume Builder',
    subtitle: 'Create ATS-optimized resumes in minutes',
    features: ['95% ATS Success Rate', 'AI Content Suggestions', 'Professional Templates'],
    ctaText: 'Build Your Resume',
    ctaLink: '/builder',
    color: '#7C3AED'
  },
  {
    image: '/images/hero-2.webp',
    title: 'AI Interviews',
    subtitle: 'Practice with AI interview coach',
    features: ['Real-time Feedback', '100+ Industry Questions', 'Confidence Score'],
    ctaText: 'Start Practice',
    ctaLink: '/interview',
    color: '#10B981'
  },
  {
    image: '/images/hero-3.webp',
    title: 'GitHub Project Enhancer',
    subtitle: 'Transform project data into impressive resume points',
    features: ['Smart Bullet Generation', 'Impact Quantification', 'Technical Skills Highlight'],
    ctaText: 'Enhance My Projects',
    ctaLink: '/github',
    color: '#3B82F6'
  },
//   {
//     image: '/images/hero-4.webp',
//     title: 'Team Collaboration',
//     subtitle: 'Perfect for startups & career coaches',
//     features: ['Team Management', 'Bulk Processing', 'Analytics Dashboard'],
//     ctaText: 'View Plans',
//     ctaLink: '/pricing',
//     color: '#F59E0B'
//   },
  {
    image: '/images/hero-5.webp',
    title: 'ATS Optimization',
    subtitle: 'Beat the resume screening bots',
    features: ['Keyword Optimization', 'Formatting Check', 'Score Improvement'],
    ctaText: 'Check ATS Score',
    ctaLink: '/ats',
    color: '#EF4444'
  },
];

const HeroCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % slides.length);
        setFade(true);
      }, 300);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((index - 1 + slides.length) % slides.length);
      setFade(true);
    }, 300);
  };

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((index + 1) % slides.length);
      setFade(true);
    }, 300);
  };

  return (
    <Box sx={{ position: 'relative', height: { xs: '85vh', md: '90vh' }, minHeight: 600, overflow: 'hidden' }}>
      {/* Background Image with Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${slides[index].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: fade ? 1 : 0.7,
          transition: 'opacity 0.8s ease, transform 8s ease',
          transform: fade ? 'scale(1)' : 'scale(1.05)',
        }}
      />
      
      {/* Gradient Overlay */}
      <Box sx={{ 
        position: 'absolute', 
        inset: 0, 
        background: `linear-gradient(90deg, rgba(2,6,23,0.85) 0%, rgba(2,6,23,0.7) 50%, rgba(2,6,23,0.4) 100%)` 
      }} />
      
      {/* Content Container */}
      <Container sx={{ 
        position: 'relative', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center',
        zIndex: 2
      }}>
        <Box sx={{ 
          maxWidth: { xs: '100%', md: '65%', lg: '50%' },
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.3s'
        }}>
          {/* Badge */}
          <Box sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            bgcolor: `${slides[index].color}20`, 
            color: slides[index].color,
            px: 2, 
            py: 0.5, 
            borderRadius: 20, 
            mb: 3,
            border: `1px solid ${slides[index].color}30`
          }}>
            <CheckCircleIcon sx={{ fontSize: 16, mr: 1 }} />
            <Typography variant="caption" fontWeight={600}>TRUSTED BY 10,000+ PROFESSIONALS</Typography>
          </Box>

          {/* Main Title */}
          <Typography 
            variant="h1" 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              color: 'white',
              mb: 2
            }}
          >
            {slides[index].title}
          </Typography>

          {/* Subtitle */}
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#CBD5E1',
              mb: 4,
              fontSize: { xs: '1.1rem', md: '1.4rem' }
            }}
          >
            {slides[index].subtitle}
          </Typography>

          {/* Features List */}
          <Stack spacing={1} mb={5}>
            {slides[index].features.map((feature, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  width: 20, 
                  height: 20, 
                  borderRadius: '50%', 
                  bgcolor: slides[index].color,
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  mr: 2
                }}>
                  <CheckCircleIcon sx={{ fontSize: 12, color: 'white' }} />
                </Box>
                <Typography variant="body1" color="#E2E8F0">{feature}</Typography>
              </Box>
            ))}
          </Stack>

          {/* CTA Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              href={slides[index].ctaLink}
              sx={{
                bgcolor: slides[index].color,
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: slides[index].color,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 25px ${slides[index].color}50`
                },
                transition: 'all 0.3s ease'
              }}
            >
              {slides[index].ctaText} →
            </Button>
            
            <Button
              variant="outlined"
              href="/templates"
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 2,
                '&:hover': {
                  borderColor: slides[index].color,
                  bgcolor: `${slides[index].color}10`
                }
              }}
            >
              View Templates
            </Button>
          </Box>

          {/* Trust Indicators */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 6, flexWrap: 'wrap', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                bgcolor: '#10B981', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 1
              }}>
                <CheckCircleIcon sx={{ fontSize: 20, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="#94A3B8">30-Day</Typography>
                <Typography variant="body1" color="white" fontWeight={600}>Money Back</Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                bgcolor: '#3B82F6', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 1
              }}>
                <CheckCircleIcon sx={{ fontSize: 20, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="#94A3B8">100%</Typography>
                <Typography variant="body1" color="white" fontWeight={600}>Secure</Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ 
                width: 40, 
                height: 40, 
                borderRadius: '50%', 
                bgcolor: '#8B5CF6', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 1
              }}>
                <CheckCircleIcon sx={{ fontSize: 20, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="body2" color="#94A3B8">4.9/5</Typography>
                <Typography variant="body1" color="white" fontWeight={600}>Rating</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Navigation Arrows */}
      <IconButton
        onClick={handlePrev}
        sx={{ 
          position: 'absolute', 
          left: { xs: 10, md: 40 }, 
          top: '50%', 
          color: '#fff',
          bgcolor: 'rgba(0,0,0,0.3)',
          '&:hover': { bgcolor: slides[index].color },
          width: 56,
          height: 56,
          zIndex: 3
        }}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <IconButton
        onClick={handleNext}
        sx={{ 
          position: 'absolute', 
          right: { xs: 10, md: 40 }, 
          top: '50%', 
          color: '#fff',
          bgcolor: 'rgba(0,0,0,0.3)',
          '&:hover': { bgcolor: slides[index].color },
          width: 56,
          height: 56,
          zIndex: 3
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {/* Dots Indicator */}
      <Stack direction="row" spacing={1}
        sx={{ 
          position: 'absolute', 
          bottom: 40, 
          left: '50%', 
          transform: 'translateX(-50%)',
          zIndex: 3 
        }}>
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => {
              setFade(false);
              setTimeout(() => {
                setIndex(i);
                setFade(true);
              }, 300);
            }}
            sx={{
              width: i === index ? 32 : 10,
              height: 10,
              borderRadius: '10px',
              bgcolor: i === index ? slides[index].color : 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: i === index ? slides[index].color : 'rgba(255,255,255,0.5)'
              }
            }}
          />
        ))}
      </Stack>

      {/* Slide Counter */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 40, 
        right: { xs: 20, md: 60 },
        color: 'rgba(255,255,255,0.7)',
        fontSize: '0.9rem',
        zIndex: 3
      }}>
        {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </Box>

      {/* Scroll Indicator */}
      <Box sx={{ 
        position: 'absolute', 
        bottom: 20, 
        left: '50%', 
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite',
        zIndex: 3
      }}>
        <Box sx={{ 
          width: 24, 
          height: 40, 
          border: '2px solid rgba(255,255,255,0.5)', 
          borderRadius: 12,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: 2
        }}>
          <Box sx={{ 
            width: 4, 
            height: 8, 
            bgcolor: slides[index].color, 
            borderRadius: 2 
          }} />
        </Box>
      </Box>

      {/* Add CSS Animation */}
      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
          40% { transform: translateX(-50%) translateY(-10px); }
          60% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>
    </Box>
  );
};

export default HeroCarousel;