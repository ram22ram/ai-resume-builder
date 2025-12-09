import React from 'react';
import { 
  Box, Typography, Button, Container, Paper, 
  Accordion, AccordionSummary, AccordionDetails, Chip, Stack 
} from '@mui/material';
import { 
  ArrowRight, CheckCircle2, Zap, Download, 
  Star, ChevronDown, Sparkles, 
  Layout, Search
} from 'lucide-react';

// @ts-ignore
import TemplatePreviewCard from './common/TemplatePreviewCard';
import { Helmet } from 'react-helmet-async';

interface HomePageProps {
  onStart: (templateId?: string) => void;
  onBrowse: () => void;
  onAtsCheck: () => void;
}

interface Template {
  id: string;
  title: string;
  desc: string;
  color: string;
}

const HomePage: React.FC<HomePageProps> = ({ onStart, onBrowse, onAtsCheck }) => {
  
  const brandGradient = 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)';
  
  const templates: Template[] = [
    { id: 'modern', title: 'Modern', desc: 'Clean & minimalist. Best for tech.', color: '#0B57D0' },
    { id: 'classic', title: 'Classic', desc: 'Traditional & elegant. Best for finance.', color: '#000000' },
    { id: 'swiss', title: 'Swiss', desc: 'Strong sidebar. Best for creatives.', color: '#2d3748' },
    { id: 'corporate', title: 'Corporate', desc: 'Structured. Best for management.', color: '#1A237E' },
  ];

  return (
    <>
    <Helmet>
        <title>Free ATS Resume Builder for Freshers India | Biodata Maker 2025</title>
        <meta name="description" content="Create a professional resume with the best Free ATS Resume Builder for Freshers in India. Perfect resume format for TCS/Infosys. Check resume score free AI." />
        <meta name="keywords" content="Free ATS Resume Builder for Freshers India, Resume format for TCS/Infosys, Check Resume Score Free AI, Biodata maker for job, CV maker India" />
      </Helmet>
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', overflowX: 'hidden', fontFamily: '"Roboto", sans-serif' }}>
      
      {/* === 1. NAVBAR === */}
      <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>
            <Box
              component="img"
              src="/favicon.svg"
              alt="Logo"
              sx={{ width: 32, height: 32, borderRadius: '8px', objectFit: 'cover' }}
            />
              <Typography variant="h5" sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: -0.5 }}>
                Resume<span style={{ color: '#7c3aed' }}>AI</span>
              </Typography>
            </Box>
            <Stack direction="row" spacing={{ xs: 1, md: 2 }}>
               <Button 
                variant="contained" 
                onClick={() => onStart()}
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
  Free ATS Resume Builder <br/>
  <span style={{ background: brandGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>For Freshers in India</span>
</Typography>
          
         <Typography variant="h6" sx={{ mb: 6, color: '#475569', fontWeight: 'normal', maxWidth: '700px', mx: 'auto', lineHeight: 1.6, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
  Land your dream job at top MNCs. Create a resume format for TCS/Infosys or a creative CV for startups. Fast, Easy & AI-Powered.
</Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
            <Button 
              variant="contained" 
              size="large" 
              onClick={() => onStart()}
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
        </Container>
      </Box>

      {/* === ATS BANNER === */}
      <Box sx={{ py: { xs: 8, md: 10 }, px: 2, textAlign: 'center', bgcolor: '#020617', backgroundImage: 'radial-gradient(circle at top, rgba(124,58,237,0.18), transparent 55%)', borderTop: '1px solid rgba(148, 163, 184, 0.25)' }}>
          <Container maxWidth="md">
            <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, mb: 2, borderRadius: '999px', bgcolor: 'rgba(15,23,42,0.85)', border: '1px solid rgba(148,163,184,0.4)', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: '#e5e7eb' }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '999px', bgcolor: '#22c55e', boxShadow: '0 0 0 4px rgba(34,197,94,0.35)' }} />
              Instant ATS Check
            </Box>
            <Typography variant="h4" fontWeight={900} mb={1.5} sx={{ color: '#f9fafb', fontSize: { xs: '1.7rem', md: '2.1rem' } }}>
              Check Resume Score Free AI
            </Typography>
            <Typography mb={3} sx={{ color: '#cbd5e1', maxWidth: 480, mx: 'auto', fontSize: { xs: '0.95rem', md: '1rem' } }}>
              Upload your existing resume and let our AI-powered ATS scanner check its score, keyword match, and readability against Indian job market standards.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'center', alignItems: 'center', gap: 2 }}>
              <Button 
                variant="contained" size="large" onClick={onAtsCheck} startIcon={<Search />}
                sx={{ borderRadius: '999px', px: 4, py: 1.2, fontWeight: 700, textTransform: 'none', boxShadow: '0 18px 40px rgba(88, 28, 135, 0.45)', background: 'linear-gradient(135deg, #7c3aed, #a855f7)', '&:hover': { background: 'linear-gradient(135deg, #6d28d9, #a855f7)', boxShadow: '0 18px 40px rgba(88, 28, 135, 0.7)' } }}
              >
                Check ATS Score Free
              </Button>
            </Box>
            <Typography mt={2.5} sx={{ fontSize: 12, color: '#64748b' }}>We don’t store your resume. It’s processed securely for scoring only.</Typography>
          </Container>
      </Box>

      {/* === HOW IT WORKS (Replaced Grid with Box for TS compatibility) === */}
      <Box sx={{ py: 12, bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
             <Typography variant="h3" fontWeight="800" mb={2} color="#0f172a">How to Create Your Resume</Typography>
             <Typography variant="body1" color="text.secondary">Build a job-winning resume in 3 simple steps.</Typography>
          </Box>

          {/* FIXED LAYOUT */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
             {[
               { icon: <Layout size={32} />, title: "1. Choose a Template", desc: "Select from our recruiter-approved, ATS-friendly designs." },
               { icon: <Sparkles size={32} />, title: "2. Add Smart Content", desc: "Use our AI to auto-fill professional summaries and bullet points." },
               { icon: <Download size={32} />, title: "3. Download & Apply", desc: "Export as a high-quality PDF and start applying instantly." }
             ].map((step, idx) => (
               <Box key={idx}>
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
               </Box>
             ))}
          </Box>
        </Container>
      </Box>

      {/* === 5. AI DEMO === */}
      <Box sx={{ py: 12, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, gap: 8, alignItems: 'center' }}>
            <Box>
              <Chip icon={<Zap size={14} fill="currentColor" />} label="Smart AI Features" sx={{ bgcolor: '#0f172a', color: 'white', fontWeight: 'bold', mb: 2 }} />
              <Typography variant="h3" fontWeight="800" mb={3} color="#0f172a" lineHeight={1.2}>
                Let AI do the work!
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4} fontSize="1.1rem" lineHeight={1.7}>
                Describe your role in a few words, and we'll generate tailored content for your work experience section. No more writer's block.
              </Typography>
              <Button variant="contained" onClick={() => onStart()} size="large" sx={{ bgcolor: '#7c3aed', borderRadius: '8px', fontWeight: 'bold', textTransform: 'none', px: 4 }}>
                Try AI Writer
              </Button>
            </Box>

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
          </Box>
        </Container>
      </Box>

      {/* === 6. TEMPLATE SHOWCASE === */}
      <Box sx={{ py: 12, bgcolor: '#0f172a', color: 'white' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography variant="overline" color="#a855f7" fontWeight="bold" letterSpacing={2}>
              RECRUITER APPROVED
            </Typography>
            <Typography variant="h3" fontWeight="900" my={2}>
              Make a Resume That Gets Results
            </Typography>
            <Typography variant="body1" color="#94a3b8">
              Choose from a wide range of styles including <strong>resume format for TCS/Infosys</strong>.
            </Typography>
          </Box>

          <Stack spacing={4}>
            {templates.map((tpl) => (
              <Box
                key={tpl.id}
                onClick={() => onStart(tpl.id)}
                sx={{
                  cursor: 'pointer',
                  p: 2,
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: '#a855f7',
                    bgcolor: 'rgba(255,255,255,0.08)',
                  },
                }}
              >
                <Box sx={{ height: 220, mb: 2 }}>
                  <TemplatePreviewCard templateId={tpl.id} color={tpl.color} />
                </Box>

                <Typography variant="h6" fontWeight="bold">
                  {tpl.title}
                </Typography>
                <Typography variant="caption" color="#94a3b8">
                  {tpl.desc}
                </Typography>
              </Box>
            ))}
          </Stack>
          <Box display="flex" justifyContent="center" mt={3}>
            <Button 
              variant="outlined" 
              size="large"
              onClick={onBrowse}
              sx={{ 
                color: '#a855f7', 
                borderColor: '#a855f7',
                px: 4, py: 1.5,
                borderRadius: '50px',
                fontWeight: 'bold',
                '&:hover': { 
                  bgcolor: 'rgba(168, 85, 247, 0.1)', 
                  borderColor: '#d8b4fe' 
                }
              }}
            >
              Browse All Templates
            </Button>
          </Box>
        </Container>
      </Box>

      {/* === 7. FAQ === */}
      <Box sx={{ py: 12, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="800" textAlign="center" mb={6} color="#0f172a">Resume Now FAQ</Typography>
          <Stack spacing={2}>
            {[
              { q: "Is this Free ATS Resume Builder for Freshers in India?", a: "Yes! It is specifically designed for the Indian job market, including formats suitable for MNCs like TCS, Wipro, and Infosys." },
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

      {/* === 7.5 SEO CONTENT SECTION === */}
      <Box sx={{ py: 10, bgcolor: '#f1f5f9', borderTop: '1px solid #e2e8f0' }}>
          <Container maxWidth="lg">
            <Typography variant="h4" fontWeight="800" mb={4} color="#0f172a" textAlign="center">
               Why use our Free ATS Resume Builder for Freshers in India?
            </Typography>

            {/* FIXED LAYOUT */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
               <Box>
                 <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: '16px' }}>
                    <Typography variant="h6" fontWeight="bold" mb={2} color="#334155" display="flex" alignItems="center" gap={1}>
                       <CheckCircle2 size={20} color="#7c3aed" /> Perfect Resume Format for TCS, Infosys & MNCs
                    </Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                       Top Indian MNCs use strict ATS software to filter candidates. Our templates are designed specifically to pass these filters. Whether you need a <strong>resume format for TCS/Infosys</strong>, Wipro, or a startup, our builder ensures your skills get noticed. Avoid rejection by using our <strong>ATS compliant templates</strong>.
                    </Typography>
                 </Paper>
               </Box>

               <Box>
                 <Paper elevation={0} sx={{ p: 4, height: '100%', borderRadius: '16px' }}>
                    <Typography variant="h6" fontWeight="bold" mb={2} color="#334155" display="flex" alignItems="center" gap={1}>
                       <CheckCircle2 size={20} color="#7c3aed" /> Biodata Maker for Job & Government Exams
                    </Typography>
                    <Typography variant="body2" color="text.secondary" lineHeight={1.8}>
                       Looking for a traditional format? Use this tool as a <strong>Biodata maker for job</strong> applications in government sectors or traditional Indian companies. Plus, you can <strong>Check Resume Score Free AI</strong> to ensure no errors exist before you apply. It's the best <strong>CV maker India</strong> has for freshers.
                    </Typography>
                 </Paper>
               </Box>
            </Box>
          </Container>
      </Box>

      {/* === 8. FOOTER === */}
      <Box sx={{ py: 6, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
        <Container maxWidth="lg">
           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box
  component="img"
  src="/favicon.svg"
  alt="Logo"
  sx={{ width: 32, height: 32, borderRadius: '8px', objectFit: 'cover' }}
/>
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
    </>
  );
};

export default HomePage;