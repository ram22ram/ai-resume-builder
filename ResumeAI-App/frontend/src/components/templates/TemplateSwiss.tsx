import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Chip, Avatar, Grid } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
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

const wrapTextStyle = { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } as const;

const formatDate = (date: string, format: string) => {
  if (!date) return 'Present';
  const d = dayjs(date);
  return d.isValid() ? d.format(format) : date;
};

const TemplateSwiss = forwardRef(({ 
  data, 
  visibleSections = {}, 
  sectionOrder = [], 
  theme, 
  isPreview = false 
}: any, ref: any) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data || {};

  // 1. EXTRACT SETTINGS
  const accentColor = theme?.accentColor || '#111827';
  const fontFamily = theme?.fontFamily || 'inter';
  const font = getFontFamily(fontFamily);
  const density = theme?.density || 'comfortable';
  const photoMode = theme?.photoMode || 'visible';

  // 2. DENSITY & SCALING
  const densityMultiplier = 
    density === 'compact' ? 0.7 : 
    density === 'spacious' ? 1.3 : 1.0;

  const previewScale = isPreview ? 0.7 : 1;
  
  const getFontSize = (baseSize: number) => `${baseSize * previewScale}rem`;

  const getSpacing = (baseSpacing: number) => {
    const value = baseSpacing * densityMultiplier;
    return isPreview ? value * 0.4 : value;
  };

  // 3. PHOTO LOGIC
  const shouldShowPhoto = 
    personalInfo.photo && 
    (photoMode === 'visible' || (photoMode === 'conditional' && personalInfo.photo)) &&
    photoMode !== 'hidden';

  // Get limited data for preview
  const getLimitedExperience = () => (isPreview && experience?.length > 0 ? [experience[0]] : experience);
  const getLimitedEducation = () => (isPreview && education?.length > 0 ? [education[0]] : education);

  const SectionTitle = ({ children }: any) => (
    <Typography
      variant="subtitle2"
      sx={{
        fontWeight: 700,
        fontSize: getFontSize(0.8),
        color: '#4b5563',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        borderBottom: '1px solid #e5e7eb',
        pb: getSpacing(0.5),
        mb: getSpacing(1.5),
      }}
    >
      {children}
    </Typography>
  );

  const ContactItem = ({ icon: Icon, text, link = false }: any) => {
    if (!text) return null;
    const content = (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: getSpacing(0.6) }}>
        <Icon size={isPreview ? 10 : 14} color="white" />
        <Typography variant="body2" sx={{ fontSize: getFontSize(0.82), color: 'white', ...wrapTextStyle }}>
          {isPreview && text.length > 15 ? `${text.substring(0, 12)}...` : text}
        </Typography>
      </Box>
    );
    return link && !isPreview ? (
      <a href={text} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        {content}
      </a>
    ) : content;
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return visibleSections.summary && summary && !isPreview && (
            <Box key="summary" sx={{ mb: getSpacing(3) }}>
              <SectionTitle>Profile</SectionTitle>
              <Typography variant="body2" sx={{ fontSize: getFontSize(0.95), color: '#374151', lineHeight: 1.6, ...wrapTextStyle }}>
                {summary}
              </Typography>
            </Box>
          );

      case 'experience':
        const limitedExp = getLimitedExperience();
        if (!visibleSections.experience || !limitedExp?.length) return null;
        return (
            <Box key="experience" sx={{ mb: getSpacing(3) }}>
              <SectionTitle>Experience</SectionTitle>
              {limitedExp.map((exp: any) => (
                <Box key={exp.id} sx={{ mb: getSpacing(2.5) }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.98), color: '#111827' }}>
                    {exp.title || 'Job Title'}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'baseline', mb: getSpacing(0.5) }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: accentColor, fontSize: getFontSize(0.85) }}>
                      {exp.company || 'Company'} {exp.location && ` • ${exp.location}`}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: getFontSize(0.8), color: '#6b7280', fontStyle: 'italic' }}>
                      {formatDate(exp.startDate, 'MMM YYYY')} – {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontSize: getFontSize(0.9), color: '#374151', lineHeight: 1.6, ...wrapTextStyle }}>
                    {isPreview ? `${exp.description?.substring(0, 50)}...` : exp.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          );

      case 'projects':
        if (!visibleSections.projects || !projects?.length || isPreview) return null;
        return (
            <Box key="projects" sx={{ mb: getSpacing(3) }}>
              <SectionTitle>Projects</SectionTitle>
              {projects.map((proj: any) => (
                <Box key={proj.id} sx={{ mb: getSpacing(2.2) }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.95), color: '#111827' }}>
                    {proj.title}
                  </Typography>
                  {proj.link && (
                    <Typography variant="caption" sx={{ display: 'block', mb: getSpacing(0.4), color: accentColor, textDecoration: 'underline', ...wrapTextStyle }}>
                      {proj.link}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ fontSize: getFontSize(0.9), color: '#374151', lineHeight: 1.6, ...wrapTextStyle }}>
                    {proj.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          );

      case 'education':
        const limitedEdu = getLimitedEducation();
        if (!visibleSections.education || !limitedEdu?.length) return null;
        return (
            <Box key="education" sx={{ mb: getSpacing(3) }}>
              <SectionTitle>Education</SectionTitle>
              {limitedEdu.map((edu: any) => (
                <Box key={edu.id} sx={{ mb: getSpacing(2) }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.95), color: '#111827' }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: getFontSize(0.9), color: '#4b5563' }}>
                    {edu.school}{edu.city && ` • ${edu.city}`}
                  </Typography>
                  {edu.year && (
                    <Typography variant="body2" sx={{ fontSize: getFontSize(0.8), color: '#6b7280', fontStyle: 'italic' }}>
                      {edu.year}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          );

      case 'skills':
        return visibleSections.skills && skills?.length > 0 && (
            <Box key="skills" sx={{ mb: getSpacing(3) }}>
              <SectionTitle>Skills</SectionTitle>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: getSpacing(1) }}>
                {skills.slice(0, isPreview ? 4 : skills.length).map((skill: string, idx: number) => (
                  <Chip key={idx} label={skill} size="small" sx={{ borderRadius: '999px', border: '1px solid #e5e7eb', bgcolor: 'white', fontSize: getFontSize(0.75), fontWeight: 500, color: '#111827', height: isPreview ? 20 : 'auto' }} />
                ))}
              </Box>
            </Box>
          );

      case 'hobbies':
        return visibleSections.hobbies && hobbies && !isPreview && (
            <Box key="hobbies" sx={{ mb: getSpacing(3) }}>
              <SectionTitle>Interests</SectionTitle>
              <Typography variant="body2" sx={{ fontSize: getFontSize(0.9), color: '#374151', lineHeight: 1.6, ...wrapTextStyle }}>
                {hobbies}
              </Typography>
            </Box>
          );

      default: return null;
    }
  };

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{
        minHeight: '100%',
        fontFamily: font,
        bgcolor: '#f3f4f6',
        transform: isPreview ? 'scale(0.85)' : 'none',
        transformOrigin: 'top left',
        // ✅ FORCE FONT FIX
        '& .MuiTypography-root': { fontFamily: font }
      }}
    >
      {/* ===== TOP HEADER BLOCK (BOLD SWISS STYLE) ===== */}
      <Box sx={{
          bgcolor: accentColor,
          color: 'white',
          px: isPreview ? 2 : { xs: 3, sm: 4 },
          py: isPreview ? 2 : { xs: 3, sm: 4 },
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: getSpacing(3),
        }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, fontSize: isPreview ? '1.2rem' : { xs: '1.8rem', sm: '2.2rem' }, letterSpacing: 1.5, textTransform: 'uppercase', mb: getSpacing(1), ...wrapTextStyle }}>
            {isPreview ? personalInfo.fullName?.substring(0, 15) : personalInfo.fullName || 'Your Name'}
          </Typography>

          <Grid container spacing={getSpacing(0.7)}>
            <Grid item xs={12} sm={6}><ContactItem icon={Mail} text={personalInfo.email} /></Grid>
            <Grid item xs={12} sm={6}><ContactItem icon={Phone} text={personalInfo.phone} /></Grid>
            <Grid item xs={12} sm={6}><ContactItem icon={MapPin} text={personalInfo.address} /></Grid>
            {!isPreview && (
              <>
                <Grid item xs={12} sm={6}><ContactItem icon={Linkedin} text={personalInfo.linkedin} link /></Grid>
                <Grid item xs={12} sm={6}><ContactItem icon={Globe} text={personalInfo.portfolio} link /></Grid>
              </>
            )}
          </Grid>
        </Box>

        {/* ✅ PHOTO LOGIC APPLIED */}
        {shouldShowPhoto && (
          <Avatar
            src={personalInfo.photo}
            sx={{
              width: isPreview ? 60 : 110,
              height: isPreview ? 60 : 110,
              border: '3px solid rgba(255,255,255,0.7)',
              bgcolor: 'white',
            }}
          />
        )}
      </Box>

      {/* ===== MAIN BODY ===== */}
      <Box sx={{ px: isPreview ? 2 : { xs: 3, sm: 4 }, py: isPreview ? 2 : { xs: 3, sm: 4 }, bgcolor: 'white' }}>
        {sectionOrder.map((id: string) => renderSection(id))}
      </Box>
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

export default TemplateSwiss;