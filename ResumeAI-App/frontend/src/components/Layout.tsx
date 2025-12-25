import React, { useState } from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, Container, Stack, 
  IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  useTheme, useMediaQuery, Avatar, Divider
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, Mic, Github, Mail, Menu as MenuIcon, X, LogOut, LayoutDashboard } from 'lucide-react';
import axios from 'axios'; 

// ✅ CORRECT IMPORT (From 'lenis' package)
import { ReactLenis } from 'lenis/react';

// ✅ IMPORT SEO COMPONENT (Ensure this file exists or remove if not)
// import { SEO } from './SEO'; 

// ✅ AUTH IMPORTS

import { useAuth } from '../context/AuthContext';

// ✅ API URL CONSTANT
 const API_URL = (import.meta as any).env?.VITE_API_URL || 'https://localhost:5000/api';
  // const API_URL = import.meta.env.VITE_API_URL;
// const API_URL = 'https://resumeai-backend.onrender.com/api';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: 'Resume Builder', path: '/builder', icon: <FileText size={18} /> },
  { label: 'ATS Checker', path: '/ats', icon: <FileText size={18} /> },
  { label: 'Mock Interview', path: '/interview', icon: <Mic size={18} /> },
  { label: 'GitHub to CV', path: '/github', icon: <Github size={18} /> },
  { label: 'Cold Email', path: '/email', icon: <Mail size={18} /> },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ AUTH HOOK
  const { user, login, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };



  // ✅ HANDLER: LOGOUT & REDIRECT
  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      
      {/* Global Styles */}
      <style>{`
        html.lenis, html.lenis body { height: auto; }
        .lenis.lenis-smooth { scroll-behavior: auto !important; }
        .lenis.lenis-smooth [data-lenis-prevent] { oversceoll-behavior: contain; }
        .lenis.lenis-stopped { overflow: hidden; }
        .lenis.lenis-scrolling iframe { pointer-events: none; }
        body { font-family: 'Outfit', sans-serif; background-color: #020617; }
        ::selection { background: rgba(59, 130, 246, 0.3); color: white; }
      `}</style>

      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#020617', overflow: 'hidden' }}>
        
        {/* === 1. PREMIUM HEADER === */}
        <AppBar position="sticky" elevation={0} sx={{ 
          bgcolor: 'rgba(2, 6, 23, 0.8)', 
          backdropFilter: 'blur(16px)', 
          borderBottom: '1px solid rgba(255,255,255,0.05)', 
          color: 'white',
          transition: 'all 0.3s ease'
        }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '80px' }}>
              
              {/* Logo */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => navigate(user ? '/dashboard' : '/')}>
                <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 32, height: 32, borderRadius: '8px', objectFit: 'cover' }} />
                <Typography variant="h5" sx={{ fontWeight: '800', color: 'white', letterSpacing: -0.5, fontSize: '1.5rem' }}>
                  Resume<span style={{ background: 'linear-gradient(to right, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI</span>
                </Typography>
              </Box>

              {/* Desktop Navigation & Auth */}
              {!isMobile && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  
                  {/* Nav Links */}
                  <Stack direction="row" spacing={1} sx={{ bgcolor: 'rgba(255,255,255,0.03)', p: 0.5, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {/* Add Dashboard Link if Logged In */}
                    {user && (
                        <Button
                        onClick={() => handleNav('/dashboard')}
                        startIcon={<LayoutDashboard size={18} />}
                        sx={{
                          textTransform: 'none', fontWeight: 600, fontSize: '0.9rem',
                          color: isActive('/dashboard') ? 'white' : '#94a3b8',
                          bgcolor: isActive('/dashboard') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                          borderRadius: '8px', px: 2.5, py: 1,
                          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)', color: 'white' }
                        }}
                      >
                        Dashboard
                      </Button>
                    )}

                    {navItems.map((item) => (
                      <Button
                        key={item.path}
                        onClick={() => handleNav(item.path)}
                        startIcon={item.icon}
                        sx={{
                          textTransform: 'none', fontWeight: 600, fontSize: '0.9rem',
                          color: isActive(item.path) ? 'white' : '#94a3b8',
                          bgcolor: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                          borderRadius: '8px', px: 2.5, py: 1,
                          transition: 'all 0.3s ease',
                          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.05)', color: 'white' }
                        }}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </Stack>

                  {/* ✅ DESKTOP AUTH SECTION */}
                  <Box sx={{ ml: 1 }}>
                    {user ? (
                      // Logged In View
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'rgba(255,255,255,0.05)', p: 1, pr: 2, borderRadius: '50px', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <Avatar 
                          src={user.picture} 
                          alt={user.name} 
                          sx={{ width: 32, height: 32, border: '2px solid #3b82f6' }} 
                        />
                        <Typography variant="body2" fontWeight={600} sx={{ color: 'white' }}>
                          {user.name.split(' ')[0]}
                        </Typography>
                        <IconButton 
                          size="small" 
                          onClick={handleLogout} 
                          sx={{ 
                            color: '#ef4444', 
                            bgcolor: 'rgba(239, 68, 68, 0.1)',
                            '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.2)' } 
                          }}
                        >
                          <LogOut size={16} />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button 
                      onClick={() => window.location.href = 'https://resumeai-backend.onrender.com/api/auth/google'}
                      sx={{
                        bgcolor: 'white', color: 'black', fontWeight: 'bold',
                        '&:hover': { bgcolor: '#f1f1f1' }
                      }}
                    >
                      Login with Google
                    </Button>
                    )}
                  </Box>

                </Box>
              )}

              {/* Mobile Menu Toggle */}
              {isMobile && (
                <IconButton onClick={() => setMobileOpen(true)} sx={{ color: 'white', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2 }}>
                  <MenuIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Mobile Drawer */}
        <Drawer 
          anchor="right" 
          open={mobileOpen} 
          onClose={() => setMobileOpen(false)}
          PaperProps={{ sx: { bgcolor: '#0f172a', color: 'white', borderLeft: '1px solid rgba(255,255,255,0.1)' } }} 
        >
          <Box sx={{ width: 280, p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
              <Typography variant="h6" fontWeight="bold">Menu</Typography>
              <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'grey.500' }}><X /></IconButton>
            </Box>
            
            <List sx={{ flexGrow: 1 }}>
              {/* Mobile Dashboard Link */}
              {user && (
                 <ListItem disablePadding>
                    <ListItemButton onClick={() => handleNav('/dashboard')} sx={{ borderRadius: 3, mb: 1, py: 1.5, color: isActive('/dashboard') ? '#60a5fa' : 'white' }}>
                        <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><LayoutDashboard size={18}/></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                 </ListItem>
              )}

              {navItems.map((item) => (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton 
                    onClick={() => handleNav(item.path)}
                    sx={{ 
                      borderRadius: 3, mb: 1, py: 1.5,
                      bgcolor: isActive(item.path) ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                      color: isActive(item.path) ? '#60a5fa' : 'white',
                      border: isActive(item.path) ? '1px solid rgba(59, 130, 246, 0.3)' : '1px solid transparent'
                    }}
                  >
                    <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            {/* ✅ MOBILE AUTH SECTION */}
            <Box sx={{ mt: 'auto', pt: 3, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {user ? (
                // Mobile Logged In
                <Stack spacing={2}>
                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar src={user.picture} sx={{ width: 40, height: 40 }} />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">{user.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>{user.email}</Typography>
                      </Box>
                   </Box>
                   <Button 
                    variant="outlined" 
                    color="error" 
                    fullWidth 
                    startIcon={<LogOut size={18} />}
                    onClick={handleLogout}
                   >
                     Logout
                   </Button>
                </Stack>
              ) : (
                // Mobile Logged Out
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button 
                  onClick={() => window.location.href = 'https://resumeai-backend.onrender.com/api/auth/google'}
                  sx={{
                    bgcolor: 'white', color: 'black', fontWeight: 'bold',
                    '&:hover': { bgcolor: '#f1f1f1' }
                  }}
                >
                  Login with Google
                </Button>
                </Box>
              )}
            </Box>

          </Box>
        </Drawer>

        {/* === 2. MAIN CONTENT === */}
        <Box sx={{ flexGrow: 1 }}>
          {children}
        </Box>

        {/* === 3. PREMIUM FOOTER === */}
        <Box sx={{ pt: 10, pb: 6, bgcolor: '#020617', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', top: '-50%', left: '50%', width: '60%', height: '200px', bgcolor: '#3b82f6', filter: 'blur(100px)', opacity: 0.1, transform: 'translateX(-50%)', borderRadius: '50%' }} />
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, mb: 3 }}>
                 <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 32, height: 32, borderRadius: '8px', objectFit: 'cover' }} />
                <Typography variant="h5" sx={{ fontWeight: '800', color: 'white' }}>
                  Resume<span style={{ color: '#60a5fa' }}>AI</span>
                </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: '#94a3b8', mb: 5, maxWidth: '500px', mx: 'auto' }}>
              We build tools for career growth. Stop guessing, start getting hired with AI-powered insights.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center" mb={6}>
              <Typography component="a" onClick={() => navigate('/privacy')} sx={{ cursor: 'pointer', color: '#cbd5e1', '&:hover': { color: '#3b82f6' }, transition: '0.2s' }}>Privacy Policy</Typography>
              <Typography component="a" onClick={() => navigate('/terms')} sx={{ cursor: 'pointer', color: '#cbd5e1', '&:hover': { color: '#3b82f6' }, transition: '0.2s' }}>Terms of Service</Typography>
              <Typography component="a" onClick={() => navigate('/refund')} sx={{ cursor: 'pointer', color: '#cbd5e1', '&:hover': { color: '#3b82f6' }, transition: '0.2s' }}>Refund Policy</Typography>
            </Stack>
            <Box sx={{ height: '1px', bgcolor: 'rgba(255,255,255,0.1)', width: '100%', mb: 4 }} />
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block' }}>
              © 2025 ResumeAI Builder. All rights reserved.
            </Typography>
          </Container>
        </Box>

      </Box>
    </ReactLenis>
  );
};

export default Layout;