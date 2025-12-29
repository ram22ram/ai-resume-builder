import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

/**
 * TRUST & SECURITY ICONS
 * Size: 128x128 (but we'll display at 60x60 for better UI)
 * 
 * Image file locations:
 * - Data privacy shield: /icons/trust/data-privacy.svg
 * - Secure lock: /icons/trust/secure-lock.svg
 * - No tracking: /icons/trust/no-tracking.svg
 * - Google OAuth: /icons/trust/google-oauth.svg
 */

const trustItems = [
  { 
    title: 'Zero Data Storage', 
    desc: 'We do not store your resume data.',
    icon: '/images/Trust-1.webp',
    color: '#10B981' // Green for data privacy
  },
  { 
    title: 'No Tracking', 
    desc: 'No cookies or analytics tracking.',
    icon: '/images/Trust-2.webp',
    color: '#EF4444' // Red for prohibition
  },
  { 
    title: 'Google OAuth', 
    desc: 'Secure login using Google.',
    icon: '/images/Trust-3.webp',
    color: '#4285F4' // Google blue
  },
  { 
    title: 'Secure Payments', 
    desc: 'Razorpay protected with guarantee.',
    icon: '/images/Trust-4.webp',
    color: '#7C3AED' // Brand purple
  },
];

const Trust: React.FC = () => {
  return (
    <Box component="section" id="trust" sx={{ py: 12, bgcolor: '#0f172a' }}>
      <Container>
        <Box textAlign="center" mb={8}>
          <Typography variant="h2" fontWeight={600} mb={2} color="white">
            Privacy & Security First
          </Typography>
          <Typography color="#cbd5e1">
            Built with maximum privacy and trust.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {trustItems.map((item) => (
            <Grid  size={{ xs: 12, sm:6, md:3 }}  key={item.title}>
              <Box
                sx={{
                  bgcolor: '#020617',
                  p: 5,
                  borderRadius: '20px',
                  border: '1px solid #334155',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { 
                    borderColor: item.color, 
                    transform: 'translateY(-8px)',
                    boxShadow: `0 15px 30px rgba(${parseInt(item.color.slice(1,3), 16)}, ${parseInt(item.color.slice(3,5), 16)}, ${parseInt(item.color.slice(5,7), 16)}, 0.15)`
                  },
                }}
              >
                {/* ICON REPLACING THE PLACEHOLDER */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    mx: 'auto',
                    mb: 3,
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: `${item.color}15`, // 15 = 8% opacity
                    border: `1px solid ${item.color}30`, // 30 = 18% opacity
                    transition: 'all 0.3s ease',
                  }}
                >
                  <img 
                    src={item.icon}
                    alt={item.title}
                    style={{
                      width: '48px',
                      height: '48px',
                      filter: `drop-shadow(0 4px 8px ${item.color}40)`
                    }}
                  />
                </Box>

                <Typography variant="h6" mb={1} color="white">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="#94a3b8">
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Trust;