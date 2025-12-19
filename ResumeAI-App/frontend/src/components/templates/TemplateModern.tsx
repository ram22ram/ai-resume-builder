// templates/TemplateModern.tsx
import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Divider, Avatar } from '@mui/material';
import dayjs from 'dayjs';

const getFontFamily = (fontName: string): string => {
  switch (fontName) {
    case 'inter': return '"Inter", sans-serif';
    case 'roboto': return '"Roboto", sans-serif';
    case 'opensans': return '"Open Sans", sans-serif';
    case 'lato': return '"Lato", sans-serif';
    case 'montserrat': return '"Montserrat", sans-serif';
    case 'poppins': return '"Poppins", sans-serif';
    default: return '"Inter", sans-serif';
  }
};

const wrapTextStyle = {
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
} as const;

const TemplateModern = forwardRef(({ 
  data, 
  visibleSections = {}, 
  sectionOrder = [], 
  theme, 
  isPreview = false 
}: any, ref: any) => {
  
  if (!data) return null;

  const { 
    personalInfo = {}, 
    summary = '', 
    experience = [], 
    education = [], 
    projects = [], 
    skills = [], 
    hobbies = '' 
  } = data;

  // 1. EXTRACT THEME SETTINGS
  const accentColor = theme?.accentColor || '#3b82f6';
  const fontFamily = theme?.fontFamily || 'inter';
  const font = getFontFamily(fontFamily);
  const density = theme?.density || 'comfortable';
  const photoMode = theme?.photoMode || 'visible';

  // 2. CALCULATE DENSITY (SPACING)
  // Maps 'compact', 'comfortable', 'spacious' to multipliers
  const densityMultiplier = 
    density === 'compact' ? 0.6 : 
    density === 'spacious' ? 1.4 : 1.0;

  const previewScale = isPreview ? 0.7 : 1;
  
  // Dynamic Helpers
  const getFontSize = (baseSize: number) => `${baseSize * previewScale}rem`;
  
  // This now respects BOTH preview scaling AND your density setting
  const getSpacing = (baseSpacing: number) => {
    const value = baseSpacing * densityMultiplier;
    return isPreview ? value * 0.4 : value;
  };

  const formatDate = (date: string, format: string) => {
    if (!date) return ''; 
    const d = dayjs(date);
    return d.isValid() ? d.format(format) : date;
  };

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        color: accentColor,
        letterSpacing: 0.3,
        mb: getSpacing(1),
        borderBottom: `2px solid ${accentColor}22`,
        pb: getSpacing(0.5),
        textTransform: 'uppercase',
        fontSize: getFontSize(1),
        fontFamily: font // Force font here specifically
      }}
    >
      {children}
    </Typography>
  );

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return visibleSections.summary && summary && (
          <Box key="summary" sx={{ mb: getSpacing(2) }}>
            <SectionTitle>Summary</SectionTitle>
            <Typography sx={{...wrapTextStyle, fontSize: getFontSize(0.9)}}>{summary}</Typography>
          </Box>
        );

      case 'experience':
        if (!visibleSections.experience || experience.length === 0) return null;
        // Limit items in preview
        const expList = (isPreview && experience.length > 0) ? [experience[0]] : experience;

        return (
          <Box key="experience" sx={{ mb: getSpacing(2) }}>
            <SectionTitle>Experience</SectionTitle>
            {expList.map((exp: any, index: number) => (
              <Box key={exp.id || index} sx={{ mb: getSpacing(2), p: getSpacing(1.2), borderLeft: `3px solid ${accentColor}`, background: '#fafafa', borderRadius: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.95) }}>{exp.title || 'Job Title'}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#555', fontSize: getFontSize(0.85) }}>
                  {exp.company} {exp.location ? `— ${exp.location}` : ''}
                </Typography>
                <Typography variant="caption" sx={{ display: 'block', mb: 1, fontStyle: 'italic', fontSize: getFontSize(0.8) }}>
                  {formatDate(exp.startDate, 'MMM YYYY')} – {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')}
                </Typography>
                <Typography sx={{...wrapTextStyle, fontSize: getFontSize(0.9)}}>
                   {isPreview && exp.description ? `${exp.description.substring(0, 100)}...` : exp.description}
                </Typography>
              </Box>
            ))}
          </Box>
        );

      case 'education':
        if (!visibleSections.education || education.length === 0) return null;
        const eduList = (isPreview && education.length > 0) ? [education[0]] : education;

        return (
          <Box key="education" sx={{ mb: getSpacing(2) }}>
            <SectionTitle>Education</SectionTitle>
            {eduList.map((edu: any, index: number) => (
              <Box key={edu.id || index} sx={{ mb: getSpacing(1.5) }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.95) }}>{edu.degree}</Typography>
                <Typography variant="body2" fontSize={getFontSize(0.9)}>{edu.school}{edu.city ? `, ${edu.city}` : ''}</Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic', fontSize: getFontSize(0.8), color: '#64748b' }}>
                  {formatDate(edu.startDate, 'MMM YYYY')} – {formatDate(edu.endDate, 'MMM YYYY')}
                </Typography>
              </Box>
            ))}
          </Box>
        );

      case 'projects':
        if (!visibleSections.projects || projects.length === 0 || isPreview) return null;
        return (
          <Box key="projects" sx={{ mb: getSpacing(2) }}>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((p: any, index: number) => (
              <Box key={p.id || index} sx={{ mb: getSpacing(1.5), p: getSpacing(1), border: `1px solid ${accentColor}33`, borderRadius: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.95) }}>
                  {p.title} {p.link && <a href={p.link} target="_blank" rel="noreferrer" style={{ color: accentColor, fontSize: getFontSize(0.8) }}>(Link)</a>}
                </Typography>
                <Typography sx={{...wrapTextStyle, fontSize: getFontSize(0.9)}}>{p.description}</Typography>
              </Box>
            ))}
          </Box>
        );

      case 'skills':
        if (!visibleSections.skills || skills.length === 0) return null;
        return (
          <Box key="skills" sx={{ mb: getSpacing(2) }}>
            <SectionTitle>Skills</SectionTitle>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: getSpacing(1) }}>
              {skills.slice(0, isPreview ? 6 : skills.length).map((s: string, i: number) => (
                <Box key={i} sx={{ px: getSpacing(1.3), py: getSpacing(0.6), background: `${accentColor}15`, border: `1px solid ${accentColor}50`, borderRadius: '12px', fontSize: getFontSize(0.85), fontWeight: 600, color: accentColor }}>
                  {s}
                </Box>
              ))}
            </Box>
          </Box>
        );

      case 'hobbies':
        if (!visibleSections.hobbies || !hobbies || isPreview) return null;
        return (
          <Box key="hobbies" sx={{ mb: getSpacing(2) }}>
            <SectionTitle>Hobbies</SectionTitle>
            <Typography sx={{...wrapTextStyle, fontSize: getFontSize(0.9)}}>{hobbies}</Typography>
          </Box>
        );

      default: return null;
    }
  };

  // 3. DETERMINE PHOTO VISIBILITY
  const shouldShowPhoto = 
    personalInfo.photo && 
    (photoMode === 'visible' || (photoMode === 'conditional' && personalInfo.photo)) &&
    photoMode !== 'hidden';

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{
        p: isPreview ? 2 : 4,
        fontFamily: font,
        minHeight: '100%',
        position: 'relative',
        color: '#222',
        borderLeft: `8px solid ${accentColor}`,
        transform: isPreview ? 'scale(0.85)' : 'none',
        transformOrigin: 'top left',
        bgcolor: 'white',
        // ✅ FIX: Force all child Typography components to use the selected font
        '& .MuiTypography-root': {
          fontFamily: font,
        }
      }}
    >
      {/* HEADER */}
      <Box sx={{ textAlign: 'center', mb: getSpacing(3) }}>
        
        {/* ✅ PHOTO FIX: Uses the calculated shouldShowPhoto variable */}
        {shouldShowPhoto && (
          <Avatar 
            src={personalInfo.photo} 
            sx={{ 
              width: isPreview ? 60 : 120, 
              height: isPreview ? 60 : 120, 
              mx: 'auto', 
              mb: getSpacing(2), 
              border: `3px solid ${accentColor}` 
            }} 
          />
        )}

        <Typography variant="h3" sx={{ fontWeight: 800, color: accentColor, letterSpacing: 0.5, fontSize: isPreview ? '1.2rem' : '2.5rem' }}>
          {isPreview ? personalInfo.fullName?.substring(0, 15) : personalInfo.fullName || 'Your Name'}
        </Typography>
        <Typography variant="body1" sx={{ mt: getSpacing(1), color: '#555', fontSize: getFontSize(0.9) }}>
          {isPreview ? `${personalInfo.address?.substring(0, 20)}...` : personalInfo.address}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: getSpacing(1), flexWrap: 'wrap' }}>
          {personalInfo.phone && <Typography variant="body2" fontSize={getFontSize(0.85)}>📞 {personalInfo.phone}</Typography>}
          {personalInfo.email && <Typography variant="body2" fontSize={getFontSize(0.85)}>✉️ {isPreview ? `${personalInfo.email.substring(0, 15)}...` : personalInfo.email}</Typography>}
        </Box>
        {!isPreview && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: getSpacing(1) }}>
            {personalInfo.linkedin && <a href={personalInfo.linkedin} style={{ color: accentColor, fontSize: getFontSize(0.85), fontFamily: font }}>LinkedIn</a>}
            {personalInfo.portfolio && <a href={personalInfo.portfolio} style={{ color: accentColor, fontSize: getFontSize(0.85), fontFamily: font }}>Portfolio</a>}
          </Box>
        )}
      </Box>

      <Divider sx={{ mb: getSpacing(3), borderColor: `${accentColor}33` }} />

      {/* SECTIONS */}
      {sectionOrder && sectionOrder.map((sec: string) => renderSection(sec))}
      {/* ✅ RESUME-AI BRANDING FOOTER (Start) */}
      <Box 
        sx={{ 
          mt: 'auto',              // Flex container mein ye footer ko bottom pe dhakel dega
          pt: 2, pb: 2,            // Padding thodi kam ki hai taaki neat lage
          borderTop: '1px solid #e2e8f0', 
          textAlign: 'center',
          width: '100%',
          bgcolor: '#ffffff',      // Background white safe rehta hai
          '@media print': {
             mt: 4,                // Print mein thoda gap
             pageBreakInside: 'avoid'
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          {/* Logo Image */}
          <Box 
            component="img" 
            src="/favicon.svg"     // Note: './public' hata diya hai, React mein '/file.svg' chalta hai
            alt="Logo" 
            sx={{ 
              width: 24,           // Resume ke liye 32px bada ho jata hai, 24px perfect hai
              height: 24, 
              borderRadius: '6px', 
              objectFit: 'cover' 
            }} 
          />
          
          {/* Brand Name */}
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: '800', 
              color: '#1e293b', 
              fontSize: '1rem',    // Font size thoda adjust kiya hai
              fontFamily: '"Inter", sans-serif' // Footer ka font clean rakhna better hai
            }}
          >
            Resume<span style={{ color: '#7c3aed' }}>AI</span>
          </Typography>
        </Box>
      </Box>
      {/* ✅ BRANDING FOOTER (End) */}
    </Paper>
  );
});

export default TemplateModern;