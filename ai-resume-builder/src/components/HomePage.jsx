import React, { useState, useRef, useMemo, forwardRef, useEffect } from 'react';
import { 
  Box, Paper, Button, Typography, Stack, Grid, Chip, Avatar, Divider,
  FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel,
  Container, IconButton, useMediaQuery, Accordion, AccordionSummary, AccordionDetails, Tabs, Tab, TextField
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { 
  Download, ArrowLeft, Mail, Phone, MapPin, Linkedin, Globe, 
  Layout, Palette, Type, Maximize2, Minimize2, User, Sparkles, 
  CheckCircle2, Star, ArrowRight, ChevronDown, Plus, Trash2, Edit3, Monitor, Upload, ShieldCheck
} from 'lucide-react';
// Loaded via CDN in useEffect
import dayjs from 'dayjs';

// ==========================================
// 1. CONFIGURATION CONSTANTS
// ==========================================

const TYPOGRAPHY_SYSTEMS = {
  modern: { id: 'modern', label: 'Clean Sans', family: '"Inter", "Roboto", sans-serif' },
  serif:  { id: 'serif',  label: 'Elegant Serif', family: '"Merriweather", "Georgia", serif' },
  mono:   { id: 'mono',   label: 'Tech Mono', family: '"Fira Code", "Courier New", monospace' },
  system: { id: 'system', label: 'System UI', family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' },
};

const COLOR_SYSTEMS = {
  blue:   { id: 'blue',   label: 'Executive Blue', primary: '#0B57D0', secondary: '#E8F0FE' },
  purple: { id: 'purple', label: 'Creative Purple', primary: '#7c3aed', secondary: '#F3E8FF' },
  green:  { id: 'green',  label: 'Nature Green',   primary: '#059669', secondary: '#ECFDF5' },
  slate:  { id: 'slate',  label: 'Minimal Slate',  primary: '#1f2937', secondary: '#F3F4F6' },
  red:    { id: 'red',    label: 'Bold Red',       primary: '#dc2626', secondary: '#FEF2F2' },
};

const LAYOUTS = {
  modern:    { id: 'modern',    label: 'Modern Accent' },
  classic:   { id: 'classic',   label: 'Classic Serif' },
  swiss:     { id: 'swiss',     label: 'Swiss Bold' },
  corporate: { id: 'corporate', label: 'Corporate Split' },
};

const INITIAL_DATA = {
  personalInfo: { 
    fullName: 'Alex Morgan', 
    email: 'alex@example.com', 
    phone: '+1 555-0123', 
    address: 'San Francisco, CA', 
    linkedin: 'linkedin.com/in/alex', 
    portfolio: 'alex.design',
    photo: null 
  },
  summary: 'Creative and detail-oriented Product Designer with 5+ years of experience in building user-centric digital products. Passionate about solving complex problems through elegant design solutions.',
  experience: [
    { id: 1, title: 'Senior UX Designer', company: 'TechFlow', location: 'Remote', startDate: '2021-01', endDate: '', isPresent: true, description: 'Leading the design system initiative and mentoring junior designers. Improved user retention by 25%.' },
  ],
  education: [{ id: 1, degree: 'BFA Design', school: 'California College of Arts', year: '2018', city: 'San Francisco' }],
  skills: ['Figma', 'React', 'UX Research', 'Prototyping'],
  sectionOrder: ['summary', 'experience', 'education', 'skills'],
  visibleSections: { summary: true, experience: true, education: true, skills: true }
};

// ==========================================
// 2. HELPER FUNCTIONS & STYLES
// ==========================================

const wrapTextStyle = { whiteSpace: 'pre-wrap', wordBreak: 'break-word' };

const formatDate = (date, format = 'MMM YYYY') => {
  if (!date) return 'Present';
  const d = dayjs(date);
  return d.isValid() ? d.format(format) : date;
};

const FormSection = ({ title, children }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#334155' }}>{title}</Typography>
    {children}
  </Box>
);

// ==========================================
// 3. EDITOR COMPONENTS (The Content Forms)
// ==========================================

const StepPersonalInfo = ({ data, onChange, onUpload }) => {
  const fileInputRef = useRef(null);
  return (
    <FormSection title="Personal Details">
      <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
        <Avatar src={data.photo} sx={{ width: 80, height: 80, border: '1px solid #ddd' }} />
        <Button variant="outlined" size="small" startIcon={<Upload size={16}/>} onClick={() => fileInputRef.current.click()}>
          Upload Photo
        </Button>
        <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={onUpload} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}><TextField fullWidth label="Full Name" value={data.fullName} onChange={(e) => onChange('fullName', e.target.value)} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Email" value={data.email} onChange={(e) => onChange('email', e.target.value)} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Phone" value={data.phone} onChange={(e) => onChange('phone', e.target.value)} /></Grid>
        <Grid item xs={12}><TextField fullWidth label="Address" value={data.address} onChange={(e) => onChange('address', e.target.value)} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="LinkedIn" value={data.linkedin} onChange={(e) => onChange('linkedin', e.target.value)} /></Grid>
        <Grid item xs={6}><TextField fullWidth label="Portfolio" value={data.portfolio} onChange={(e) => onChange('portfolio', e.target.value)} /></Grid>
      </Grid>
    </FormSection>
  );
};

const StepExperience = ({ data, onChange }) => (
  <FormSection title="Work Experience">
    {data.map((exp, idx) => (
      <Paper key={exp.id} sx={{ p: 2, mb: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}><TextField fullWidth size="small" label="Job Title" value={exp.title} onChange={(e) => onChange(exp.id, 'title', e.target.value)} /></Grid>
          <Grid item xs={12}><TextField fullWidth size="small" label="Company" value={exp.company} onChange={(e) => onChange(exp.id, 'company', e.target.value)} /></Grid>
          <Grid item xs={6}><TextField fullWidth size="small" label="Start Date" value={exp.startDate} onChange={(e) => onChange(exp.id, 'startDate', e.target.value)} placeholder="YYYY-MM" /></Grid>
          <Grid item xs={6}><TextField fullWidth size="small" label="End Date" value={exp.endDate} onChange={(e) => onChange(exp.id, 'endDate', e.target.value)} placeholder="YYYY-MM" disabled={exp.isPresent} /></Grid>
          <Grid item xs={12}><FormControlLabel control={<Switch size="small" checked={exp.isPresent} onChange={(e) => onChange(exp.id, 'isPresent', e.target.checked)} />} label="I currently work here" /></Grid>
          <Grid item xs={12}><TextField fullWidth multiline rows={3} size="small" label="Description" value={exp.description} onChange={(e) => onChange(exp.id, 'description', e.target.value)} /></Grid>
          <Grid item xs={12}><Button size="small" color="error" startIcon={<Trash2 size={14}/>} onClick={() => onChange(exp.id, 'DELETE')}>Remove</Button></Grid>
        </Grid>
      </Paper>
    ))}
    <Button variant="outlined" fullWidth startIcon={<Plus size={16}/>} onClick={() => onChange(null, 'ADD')}>Add Position</Button>
  </FormSection>
);

const StepEducation = ({ data, onChange }) => (
  <FormSection title="Education">
    {data.map((edu, idx) => (
      <Paper key={edu.id} sx={{ p: 2, mb: 2, bgcolor: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}><TextField fullWidth size="small" label="Degree" value={edu.degree} onChange={(e) => onChange(edu.id, 'degree', e.target.value)} /></Grid>
          <Grid item xs={12}><TextField fullWidth size="small" label="School/University" value={edu.school} onChange={(e) => onChange(edu.id, 'school', e.target.value)} /></Grid>
          <Grid item xs={6}><TextField fullWidth size="small" label="Year" value={edu.year} onChange={(e) => onChange(edu.id, 'year', e.target.value)} /></Grid>
          <Grid item xs={6}><TextField fullWidth size="small" label="City" value={edu.city} onChange={(e) => onChange(edu.id, 'city', e.target.value)} /></Grid>
          <Grid item xs={12}><Button size="small" color="error" startIcon={<Trash2 size={14}/>} onClick={() => onChange(edu.id, 'DELETE')}>Remove</Button></Grid>
        </Grid>
      </Paper>
    ))}
    <Button variant="outlined" fullWidth startIcon={<Plus size={16}/>} onClick={() => onChange(null, 'ADD')}>Add Education</Button>
  </FormSection>
);

const StepSkills = ({ data, onChange, onAdd, onDelete }) => (
  <FormSection title="Skills">
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
      {data.map(skill => (
        <Chip key={skill} label={skill} onDelete={() => onDelete(skill)} color="primary" variant="outlined" />
      ))}
    </Box>
    <TextField 
      fullWidth size="small" label="Type a skill and press Enter" 
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          onAdd(e.target.value);
          e.target.value = '';
        }
      }} 
    />
  </FormSection>
);

// ==========================================
// 4. TEMPLATE COMPONENTS (Visuals)
// ==========================================

const TemplateModern = forwardRef(({ data, theme, config }, ref) => {
  const { accentColor, font } = theme;
  const spacing = config.density === 'compact' ? 1 : 2; 
  return (
    <Paper ref={ref} elevation={0} sx={{ p: 4, fontFamily: font, minHeight: '100%', color: '#222', borderLeft: `8px solid ${accentColor}`, bgcolor: 'white' }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        {data.personalInfo.photo && (
          <Avatar src={data.personalInfo.photo} sx={{ width: 100, height: 100, mx: 'auto', mb: 2, border: `3px solid ${accentColor}` }} />
        )}
        <Typography variant="h3" sx={{ fontWeight: 800, color: accentColor, letterSpacing: -0.5, mb: 0.5, fontSize: '2.5rem' }}>{data.personalInfo.fullName}</Typography>
        <Typography variant="body1" sx={{ color: '#555' }}>{data.personalInfo.address}</Typography>
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ fontSize: '0.9rem' }}>
          <span>{data.personalInfo.phone}</span><span>{data.personalInfo.email}</span>
        </Stack>
      </Box>
      {data.sectionOrder.map(sec => {
        if (sec === 'summary' && data.visibleSections.summary && data.summary) {
          return (
            <Box key="sum" sx={{ mb: spacing + 1 }}>
              <Typography variant="h6" fontWeight={700} color={accentColor} textTransform="uppercase" mb={1}>Summary</Typography>
              <Typography variant="body2">{data.summary}</Typography>
            </Box>
          );
        }
        if (sec === 'experience' && data.visibleSections.experience) {
          return (
            <Box key="exp" sx={{ mb: spacing + 1 }}>
              <Typography variant="h6" fontWeight={700} color={accentColor} textTransform="uppercase" mb={1}>Experience</Typography>
              {data.experience.map(exp => (
                <Box key={exp.id} mb={spacing} pl={2} borderLeft={`2px solid ${accentColor}44`}>
                  <Typography fontWeight={700}>{exp.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{exp.company}</Typography>
                  <Typography variant="caption">{formatDate(exp.startDate)} - {exp.isPresent ? 'Present' : formatDate(exp.endDate)}</Typography>
                  <Typography variant="body2" mt={0.5}>{exp.description}</Typography>
                </Box>
              ))}
            </Box>
          );
        }
        if (sec === 'skills' && data.visibleSections.skills) {
          return (
            <Box key="sk" sx={{ mb: spacing }}>
              <Typography variant="h6" fontWeight={700} color={accentColor} textTransform="uppercase" mb={1}>Skills</Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {data.skills.map(s => <Chip key={s} label={s} size="small" sx={{ bgcolor: `${accentColor}15`, color: accentColor, fontWeight: 600 }} />)}
              </Box>
            </Box>
          );
        }
        if (sec === 'education' && data.visibleSections.education) {
          return (
            <Box key="edu" sx={{ mb: spacing }}>
              <Typography variant="h6" fontWeight={700} color={accentColor} textTransform="uppercase" mb={1}>Education</Typography>
              {data.education.map(e => (
                <Box key={e.id} mb={1}>
                  <Typography fontWeight={700}>{e.degree}</Typography>
                  <Typography variant="body2">{e.school}, {e.year}</Typography>
                </Box>
              ))}
            </Box>
          );
        }
        return null;
      })}
    </Paper>
  );
});

const TemplateSwiss = forwardRef(({ data, theme, config }, ref) => {
  const { accentColor, font } = theme;
  const spacing = config.density === 'compact' ? 2 : 3;
  return (
    <Paper ref={ref} elevation={0} sx={{ minHeight: '100%', fontFamily: font, bgcolor: '#fff' }}>
      <Box sx={{ bgcolor: accentColor, color: 'white', p: 4, display: 'flex', gap: 3, alignItems: 'center' }}>
        <Box flex={1}>
          <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: -1, lineHeight: 1, fontSize: '3rem' }}>{data.personalInfo.fullName}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>{data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.address}</Typography>
        </Box>
        {data.personalInfo.photo && <Avatar src={data.personalInfo.photo} sx={{ width: 120, height: 120, border: '4px solid white' }} />}
      </Box>
      <Box sx={{ p: 4 }}>
        {data.sectionOrder.map(sec => {
           if (sec === 'summary' && data.visibleSections.summary) {
             return (
               <Box key="sum" mb={spacing}>
                 <Typography fontWeight={700} textTransform="uppercase" mb={1}>Profile</Typography>
                 <Typography>{data.summary}</Typography>
               </Box>
             );
           }
           if (sec === 'experience' && data.visibleSections.experience) {
             return (
               <Box key="exp" mb={spacing}>
                 <Typography fontWeight={700} textTransform="uppercase" mb={2}>Experience</Typography>
                 {data.experience.map(exp => (
                   <Grid container key={exp.id} spacing={2} mb={2}>
                     <Grid item xs={3}><Typography variant="body2" fontWeight={700} color="text.secondary">{formatDate(exp.startDate)} - {exp.isPresent ? 'Now' : formatDate(exp.endDate)}</Typography></Grid>
                     <Grid item xs={9}>
                       <Typography variant="h6" fontSize="1.1rem" fontWeight={800}>{exp.title}</Typography>
                       <Typography variant="subtitle2" color={accentColor}>{exp.company}</Typography>
                       <Typography variant="body2">{exp.description}</Typography>
                     </Grid>
                   </Grid>
                 ))}
               </Box>
             );
           }
           if (sec === 'skills' && data.visibleSections.skills) {
             return (
               <Box key="sk" mb={spacing}>
                 <Typography fontWeight={700} textTransform="uppercase" mb={1}>Skills</Typography>
                 <Typography fontWeight={500}>{data.skills.join(' • ')}</Typography>
               </Box>
             );
           }
           return null;
        })}
      </Box>
    </Paper>
  );
});

const TemplateCorporate = forwardRef(({ data, theme, config }, ref) => {
  const { accentColor, font } = theme;
  return (
    <Paper ref={ref} elevation={0} sx={{ minHeight: '100%', display: 'flex', fontFamily: font, bgcolor: 'white' }}>
      <Box sx={{ width: '30%', bgcolor: '#f8fafc', p: 3, borderRight: '1px solid #e2e8f0' }}>
        {data.personalInfo.photo && <Avatar src={data.personalInfo.photo} sx={{ width: 100, height: 100, mb: 3 }} />}
        <Box mb={3}>
          <Typography variant="subtitle2" color={accentColor} fontWeight={700} mb={1}>CONTACT</Typography>
          <Stack spacing={0.5} fontSize="0.85rem" color="#475569">
            <Box>{data.personalInfo.email}</Box>
            <Box>{data.personalInfo.phone}</Box>
            <Box>{data.personalInfo.address}</Box>
          </Stack>
        </Box>
        {data.visibleSections.skills && (
          <Box mb={3}>
            <Typography variant="subtitle2" color={accentColor} fontWeight={700} mb={1}>SKILLS</Typography>
            <Box display="flex" flexWrap="wrap" gap={0.5}>
              {data.skills.map(s => <Chip key={s} label={s} size="small" sx={{ bgcolor: 'white', border: '1px solid #cbd5e1' }} />)}
            </Box>
          </Box>
        )}
        <Box>
          <Typography variant="subtitle2" color={accentColor} fontWeight={700} mb={1}>EDUCATION</Typography>
          {data.education.map(e => (
            <Box key={e.id} mb={1}>
              <Typography fontWeight={700} fontSize="0.85rem">{e.degree}</Typography>
              <Typography fontSize="0.8rem">{e.school}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ width: '70%', p: 4 }}>
        <Box sx={{ mb: 4, borderBottom: `2px solid ${accentColor}`, pb: 2 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, color: '#0f172a', textTransform: 'uppercase' }}>{data.personalInfo.fullName}</Typography>
          <Typography variant="h6" color={accentColor}>{data.personalInfo.linkedin}</Typography>
        </Box>
        {data.visibleSections.summary && (
          <Box mb={4}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: '#334155' }}>PROFILE</Typography>
            <Typography variant="body2">{data.summary}</Typography>
          </Box>
        )}
        {data.visibleSections.experience && (
          <Box>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2, color: '#334155' }}>WORK HISTORY</Typography>
            {data.experience.map(exp => (
              <Box key={exp.id} mb={3}>
                <Typography variant="h6" fontWeight={700} fontSize="1.1rem">{exp.title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
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

const TemplateClassic = forwardRef(({ data, theme, config }, ref) => {
  const { accentColor, font } = theme;
  return (
    <Paper ref={ref} elevation={0} sx={{ minHeight: '100%', p: 5, fontFamily: font, textAlign: 'center', color: '#000', bgcolor: 'white' }}>
      <Box sx={{ borderBottom: `1px solid ${accentColor}`, pb: 3, mb: 4 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 2, mb: 1, color: accentColor }}>{data.personalInfo.fullName}</Typography>
        <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>{data.personalInfo.address} | {data.personalInfo.email} | {data.personalInfo.phone}</Typography>
      </Box>
      <Box sx={{ textAlign: 'left' }}>
        {data.sectionOrder.map(sec => {
          if (sec === 'summary' && data.visibleSections.summary) {
            return (
              <Box key="sum" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #ccc', mb: 1 }}>Profile</Typography>
                <Typography variant="body2">{data.summary}</Typography>
              </Box>
            );
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
            );
          }
          if (sec === 'skills' && data.visibleSections.skills) {
            return (
              <Box key="sk" sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, textTransform: 'uppercase', borderBottom: '1px solid #ccc', mb: 1 }}>Skills</Typography>
                <Typography>{data.skills.join(' • ')}</Typography>
              </Box>
            );
          }
          return null;
        })}
      </Box>
    </Paper>
  );
});

// ==========================================
// 5. PREVIEW CARD & HOME
// ==========================================

const TemplatePreviewCard = ({ layoutId, colorId, fontId, onSelect }) => {
  const layout = LAYOUTS[layoutId];
  const color = COLOR_SYSTEMS[colorId];
  const font = TYPOGRAPHY_SYSTEMS[fontId];
  
  const renderThumbnail = () => {
    const props = { data: INITIAL_DATA, theme: { accentColor: color.primary, fontFamily: font.family }, config: { density: 'compact' } };
    switch(layoutId) {
      case 'modern': return <TemplateModern {...props} />;
      case 'swiss': return <TemplateSwiss {...props} />;
      case 'corporate': return <TemplateCorporate {...props} />;
      case 'classic': return <TemplateClassic {...props} />;
      default: return <TemplateModern {...props} />;
    }
  };

  return (
    <Box onClick={() => onSelect(layoutId, colorId, fontId)} sx={{ cursor: 'pointer', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', transition: 'all 0.2s', bgcolor: 'white', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 12px 20px -5px rgba(0,0,0,0.1)', borderColor: color.primary } }}>
      <Box sx={{ height: '320px', bgcolor: '#f1f5f9', overflow: 'hidden', position: 'relative', display: 'flex', justifyContent: 'center' }}>
        {/* Centered and scaled Resume */}
        <Box sx={{ 
          width: '210mm', height: '297mm', 
          transform: 'scale(0.45)', // Increased scale for clarity
          transformOrigin: 'top center',
          position: 'absolute', top: 0,
          bgcolor: 'white', pointerEvents: 'none',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
        }}>
          {renderThumbnail()}
        </Box>
      </Box>
      <Box sx={{ p: 2, borderTop: '1px solid #f1f5f9', bgcolor: 'white' }}>
        <Typography variant="subtitle2" fontWeight={700} color="#1e293b">{layout.label}</Typography>
        <Stack direction="row" alignItems="center" spacing={1} mt={0.5}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: color.primary }} />
          <Typography variant="caption" color="text.secondary">{color.label}</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

const HomePage = ({ onStart }) => {
  const brandGradient = 'linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)';
  const templateCombinations = useMemo(() => {
    const combos = [];
    Object.keys(LAYOUTS).forEach(layoutId => {
      Object.keys(COLOR_SYSTEMS).forEach((colorId, index) => {
        const fontId = Object.keys(TYPOGRAPHY_SYSTEMS)[index % Object.keys(TYPOGRAPHY_SYSTEMS).length];
        combos.push({ layoutId, colorId, fontId });
      });
    });
    return combos;
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', overflowX: 'hidden', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Navbar */}
      <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>
              <Layout color="#7c3aed" />
              <Typography variant="h5" sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: -0.5 }}>
                Resume<span style={{ color: '#7c3aed' }}>AI</span>
              </Typography>
            </Box>
            <Button variant="contained" onClick={() => onStart('modern', 'blue', 'modern')} sx={{ bgcolor: '#7c3aed', borderRadius: '50px', textTransform: 'none', fontWeight: 'bold', '&:hover': { bgcolor: '#6d28d9' } }}>Build My Resume</Button>
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
            Choose from 100+ professionally designed templates. Optimized for ATS and readable by recruiters.
          </Typography>
          <Button variant="contained" size="large" onClick={() => document.getElementById('templates').scrollIntoView({ behavior: 'smooth' })} endIcon={<ArrowRight size={20} />} sx={{ py: 2, px: 5, fontSize: '1.1rem', borderRadius: '12px', background: '#0f172a', textTransform: 'none', fontWeight: 'bold' }}>Browse Templates</Button>
        </Container>
      </Box>

      {/* Feature Highlight (AI) */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={5}>
              <Chip icon={<Sparkles size={14} />} label="Smart AI Writer" sx={{ bgcolor: '#eff6ff', color: '#3b82f6', fontWeight: 'bold', mb: 2 }} />
              <Typography variant="h3" fontWeight="800" mb={3} color="#0f172a">Write like a Pro,<br/> without the effort.</Typography>
              <Typography variant="body1" color="text.secondary" mb={4} fontSize="1.1rem">Struggling to describe your experience? Our AI transforms basic job descriptions into powerful, result-oriented bullet points.</Typography>
              <Stack spacing={2} mb={4}>
                {["Auto-generate summaries", "Fix grammar & tone", "Keywords optimized for ATS"].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <CheckCircle2 size={16} color="#16a34a" />
                    <Typography fontWeight="500" color="#334155">{item}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={7}>
              <Box sx={{ position: 'relative' }}>
                <Paper elevation={10} sx={{ p: 4, borderLeft: '4px solid #16a34a', bgcolor: 'white', borderRadius: '16px' }}>
                  <Chip label="✨ AI Enhanced" size="small" sx={{ float: 'right', bgcolor: '#dcfce7', color: '#16a34a', fontWeight: 'bold' }} />
                  <Typography variant="caption" fontWeight="bold" color="#16a34a" display="block" mb={1}>✅ AFTER</Typography>
                  <Typography variant="body1" fontWeight="500" color="#0f172a" fontSize="1.1rem" lineHeight={1.6}>
                    "Spearheaded a high-performing sales team of 15+, driving a <span style={{backgroundColor: '#dcfce7', padding: '0 4px'}}>40% increase in annual revenue</span> through strategic mentorship."
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Template Gallery */}
      <Box sx={{ py: 12, bgcolor: '#0f172a', color: 'white' }} id="templates">
        <Container maxWidth="xl">
           <Box textAlign="center" mb={8}>
              <Typography variant="overline" color="#a855f7" fontWeight="bold" letterSpacing={2}>PREMIUM DESIGNS</Typography>
              <Typography variant="h3" fontWeight="900" my={2}>Pick a template. Start Building.</Typography>
              <Typography variant="body1" color="#94a3b8" maxWidth="600px" mx="auto">All templates are ATS-friendly and fully customizable.</Typography>
           </Box>
           <Grid container spacing={3}>{templateCombinations.map((combo, idx) => (<Grid item xs={12} md={6} lg={4} key={idx}><TemplatePreviewCard layoutId={combo.layoutId} colorId={combo.colorId} fontId={combo.fontId} onSelect={onStart} /></Grid>))}</Grid>
        </Container>
      </Box>

      {/* Pricing */}
      <Box sx={{ py: 12, bgcolor: '#ffffff' }}>
        <Container maxWidth="md">
           <Paper elevation={0} sx={{ p: { xs: 4, md: 8 }, borderRadius: '32px', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <Typography variant="overline" color="#16a34a" fontWeight="bold" letterSpacing={2}>SIMPLE & TRANSPARENT</Typography>
              <Typography variant="h3" fontWeight="900" my={2} color="#0f172a">Pay once. Use forever.</Typography>
              <Typography variant="body1" color="text.secondary" mb={5} maxWidth="500px" mx="auto">No monthly subscriptions. No hidden fees.</Typography>
              <Box sx={{ p: 4, bgcolor: '#0f172a', borderRadius: '24px', color: 'white', textAlign: 'left', maxWidth: '400px', mx: 'auto' }}>
                 <Typography variant="h6" fontWeight="bold" mb={1}>Premium Download</Typography>
                 <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 3 }}><Typography variant="h3" fontWeight="800">₹30</Typography><Typography variant="body2" color="#94a3b8">/ download</Typography></Box>
                 <Stack spacing={1.5} mb={3}>
                    {["Unlimited AI Suggestions", "PDF Export (High Quality)", "No Watermark", "ATS Optimized Layout"].map(f => (
                      <Box key={f} display="flex" gap={1} alignItems="center"><CheckCircle2 size={16} color="#4ade80" /><Typography variant="body2">{f}</Typography></Box>
                    ))}
                 </Stack>
                 <Button fullWidth variant="contained" size="large" onClick={() => onStart('modern', 'blue', 'modern')} sx={{ bgcolor: '#7c3aed', color: 'white', fontWeight: 'bold' }}>Create Resume</Button>
              </Box>
           </Paper>
        </Container>
      </Box>

      {/* FAQ */}
      <Box sx={{ py: 10, bgcolor: '#f8fafc' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight="800" textAlign="center" mb={6} color="#0f172a">Frequently Asked Questions</Typography>
          <Stack spacing={2}>
            {[
              { q: "Is this resume builder really free to try?", a: "Yes! You can build your resume, try all templates, and use the AI features for free. You only pay ₹30 when you are ready to download." },
              { q: "Can I edit my resume after downloading?", a: "Since the download is a PDF file, you cannot edit the file directly. However, your data is saved in your browser, so you can come back, make edits, and download again." },
              { q: "Is the payment secure?", a: "Absolutely. We use Razorpay, India's leading payment gateway, which uses industry-standard encryption to process your payment securely." },
              { q: "Does it work for freshers?", a: "Yes! Our templates are designed to highlight skills and education, making them perfect for students and freshers with little work experience." }
            ].map((item, index) => (
              <Accordion key={index} elevation={0} sx={{ border: '1px solid #e2e8f0', borderRadius: '12px !important', '&:before': { display: 'none' }, bgcolor: 'white' }}>
                <AccordionSummary expandIcon={<ChevronDown color="#94a3b8" />}><Typography fontWeight="bold" color="#334155">{item.q}</Typography></AccordionSummary>
                <AccordionDetails><Typography color="text.secondary">{item.a}</Typography></AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: 'white', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}><Typography variant="caption" color="text.secondary">© 2025 ResumeAI. All rights reserved.</Typography></Box>
    </Box>
  );
};

// ==========================================
// 6. MAIN APP COMPONENT
// ==========================================

export default function App() {
  const [view, setView] = useState('home'); 
  const [activeTab, setActiveTab] = useState(0);
  const [config, setConfig] = useState({ layout: 'modern', color: 'blue', font: 'modern', density: 'comfortable' });
  const [resumeData, setResumeData] = useState(INITIAL_DATA);
  const previewRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:900px)');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleStartBuilder = (layoutId, colorId, fontId) => {
    setConfig(prev => ({ ...prev, layout: layoutId || 'modern', color: colorId || 'blue', font: fontId || 'modern' }));
    setView('builder');
    window.scrollTo(0, 0);
  };

  const handleDataChange = (field, value) => setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
  
  const handleExperienceChange = (id, field, value) => {
    if (field === 'ADD') {
      setResumeData(prev => ({ ...prev, experience: [...prev.experience, { id: Date.now(), title: '', company: '', description: '' }] }));
    } else if (field === 'DELETE') {
      setResumeData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
    } else {
      setResumeData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e) }));
    }
  };

  const handleEducationChange = (id, field, value) => {
    if (field === 'ADD') {
      setResumeData(prev => ({ ...prev, education: [...prev.education, { id: Date.now(), degree: '', school: '', year: '' }] }));
    } else if (field === 'DELETE') {
      setResumeData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
    } else {
      setResumeData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e) }));
    }
  };

  const handleSkillsChange = (val, type) => {
    if (type === 'ADD' && !resumeData.skills.includes(val)) setResumeData(prev => ({ ...prev, skills: [...prev.skills, val] }));
    if (type === 'DELETE') setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== val) }));
  };

  const handleDownload = () => {
    if (window.html2pdf) {
      const element = previewRef.current;
      const opt = { margin: 0, filename: `resume_${config.layout}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
      window.html2pdf().from(element).set(opt).save();
    } else { alert("PDF Generator is loading..."); }
  };

  const renderTemplate = () => {
    const activeLayout = LAYOUTS[config.layout];
    const activeColor = COLOR_SYSTEMS[config.color];
    const activeFont = TYPOGRAPHY_SYSTEMS[config.font];
    const props = { data: resumeData, theme: { accentColor: activeColor.primary, fontFamily: activeFont.family }, config: config, ref: previewRef };
    switch(config.layout) {
      case 'modern': return <TemplateModern {...props} />;
      case 'swiss': return <TemplateSwiss {...props} />;
      case 'corporate': return <TemplateCorporate {...props} />;
      case 'classic': return <TemplateClassic {...props} />;
      default: return <TemplateModern {...props} />;
    }
  };

  if (view === 'home') return <HomePage onStart={handleStartBuilder} />;

  return (
    <ThemeProvider theme={createTheme({ palette: { primary: { main: '#6d28d9' } } })}>
      <Box sx={{ minHeight: '100vh', bgcolor: '#f3f4f6', display: 'flex', flexDirection: 'column' }}>
        <Paper elevation={1} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <Stack direction="row" alignItems="center" spacing={1} onClick={() => setView('home')} sx={{ cursor: 'pointer' }}><ArrowLeft color="#64748b" /><Typography variant="h6" fontWeight="800" color="#1e293b">Back to Home</Typography></Stack>
          <Button variant="contained" startIcon={<Download size={18} />} onClick={handleDownload}>Download PDF</Button>
        </Paper>
        <Grid container sx={{ flexGrow: 1, height: 'calc(100vh - 80px)' }}>
          <Grid item xs={12} md={4} lg={3} sx={{ bgcolor: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)} variant="fullWidth" sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tab icon={<Edit3 size={18} />} label="Content" />
              <Tab icon={<Monitor size={18} />} label="Design" />
            </Tabs>
            <Box sx={{ p: 3, flexGrow: 1, overflowY: 'auto' }}>
              {activeTab === 0 ? (
                <Stack spacing={3}>
                  <StepPersonalInfo data={resumeData.personalInfo} onChange={handleDataChange} onUpload={(e) => {
                    const file = e.target.files[0];
                    if (file) { const reader = new FileReader(); reader.onloadend = () => handleDataChange('photo', reader.result); reader.readAsDataURL(file); }
                  }} />
                  <Divider />
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>Summary</Typography>
                    <TextField fullWidth multiline rows={4} value={resumeData.summary} onChange={(e) => setResumeData(p => ({...p, summary: e.target.value}))} />
                  </Box>
                  <Divider />
                  <StepExperience data={resumeData.experience} onChange={handleExperienceChange} />
                  <Divider />
                  <StepEducation data={resumeData.education} onChange={handleEducationChange} />
                  <Divider />
                  <StepSkills data={resumeData.skills} onAdd={(v) => handleSkillsChange(v, 'ADD')} onDelete={(v) => handleSkillsChange(v, 'DELETE')} />
                </Stack>
              ) : (
                <Stack spacing={4}>
                  <Box><Typography variant="subtitle2" color="text.secondary" mb={2} fontWeight={700}>LAYOUT</Typography><Grid container spacing={1}>{Object.values(LAYOUTS).map(l => <Grid item xs={6} key={l.id}><Chip label={l.label} onClick={() => setConfig({...config, layout: l.id})} variant={config.layout === l.id ? 'filled' : 'outlined'} color="primary" sx={{ width: '100%', cursor: 'pointer' }} /></Grid>)}</Grid></Box>
                  <Divider />
                  <Box><Typography variant="subtitle2" color="text.secondary" mb={2} fontWeight={700}>COLOR THEME</Typography><Stack direction="row" spacing={1.5} flexWrap="wrap">{Object.values(COLOR_SYSTEMS).map(c => <Box key={c.id} onClick={() => setConfig({...config, color: c.id})} sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: c.primary, cursor: 'pointer', border: config.color === c.id ? '3px solid #000' : '1px solid #ddd' }} />)}</Stack></Box>
                  <Divider />
                  <Box><Typography variant="subtitle2" color="text.secondary" mb={2} fontWeight={700}>TYPOGRAPHY</Typography><FormControl fullWidth size="small"><Select value={config.font} onChange={(e) => setConfig({...config, font: e.target.value})}>{Object.values(TYPOGRAPHY_SYSTEMS).map(t => <MenuItem key={t.id} value={t.id} sx={{ fontFamily: t.family }}>{t.label}</MenuItem>)}</Select></FormControl></Box>
                  <Divider />
                  <Box><Typography variant="subtitle2" color="text.secondary" mb={2} fontWeight={700}>DENSITY</Typography><Stack direction="row" spacing={1}><Chip icon={<Minimize2 size={14}/>} label="Compact" onClick={() => setConfig({...config, density: 'compact'})} variant={config.density === 'compact' ? 'filled' : 'outlined'} color="primary" /><Chip icon={<Maximize2 size={14}/>} label="Spacious" onClick={() => setConfig({...config, density: 'comfortable'})} variant={config.density === 'comfortable' ? 'filled' : 'outlined'} color="primary" /></Stack></Box>
                </Stack>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: '#e5e7eb', display: 'flex', justifyContent: 'center', overflowY: 'auto', p: 4 }}>
            <Box sx={{ width: '210mm', minHeight: '297mm', bgcolor: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', transform: isMobile ? 'scale(0.5)' : 'scale(0.85)', transformOrigin: 'top center' }}>
              {renderTemplate()}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}