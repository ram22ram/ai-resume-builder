import React from 'react';
import { Box, Container, Typography, Button, Stack, Paper, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowRight, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

interface SEOLandingPageProps {
  seoTitle: string;
  seoDesc: string;
  seoKeywords: string;
  h1: React.ReactNode;
  subtitle: string;
  targetAudience: string;
}

const SEOLandingPage: React.FC<SEOLandingPageProps> = ({ 
  seoTitle, 
  seoDesc, 
  seoKeywords, 
  h1, 
  subtitle,
  targetAudience
}) => {
  const navigate = useNavigate();

  return (
    <Layout>
      <SEO title={seoTitle} description={seoDesc} keywords={seoKeywords} />
      
      {/* Hero Section */}
      <Box sx={{ pt: { xs: 12, md: 20 }, pb: { xs: 10, md: 15 }, textAlign: 'center', bgcolor: '#020617' }}>
        <Container maxWidth="md">
          <Typography variant="overline" color="primary" fontWeight={700} letterSpacing={2} sx={{ mb: 2, display: 'block' }}>
            BUILT FOR {targetAudience}
          </Typography>
          <Typography variant="h1" fontWeight={900} sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' }, mb: 3, lineHeight: 1.1 }}>
            {h1}
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 6, maxWidth: '800px', mx: 'auto', lineHeight: 1.6 }}>
            {subtitle}
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" mb={6}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/builder')}
              endIcon={<ArrowRight />}
              sx={{ 
                py: 2, px: 5, fontSize: '1.2rem', borderRadius: '50px', fontWeight: 'bold',
                bgcolor: '#3b82f6', 
                '&:hover': { bgcolor: '#2563eb', transform: 'scale(1.05)' },
                transition: 'all 0.2s'
              }}
            >
              Build Resume Now
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/templates')}
              sx={{ py: 2, px: 5, fontSize: '1.1rem', borderRadius: '50px', fontWeight: 'bold', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              View Templates
            </Button>
          </Stack>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <ShieldCheck size={16} color="#22c55e" /> Trusted by 10,000+ Indian job seekers • No credit card required
          </Typography>
        </Container>
      </Box>

      {/* Trust & Social Proof */}
      <Box sx={{ py: 8, bgcolor: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="lg">
          <Typography textAlign="center" variant="subtitle2" color="text.secondary" mb={4} sx={{ letterSpacing: 1, textTransform: 'uppercase' }}>
            Users hired at top companies in India
          </Typography>
          <Stack direction="row" spacing={{ xs: 4, md: 8 }} justifyContent="center" sx={{ opacity: 0.6, flexWrap: 'wrap', gap: 4 }}>
             {/* Using simple text for speed, though image logos would be better */}
            <Typography variant="h6" fontWeight={800}>TCS</Typography>
            <Typography variant="h6" fontWeight={800}>Infosys</Typography>
            <Typography variant="h6" fontWeight={800}>Wipro</Typography>
            <Typography variant="h6" fontWeight={800}>Zomato</Typography>
            <Typography variant="h6" fontWeight={800}>Flipkart</Typography>
          </Stack>
        </Container>
      </Box>

      {/* Benefits */}
      <Container maxWidth="lg" sx={{ py: { xs: 10, md: 15 } }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h3" fontWeight={800} mb={3}>
              Why Indian IT Companies Reject Your Resume
            </Typography>
            <Typography color="text.secondary" mb={4} fontSize="1.1rem" lineHeight={1.7}>
              Most resumes fail the Applicant Tracking System (ATS) used by major Indian recruiters before a human ever reads them. We fix that automatically.
            </Typography>
            <Stack spacing={3}>
              {[
                'Passes Naukri & LinkedIn parsers with 100% accuracy',
                'Formats optimized for Indian HR preferences',
                'AI suggests impactful action verbs for your domain',
                'No hidden paywalls—download your PDF instantly'
              ].map((text, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <CheckCircle color="#22c55e" size={24} />
                  <Typography fontWeight={500} fontSize="1.1rem">{text}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 4, bgcolor: '#0f172a', borderRadius: 4, border: '1px solid rgba(59, 130, 246, 0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>ATS Scan Result</Typography>
                <Box sx={{ bgcolor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', px: 2, py: 0.5, borderRadius: 1, fontWeight: 'bold' }}>
                  98% Match
                </Box>
              </Box>
              <LinearProgress variant="determinate" value={98} color="success" sx={{ height: 8, borderRadius: 4, mb: 4 }} />
              <Typography variant="body2" color="text.secondary" mb={2}>✓ Layout parsed correctly</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>✓ Core skills identified</Typography>
              <Typography variant="body2" color="text.secondary">✓ Contact info structured</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* Middle CTA */}
      <Box sx={{ py: 12, bgcolor: '#0f172a', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Zap size={48} color="#3b82f6" style={{ margin: '0 auto 24px' }} />
          <Typography variant="h3" fontWeight={800} mb={3}>
            Stop guessing. Start getting interviews.
          </Typography>
          <Typography color="text.secondary" fontSize="1.2rem" mb={5}>
            Join thousands of professionals across India who upgraded their career with our AI Resume Builder.
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/builder')}
            sx={{ py: 2, px: 6, fontSize: '1.2rem', borderRadius: '50px', fontWeight: 'bold', bgcolor: '#3b82f6' }}
          >
            Create My Free Resume
          </Button>
        </Container>
      </Box>
    </Layout>
  );
};

export default SEOLandingPage;
