import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Grid, Chip, Avatar, Divider } from '@mui/material';
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
    default: return '"Helvetica Neue", Helvetica, Arial, sans-serif';
  }
};

const wrapTextStyle = { whiteSpace: 'pre-wrap', wordBreak: 'break-word' } as const;

const formatDate = (date: string, format: string) => {
  if (!date) return 'Present';
  const d = dayjs(date);
  return d.isValid() ? d.format(format) : date;
};

const TemplateCorporate = forwardRef(({ 
  data, 
  visibleSections = {}, 
  sectionOrder = [], 
  theme, 
  isPreview = false 
}: any, ref: any) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data || {};

  // 1. EXTRACT SETTINGS
  const accentColor = theme?.accentColor || '#1A237E';
  const fontFamily = theme?.fontFamily || 'inter';
  const font = getFontFamily(fontFamily);
  const density = theme?.density || 'comfortable';
  const photoMode = theme?.photoMode || 'visible';

  // 2. DENSITY MATH
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

  const Section = ({ title, children }: any) => (
    <Box sx={{ mb: getSpacing(2.5) }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: getFontSize(0.85), color: accentColor, textTransform: 'uppercase', letterSpacing: 1, mb: getSpacing(1) }}>
        {title}
      </Typography>
      {children}
    </Box>
  );

  const MainSection = ({ title, children }: any) => (
    <Box sx={{ mb: getSpacing(3) }}>
      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: getFontSize(1), color: accentColor, borderBottom: `2px solid ${accentColor}33`, pb: getSpacing(0.5), mb: getSpacing(1.5), textTransform: 'uppercase', letterSpacing: 0.8 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );

  const ContactItem = ({ icon: Icon, text, link = false }: any) => {
    if (!text) return null;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: getSpacing(0.7) }}>
        <Icon size={isPreview ? 10 : 14} color={accentColor} />
        {link ? (
            <a href={text} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: accentColor, fontSize: getFontSize(0.85) }}>
                {isPreview && text.length > 15 ? `${text.substring(0, 12)}...` : text}
            </a>
        ) : (
            <Typography variant="body2" sx={{ fontSize: getFontSize(0.85), ...wrapTextStyle, color: '#333' }}>
                {isPreview && text.length > 15 ? `${text.substring(0, 12)}...` : text}
            </Typography>
        )}
      </Box>
    );
  };

  const getLimitedExperience = () => (isPreview && experience?.length > 0 ? [experience[0]] : experience);
  const getLimitedEducation = () => (isPreview && education?.length > 0 ? [education[0]] : education);

  const renderSection = (sectionId: string, variant = 'main') => {
    switch (sectionId) {
      case 'summary':
        return visibleSections.summary && summary && (variant === 'main') && !isPreview && (
            <MainSection title="Summary" key="summary">
              <Typography variant="body2" sx={{ fontSize: getFontSize(0.95), ...wrapTextStyle }}>
                {summary}
              </Typography>
            </MainSection>
          );

      case 'skills':
        return visibleSections.skills && skills?.length > 0 && (variant === 'sidebar') && (
            <Section title="Skills" key="skills">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: getSpacing(0.8) }}>
                {skills.slice(0, isPreview ? 6 : skills.length).map((skill: string, index: number) => (
                  <Chip key={index} label={skill} size="small" sx={{ bgcolor: `${accentColor}10`, color: accentColor, fontWeight: 600, borderRadius: '4px', fontSize: getFontSize(0.75), height: 'auto', py: 0.5 }} />
                ))}
              </Box>
            </Section>
          );

      case 'experience':
        const limitedExp = getLimitedExperience();
        if (!visibleSections.experience || !limitedExp?.length || variant !== 'main') return null;
        return (
            <MainSection title="Experience" key="experience">
              {limitedExp.map((exp: any) => (
                <Box key={exp.id} sx={{ mb: getSpacing(2) }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, alignItems: 'baseline' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.98) }}>
                      {exp.title || 'Job Title'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555', fontSize: getFontSize(0.8) }}>
                      {formatDate(exp.startDate, 'MMM YYYY')} – {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: accentColor, fontSize: getFontSize(0.9), mb: getSpacing(0.3) }}>
                    {exp.company || 'Company'} {exp.location && ` • ${exp.location}`}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: getFontSize(0.9), ...wrapTextStyle }}>
                    {isPreview ? `${exp.description?.substring(0, 80)}...` : exp.description}
                  </Typography>
                </Box>
              ))}
            </MainSection>
          );

      case 'projects':
        if (!visibleSections.projects || !projects?.length || variant !== 'main' || isPreview) return null;
        return (
            <MainSection title="Projects" key="projects">
              {projects.map((proj: any) => (
                <Box key={proj.id} sx={{ mb: getSpacing(2) }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.95) }}>
                    {proj.title}
                  </Typography>
                  {proj.link && (
                    <Typography variant="caption" sx={{ fontStyle: 'italic', color: accentColor, ...wrapTextStyle }}>
                      {proj.link}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ fontSize: getFontSize(0.9), ...wrapTextStyle, mt: getSpacing(0.5) }}>
                    {proj.description}
                  </Typography>
                </Box>
              ))}
            </MainSection>
          );

      case 'education':
        const limitedEdu = getLimitedEducation();
        if (!visibleSections.education || !limitedEdu?.length || variant !== 'main') return null;
        return (
            <MainSection title="Education" key="education">
              {limitedEdu.map((edu: any) => (
                <Box key={edu.id} sx={{ mb: getSpacing(1.5) }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.95) }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: getFontSize(0.9) }}>
                    {edu.school}{edu.city && ` • ${edu.city}`}
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: getFontSize(0.8), fontStyle: 'italic', color: '#555' }}>
                    {formatDate(edu.startDate, 'YYYY')} – {formatDate(edu.endDate, 'YYYY')}
                  </Typography>
                </Box>
              ))}
            </MainSection>
          );

      case 'hobbies':
        return visibleSections.hobbies && hobbies && (variant === 'sidebar') && !isPreview && (
            <Section title="Interests" key="hobbies">
              <Typography variant="body2" sx={{ fontSize: getFontSize(0.9), ...wrapTextStyle }}>
                {hobbies}
              </Typography>
            </Section>
          );

      default: return null;
    }
  };

  const sidebarIds = ['skills', 'hobbies'];
  const sidebarOrder = sectionOrder.filter((id: string) => sidebarIds.includes(id));
  const mainOrder = sectionOrder.filter((id: string) => !sidebarIds.includes(id));

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{
        p: isPreview ? 1 : { xs: 2, sm: 3, md: 4 },
        fontFamily: font,
        minHeight: '100%',
        bgcolor: '#f5f6fa',
        color: '#333333',
        borderRadius: 2,
        transform: isPreview ? 'scale(0.85)' : 'none',
        transformOrigin: 'top left',
        // ✅ FORCE FONT FIX
        '& .MuiTypography-root': { fontFamily: font }
      }}
    >
      {/* ===== HEADER ===== */}
      <Box sx={{
          mb: getSpacing(3),
          pb: getSpacing(2),
          borderBottom: `2px solid ${accentColor}33`,
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, fontSize: isPreview ? '1.2rem' : { xs: '1.8rem', sm: '2.1rem' }, color: accentColor, mb: getSpacing(1), ...wrapTextStyle }}>
            {isPreview ? personalInfo.fullName?.toUpperCase().substring(0, 15) : personalInfo.fullName?.toUpperCase() || 'YOUR NAME'}
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
            variant="rounded"
            sx={{
              width: isPreview ? 60 : 110,
              height: isPreview ? 60 : 110,
              border: `2px solid ${accentColor}33`,
              bgcolor: '#fff',
            }}
          />
        )}
      </Box>

      {/* ===== BODY ===== */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: isPreview ? 'column' : 'row' }, gap: getSpacing(3) }}>
        
        {/* SIDEBAR */}
        {(!isPreview || (isPreview && sidebarOrder.includes('skills'))) && (
          <Box sx={{ width: isPreview ? '100%' : { xs: '100%', md: '30%' }, bgcolor: '#ffffff', borderRadius: 2, p: isPreview ? 1 : 2, border: `1px solid ${accentColor}15` }}>
            {sidebarOrder.map((id: string) => renderSection(id, 'sidebar'))}
          </Box>
        )}

        {/* MAIN CONTENT */}
        <Box sx={{ width: isPreview ? '100%' : { xs: '100%', md: '70%' } }}>
          {mainOrder.map((id: string) => renderSection(id, 'main'))}
        </Box>
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

export default TemplateCorporate;