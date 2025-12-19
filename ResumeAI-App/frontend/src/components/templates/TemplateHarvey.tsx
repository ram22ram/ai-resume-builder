import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

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

const TemplateHarvey = forwardRef(({ 
  data, 
  visibleSections = {}, 
  sectionOrder = [], 
  theme, 
  isPreview = false 
}: any, ref: any) => {
  const { personalInfo, summary, experience, education, skills } = data || {};
  
  // 1. EXTRACT SETTINGS
  const accentColor = theme?.accentColor || '#0d9488';
  const fontFamily = theme?.fontFamily || 'inter';
  const font = getFontFamily(fontFamily);
  const density = theme?.density || 'comfortable';

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

  const getLimitedExperience = () => (isPreview && experience?.length > 0 ? [experience[0]] : experience);
  const getLimitedEducation = () => (isPreview && education?.length > 0 ? [education[0]] : education);

  const Head = ({t}: any) => (
    <Typography 
      color={accentColor} 
      fontWeight="bold" 
      textTransform="uppercase" 
      letterSpacing={1} 
      mb={getSpacing(1)}
      fontSize={getFontSize(0.95)}
    >
      {t}
    </Typography>
  );

  const renderSection = (id: string) => {
    switch(id) {
      case 'summary': 
        return visibleSections.summary && summary && !isPreview && (
          <Box mb={getSpacing(3)}>
            <Head>Summary</Head>
            <Typography variant="body2" fontSize={getFontSize(0.9)}>
              {summary}
            </Typography>
          </Box>
        );
      
      case 'skills': 
        return visibleSections.skills && skills?.length > 0 && (
          <Box mb={getSpacing(3)}>
            <Head>Key Skills</Head>
            <Box display="flex" flexWrap="wrap" gap={getSpacing(2)}>
              {skills.slice(0, isPreview ? 4 : skills.length).map((s: string) => (
                <Typography key={s} variant="body2" fontWeight="bold" fontSize={getFontSize(0.85)}>
                  • {s}
                </Typography>
              ))}
            </Box>
          </Box>
        );
      
      case 'experience': 
        const limitedExp = getLimitedExperience();
        return visibleSections.experience && limitedExp?.length > 0 && (
          <Box mb={getSpacing(3)}>
            <Head>Work History</Head>
            {limitedExp.map((e: any) => (
              <Box 
                key={e.id} 
                mb={getSpacing(2)} 
                pl={getSpacing(2)} 
                borderLeft={`2px solid ${accentColor}`}
              >
                <Typography fontWeight="bold" fontSize={getFontSize(0.95)}>
                  {e.title}
                </Typography>
                <Typography variant="caption" fontSize={getFontSize(0.8)}>
                  {e.company} | {e.startDate} - {e.endDate}
                </Typography>
                <Typography variant="body2" fontSize={getFontSize(0.9)} mt={getSpacing(0.5)}>
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
            <Head>Education</Head>
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
      
      default: return null;
    }
  };

  return (
    <Paper 
      ref={ref} 
      elevation={isPreview ? 1 : 3} 
      sx={{ 
        p: isPreview ? 2 : 5, 
        minHeight: '100%', 
        fontFamily: font,
        transform: isPreview ? 'scale(0.85)' : 'none',
        transformOrigin: 'top left',
        // ✅ FORCE FONT FIX
        '& .MuiTypography-root': { fontFamily: font }
      }}
    >
      <Box textAlign="center" mb={getSpacing(4)}>
        <Typography variant="h3" fontWeight="300" color={accentColor} textTransform="uppercase" letterSpacing={4} fontSize={isPreview ? '1.5rem' : '2.5rem'}>
          {isPreview ? personalInfo.fullName?.substring(0, 10) : personalInfo.fullName}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={getSpacing(1)} fontSize={getFontSize(0.9)}>
          {isPreview ? `${personalInfo.address?.substring(0, 15)}...` : personalInfo.address} | 
          {isPreview ? ` ${personalInfo.email?.substring(0, 10)}...` : ` ${personalInfo.email}`} | 
          {` ${personalInfo.phone}`}
        </Typography>
      </Box>
      <Divider sx={{ mb: getSpacing(4) }} />
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

export default TemplateHarvey;