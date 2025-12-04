import React from 'react';
import { 
  Box, Typography, Button, Container, Grid, Paper, 
  Accordion, AccordionSummary, AccordionDetails, Chip, Stack, Divider, Avatar 
} from '@mui/material';
import { 
  ArrowRight, CheckCircle2, Zap, ShieldCheck, Download, 
  Star, ChevronDown, Sparkles 
} from 'lucide-react';

const HomePage = ({ onStart }) => {
  
  const brandGradient = 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)';

  // --- EXPANDED TEMPLATE LIST WITH IMAGES ---
  // Note: These are demo images. You can replace them with screenshots of your actual templates.
  const templates = [
    { 
      title: 'Modern Blue', 
      desc: 'Clean & minimalist. Best for tech.', 
      image: 'https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg' 
    },
    { 
      title: 'Classic Serif', 
      desc: 'Traditional & elegant. Best for finance.', 
      image: 'https://marketplace.canva.com/EAFcO7D4D-I/1/0/1131w/canva-simple-professional-cv-resume-pL8c7D6S2wM.jpg' 
    },
    { 
      title: 'Swiss Bold', 
      desc: 'Strong sidebar. Best for creatives.', 
      image: 'https://marketplace.canva.com/EAFhHRX56-w/1/0/1131w/canva-grey-minimalist-cv-resume-c_v89z8S4W8.jpg' 
    },
    { 
      title: 'Corporate Gray', 
      desc: 'Structured. Best for management.', 
      image: 'https://marketplace.canva.com/EAFK2t645f4/1/0/1131w/canva-grey-clean-cv-resume-photo-p-c8o5s2t8I.jpg' 
    },
    { 
      title: 'Minimalist', 
      desc: 'Simple and effective.', 
      image: 'https://marketplace.canva.com/EAFHLi015wY/1/0/1131w/canva-white-minimalist-cv-resume-h1I3b6o9l8Y.jpg' 
    },
    { 
      title: 'Tech Dark', 
      desc: 'Modern dark theme for developers.', 
      image: 'https://marketplace.canva.com/EAFW7J5YyC4/1/0/1131w/canva-dark-blue-simple-cv-resume-L-3_K9c4z8Q.jpg' 
    },
    { 
      title: 'Creative Pink', 
      desc: 'Stand out with a splash of color.', 
      image: 'https://marketplace.canva.com/EAF5FX4y5wU/1/0/1131w/canva-pink-minimalist-cv-resume-v9n8X8q8X4k.jpg' 
    },
    { 
      title: 'Executive', 
      desc: 'High-level professional layout.', 
      image: 'https://marketplace.canva.com/EAF4-4Qj4y8/1/0/1131w/canva-beige-minimalist-cv-resume-9X4j8X4k8X4.jpg' 
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', overflowX: 'hidden', fontFamily: '"Roboto", sans-serif' }}>
      
      {/* === 1. NAVBAR === */}
      <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>
              {/* LOGO IMAGE */}
        <Box 
          component="img"
          src="/assets/logo.png" 
          alt="Brand Logo"
          sx={{ width: 36, height: 36, borderRadius: '8px', objectFit: 'cover' }}
        />
              <Typography variant="h5" sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: -0.5 }}>
                Resume<span style={{ color: '#7c3aed' }}>AI</span>
              </Typography>
            </Box>
            <Stack direction="row" spacing={{ xs: 1, md: 2 }}>
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
        {/* Background Blurs */}
        <Box sx={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, rgba(255,255,255,0) 70%)', zIndex: -1 }} />
        <Box sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, rgba(255,255,255,0) 70%)', zIndex: -1 }} />

        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Chip 
            label="✨ Voted #1 Easiest Resume Builder" 
            sx={{ mb: 3, bgcolor: '#f5f3ff', color: '#7c3aed', fontWeight: 'bold', border: '1px solid #e9d5ff', px: 1 }} 
          />
          
          <Typography variant="h1" sx={{ fontWeight: '900', mb: 3, lineHeight: 1.1, fontSize: { xs: '2.5rem', md: '4.5rem' }, color: '#0f172a' }}>
            Build a Professional Resume <br/>
            <span style={{ background: brandGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>in Minutes, Not Hours.</span>
          </Typography>
          
          <Typography variant="h6" sx={{ mb: 6, color: '#64748b', fontWeight: 'normal', maxWidth: '650px', mx: 'auto', lineHeight: 1.6, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Stop struggling with Word templates. Use our AI-assisted builder to create ATS-friendly resumes that get you hired at top companies.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
            <Button 
              variant="contained" 
              size="large" 
              onClick={onStart}
              endIcon={<ArrowRight size={20} />}
              sx={{ 
                py: 2, px: 5, 
                fontSize: '1.1rem', 
                borderRadius: '12px', 
                background: '#0f172a', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                textTransform: 'none',
                fontWeight: 'bold',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': { background: '#1e293b', transform: 'translateY(-2px)' }
              }}
            >
              Create My Resume Now
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64748b', mt: { xs: 2, sm: 0 } }}>
              <CheckCircle2 size={20} color="#16a34a" fill="#dcfce7" />
              <Typography variant="body2" fontWeight="600">No Sign-up Required</Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
             <Stack direction="row" spacing={-1}>
                {[1,2,3,4].map((i) => (
                  <Avatar key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} sx={{ width: 32, height: 32, border: '2px solid white' }} />
                ))}
                <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#f1f5f9', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold', color: '#64748b' }}>+2k</Box>
             </Stack>
             <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                <Typography variant="caption" fontWeight="bold" color="text.primary" ml={0.5}>4.9/5 Rating</Typography>
             </Box>
          </Box>
        </Container>
      </Box>

      {/* === 4. FEATURE HIGHLIGHT (AI & ATS) === */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            
            {/* Left: Text Content */}
            <Grid item xs={12} md={5}>
              <Chip icon={<Sparkles size={14} />} label="Smart AI Writer" sx={{ bgcolor: '#eff6ff', color: '#3b82f6', fontWeight: 'bold', mb: 2, border: '1px solid #dbeafe' }} />
              <Typography variant="h3" fontWeight="800" mb={3} color="#0f172a" lineHeight={1.2}>
                Write like a Pro,<br/> without the effort.
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={4} fontSize="1.1rem" lineHeight={1.7}>
                Struggling to describe your experience? Our AI transforms basic job descriptions into powerful, result-oriented bullet points that impress recruiters and pass ATS scans.
              </Typography>
              
              <Stack spacing={2} mb={4}>
                {[
                  "Auto-generate summaries & skill lists",
                  "Fix grammar & professional tone",
                  "Keywords optimized for ATS algorithms"
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ p: 0.5, borderRadius: '50%', bgcolor: '#dcfce7' }}><CheckCircle2 size={16} color="#16a34a" /></Box>
                    <Typography fontWeight="500" color="#334155">{item}</Typography>
                  </Box>
                ))}
              </Stack>

              <Button variant="outlined" color="primary" onClick={onStart} size="large" sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '10px', border: '2px solid' }}>
                Try AI Writer Free
              </Button>
            </Grid>

            {/* Right: Visual Demo */}
            <Grid item xs={12} md={7}>
              <Box sx={{ position: 'relative' }}>
                {/* Background Blob */}
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 0%, rgba(255,255,255,0) 70%)', zIndex: 0 }} />
                
                <Stack spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
                  {/* Before Card */}
                  <Paper elevation={0} sx={{ p: 3, borderLeft: '4px solid #ef4444', bgcolor: '#fef2f2', borderRadius: '12px', opacity: 0.8, transform: 'scale(0.95)' }}>
                    <Typography variant="caption" fontWeight="bold" color="#ef4444" display="flex" alignItems="center" gap={1} mb={1}>
                      ❌ BEFORE
                    </Typography>
                    <Typography variant="body1" color="#7f1d1d" fontFamily="monospace">
                      "I managed a team of sales people."
                    </Typography>
                  </Paper>
                  
                  {/* Arrow */}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                     <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: '50%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', color: '#7c3aed' }}>
                       <Sparkles size={24} fill="currentColor" />
                     </Box>
                  </Box>

                  {/* After Card */}
                  <Paper elevation={10} sx={{ p: 4, borderLeft: '4px solid #16a34a', bgcolor: 'white', borderRadius: '16px' }}>
                    <Chip label="✨ AI Enhanced" size="small" sx={{ float: 'right', bgcolor: '#dcfce7', color: '#16a34a', fontWeight: 'bold' }} />
                    <Typography variant="caption" fontWeight="bold" color="#16a34a" display="flex" alignItems="center" gap={1} mb={1}>
                      ✅ AFTER
                    </Typography>
                    <Typography variant="body1" fontWeight="500" color="#0f172a" fontSize="1.1rem" lineHeight={1.6}>
                      "Spearheaded a high-performing sales team of 15+, driving a <span style={{backgroundColor: '#dcfce7', padding: '0 4px'}}>40% increase in annual revenue</span> through strategic mentorship and process optimization."
                    </Typography>
                  </Paper>
                </Stack>
              </Box>
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* === 5. TEMPLATE GALLERY (UPDATED) === */}
      <Box sx={{ py: 12, bgcolor: '#0f172a', color: 'white' }}>
        <Container maxWidth="lg">
           <Box textAlign="center" mb={8}>
              <Typography variant="overline" color="#a855f7" fontWeight="bold" letterSpacing={2}>PREMIUM DESIGNS</Typography>
              <Typography variant="h3" fontWeight="900" my={2}>Pick a template. Any template.</Typography>
              <Typography variant="body1" color="#94a3b8" maxWidth="600px" mx="auto">
                Select from our recruiter-approved layouts. Clean, modern, and optimized for readability.
              </Typography>
           </Box>
           
           <Grid container spacing={3}>
             {templates.map((tpl, idx) => (
               <Grid item xs={12} sm={6} md={3} key={idx}>
                 <Box 
                   onClick={onStart}
                   sx={{ 
                     cursor: 'pointer',
                     position: 'relative',
                     overflow: 'hidden',
                     borderRadius: '16px',
                     border: '4px solid transparent',
                     transition: 'all 0.3s',
                     '&:hover': { 
                       transform: 'translateY(-8px)', 
                       borderColor: '#a855f7',
                       boxShadow: '0 10px 30px -5px rgba(168, 85, 247, 0.4)'
                     }
                   }}
                 >
                    <Box sx={{ 
                      height: 320, // Increased height for resume preview
                      bgcolor: '#e2e8f0', 
                      backgroundImage: `url(${tpl.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'top center',
                    }} />
                    
                    {/* Overlay Info */}
                    <Box sx={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      width: '100%', 
                      background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)',
                      p: 3,
                      pt: 8
                    }}>
                      <Typography variant="h6" fontWeight="bold" color="white">{tpl.title}</Typography>
                      <Typography variant="body2" color="rgba(255,255,255,0.7)" fontSize="0.85rem">{tpl.desc}</Typography>
                    </Box>
                 </Box>
               </Grid>
             ))}
           </Grid>
        </Container>
      </Box>

      {/* === 6. PRICING SECTION (No Monthly Fees) === */}
      <Box sx={{ py: 12, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
           <Paper elevation={0} sx={{ 
             p: { xs: 4, md: 8 }, 
             borderRadius: '32px', 
             background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
             border: '1px solid #e2e8f0',
             textAlign: 'center',
             position: 'relative',
             overflow: 'hidden',
             boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
           }}>
              <Typography variant="overline" color="#16a34a" fontWeight="bold" letterSpacing={2}>SIMPLE & TRANSPARENT</Typography>
              <Typography variant="h3" fontWeight="900" my={2} color="#0f172a">Pay once. Use forever.</Typography>
              <Typography variant="body1" color="text.secondary" mb={5} maxWidth="500px" mx="auto">
                No monthly subscriptions. No hidden fees. Build your resume for free, pay only when you are ready to download.
              </Typography>

              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 4, bgcolor: '#0f172a', borderRadius: '24px', color: 'white', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
                     <Box sx={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, bgcolor: '#7c3aed', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.5 }} />
                     
                     <Typography variant="h6" fontWeight="bold" mb={1}>Premium Download</Typography>
                     <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 3 }}>
                        <Typography variant="h3" fontWeight="800">₹30</Typography>
                        <Typography variant="body2" color="#94a3b8">/ download</Typography>
                     </Box>
                     
                     <Stack spacing={2} mb={4}>
                        {['Unlimited AI Suggestions', 'PDF Export (High Quality)', 'No Watermark', 'ATS Optimized Layout'].map(feat => (
                          <Box key={feat} sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                            <CheckCircle2 size={18} color="#4ade80" />
                            <Typography variant="body2" fontWeight="500" color="#e2e8f0">{feat}</Typography>
                          </Box>
                        ))}
                     </Stack>
                     
                     <Button 
                       fullWidth 
                       variant="contained" 
                       size="large"
                       onClick={onStart}
                       sx={{ 
                         bgcolor: '#7c3aed', 
                         color: 'white', 
                         fontWeight: 'bold',
                         py: 1.5,
                         '&:hover': { bgcolor: '#6d28d9' }
                       }}
                     >
                       Create Resume
                     </Button>
                  </Box>
                </Grid>
              </Grid>
              
              <Typography variant="caption" display="block" mt={3} color="text.secondary">
                Secure payment via Razorpay • 100% Money-back guarantee if not satisfied
              </Typography>
           </Paper>
        </Container>
      </Box>

      {/* === 7. FAQ SECTION === */}
      <Box sx={{ py: 10, bgcolor: '#f8fafc' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="800" textAlign="center" mb={6} color="#0f172a">Frequently Asked Questions</Typography>
          
          <Stack spacing={2}>
            {[
              { q: "Is this resume builder really free to try?", a: "Yes! You can build your resume, try all templates, and use the AI features for free. You only pay ₹30 when you are ready to download the final PDF." },
              { q: "Can I edit my resume after downloading?", a: "Since the download is a PDF file, you cannot edit the file directly. However, your data is saved in your browser, so you can come back, make edits, and download again." },
              { q: "Is the payment secure?", a: "Absolutely. We use Razorpay, India's leading payment gateway, which uses industry-standard encryption to process your payment securely." },
              { q: "Does it work for freshers?", a: "Yes! Our templates are designed to highlight skills and education, making them perfect for students and freshers with little work experience." }
            ].map((item, index) => (
              <Accordion key={index} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '12px !important', '&:before': { display: 'none' }, bgcolor: 'white' }}>
                <AccordionSummary expandIcon={<ChevronDown color="#94a3b8" />}>
                  <Typography fontWeight="bold" color="#334155">{item.q}</Typography>
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
      <Box sx={{ py: 2, bgcolor: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
        <Container maxWidth="lg">
           <Divider sx={{ my: 6, borderColor: '#f1f5f9' }} />
           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
             <Typography variant="caption" color="text.secondary">
               © 2025 ResumeAI Builder. All rights reserved.
             </Typography>
           </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default HomePage;