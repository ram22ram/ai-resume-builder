import React, { forwardRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const getFontFamily = (fontName: string): string => {
  switch (fontName) {
    case 'inter': return '"Inter", sans-serif';
    case 'roboto': return '"Roboto", sans-serif';
    case 'opensans': return '"Open Sans", sans-serif';
    case 'lato': return '"Lato", sans-serif';
    case 'montserrat': return '"Montserrat", sans-serif';
    case 'poppins': return '"Poppins", sans-serif';
    default: return '"Roboto", sans-serif'; 
  }
};

const TemplateEileen = forwardRef(({ 
  data, 
  visibleSections = {}, 
  sectionOrder = [], 
  theme, 
  isPreview = false 
}: any, ref: any) => {
  const { personalInfo, summary, experience, education, projects, skills } = data || {};
  
  // 1. EXTRACT SETTINGS
  const accentColor = theme?.accentColor || '#374151'; 
  const fontFamily = theme?.fontFamily || 'roboto'; 
  const font = getFontFamily(fontFamily);
  const density = theme?.density || 'comfortable';

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

  // NOTE: Template Eileen usually does not include a photo by design, 
  // so we are not injecting the photo logic here to preserve the intended layout.

  const getLimitedExperience = () => (isPreview && experience?.length > 0 ? [experience[0]] : experience);
  const getLimitedEducation = () => (isPreview && education?.length > 0 ? [education[0]] : education);

  const renderMain = (id: string) => {
    if (['skills', 'education'].includes(id)) return null; 
    switch(id) {
      case 'summary': 
        return visibleSections.summary && summary && !isPreview && (
          <Box mb={getSpacing(3)}>
            <Typography variant="h6" color={accentColor} fontWeight="bold" mb={getSpacing(1)} fontSize={getFontSize(1)}>
              Professional Summary
            </Typography>
            <Typography variant="body2" fontSize={getFontSize(0.9)}>
              {summary}
            </Typography>
          </Box>
        );
      
      case 'experience': 
        const limitedExp = getLimitedExperience();
        if (!visibleSections.experience || !limitedExp?.length) return null;
        return (
          <Box mb={getSpacing(3)}>
            <Typography variant="h6" color={accentColor} fontWeight="bold" mb={getSpacing(2)} fontSize={getFontSize(1)}>
              Work History
            </Typography>
            {limitedExp.map((e: any) => (
              <Box key={e.id} mb={getSpacing(2)}>
                <Typography fontWeight="bold" fontSize={getFontSize(0.95)}>
                  {e.title}
                </Typography>
                <Typography variant="caption" fontSize={getFontSize(0.8)}>
                  {e.company} | {e.startDate} - {e.endDate}
                </Typography>
                <Typography variant="body2" mt={getSpacing(0.5)} fontSize={getFontSize(0.85)}>
                  {isPreview && e.description ? `${e.description.substring(0, 80)}...` : e.description}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      
      default: return null;
    }
  };

  const renderSide = (id: string) => {
    if (!['skills', 'education'].includes(id)) return null;
    switch(id) {
      case 'skills': 
        return visibleSections.skills && skills?.length > 0 && (
          <Box mb={getSpacing(4)}>
            <Typography fontWeight="bold" mb={getSpacing(1)} fontSize={getFontSize(0.9)}>
              SKILLS
            </Typography>
            {skills.slice(0, isPreview ? 6 : skills.length).map((s: string) => (
              <Typography key={s} variant="body2" mb={getSpacing(0.5)} fontSize={getFontSize(0.8)}>
                • {s}
              </Typography>
            ))}
          </Box>
        );
      
      case 'education': 
        const limitedEdu = getLimitedEducation();
        return visibleSections.education && limitedEdu?.length > 0 && (
          <Box mb={getSpacing(4)}>
            <Typography fontWeight="bold" mb={getSpacing(1)} fontSize={getFontSize(0.9)}>
              EDUCATION
            </Typography>
            {limitedEdu.map((e: any) => (
              <Box key={e.id} mb={getSpacing(1)}>
                <Typography variant="body2" fontWeight="bold" fontSize={getFontSize(0.85)}>
                  {e.degree}
                </Typography>
                <Typography variant="caption" fontSize={getFontSize(0.75)}>
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
        display: 'flex', 
        minHeight: '100%', 
        fontFamily: font,
        transform: isPreview ? 'scale(0.9)' : 'none',
        transformOrigin: 'top left',
        // ✅ FORCE FONT FIX
        '& .MuiTypography-root': { fontFamily: font }
      }}
    >
      {/* Left Sidebar */}
      <Box width={isPreview ? "35%" : "30%"} bgcolor={accentColor} color="white" p={isPreview ? 1.5 : 3}>
        <Typography variant="h5" fontWeight="bold" mb={getSpacing(3)} lineHeight={1.2} fontSize={getFontSize(1.2)}>
          {isPreview ? personalInfo.fullName?.substring(0, 10) : personalInfo.fullName || 'Your Name'}
        </Typography>
        
        <Box mb={getSpacing(4)} fontSize={getFontSize(0.75)}>
          <Typography display="block" mb={getSpacing(0.5)}>
            {isPreview ? `${personalInfo.email?.substring(0, 10)}...` : personalInfo.email}
          </Typography>
          <Typography display="block" mb={getSpacing(0.5)}>
            {personalInfo.phone}
          </Typography>
          <Typography display="block">
            {isPreview ? `${personalInfo.address?.substring(0, 15)}...` : personalInfo.address}
          </Typography>
        </Box>
        
        {sectionOrder.map((id: string) => renderSide(id))}
      </Box>
      
      {/* Right Content */}
      <Box width={isPreview ? "65%" : "70%"} p={isPreview ? 2 : 4}>
        {sectionOrder.map((id: string) => renderMain(id))}
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

export default TemplateEileen;