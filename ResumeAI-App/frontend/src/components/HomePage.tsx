import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Container, Paper, 
  Grid, Stack, Chip, useTheme, useMediaQuery,
  Avatar
} from '@mui/material'; 

import { 
  Layout as LayoutIcon, Mic, Github, Mail, 
  CheckCircle2, XCircle, Code, Zap, Target,
  FileCheck, Users, Award, Globe, Clock, BarChart,
  ArrowRight, Sparkles, TrendingUp
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Layout from './Layout'; 
import { useAuth } from '../context/AuthContext'; // ✅ AUTH IMPORT ADDED
import { useNavigate } from 'react-router-dom';   // ✅ NAVIGATE IMPORT ADDED
import Dashboard from './Dashboard';
import TemplateGallery from './TemplateGallery';

// === CONFIGURATION ===
const COLORS = {
  primary: '#3b82f6',   // Trust/Tech Blue
  secondary: '#a855f7', // AI/Magic Purple
  success: '#22c55e',   // Growth Green
  danger: '#ef4444',    // Error Red
  bg: '#020617',        // Deep Space
  cardBg: 'rgba(15, 23, 42, 0.6)' ,

  textSecondary: '#94a3b8',

  email: '#06b6d4',     
  github: '#24292f'
};

const PROFESSIONS = [
  'Software Engineers', 'Product Managers', 'Data Scientists', 
  'Marketing Leaders', 'Financial Analysts', 'UX Designers'
];

// Replaced local paths with placeholders or CDNs for stability in this demo.
const COMPANIES = [
  { logo: '/Zomato_Logo.svg' }, // पक्का करें कि public में नाम यही है
  { logo: '/mahendra.png' },
  { logo: '/Tata_logo.svg' },
  { logo: '/deloitte.png' },
  { logo: '/HDFC_Bank_Logo.svg' },
];

const HomePage: React.FC = () => {
  const { user } = useAuth(); // ✅ FIXED: Connected to Global Auth
  const navigate = useNavigate();
  const [professionIndex, setProfessionIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const interval = setInterval(() => {
      setProfessionIndex((prev) => (prev + 1) % PROFESSIONS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleStart = (link: string) => {
    navigate(link);
  };

  return (
    <Layout>
      <Helmet>
        <title>Journey to Hired | AI Career Copilot</title>
        <meta name="description" content="The unfair advantage for your job search. AI Resume Builder, Interview Coach, and Portfolio Analyzer." />
      </Helmet>

      {/* === GLOBAL STYLES === */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=JetBrains+Mono:wght@400;700&display=swap');
        
        body { 
          font-family: 'Outfit', sans-serif; 
          background-color: ${COLORS.bg}; 
          color: white; 
          overflow-x: hidden; 
        }

        /* --- BACKGROUND MESH --- */
        .tech-grid {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          mask-image: radial-gradient(circle at center, black 0%, transparent 80%);
        }

        /* --- ANIMATIONS --- */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes pulse-soft {
          0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          70% { box-shadow: 0 0 0 15px rgba(59, 130, 246, 0); }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse { animation: pulse-soft 2s infinite; }
        .animate-reveal { animation: reveal 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        /* --- UTILITIES --- */
        .glass-panel {
          background: ${COLORS.cardBg};
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #c084fc 50%, #22c55e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% auto;
          animation: gradient-move 5s linear infinite;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          width: 100%;
          margin: 6rem 0;
        }

        /* --- LOGO SLIDER --- */
        .logo-slider {
          overflow: hidden;
          padding: 40px 0;
          white-space: nowrap;
          position: relative;
        }
        .logo-slider:before, .logo-slider:after {
          content: "";
          position: absolute;
          top: 0; width: 150px; height: 100%; z-index: 2;
        }
        .logo-slider:before { left: 0; background: linear-gradient(to right, ${COLORS.bg}, transparent); }
        .logo-slider:after { right: 0; background: linear-gradient(to left, ${COLORS.bg}, transparent); }
        
        .logo-track { display: inline-flex; animation: scroll 40s linear infinite; }
        
        .company-logo-placeholder {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: rgba(255,255,255,0.3);
          margin: 0 50px;
          cursor: default;
          transition: 0.3s;
        }
        .company-logo-placeholder:hover { color: white; transform: scale(1.1); }
      `}</style>

      {/* === BACKGROUND AMBIENCE === */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <div className="tech-grid" style={{ width: '100%', height: '100%' }} />
        <Box sx={{ position: 'absolute', top: '-20%', left: '20%', width: 600, height: 600, bgcolor: COLORS.primary, borderRadius: '50%', filter: 'blur(180px)', opacity: 0.1 }} />
        <Box sx={{ position: 'absolute', bottom: '-20%', right: '10%', width: 500, height: 500, bgcolor: COLORS.secondary, borderRadius: '50%', filter: 'blur(160px)', opacity: 0.1 }} />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {user ? (
          <Dashboard />
        ) : (
        /* ✅ ADDED OPENING FRAGMENT HERE */
        <>
          {/* ================= HERO SECTION ================= */}
          <Container maxWidth="lg" sx={{ pt: { xs: 15, md: 22 }, pb: 10, textAlign: 'center' }}>
            {/* Status Badge */}
            <Chip 
              label="✨ Now Live: AI Mock Interviewer— Practice. Improve. Get Hired."
              sx={{ 
                bgcolor: 'rgba(34, 197, 94, 0.1)', 
                color: '#4ade80', 
                border: '1px solid rgba(34, 197, 94, 0.2)',
                mb: 4, fontWeight: 600, px: 1,
                animation: 'fadeIn 1s ease-out'
              }} 
            />

            {/* Headline */}
            <Typography variant="h1" sx={{ 
              fontSize: { xs: '3rem', md: '5rem' }, 
              fontWeight: 800, 
              lineHeight: 1.1, 
              letterSpacing: '-0.03em',
              mb: 3
            }}>
              Don't Just Apply. <br />
              <span className="gradient-text">Dominate.</span>
            </Typography>

            <Typography variant="h5" sx={{ 
              color: '#94a3b8', 
              maxWidth: '700px', 
              mx: 'auto', 
              mb: 6, 
              lineHeight: 1.6,
              fontWeight: 400
            }}>
              The unfair advantage for <span style={{ color: 'white', fontWeight: 600 }}>{PROFESSIONS[professionIndex]}</span>. 
              Debug your resume, compile your portfolio, and deploy your career with AI.
            </Typography>

            {/* CTA Group */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
              <Button 
                variant="contained" 
                size="large"
                onClick={() => handleStart('/builder')}
                className="animate-pulse"
                endIcon={<ArrowRight />}
                sx={{ 
                  py: 2, px: 5, fontSize: '1.1rem', borderRadius: '12px', fontWeight: 'bold',
                  bgcolor: COLORS.primary, 
                  boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)',
                  '&:hover': { bgcolor: '#2563eb', transform: 'translateY(-2px)' }
                }}
              >
                Start For Free
              </Button>
              
              <Button 
                variant="outlined" 
                size="large"
                startIcon={<Zap />}
                onClick={() => handleStart('/ats')}
                sx={{ 
                  py: 2, px: 4, fontSize: '1.1rem', borderRadius: '12px', fontWeight: 'bold',
                  color: 'white', borderColor: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                Check ATS Score
              </Button>
            </Stack>

            {/* Metric Pills */}
            <Stack 
              direction="row" 
              spacing={{ xs: 2, md: 6 }} 
              justifyContent="center" 
              sx={{ mt: 8, opacity: 0.8 }}
            >
              {[
                { label: 'Resumes Optimized', val: '10k+' },
                { label: 'Success Rate', val: '92%' },
                { label: 'Hired At', val: 'FAANG' },
              ].map((stat, i) => (
                <Box key={i} textAlign="center">
                  <Typography variant="h4" fontWeight="bold" color="white">{stat.val}</Typography>
                  <Typography variant="caption" color="#64748b" textTransform="uppercase" letterSpacing={1}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Container>

          {/* ================= SOCIAL PROOF ================= */}
          <Box sx={{ 
            py: 6, 
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            bgcolor: 'rgba(2, 6, 23, 0.5)', 
            backdropFilter: 'blur(10px)',
            mt: 10,
            mb: 10
          }}>
            <Container maxWidth="xl">
              <Typography variant="body2" sx={{ 
                textAlign: 'center', 
                color: '#64748b', 
                mb: 4, 
                fontWeight: 600,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontSize: '0.75rem'
              }}>
                Join professionals working at top companies:*
              </Typography>

              <div className="logo-slider">
                <div className="logo-track">
                  {[...COMPANIES, ...COMPANIES, ...COMPANIES].map((company, index) => (
                   <Box key={index} sx={{ mx: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
                      {/* ✅ IMAGE LOGO ADDED HERE */}
                      <img 
                        src={company.logo} 
                        // alt={company.name} 
                        style={{ 
                          height: '40px', 
                          filter: 'grayscale(100%) brightness(200%)', // Logos को सफ़ेद लुक देने के लिए
                          opacity: 0.7,
                          transition: '0.3s'
                        }} 
                        onMouseOver={(e) => (e.currentTarget.style.filter = 'none')}
                        onMouseOut={(e) => (e.currentTarget.style.filter = 'grayscale(100%) brightness(200%)')}
                      />
                      {/* <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                        {company.name}
                      </Typography> */}
                    </Box>
                  ))}
                </div>
              </div>

              <Typography variant="caption" sx={{ 
                display: 'block', 
                textAlign: 'center', 
                color: 'rgba(255,255,255,0.2)', 
                mt: 3, 
                fontSize: '0.65rem' 
              }}>
                *Disclaimer: ResumeAI is not affiliated with, endorsed by, or sponsored by these companies. 
                Reference to specific companies implies that their employees are users of our platform.
              </Typography>
            </Container>
          </Box>

          {/* ================= PROBLEM / SOLUTION GRID ================= */}
          <Container maxWidth="lg" sx={{ py: 15 }}>
            <Box sx={{ mb: 10, textAlign: isMobile ? 'center' : 'left' }}>
              <Grid container alignItems="flex-end">
                <Grid size={{ xs: 12, md:8}}>
                  <Typography variant="overline" color={COLORS.secondary} fontWeight="bold" letterSpacing={2}>
                    THE REALITY CHECK
                  </Typography>
                  <Typography variant="h2" fontWeight="800" sx={{ mt: 1, mb: 2 }}>
                    Job Hunting is <span style={{ textDecoration: 'line-through', textDecorationColor: COLORS.danger, color: '#94a3b8' }}>Broken</span> <br />
                    <span style={{ color: COLORS.success }}>Fixed.</span>
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md:4 }} sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                  <Typography color="#94a3b8">Hover over the cards to see the fix.</Typography>
                </Grid>
              </Grid>
            </Box>

            <Grid container spacing={4}>
              {[
                {
                  problem: { title: "ATS Black Hole", icon: <XCircle size={40} />, desc: "75% of resumes are rejected by bots before a human sees them." },
                  solution: { title: "Algorithm Friendly", icon: <CheckCircle2 size={40} />, desc: "AI optimization ensures your resume passes the filter every time.", color: COLORS.success }
                },
                {
                  problem: { title: "Interview Anxiety", icon: <Mic size={40} />, desc: "Practicing in front of a mirror doesn't give you feedback." },
                  solution: { title: "AI Simulation", icon: <Sparkles size={40} />, desc: "Real-time voice analysis and confidence scoring for prep.", color: COLORS.secondary }
                },
                {
                  problem: { title: "Generic Applications", icon: <Code size={40} />, desc: "Sending the same resume to 50 companies yields 0 results." },
                  solution: { title: "Targeted Precision", icon: <Target size={40} />, desc: "Instantly tailor your resume to the specific JD keywords.", color: COLORS.primary }
                }
              ].map((item, idx) => (
                <Grid size={{ xs: 12, md:4 }} key={idx}>
                  <Box sx={{ 
                    height: 350, position: 'relative', perspective: '1000px', group: 'card'
                  }}>
                    <Paper className="glass-panel" sx={{ 
                      position: 'absolute', inset: 0, p: 4, borderRadius: 4,
                      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                      border: `1px solid ${COLORS.danger}40`,
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      opacity: 1,
                      zIndex: 1,
                      '&:hover': { opacity: 0, transform: 'translateY(-10px) scale(0.95)' }
                    }}>
                      <Box sx={{ color: COLORS.danger, mb: 3, p: 2, bgcolor: `${COLORS.danger}10`, borderRadius: '50%' }}>
                        {item.problem.icon}
                      </Box>
                      <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
                        {item.problem.title}
                      </Typography>
                      <Typography color="#94a3b8">
                        {item.problem.desc}
                      </Typography>
                    </Paper>

                    <Paper sx={{ 
                      position: 'absolute', inset: 0, p: 4, borderRadius: 4,
                      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center',
                      background: `linear-gradient(145deg, ${item.solution.color}10, ${COLORS.bg})`,
                      border: `1px solid ${item.solution.color}`,
                      boxShadow: `0 0 30px ${item.solution.color}20`,
                      zIndex: 0,
                    }}>
                      <Box sx={{ color: item.solution.color, mb: 3, p: 2, bgcolor: `${item.solution.color}10`, borderRadius: '50%' }}>
                        {item.solution.icon}
                      </Box>
                      <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
                        {item.solution.title}
                      </Typography>
                      <Typography color="#cbd5e1">
                        {item.solution.desc}
                      </Typography>
                    </Paper>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>

              {/* ✅ NAYA SECTION ADDED HERE */}
          <TemplateGallery />

          {/* ================= FEATURES ================= */}
          <Box sx={{ bgcolor: 'rgba(255,255,255,0.02)', py: 15 }}>
            <Container maxWidth="lg">
              <Typography variant="h2" textAlign="center" fontWeight="800" mb={8}>
                Your Career Arsenal
              </Typography>

              <Grid container spacing={4}>
                {[
                  { 
                    title: 'AI Resume Builder', 
                    desc: 'Generate bullet points based on your role.', 
                    icon: <LayoutIcon />, 
                    bg: COLORS.primary 
                  },
                  { 
                    title: 'Mock Interviewer', 
                    desc: 'Voice-interactive AI that grills you gently.', 
                    icon: <Mic />, 
                    bg: COLORS.secondary 
                  },
                  { 
                    title: 'Github to Resume', 
                    desc: 'Turn repositories into impact statements.', 
                    icon: <Github />, 
                    bg: COLORS.success 
                  },
                  { 
                    title: 'Cold Email Writer', 
                    desc: 'Draft networking emails that get replies.', 
                    icon: <Mail />, 
                    bg: '#06b6d4' 
                  }
                ].map((feature, i) => (
                  <Grid size={{ xs: 12, md:6, lg:3 }} key={i}>
                    <Paper className="glass-panel" sx={{ 
                      p: 4, height: '100%', borderRadius: 4,
                      transition: '0.3s',
                      '&:hover': { transform: 'translateY(-10px)', borderColor: feature.bg }
                    }}>
                      <Box sx={{ 
                        width: 60, height: 60, borderRadius: 3, 
                        bgcolor: `${feature.bg}20`, color: feature.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3
                      }}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>{feature.title}</Typography>
                      <Typography variant="body2" color="#94a3b8">{feature.desc}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* ================= FINAL CTA ================= */}
          <Container maxWidth="md" sx={{ py: 20, textAlign: 'center' }}>
            <Box sx={{ 
              position: 'relative', 
              p: { xs: 4, md: 8 }, 
              borderRadius: 6, 
              overflow: 'hidden',
              background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.4), rgba(15, 23, 42, 0.8))',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography variant="h2" fontWeight="900" mb={3}>
                  Ready to get Hired?
                </Typography>
                <Typography fontSize="1.2rem" color="#cbd5e1" mb={5}>
                  Join 5,000+ professionals debugging their career today.
                </Typography>
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => handleStart('/builder')}
                  sx={{ 
                    py: 1.5, px: 4, fontSize: '1.2rem', borderRadius: '50px', fontWeight: 'bold',
                    bgcolor: 'white', color: COLORS.bg,
                    '&:hover': { bgcolor: '#f1f5f9', transform: 'scale(1.05)' }
                  }}
                >
                  Build Resume 🚀
                </Button>
              </Box>
              
              {/* Glow Effect */}
              <Box sx={{ 
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
                width: '100%', height: '100%', 
                background: `radial-gradient(circle, ${COLORS.primary}40 0%, transparent 70%)`, 
                zIndex: 1, pointerEvents: 'none'
              }} />
            </Box>
          </Container>
        </> 
        /* ✅ ADDED CLOSING FRAGMENT HERE */
      )}
      </Box>
    </Layout>
  );
};

export default HomePage;