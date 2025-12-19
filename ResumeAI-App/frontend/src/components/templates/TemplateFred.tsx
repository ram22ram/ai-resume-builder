import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Avatar, Divider, Grid } from '@mui/material';
import dayjs from 'dayjs';

// ✅ CONTRAST HELPER: Checks if color is too light
const isColorLight = (hex: string) => {
  const c = hex.substring(1);      
  const rgb = parseInt(c, 16);   
  const r = (rgb >> 16) & 0xff;  
  const g = (rgb >>  8) & 0xff;  
  const b = (rgb >>  0) & 0xff; 
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; 
  return luma > 200; 
};

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

const TemplateFred = forwardRef(({ 
  data, 
  visibleSections = {}, 
  sectionOrder = [], 
  theme, 
  isPreview = false 
}: any, ref: any) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data || {};
  
  // 1. EXTRACT SETTINGS
  const rawAccentColor = theme?.accentColor || '#333';
  
  // ✅ SMART COLOR: Use Dark Grey for text if Accent is too light
  const headerTextColor = isColorLight(rawAccentColor) ? '#222222' : rawAccentColor;
  
  const fontFamily = theme?.fontFamily || 'inter';
  const font = getFontFamily(fontFamily);
  const density = theme?.density || 'comfortable';
  const photoMode = theme?.photoMode || 'visible';

  // 2. DENSITY & SCALING
  const densityMultiplier = 
    density === 'compact' ? 0.7 : 
    density === 'spacious' ? 1.3 : 1.0;

  const previewScale = isPreview ? 0.8 : 1;
  
  const getFontSize = (baseSize: number) => `${baseSize * previewScale}rem`;

  const getSpacing = (baseSpacing: number) => {
    const value = baseSpacing * densityMultiplier;
    return isPreview ? value * 0.4 : value;
  };

  const getLimitedExperience = () => (isPreview && experience?.length > 0 ? [experience[0]] : experience);
  const getLimitedEducation = () => (isPreview && education?.length > 0 ? [education[0]] : education);

  const formatDate = (date: string) => {
    if (!date) return 'Present';
    const d = dayjs(date);
    return d.isValid() ? d.format('MMM YYYY') : date;
  };

  // 3. PHOTO LOGIC
  const shouldShowPhoto = 
    personalInfo.photo && 
    (photoMode === 'visible' || (photoMode === 'conditional' && personalInfo.photo)) &&
    photoMode !== 'hidden';

  const SectionTitle = ({ children }: any) => (
    <Typography variant="h6" sx={{ 
      fontWeight: 800, 
      textTransform: 'uppercase', 
      letterSpacing: 1.5, 
      fontSize: getFontSize(1), 
      color: headerTextColor, // Uses smart contrast color
      borderBottom: `2px solid ${rawAccentColor}`, // Keeps original accent for the line
      pb: 0.5, 
      mb: getSpacing(2.5), 
      mt: getSpacing(3.5) 
    }}>
      {children}
    </Typography>
  );

  const renderSection = (id: string) => {
    switch(id) {
      case 'summary': 
        return visibleSections.summary && summary && (
          <Box key="summary" mb={getSpacing(3)}>
            <SectionTitle>Professional Profile</SectionTitle>
            <Typography variant="body2" sx={{ ...wrapTextStyle, fontSize: getFontSize(0.95), lineHeight: 1.6 }}>
              {isPreview ? `${summary.substring(0, 150)}...` : summary}
            </Typography>
          </Box>
        );
      
      case 'skills': 
        return visibleSections.skills && skills?.length > 0 && (
          <Box key="skills" mb={getSpacing(3)}>
            <SectionTitle>Key Skills</SectionTitle>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {/* Modern Bold List for Fred */}
                {skills.slice(0, isPreview ? 8 : skills.length).map((skill: string, idx: number) => (
                    <Typography key={idx} component="span" sx={{ 
                        fontSize: getFontSize(0.9), 
                        fontWeight: 600, 
                        color: '#444',
                        bgcolor: '#f5f5f5',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1
                    }}>
                        {skill}
                    </Typography>
                ))}
            </Box>
          </Box>
        );
      
      case 'experience': 
        const limitedExp = getLimitedExperience();
        if (!visibleSections.experience || !limitedExp?.length) return null;
        return (
          <Box key="experience" mb={getSpacing(3)}>
            <SectionTitle>Experience</SectionTitle>
            {limitedExp.map((e: any, index: number) => (
              <Box key={e.id || index} mb={getSpacing(3)}>
                <Grid container alignItems="baseline" justifyContent="space-between">
                    <Grid item xs={8}>
                        <Typography sx={{ fontWeight: 700, fontSize: getFontSize(1.05), color: '#000' }}>
                            {e.title}
                        </Typography>
                        <Typography sx={{ fontWeight: 500, color: headerTextColor, fontSize: getFontSize(0.95) }}>
                            {e.company} {e.location && `— ${e.location}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ fontSize: getFontSize(0.85), fontWeight: 600, color: '#666' }}>
                            {formatDate(e.startDate)} – {e.isPresent ? 'Present' : formatDate(e.endDate)}
                        </Typography>
                    </Grid>
                </Grid>
                <Typography variant="body2" sx={{ mt: 1, ...wrapTextStyle, fontSize: getFontSize(0.95), color: '#333' }}>
                  {isPreview && e.description ? `${e.description.substring(0, 100)}...` : e.description}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      
      case 'education': 
        const limitedEdu = getLimitedEducation();
        if (!visibleSections.education || !limitedEdu?.length) return null;
        return (
          <Box key="education" mb={getSpacing(3)}>
            <SectionTitle>Education</SectionTitle>
            {limitedEdu.map((e: any, index: number) => (
              <Box key={e.id || index} mb={getSpacing(2)}>
                <Grid container alignItems="baseline" justifyContent="space-between">
                    <Grid item xs={9}>
                        <Typography sx={{ fontWeight: 700, fontSize: getFontSize(1) }}>
                            {e.degree}
                        </Typography>
                        <Typography sx={{ fontSize: getFontSize(0.95), color: '#444' }}>
                            {e.school} {e.city && `, ${e.city}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" sx={{ fontSize: getFontSize(0.85), color: '#666' }}>
                            {e.year}
                        </Typography>
                    </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        );
      
      case 'projects': 
        if (!visibleSections.projects || !projects?.length || isPreview) return null;
        return (
          <Box key="projects" mb={getSpacing(3)}>
            <SectionTitle>Projects</SectionTitle>
            {projects.map((p: any, index: number) => (
              <Box key={p.id || index} mb={getSpacing(2)}>
                <Typography sx={{ fontWeight: 700, fontSize: getFontSize(1) }}>
                    {p.title} 
                    {p.link && <a href={p.link} style={{ fontSize: '0.8em', marginLeft: '8px', color: rawAccentColor }}>Link ↗</a>}
                </Typography>
                <Typography variant="body2" sx={{ ...wrapTextStyle, fontSize: getFontSize(0.95) }}>
                    {p.description}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      
      case 'hobbies': 
        return visibleSections.hobbies && hobbies && !isPreview && (
          <Box key="hobbies" mb={getSpacing(3)}>
            <SectionTitle>Interests</SectionTitle>
            <Typography variant="body2" sx={{ ...wrapTextStyle, fontSize: getFontSize(0.95) }}>{hobbies}</Typography>
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
        p: isPreview ? 2 : { xs: 3, sm: 5 }, 
        fontFamily: font, 
        minHeight: '100%', 
        color: '#333',
        bgcolor: '#fff',
        transform: isPreview ? 'scale(0.9)' : 'none',
        transformOrigin: 'top left',
        // ✅ FORCE FONT FIX
        '& .MuiTypography-root': { fontFamily: font },
        '@media print': {
            padding: '40px !important',
        }
      }}
    >
      {/* HEADER: Fred is centered, bold name */}
      <Box textAlign="center" mb={getSpacing(4)}>
        
        {/* ✅ ADDED PHOTO SUPPORT */}
        {shouldShowPhoto && (
           <Avatar 
             src={personalInfo.photo} 
             sx={{ 
                width: isPreview ? 70 : 110, 
                height: isPreview ? 70 : 110, 
                mx: 'auto', 
                mb: 2,
                border: `3px solid ${rawAccentColor}` 
             }} 
           />
        )}

        <Typography variant="h3" sx={{ 
            fontWeight: 900, 
            textTransform: 'uppercase', 
            letterSpacing: 1, 
            color: headerTextColor, // Contrast safe color
            fontSize: getFontSize(2.5),
            lineHeight: 1.1
        }}>
          {personalInfo.fullName || 'Your Name'}
        </Typography>

        {personalInfo.jobTitle && (
            <Typography variant="h6" sx={{ color: rawAccentColor, fontWeight: 500, mt: 1, fontSize: getFontSize(1.1) }}>
                {personalInfo.jobTitle}
            </Typography>
        )}

        <Box 
          mt={getSpacing(2)} 
          display="flex" 
          justifyContent="center" 
          gap={getSpacing(2)} 
          fontSize={getFontSize(0.9)} 
          color="#555" 
          flexWrap="wrap"
          sx={{ '& span': { display: 'flex', alignItems: 'center' } }}
        >
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.email && <span>|</span>}
          {personalInfo.email && <span>{isPreview ? `${personalInfo.email.substring(0, 15)}...` : personalInfo.email}</span>}
          {personalInfo.address && <span>|</span>}
          {personalInfo.address && <span>{isPreview ? `${personalInfo.address.substring(0, 15)}...` : personalInfo.address}</span>}
        </Box>

        {(personalInfo.linkedin || personalInfo.portfolio) && !isPreview && (
          <Box mt={1} display="flex" justifyContent="center" gap={2}>
             {personalInfo.linkedin && <a href={personalInfo.linkedin} style={{ color: rawAccentColor, textDecoration: 'none', fontWeight: 600 }}>LinkedIn</a>}
             {personalInfo.portfolio && <a href={personalInfo.portfolio} style={{ color: rawAccentColor, textDecoration: 'none', fontWeight: 600 }}>Portfolio</a>}
          </Box>
        )}
      </Box>
      
      <Divider sx={{ mb: getSpacing(4), opacity: 0.5 }} />

      {sectionOrder.map((id: string) => renderSection(id))}
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

export default TemplateFred;