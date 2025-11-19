import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, Stack, Chip } from '@mui/material';
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Download, Star } from 'lucide-react';

const HomePage = ({ onStart }) => {
  
  // Branding Colors (Consistent with App)
  const brandGradient = 'linear-gradient(135deg, #4f46e5 0%, #a855f7 100%)';
  const successColor = '#16a34a';
  const darkBg = '#0f172a';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', overflowX: 'hidden' }}>
      
      {/* === 1. NAVBAR === */}
      <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #eee' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: '800', background: brandGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ResumeAI
            </Typography>
            <Button 
              variant="contained" 
              onClick={onStart}
              sx={{ bgcolor: '#4f46e5', borderRadius: '50px', px: 4, '&:hover': { bgcolor: '#4338ca' } }}
            >
              Create Resume
            </Button>
          </Box>
        </Container>
      </Box>

      {/* === 2. HERO SECTION === */}
      <Box sx={{ 
        pt: { xs: 8, md: 12 }, 
        pb: { xs: 8, md: 12 }, 
        background: `radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.1) 0%, rgba(255,255,255,0) 50%)` 
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Chip 
            label="✨ AI-Powered Resume Builder" 
            sx={{ mb: 3, bgcolor: '#f3e8ff', color: '#9333ea', fontWeight: 'bold', border: '1px solid #e9d5ff' }} 
          />
          <Typography variant="h2" sx={{ fontWeight: '900', mb: 2, lineHeight: 1.2, fontSize: { xs: '2.5rem', md: '4rem' }, color: '#1e293b' }}>
            Build a <span style={{ color: '#4f46e5' }}>Professional Resume</span> <br/> in Minutes, Not Hours.
          </Typography>
          <Typography variant="h6" sx={{ mb: 5, color: '#64748b', fontWeight: 'normal', maxWidth: '700px', mx: 'auto' }}>
            Stop struggling with Word templates. Use our AI-assisted builder to create ATS-friendly resumes that get you hired.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
            <Button 
              variant="contained" 
              size="large" 
              onClick={onStart}
              endIcon={<ArrowRight />}
              sx={{ 
                py: 2, px: 6, 
                fontSize: '1.1rem', 
                borderRadius: '12px', 
                background: brandGradient,
                boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)',
                transition: 'transform 0.2s',
                '&:hover': { transform: 'translateY(-2px)' }
              }}
            >
              Build My Resume Now
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b' }}>
              <CheckCircle2 size={20} color={successColor} />
              <Typography variant="body2" fontWeight="600">No Sign-up Required</Typography>
            </Box>
          </Stack>

          <Typography variant="caption" display="block" sx={{ mt: 2, color: '#94a3b8' }}>
            Join 10,000+ professionals who got hired.
          </Typography>
        </Container>
      </Box>

      {/* === 3. PRICING / VALUE PROP (Marketing Hook) === */}
      <Box sx={{ bgcolor: darkBg, py: 10, color: 'white', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative background elements */}
        <Box sx={{ position: 'absolute', top: -100, left: -100, width: 300, height: 300, bgcolor: '#4f46e5', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3 }} />
        <Box sx={{ position: 'absolute', bottom: -100, right: -100, width: 300, height: 300, bgcolor: '#a855f7', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3 }} />

        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" sx={{ color: '#a855f7', fontWeight: 'bold', letterSpacing: 2 }}>
                UNBEATABLE PRICING
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: '800', mb: 2, mt: 1 }}>
                Premium Quality.<br/>
                <span style={{ color: successColor }}>Pocket Change Price.</span>
              </Typography>
              <Typography variant="body1" sx={{ color: '#94a3b8', mb: 4, fontSize: '1.1rem' }}>
                Why pay ₹500/month for subscriptions you don't need? 
                We believe in a fair, pay-as-you-go model.
              </Typography>
              
              <Stack spacing={2}>
                {[
                  "Only ₹30 per download",
                  "No hidden monthly subscriptions",
                  "Pay only when you are 100% satisfied",
                  "Secure PDF export"
                ].map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ bgcolor: 'rgba(22, 163, 74, 0.2)', p: 0.5, borderRadius: '50%' }}>
                      <CheckCircle2 size={18} color={successColor} />
                    </Box>
                    <Typography sx={{ fontWeight: '500' }}>{item}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Pricing Card */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: 5, 
                background: 'rgba(255, 255, 255, 0.05)', 
                backdropFilter: 'blur(20px)', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px',
                textAlign: 'center',
                transform: 'rotate(-2deg)',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'rotate(0deg)' }
              }}>
                <Box sx={{ bgcolor: '#f59e0b', color: 'black', py: 0.5, px: 2, borderRadius: '20px', display: 'inline-block', mb: 3, fontWeight: 'bold', fontSize: '0.8rem' }}>
                  LIMITED TIME OFFER
                </Box>
                <Typography variant="h5" sx={{ color: 'white', mb: 1 }}>One-Time Download</Typography>
                <Typography variant="h1" sx={{ fontWeight: '800', color: 'white', mb: 1 }}>
                  ₹30
                </Typography>
                <Typography variant="body2" sx={{ color: '#94a3b8', mb: 4 }}>
                  Less than the price of a coffee ☕
                </Typography>
                <Button 
                  fullWidth 
                  variant="contained" 
                  size="large"
                  onClick={onStart}
                  sx={{ bgcolor: successColor, py: 2, fontSize: '1.1rem', '&:hover': { bgcolor: '#15803d' } }}
                >
                  Start Building Now
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* === 4. FEATURES SECTION === */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: '800', color: '#1e293b' }}>Everything you need to get hired</Typography>
          <Typography variant="body1" sx={{ color: '#64748b', mt: 2 }}>Professional features without the complexity.</Typography>
        </Box>

        <Grid container spacing={4}>
          {[
            { icon: Zap, title: "AI-Powered Content", desc: "Get smart suggestions for summary and experience to write faster.", color: '#4f46e5' },
            { icon: ShieldCheck, title: "ATS Friendly", desc: "Templates designed to pass Applicant Tracking Systems.", color: '#0891b2' },
            { icon: Download, title: "Instant PDF Export", desc: "Download high-quality PDF files ready for job applications.", color: '#a855f7' },
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper elevation={0} sx={{ p: 4, bgcolor: '#f8fafc', borderRadius: '20px', height: '100%', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', bgcolor: '#f1f5f9' } }}>
                <Box sx={{ width: 50, height: 50, borderRadius: '12px', bgcolor: feature.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                  <feature.icon color={feature.color} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{feature.title}</Typography>
                <Typography variant="body2" sx={{ color: '#64748b' }}>{feature.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* === 5. FOOTER CTA === */}
      <Box sx={{ py: 8, borderTop: '1px solid #eee', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: '800', mb: 3 }}>
            Ready to land your dream job?
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={onStart}
            sx={{ 
              py: 2, px: 6, 
              fontSize: '1.2rem', 
              borderRadius: '12px', 
              background: brandGradient,
              boxShadow: '0 10px 25px rgba(168, 85, 247, 0.4)'
            }}
          >
            Create My Resume for ₹30
          </Button>
        </Container>
      </Box>

      {/* Footer Links */}
      <Box sx={{ py: 4, bgcolor: '#f8fafc', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
          © 2025 AI Resume Builder. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;