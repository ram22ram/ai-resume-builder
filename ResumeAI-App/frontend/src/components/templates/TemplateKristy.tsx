import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';

const getFontFamily = (fontName: string): string => {
  switch (fontName) {
    case 'inter': return '"Inter", sans-serif';
    case 'roboto': return '"Roboto", sans-serif';
    case 'opensans': return '"Open Sans", sans-serif';
    case 'lato': return '"Lato", sans-serif';
    case 'montserrat': return '"Montserrat", sans-serif';
    case 'poppins': return '"Poppins", sans-serif';
    default: return '"Times New Roman", Times, serif';
  }
};

const TemplateKristy = forwardRef(({ 
  data, 
  visibleSections = {}, 
  sectionOrder = [], 
  theme, 
  isPreview = false 
}: any, ref: any) => {
  const { personalInfo, summary, experience, education, projects, skills } = data || {};
  
  // 1. EXTRACT SETTINGS
  const accentColor = theme?.accentColor || '#e11d48';
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

  const getLimitedExperience = () => (isPreview && experience?.length > 0 ? [experience[0]] : experience);
  const getLimitedEducation = () => (isPreview && education?.length > 0 ? [education[0]] : education);

  const HeaderTitle = ({ children }: any) => (
    <Typography 
      variant="subtitle2" 
      fontWeight="bold" 
      color={accentColor} 
      textTransform="uppercase" 
      mb={getSpacing(1)} 
      letterSpacing={1}
      fontSize={getFontSize(0.85)}
    >
      {children}
    </Typography>
  );

  const renderSection = (id: string) => {
    switch(id) {
      case 'summary': 
        return visibleSections.summary && summary && !isPreview && (
          <Box mb={getSpacing(3)}>
            <HeaderTitle>Profile</HeaderTitle>
            <Typography variant="body2" fontSize={getFontSize(0.9)}>
              {summary}
            </Typography>
          </Box>
        );
      
      case 'experience': 
        const limitedExp = getLimitedExperience();
        return visibleSections.experience && limitedExp?.length > 0 && (
          <Box mb={getSpacing(3)}>
            <HeaderTitle>Work History</HeaderTitle>
            {limitedExp.map((e: any) => (
              <Box key={e.id} mb={getSpacing(2)}>
                <Typography fontWeight="bold" fontSize={getFontSize(0.95)}>
                  {e.title}
                </Typography>
                <Typography variant="caption" display="block" mb={getSpacing(0.5)} fontSize={getFontSize(0.8)}>
                  {e.company} | {e.startDate} - {e.endDate}
                </Typography>
                <Typography variant="body2" fontSize={getFontSize(0.9)}>
                  {isPreview ? `${e.description?.substring(0, 50)}...` : e.description}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      
      case 'education': 
        const limitedEdu = getLimitedEducation();
        return visibleSections.education && limitedEdu?.length > 0 && (
          <Box mb={getSpacing(3)}>
            <HeaderTitle>Education</HeaderTitle>
            {limitedEdu.map((e: any) => (
              <Box key={e.id} mb={getSpacing(1)}>
                <Typography fontWeight="bold" fontSize={getFontSize(0.95)}>
                  {e.degree}
                </Typography>
                <Typography variant="body2" fontSize={getFontSize(0.9)}>
                  {e.school}, {e.year}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      
      case 'skills': 
        return visibleSections.skills && skills?.length > 0 && (
          <Box mb={getSpacing(3)}>
            <HeaderTitle>Skills</HeaderTitle>
            <Box display="flex" flexWrap="wrap" gap={getSpacing(1)}>
              {skills.slice(0, isPreview ? 4 : skills.length).map((s: string) => (
                <Typography 
                  key={s} 
                  variant="caption" 
                  sx={{
                    border: `1px solid ${accentColor}`, 
                    color: accentColor, 
                    px: 1, 
                    borderRadius: 4,
                    fontSize: getFontSize(0.75)
                  }}
                >
                  {s}
                </Typography>
              ))}
            </Box>
          </Box>
        );
      
      default: return null;
    }
  };

  return (
    <Paper 
      ref={ref} 
      elevation={isPreview ? 1 : 3} 
      sx={{ 
        p: isPreview ? 2 : 4, 
        minHeight: '100%', 
        fontFamily: font,
        transform: isPreview ? 'scale(0.85)' : 'none',
        transformOrigin: 'top left',
        // ✅ FORCE FONT FIX
        '& .MuiTypography-root': { fontFamily: font }
      }}
    >
      <Grid container spacing={getSpacing(3)} mb={getSpacing(4)} alignItems="center">
        <Grid item xs={isPreview ? 3 : 2}>
          
          {/* ✅ PHOTO LOGIC APPLIED */}
          {shouldShowPhoto ? (
            <Avatar src={personalInfo.photo} sx={{width: isPreview ? 40 : 80, height: isPreview ? 40 : 80}} />
          ) : (
            // Placeholder if conditional but no photo, OR removed if Hidden. 
            // Here we render a placeholder only if strictly NOT hidden but photo is null
            (!personalInfo.photo && photoMode !== 'hidden') && (
                <Box width={isPreview ? 40 : 80} height={isPreview ? 40 : 80} bgcolor="#eee" borderRadius="50%" />
            )
          )}
        </Grid>
        <Grid item xs={isPreview ? 9 : 10}>
          <Typography variant="h3" fontWeight="bold" color="#fff" fontSize={isPreview ? '1.2rem' : '2rem'}>
            {isPreview ? personalInfo.fullName?.substring(0, 12) : personalInfo.fullName}
          </Typography>
          <Typography variant="body1" color={accentColor} fontSize={getFontSize(0.9)}>
            {isPreview ? `${personalInfo.email?.substring(0, 10)}...` : personalInfo.email} | 
            {` ${personalInfo.phone}`} | 
            {isPreview ? ` ${personalInfo.address?.substring(0, 10)}...` : ` ${personalInfo.address}`}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ columnCount: 1 }}>
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

export default TemplateKristy;