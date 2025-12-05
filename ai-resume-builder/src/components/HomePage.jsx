import React, { useState, useRef, useMemo, forwardRef, useEffect } from 'react';
import { 
  Box, Paper, Button, Typography, Stack, Grid, Chip, Avatar, Divider,
  FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel,
  Container, IconButton, useMediaQuery, Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { 
  Download, ArrowLeft, Mail, Phone, MapPin, Linkedin, Globe, 
  Layout, Palette, Type, Maximize2, Minimize2, User, Sparkles, CheckCircle2, Star, ArrowRight, ChevronDown, ShieldCheck, Zap
} from 'lucide-react';
// Loaded via CDN in useEffect
import dayjs from 'dayjs';

// ==========================================
// 1. THE DESIGN SYSTEM (Configuration Matrix)
// ==========================================

// A. Typography Systems (Font Pairings)
const TYPOGRAPHY_SYSTEMS = {
  modern: { id: 'modern', label: 'Clean Sans', family: '"Inter", "Roboto", sans-serif' },
  serif:  { id: 'serif',  label: 'Elegant Serif', family: '"Merriweather", "Georgia", serif' },
  mono:   { id: 'mono',   label: 'Tech Mono', family: '"Fira Code", "Courier New", monospace' },
  system: { id: 'system', label: 'System UI', family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
  slab:   { id: 'slab',   label: 'Bold Slab', family: '"Roboto Slab", serif' },
};

// B. Color Palettes (Curated for Professionalism)
const COLOR_SYSTEMS = {
  blue:   { id: 'blue',   label: 'Executive Blue', primary: '#0B57D0', secondary: '#E8F0FE' },
  purple: { id: 'purple', label: 'Creative Purple', primary: '#7c3aed', secondary: '#F3E8FF' },
  green:  { id: 'green',  label: 'Nature Green',   primary: '#059669', secondary: '#ECFDF5' },
  slate:  { id: 'slate',  label: 'Minimal Slate',  primary: '#1f2937', secondary: '#F3F4F6' },
  red:    { id: 'red',    label: 'Bold Red',       primary: '#dc2626', secondary: '#FEF2F2' },
};

// C. Layout Definitions
const LAYOUTS = {
  modern:    { id: 'modern',    label: 'Modern Accent' },
  classic:   { id: 'classic',   label: 'Classic Serif' },
  swiss:     { id: 'swiss',     label: 'Swiss Bold' },
  corporate: { id: 'corporate', label: 'Corporate Split' },
};

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================

const wrapTextStyle = { whiteSpace: 'pre-wrap', wordBreak: 'break-word' };

const formatDate = (date, format = 'MMM YYYY') => {
  if (!date) return 'Present';
  const d = dayjs(date);
  return d.isValid() ? d.format(format) : date;
};

// ==========================================
// 3. THE TEMPLATES (Refined & Unified)
// ==========================================

// --- TEMPLATE 1: MODERN (Left Accent) ---
const TemplateModern = forwardRef(({ data, theme, config }, ref) => {
  const { accentColor, font } = theme;
  const spacing = config.density === 'compact' ? 1 : 2; 

  const SectionTitle = ({ children }) => (
    <Typography variant="h6" sx={{ 
      fontWeight: 700, color: accentColor, letterSpacing: 0.5, 
      mb: 1, borderBottom: `2px solid ${accentColor}22`, pb: 0.5, 
      textTransform: 'uppercase', fontSize: config.density === 'compact' ? '0.9rem' : '1.1rem'
    }}>
      {children}
    </Typography>
  );

  return (
    <Paper ref={ref} elevation={0} sx={{ p: 4, fontFamily: font, minHeight: '100%', color: '#222', borderLeft: `8px solid ${accentColor}` }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        {data.personalInfo.photo && (
          <Avatar src={data.personalInfo.photo} sx={{ width: 120, height: 120, mx: 'auto', mb: 2, border: `3px solid ${accentColor}` }} />
        )}
        <Typography variant="h3" sx={{ fontWeight: 800, color: accentColor, letterSpacing: -0.5, mb: 1, fontSize: '2.5rem' }}>
          {data.personalInfo.fullName}
        </Typography>
        <Typography variant="body1" sx={{ color: '#555', mb: 1 }}>{data.personalInfo.address}</Typography>
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ fontSize: '0.9rem', flexWrap: 'wrap' }}>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.email}</span>
          {data.personalInfo.linkedin && <span style={{ color: accentColor }}>LinkedIn</span>}
        </Stack>
      </Box>

      {/* Sections */}
      {data.sectionOrder.map(sec => {
        if (sec === 'summary' && data.visibleSections.summary) {
          return <Box key="sum" sx={{ mb: spacing + 1 }}><SectionTitle>Summary</SectionTitle><Typography variant="body2">{data.summary}</Typography></Box>;
        }
        if (sec === 'experience' && data.visibleSections.experience) {
          return (
            <Box key="exp" sx={{ mb: spacing + 1 }}>
              <SectionTitle>Experience</SectionTitle>
              {data.experience.map(exp => (
                <Box key={exp.id} sx={{ mb: spacing, pl: 2, borderLeft: `2px solid ${accentColor}44` }}>
                  <Typography variant="subtitle1" fontWeight={700}>{exp.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{exp.company} | {exp.location}</Typography>
                  <Typography variant="caption" display="block" sx={{ mb: 0.5, fontStyle: 'italic' }}>
                    {formatDate(exp.startDate)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate)}
                  </Typography>
                  <Typography variant="body2">{exp.description}</Typography>
                </Box>
              ))}
            </Box>
          );
        }
        if (sec === 'skills' && data.visibleSections.skills) {
           return <Box key="skill" sx={{ mb: spacing }}><SectionTitle>Skills</SectionTitle><Box display="flex" gap={1} flexWrap="wrap">{data.skills.map(s => <Chip key={s} label={s} size="small" sx={{ bgcolor: `${accentColor}15`, color: accentColor, fontWeight: 600 }} />)}</Box></Box>
        }
        if (sec === 'education' && data.visibleSections.education) {
           return <Box key="edu" sx={{ mb: spacing }}><SectionTitle>Education</SectionTitle>{data.education.map(e => <Box key={e.id} mb={1}><Typography fontWeight={700}>{e.degree}</Typography><Typography variant="body2">{e.school}, {e.year}</Typography></Box>)}</Box>
        }
        return null;
      })}
    </Paper>
  );
});

// --- TEMPLATE 2: SWISS (Bold Header) ---
const TemplateSwiss = forwardRef(({ data, theme, config }, ref) => {
  const { accentColor, font } = theme;
  const spacing = config.density === 'compact' ? 2 : 3;

  return (
    <Paper ref={ref} elevation={0} sx={{ minHeight: '100%', fontFamily: font, bgcolor: '#fff' }}>
      {/* Bold Header */}
      <Box sx={{ bgcolor: accentColor, color: 'white', p: { xs: 3, sm: 5 }, display: 'flex', gap: 3, alignItems: 'center' }}>
        <Box flex={1}>
          <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -1, lineHeight: 1, mb: 1, fontSize: '3rem' }}>
            {data.personalInfo.fullName}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>{data.personalInfo.role || 'Professional Role'}</Typography>
          <Grid container spacing={1} sx={{ mt: 2, opacity: 0.9, fontSize: '0.85rem' }}>
             <Grid item xs={6}>📧 {data.personalInfo.email}</Grid>
             <Grid item xs={6}>📱 {data.personalInfo.phone}</Grid>
             <Grid item xs={12}>📍 {data.personalInfo.address}</Grid>
          </Grid>
        </Box>
        {data.personalInfo.photo && (
          <Avatar src={data.personalInfo.photo} sx={{ width: 130, height: 130, border: '4px solid white', borderRadius: 0 }} />
        )}
      </Box>

      {/* Body */}
      <Box sx={{ p: { xs: 3, sm: 5 } }}>
        {data.sectionOrder.map(sec => {
           if (sec === 'summary' && data.visibleSections.summary) {
             return <Box key="sum" sx={{ mb: spacing }}><Typography fontWeight={700} textTransform="uppercase" letterSpacing={1} mb={1}>Profile</Typography><Typography>{data.summary}</Typography></Box>
           }
           if (sec === 'experience' && data.visibleSections.experience) {
             return (
               <Box key="exp" sx={{ mb: spacing }}>
                 <Typography variant="h6" sx={{ fontWeight: 900, mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>Experience</Typography>
                 {data.experience.map(exp => (
                   <Grid container key={exp.id} spacing={2} sx={{ mb: 2 }}>
                     <Grid item xs={3}><Typography variant="body2" fontWeight={700} color="text.secondary">{formatDate(exp.startDate)} - {exp.isPresent ? 'Now' : formatDate(exp.endDate)}</Typography></Grid>
                     <Grid item xs={9}>
                       <Typography variant="h6" fontSize="1.1rem" fontWeight={800}>{exp.title}</Typography>
                       <Typography variant="subtitle2" color={accentColor} gutterBottom>{exp.company}</Typography>
                       <Typography variant="body2">{exp.description}</Typography>
                     </Grid>
                   </Grid>
                 ))}
                 <Divider sx={{ my: 3 }} />
               </Box>
             )
           }
           if (sec === 'skills' && data.visibleSections.skills) {
             return <Box key="sk" sx={{ mb: spacing }}><Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>SKILLS</Typography><Typography fontWeight={500}>{data.skills.join('  •  ')}</Typography></Box>
           }
           return null;
        })}
      </Box>
    </Paper>
  );
});

// --- TEMPLATE 3: CORPORATE (Sidebar) ---
const TemplateCorporate = forwardRef(({ data, theme, config }, ref) => {
  const { accentColor, font } = theme;
  
  const SidebarSection = ({ title, children }) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: accentColor, textTransform: 'uppercase', mb: 1, letterSpacing: 1 }}>{title}</Typography>
      {children}
    </Box>
  );

  return (
    <Paper ref={ref} elevation={0} sx={{ minHeight: '100%', display: 'flex', fontFamily: font, bgcolor: 'white' }}>
      {/* Sidebar */}
      <Box sx={{ width: '32%', bgcolor: '#f8fafc', p: 4, borderRight: '1px solid #e2e8f0' }}>
        {data.personalInfo.photo && (
          <Avatar src={data.personalInfo.photo} sx={{ width: 100, height: 100, mb: 3 }} />
        )}
        <SidebarSection title="Contact">
          <Stack spacing={1} fontSize="0.85rem" color="#475569">
            <Box>{data.personalInfo.email}</Box>
            <Box>{data.personalInfo.phone}</Box>
            <Box>{data.personalInfo.address}</Box>
          </Stack>
        </SidebarSection>
        {data.visibleSections.skills && (
          <SidebarSection title="Skills">
            <Box display="flex" flexWrap="wrap" gap={1}>
              {data.skills.map(s => <Chip key={s} label={s} size="small" sx={{ bgcolor: 'white', border: '1px solid #cbd5e1' }} />)}
            </Box>
          </SidebarSection>
        )}
        {/* Placeholder for Education in Sidebar */}
        <SidebarSection title="Education">
           {data.education.map(edu => <Box key={edu.id} mb={1}><Typography fontWeight={700} fontSize="0.85rem">{edu.degree}</Typography><Typography fontSize="0.8rem">{edu.school}</Typography></Box>)}
        </SidebarSection>
      </Box>

      {/* Main Content */}
      <Box sx={{ width: '68%', p: 5 }}>
        <Box sx={{ mb: 5, borderBottom: `2px solid ${accentColor}`, pb: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>{data.personalInfo.fullName}</Typography>
          <Typography variant="h6" sx={{ color: accentColor }}>{data.personalInfo.linkedin}</Typography>
        </Box>
        
        {data.visibleSections.summary && <Box mb={4}><Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: '#334155' }}>PROFILE</Typography><Typography variant="body2">{data.summary}</Typography></Box>}
        
        {data.visibleSections.experience && (
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#334155' }}>WORK HISTORY</Typography>
            {data.experience.map(exp => (
              <Box key={exp.id} sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight={700} fontSize="1.1rem">{exp.title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                  <Typography fontWeight={600} color={accentColor}>{exp.company}</Typography>
                  <Divider orientation="vertical" flexItem />
                  <Typography variant="caption">{formatDate(exp.startDate)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate)}</Typography>
                </Stack>
                <Typography variant="body2">{exp.description}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
});

// --- TEMPLATE 4: CLASSIC (Traditional) ---
const TemplateClassic = forwardRef(({ data, theme, config }, ref) => {
  const { accentColor, font } = theme;
  const isCompact = config.density === 'compact';

  return (
    <Paper ref={ref} elevation={0} sx={{ minHeight: '100%', p: 5, fontFamily: font, textAlign: 'center', color: '#000' }}>
      <Box sx={{ borderBottom: `1px solid ${accentColor}`, pb: 3, mb: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, mb: 1, color: accentColor }}>{data.personalInfo.fullName}</Typography>
        <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>{data.personalInfo.address} | {data.personalInfo.email} | {data.personalInfo.phone}</Typography>
      </Box>

      <Box sx={{ textAlign: 'left' }}>
        {data.sectionOrder.map(sec => {
          if (sec === 'summary' && data.visibleSections.summary) {
             return <Box key="sum" sx={{ mb: 3 }}><Typography variant="h6" sx={{ fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #ccc', mb: 1 }}>Profile</Typography><Typography>{data.summary}</Typography></Box>
          }
          if (sec === 'experience' && data.visibleSections.experience) {
            return (
              <Box key="exp" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #ccc', mb: 2 }}>Professional Experience</Typography>
                {data.experience.map(exp => (
                  <Box key={exp.id} sx={{ mb: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="baseline">
                      <Typography variant="h6" fontSize="1.05rem" fontWeight={700}>{exp.title}</Typography>
                      <Typography variant="body2" fontStyle="italic">{formatDate(exp.startDate)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate)}</Typography>
                    </Box>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>{exp.company}</Typography>
                    <Typography variant="body2">{exp.description}</Typography>
                  </Box>
                ))}
              </Box>
            )
          }
          if (sec === 'skills' && data.visibleSections.skills) {
             return <Box key="sk" sx={{ mb: 3 }}><Typography variant="h6" sx={{ fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #ccc', mb: 1 }}>Skills</Typography><Typography>{data.skills.join(' • ')}</Typography></Box>
          }
          return null;
        })}
      </Box>
    </Paper>
  );
});

// ==========================================
// 4. MAIN APP COMPONENT & HOMEPAGE
// ==========================================

const initialData = {
  personalInfo: { 
    fullName: 'Alex Morgan', 
    email: 'alex.morgan@example.com', 
    phone: '+1 (555) 123-4567', 
    address: 'San Francisco, CA', 
    linkedin: 'linkedin.com/in/alexmorgan', 
    photo: null 
  },
  summary: 'Creative and detail-oriented Product Designer with 5+ years of experience in building user-centric digital products. Passionate about solving complex problems through elegant design solutions.',
  experience: [
    { id: 1, title: 'Senior UX Designer', company: 'TechFlow', location: 'Remote', startDate: '2021-01', endDate: '', isPresent: true, description: 'Leading the design system initiative and mentoring junior designers. Improved user retention by 25%.' },
    { id: 2, title: 'Product Designer', company: 'Creative Pulse', location: 'NYC', startDate: '2018-06', endDate: '2020-12', isPresent: false, description: 'Collaborated with cross-functional teams to launch 3 major mobile applications.' },
  ],
  education: [{ id: 1, degree: 'BFA Design', school: 'California College of Arts', year: '2018' }],
  skills: ['Figma', 'React', 'Prototyping', 'User Research', 'HTML/CSS'],
  sectionOrder: ['summary', 'experience', 'education', 'skills'],
  visibleSections: { summary: true, experience: true, education: true, skills: true }
};

// --- NEW HOMEPAGE COMPONENT ---
const HomePage = ({ onStart }) => {
  const brandGradient = 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)';

  // Reliable placeholders using images
  const templates = [
    { 
      id: 'modern',
      title: 'Modern Blue', 
      desc: 'Clean & minimalist with accent lines.', 
      image: 'https://placehold.co/400x520/f1f5f9/1e293b.png?text=Modern+Accent' 
    },
    { 
      id: 'classic',
      title: 'Classic Serif', 
      desc: 'Traditional elegance for banking & law.', 
      image: 'https://placehold.co/400x520/e2e8f0/1e293b.png?text=Classic+Serif' 
    },
    { 
      id: 'swiss',
      title: 'Swiss Bold', 
      desc: 'Strong typography & clear hierarchy.', 
      image: 'https://placehold.co/400x520/f8fafc/1e293b.png?text=Swiss+Bold' 
    },
    { 
      id: 'corporate',
      title: 'Corporate Split', 
      desc: 'Professional sidebar layout for tech.', 
      image: 'https://placehold.co/400x520/f1f5f9/1e293b.png?text=Corporate+Sidebar' 
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', overflowX: 'hidden', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Navbar */}
      <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>
              <Layout color="#7c3aed" />
              <Typography variant="h5" sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: -0.5 }}>
                Resume<span style={{ color: '#7c3aed' }}>AI</span>
              </Typography>
            </Box>
            <Button 
                variant="contained" 
                onClick={() => onStart('modern')} // Default to modern if clicked here
                sx={{ 
                  bgcolor: '#7c3aed', 
                  borderRadius: '50px', 
                  textTransform: 'none', 
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#6d28d9' } 
                }}
              >
                Build My Resume
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Hero */}
      <Box sx={{ pt: { xs: 8, md: 14 }, pb: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Chip label="✨ Voted #1 Easiest Resume Builder" sx={{ mb: 3, bgcolor: '#f5f3ff', color: '#7c3aed', fontWeight: 'bold' }} />
          <Typography variant="h1" sx={{ fontWeight: '900', mb: 3, lineHeight: 1.1, fontSize: { xs: '2.5rem', md: '4.5rem' }, color: '#0f172a' }}>
            Build a Professional Resume <br/>
            <span style={{ background: brandGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>in Minutes.</span>
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, color: '#64748b', fontWeight: 'normal', maxWidth: '650px', mx: 'auto' }}>
            Select a template below to start building your ATS-friendly resume.
          </Typography>
          <Button 
              variant="contained" 
              size="large" 
              onClick={() => onStart('modern')}
              endIcon={<ArrowRight size={20} />}
              sx={{ 
                py: 2, px: 5, 
                fontSize: '1.1rem', 
                borderRadius: '12px', 
                background: '#0f172a', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': { background: '#1e293b', transform: 'translateY(-2px)' }
              }}
            >
              Create My Resume Now
            </Button>
        </Container>
      </Box>

      {/* === FEATURE HIGHLIGHT (AI & ATS) === */}
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

              <Button variant="outlined" color="primary" onClick={() => onStart('modern')} size="large" sx={{ textTransform: 'none', fontWeight: 'bold', borderRadius: '10px', border: '2px solid' }}>
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

      {/* === TEMPLATE GALLERY (With IMG tags for reliability) === */}
      <Box sx={{ py: 12, bgcolor: '#0f172a', color: 'white' }} id="templates">
        <Container maxWidth="lg">
           <Box textAlign="center" mb={8}>
              <Typography variant="overline" color="#a855f7" fontWeight="bold" letterSpacing={2}>PREMIUM DESIGNS</Typography>
              <Typography variant="h3" fontWeight="900" my={2}>Pick a template. Any template.</Typography>
              <Typography variant="body1" color="#94a3b8" maxWidth="600px" mx="auto">
                Select from our recruiter-approved layouts. Clean, modern, and optimized for readability.
              </Typography>
           </Box>
           
           <Grid container spacing={3}>
             {templates.map((tpl) => (
               <Grid item xs={12} sm={6} md={3} key={tpl.id}>
                 <Box 
                   onClick={() => onStart(tpl.id)} // Pass ID to the starter function
                   sx={{ 
                     cursor: 'pointer',
                     position: 'relative',
                     borderRadius: '16px',
                     overflow: 'hidden',
                     border: '4px solid transparent',
                     transition: 'all 0.3s',
                     bgcolor: 'white', // fallback
                     '&:hover': { 
                       transform: 'translateY(-8px)', 
                       borderColor: '#a855f7',
                       boxShadow: '0 10px 30px -5px rgba(168, 85, 247, 0.4)'
                     }
                   }}
                 >
                    {/* Using direct IMG tag instead of backgroundImage for reliability */}
                    <Box 
                      component="img"
                      src={tpl.image}
                      alt={tpl.title}
                      sx={{ 
                        width: '100%',
                        height: 320, 
                        objectFit: 'cover',
                        bgcolor: '#e2e8f0',
                        display: 'block'
                      }} 
                    />
                    
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

      {/* === PRICING SECTION === */}
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
                       onClick={() => onStart('modern')}
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

      {/* === FAQ SECTION === */}
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

      {/* === FOOTER === */}
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

export default function App() {
  const [view, setView] = useState('home'); // 'home' or 'builder'
  
  // CONFIGURATION STATE
  const [config, setConfig] = useState({
    layout: 'modern',
    color: 'blue',
    font: 'modern',
    density: 'comfortable',
  });

  const [resumeData, setResumeData] = useState(initialData);
  const previewRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:900px)');

  const activeLayout = LAYOUTS[config.layout];
  const activeColor = COLOR_SYSTEMS[config.color];
  const activeFont = TYPOGRAPHY_SYSTEMS[config.font];

  // Load html2pdf script via CDN dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleStartBuilder = (layoutId = 'modern') => {
    setConfig(prev => ({ ...prev, layout: layoutId }));
    setView('builder');
    window.scrollTo(0, 0);
  };

  const handleDownload = () => {
    if (window.html2pdf) {
      const element = previewRef.current;
      const opt = { 
        margin: 0, 
        filename: `resume_${config.layout}.pdf`, 
        image: { type: 'jpeg', quality: 0.98 }, 
        html2canvas: { scale: 2, useCORS: true }, 
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
      };
      window.html2pdf().from(element).set(opt).save();
    } else {
      alert("PDF Generator is still loading. Please try again in a moment.");
    }
  };

  // Render the active template dynamically
  const renderTemplate = () => {
    const props = { 
      data: resumeData, 
      theme: { accentColor: activeColor.primary, fontFamily: activeFont.family },
      config: config, 
      ref: previewRef 
    };

    switch(config.layout) {
      case 'modern': return <TemplateModern {...props} />;
      case 'swiss': return <TemplateSwiss {...props} />;
      case 'corporate': return <TemplateCorporate {...props} />;
      case 'classic': return <TemplateClassic {...props} />;
      default: return <TemplateModern {...props} />;
    }
  };

  if (view === 'home') {
    return <HomePage onStart={handleStartBuilder} />;
  }

  return (
    <ThemeProvider theme={createTheme({ palette: { primary: { main: '#6d28d9' } } })}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>
        
        {/* Builder Navbar */}
        <Paper elevation={1} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <Stack direction="row" alignItems="center" spacing={1} onClick={() => setView('home')} sx={{ cursor: 'pointer' }}>
            <ArrowLeft color="#64748b" />
            <Typography variant="h6" fontWeight="800" color="#1e293b">Back to Home</Typography>
          </Stack>
          <Button variant="contained" startIcon={<Download size={18} />} onClick={handleDownload}>Download PDF</Button>
        </Paper>

        <Grid container sx={{ flexGrow: 1, height: 'calc(100vh - 80px)' }}>
          
          {/* LEFT: CONFIGURATION PANEL */}
          <Grid item xs={12} md={3} sx={{ bgcolor: 'white', borderRight: '1px solid #e5e7eb', p: 3, overflowY: 'auto' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3, fontWeight: 700, letterSpacing: 1 }}>CONFIGURATION MATRIX</Typography>
            
            <Stack spacing={4}>
              
              {/* 1. LAYOUT */}
              <Box>
                <Typography variant="body2" fontWeight={600} mb={1} display="flex" alignItems="center" gap={1}><Layout size={16}/> Layout Structure</Typography>
                <Grid container spacing={1}>
                  {Object.values(LAYOUTS).map(l => (
                    <Grid item xs={6} key={l.id}>
                      <Chip 
                        label={l.label} 
                        onClick={() => setConfig({...config, layout: l.id})}
                        variant={config.layout === l.id ? 'filled' : 'outlined'}
                        color={config.layout === l.id ? 'primary' : 'default'}
                        sx={{ width: '100%', cursor: 'pointer' }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>

              <Divider />

              {/* 2. COLOR THEME */}
              <Box>
                <Typography variant="body2" fontWeight={600} mb={1} display="flex" alignItems="center" gap={1}><Palette size={16}/> Color Theme</Typography>
                <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                  {Object.values(COLOR_SYSTEMS).map(c => (
                    <Box 
                      key={c.id} 
                      onClick={() => setConfig({...config, color: c.id})}
                      sx={{ 
                        width: 32, height: 32, borderRadius: '50%', bgcolor: c.primary, 
                        cursor: 'pointer', border: config.color === c.id ? '3px solid #000' : '1px solid #ddd',
                        transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.1)' }
                      }}
                      title={c.label}
                    />
                  ))}
                </Stack>
              </Box>

              <Divider />

              {/* 3. TYPOGRAPHY */}
              <Box>
                <Typography variant="body2" fontWeight={600} mb={1} display="flex" alignItems="center" gap={1}><Type size={16}/> Typography</Typography>
                <FormControl fullWidth size="small">
                  <Select value={config.font} onChange={(e) => setConfig({...config, font: e.target.value})}>
                    {Object.values(TYPOGRAPHY_SYSTEMS).map(t => (
                      <MenuItem key={t.id} value={t.id} sx={{ fontFamily: t.family }}>{t.label}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Divider />

              {/* 4. DENSITY & EXTRAS */}
              <Box>
                <Typography variant="body2" fontWeight={600} mb={1} display="flex" alignItems="center" gap={1}><Maximize2 size={16}/> Density & Structure</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                   <Chip 
                     icon={<Minimize2 size={14}/>} 
                     label="Compact" 
                     onClick={() => setConfig({...config, density: 'compact'})} 
                     variant={config.density === 'compact' ? 'filled' : 'outlined'} 
                     color="primary"
                   />
                   <Chip 
                     icon={<Maximize2 size={14}/>} 
                     label="Spacious" 
                     onClick={() => setConfig({...config, density: 'comfortable'})} 
                     variant={config.density === 'comfortable' ? 'filled' : 'outlined'} 
                     color="primary"
                   />
                </Stack>
              </Box>

            </Stack>
          </Grid>

          {/* RIGHT: PREVIEW AREA */}
          <Grid item xs={12} md={9} sx={{ bgcolor: '#e5e7eb', display: 'flex', justifyContent: 'center', overflowY: 'auto', p: 4 }}>
            <Box sx={{ 
              width: '210mm', 
              minHeight: '297mm', 
              bgcolor: 'white', 
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              transform: isMobile ? 'scale(0.5)' : 'scale(0.85)',
              transformOrigin: 'top center'
            }}>
              {renderTemplate()}
            </Box>
          </Grid>

        </Grid>
      </Box>
    </ThemeProvider>
  );
}