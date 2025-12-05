import React from 'react';
import { 
  Box, Typography, Button, Container, Grid, Paper, 
  Accordion, AccordionSummary, AccordionDetails, Chip, Stack, Divider, Avatar 
} from '@mui/material';
import { 
  ArrowRight, CheckCircle2, Zap, ShieldCheck, Download, 
  Star, ChevronDown, Sparkles, FileText, MousePointerClick, Layers, 
  PenTool, Layout
} from 'lucide-react';

// --- IMPORT TEMPLATE PREVIEW CARD ---
import TemplatePreviewCard from './common/TemplatePreviewCard';

const HomePage = ({ onStart }) => {
  
  const brandGradient = 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)';
  
  const CompanyLogo = ({ name }) => (
    <Typography 
      variant="h6" 
      sx={{ 
        fontWeight: '900', 
        color: '#cbd5e1', 
        textTransform: 'uppercase', 
        letterSpacing: 1.5,
        fontSize: '1.2rem',
        userSelect: 'none'
      }}
    >
      {name}
    </Typography>
  );

  // Template Data with ID and Colors for Preview
  const templates = [
    { id: 'modern', title: 'Modern', desc: 'Clean & minimalist. Best for tech.', color: '#0B57D0' },
    { id: 'classic', title: 'Classic', desc: 'Traditional & elegant. Best for finance.', color: '#000000' },
    { id: 'swiss', title: 'Swiss', desc: 'Strong sidebar. Best for creatives.', color: '#2d3748' },
    { id: 'corporate', title: 'Corporate', desc: 'Structured. Best for management.', color: '#1A237E' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', overflowX: 'hidden', fontFamily: '"Roboto", sans-serif' }}>
      
      {/* === 1. NAVBAR === */}
      <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>
              <Box sx={{ width: 32, height: 32, borderRadius: '8px', background: brandGradient }} />
              <Typography variant="h5" sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: -0.5 }}>
                Resume<span style={{ color: '#7c3aed' }}>AI</span>
              </Typography>
            </Box>
            <Stack direction="row" spacing={{ xs: 1, md: 2 }}>
               <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 500 }}>Templates</Button>
               <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 500 }}>How it Works</Button>
               <Button 
                variant="contained" 
                onClick={onStart}
                sx={{ 
                  bgcolor: '#7c3aed', 
                  borderRadius: '50px', 
                  px: { xs: 2, md: 4 }, 
                  py: 1,
                  textTransform: 'none', 
                  fontWeight: 'bold',
                  boxShadow: '0 4px 14px 0 rgba(124, 58, 237, 0.3)',
                  '&:hover': { bgcolor: '#6d28d9', boxShadow: '0 6px 20px 0 rgba(124, 58, 237, 0.4)' } 
                }}
              >
                Build My Resume
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* === 2. HERO SECTION === */}
      <Box sx={{ 
        pt: { xs: 8, md: 14 }, 
        pb: { xs: 8, md: 12 }, 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, rgba(255,255,255,0) 70%)', zIndex: -1 }} />
        
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 1, borderRadius: '20px', bgcolor: '#f0fdf4', color: '#15803d', mb: 4, border: '1px solid #bbf7d0' }}>
            <Star size={14} fill="currentColor" />
            <Typography variant="caption" fontWeight="bold">Rated Excellent on Trustpilot</Typography>
          </Box>
          
          <Typography variant="h1" sx={{ fontWeight: '900', mb: 3, lineHeight: 1.1, fontSize: { xs: '2.5rem', md: '4.2rem' }, color: '#0f172a' }}>
            AI Resume Builder <br/>
            <span style={{ background: brandGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Fast, Easy & Free to Use</span>
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 6, color: '#475569', fontWeight: 'normal', maxWidth: '700px', mx: 'auto', lineHeight: 1.6, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
            Land your next job with one of the best AI resume builders online. Work from your computer or phone with recruiter-approved templates.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
            <Button 
              variant="contained" 
              size="large" 
              onClick={onStart}
              endIcon={<ArrowRight size={20} />}
              sx={{ 
                py: 2, px: 6, 
                fontSize: '1.1rem', 
                borderRadius: '12px', 
                background: '#0f172a', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15)',
                textTransform: 'none',
                fontWeight: 'bold',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': { background: '#1e293b', transform: 'translateY(-2px)' }
              }}
            >
              Create My Resume
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b', mt: { xs: 2, sm: 0 } }}>
              <CheckCircle2 size={20} color="#16a34a" fill="#dcfce7" />
              <Typography variant="body2" fontWeight="600">No Sign-up Required</Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
             <Box sx={{ bgcolor: '#00b67a', px: 1, py: 0.5, borderRadius: '4px', color: 'white', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 0.5 }}>
               <Star size={16} fill="white" /> Trustpilot
             </Box>
             <Typography variant="caption" fontWeight="bold" color="text.primary">4.9/5 Rating based on 1,240+ reviews</Typography>
          </Box>
        </Container>
      </Box>

      {/* === 3. LOGO STRIP === */}
      <Box sx={{ py: 4, borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', bgcolor: '#fafafa' }}>
        <Container maxWidth="lg">
          <Typography variant="caption" display="block" textAlign="center" color="text.secondary" mb={3} fontWeight="bold" letterSpacing={1.5}>
            OUR CUSTOMERS HAVE BEEN HIRED BY
          </Typography>
          <Grid container justifyContent="center" alignItems="center" spacing={{ xs: 4, md: 8 }}>
            {['Amazon', 'Google', 'Microsoft', 'Tesla', 'Spotify', 'Netflix'].map((brand) => (
              <Grid item key={brand}>
                <CompanyLogo name={brand} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* === 4. HOW IT WORKS === */}
      <Box sx={{ py: 12, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
             <Typography variant="h3" fontWeight="800" mb={2} color="#0f172a">How to Create Your Resume</Typography>
             <Typography variant="body1" color="text.secondary">Build a job-winning resume in 3 simple steps.</Typography>
          </Box>

          <Grid container spacing={4}>
             {[
               { icon: <Layout size={32} />, title: "1. Choose a Template", desc: "Select from our recruiter-approved, ATS-friendly designs." },
               { icon: <Sparkles size={32} />, title: "2. Add Smart Content", desc: "Use our AI to auto-fill professional summaries and bullet points." },
               { icon: <Download size={32} />, title: "3. Download & Apply", desc: "Export as a high-quality PDF and start applying instantly." }
             ].map((step, idx) => (
               <Grid item xs={12} md={4} key={idx}>
                 <Paper elevation={0} sx={{ 
                   p: 4, 
                   textAlign: 'center', 
                   border: '1px solid #e2e8f0', 
                   borderRadius: '16px',
                   height: '100%',
                   transition: 'all 0.3s',
                   '&:hover': { transform: 'translateY(-5px)', borderColor: '#7c3aed', boxShadow: '0 10px 30px rgba(124, 58, 237, 0.1)' }
                 }}>
                    <Box sx={{ 
                      width: 64, height: 64, borderRadius: '50%', bgcolor: '#f5f3ff', color: '#7c3aed', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3
                    }}>
                      {step.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="bold" mb={2} color="#1e293b">{step.title}</Typography>
                    <Typography variant="body1" color="text.secondary" lineHeight={1.6}>{step.desc}</Typography>
                 </Paper>
               </Grid>
             ))}
          </Grid>
        </Container>
      </Box>

      {/* === 5. AI DEMO === */}
      <Box sx={{ py: 12, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={5}>
              <Chip icon={<Zap size={14} fill="currentColor" />} label="Smart AI Features" sx={{ bgcolor: '#0f172a', color: 'white', fontWeight: 'bold', mb: 2 }} />
              <Typography variant="h3" fontWeight="800" mb={3} color="#0f172a" lineHeight={1.2}>
                Let AI do the work!
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4} fontSize="1.1rem" lineHeight={1.7}>
                Describe your role in a few words, and we'll generate tailored content for your work experience section. No more writer's block.
              </Typography>
              <Button variant="contained" onClick={onStart} size="large" sx={{ bgcolor: '#7c3aed', borderRadius: '8px', fontWeight: 'bold', textTransform: 'none', px: 4 }}>
                Try AI Writer
              </Button>
            </Grid>

            <Grid item xs={12} md={7}>
              <Box sx={{ position: 'relative' }}>
                <Stack spacing={3}>
                  <Paper elevation={0} sx={{ p: 3, borderLeft: '4px solid #94a3b8', bgcolor: '#e2e8f0', borderRadius: '12px' }}>
                    <Typography variant="caption" fontWeight="bold" color="#64748b" display="flex" alignItems="center" gap={1} mb={1}>ORIGINAL</Typography>
                    <Typography variant="body1" color="#475569" fontFamily="monospace">
                      "I managed a team of sales people."
                    </Typography>
                  </Paper>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                     <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: '50%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', color: '#7c3aed' }}>
                       <Sparkles size={24} fill="currentColor" />
                     </Box>
                  </Box>

                  <Paper elevation={10} sx={{ p: 4, borderLeft: '4px solid #16a34a', bgcolor: 'white', borderRadius: '16px' }}>
                    <Chip label="✨ AI Generated" size="small" sx={{ float: 'right', bgcolor: '#dcfce7', color: '#16a34a', fontWeight: 'bold' }} />
                    <Typography variant="caption" fontWeight="bold" color="#16a34a" display="flex" alignItems="center" gap={1} mb={1}>OPTIMIZED</Typography>
                    <Typography variant="body1" fontWeight="500" color="#0f172a" fontSize="1.1rem" lineHeight={1.6}>
                      "Spearheaded a high-performing sales team of 15+, driving a <span style={{backgroundColor: '#dcfce7', padding: '0 4px'}}>40% increase in annual revenue</span> through strategic mentorship."
                    </Typography>
                  </Paper>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* === 6. TEMPLATE SHOWCASE (UPDATED with Previews) === */}
      <Box sx={{ py: 12, bgcolor: '#0f172a', color: 'white' }}>
        <Container maxWidth="lg">
           <Box textAlign="center" mb={8}>
              <Typography variant="overline" color="#a855f7" fontWeight="bold" letterSpacing={2}>RECRUITER APPROVED</Typography>
              <Typography variant="h3" fontWeight="900" my={2}>Make a Resume That Gets Results</Typography>
              <Typography variant="body1" color="#94a3b8">
                Choose from a wide range of styles for every job level and type.
              </Typography>
           </Box>
           
           <Grid container spacing={4}>
             {templates.map((tpl, idx) => (
               <Grid item xs={12} sm={6} md={3} key={idx}>
                 <Box 
                   onClick={onStart}
                   sx={{ 
                     cursor: 'pointer',
                     p: 2,
                     bgcolor: 'rgba(255,255,255,0.05)',
                     borderRadius: '16px',
                     border: '1px solid rgba(255,255,255,0.1)',
                     transition: 'all 0.3s',
                     height: '100%',
                     '&:hover': { transform: 'translateY(-8px)', borderColor: '#a855f7', bgcolor: 'rgba(255,255,255,0.08)' }
                   }}
                 >
                    {/* DYNAMIC PREVIEW CARD */}
                    <Box sx={{ height: 220, mb: 2 }}>
                       <TemplatePreviewCard templateId={tpl.id} color={tpl.color} />
                    </Box>
                    
                    <Typography variant="h6" fontWeight="bold">{tpl.title}</Typography>
                    <Typography variant="caption" color="#94a3b8">{tpl.desc}</Typography>
                 </Box>
               </Grid>
             ))}
           </Grid>
        </Container>
      </Box>

      {/* === 7. FAQ === */}
      <Box sx={{ py: 12, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="800" textAlign="center" mb={6} color="#0f172a">Resume Now FAQ</Typography>
          <Stack spacing={2}>
            {[
              { q: "Is this AI Resume Builder free to use?", a: "Yes! You can build your resume, try all templates, and use the AI features for free. You only pay ₹30 when you are ready to download the final PDF." },
              { q: "Can AI really write my resume?", a: "Yes! Our AI suggests bullet points based on your job title. You can then edit them to fit your specific experience." },
              { q: "Is my data secure?", a: "Absolutely. We use Razorpay for secure payments and do not store your credit card details." },
              { q: "Are the templates ATS-friendly?", a: "Yes, all our templates are designed to be easily readable by Applicant Tracking Systems (ATS) used by employers." }
            ].map((item, index) => (
              <Accordion key={index} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '8px !important', '&:before': { display: 'none' }, mb: 1 }}>
                <AccordionSummary expandIcon={<ChevronDown color="#94a3b8" />}>
                  <Typography fontWeight="600" color="#334155">{item.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary" lineHeight={1.6}>{item.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* === 8. FOOTER === */}
      <Box sx={{ py: 6, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
        <Container maxWidth="lg">
           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box sx={{ width: 24, height: 24, borderRadius: 1, background: brandGradient }} />
              <Typography variant="h6" sx={{ fontWeight: '800', color: '#1e293b' }}>Resume<span style={{ color: '#7c3aed' }}>AI</span></Typography>
           </Box>
           <Typography variant="body2" color="text.secondary" mb={4}>
             Build a professional resume in minutes. Fast, Easy, and Effective.
           </Typography>
           <Typography variant="caption" color="text.secondary">
             © 2025 ResumeAI Builder. All rights reserved.
           </Typography>
        </Container>
      </Box>

    </Box>
  );
};

export default HomePage;