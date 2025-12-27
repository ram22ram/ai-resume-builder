import React from 'react';
import { Box, Container, Link, Button, Stack } from '@mui/material';

const Header: React.FC = () => {
  const navLinks = [
    { name: 'Features', href: '#services' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Results', href: '#success' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Privacy', href: '#trust' },
  ];

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        width: '100%',
        bgcolor: 'rgba(2, 6, 23, 0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        py: 2.5,
        borderBottom: '1px solid rgba(51, 65, 85, 0.2)',
      }}
    >
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textDecoration: 'none' }}>
          <Box sx={{
            width: 40, height: 40, borderRadius: '10px',
            background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 800, fontSize: '1.2rem'
          }}>AI</Box>
          <Box component="span" sx={{ fontSize: '1.875rem', fontWeight: 700, color: '#7C3AED' }}>Resume-AI</Box>
        </Link>

        <Stack direction="row" spacing={5} component="ul" sx={{ listStyle: 'none', display: { xs: 'none', md: 'flex' } }}>
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} sx={{ color: '#cbd5e1', textDecoration: 'none', fontWeight: 500, '&:hover': { color: '#f8fafc' } }}>
                {link.name}
              </Link>
            </li>
          ))}
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button variant="text" sx={{ color: '#f8fafc', textTransform: 'none', fontWeight: 600 }}>Sign In</Button>
          <Button variant="contained" sx={{ bgcolor: '#7C3AED', borderRadius: '8px', textTransform: 'none', fontWeight: 600, px: 3 }}>
            Get Started Free
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;