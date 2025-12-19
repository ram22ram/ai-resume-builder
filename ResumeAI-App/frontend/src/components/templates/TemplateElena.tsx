import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
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

const TemplateElena = forwardRef(({ 
  data, 
  visibleSections = {}, 
  sectionOrder = [], 
  theme, 
  isPreview = false 
}: any, ref: any) => {
  const { personalInfo, summary, experience, education, projects, skills } = data || {};
  
  // 1. EXTRACT SETTINGS
  const accentColor = theme?.accentColor || '#2563eb';
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
    return isPreview ? value * 0.5 : value;
  };

  // 3. PHOTO LOGIC
  const shouldShowPhoto = 
    personalInfo.photo && 
    (photoMode === 'visible' || (photoMode === 'conditional' && personalInfo.photo)) &&
    photoMode !== 'hidden';

  const Section = ({ title, children }: any) => (
    <Box mb={getSpacing(4)}>
      <Typography 
        variant="h6" 
        color={accentColor} 
        sx={{ 
          borderBottom: `1px solid ${accentColor}40`, 
          mb: getSpacing(2),
          fontSize: getFontSize(1.1),
          fontWeight: 600
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );

  const renderSection = (id: string) => {
    switch(id) {
      case 'summary': 
        return visibleSections.summary && summary && (
          <Section title="Summary">
            <Typography variant="body2" fontSize={getFontSize(0.95)}>{summary}</Typography>
          </Section>
        );
      
      case 'experience': 
        return visibleSections.experience && experience?.length > 0 && (
          <Section title="Experience">
            {experience.slice(0, isPreview ? 1 : experience.length).map((e: any) => (
              <Box key={e.id} mb={getSpacing(2)}>
                <Typography fontWeight="bold" fontSize={getFontSize(1)}>{e.title}</Typography>
                <Typography variant="caption" color="text.secondary" fontSize={getFontSize(0.85)}>
                  {e.company} | {e.startDate} - {e.endDate}
                </Typography>
                <Typography variant="body2" mt={getSpacing(0.5)} fontSize={getFontSize(0.9)}>
                  {isPreview && e.description ? `${e.description.substring(0, 100)}...` : e.description}
                </Typography>
              </Box>
            ))}
          </Section>
        );
      
      case 'skills': 
        return visibleSections.skills && skills?.length > 0 && (
          <Section title="Skills">
            <Typography variant="body2" fontSize={getFontSize(0.95)}>
               {skills.slice(0, isPreview ? 5 : skills.length).join(', ')}
            </Typography>
          </Section>
        );
      
      case 'education': 
        return visibleSections.education && education?.length > 0 && (
          <Section title="Education">
            {education.map((e: any) => (
              <Box key={e.id} mb={getSpacing(1)}>
                <Typography fontWeight="bold" fontSize={getFontSize(0.95)}>{e.degree}</Typography>
                <Typography variant="body2" fontSize={getFontSize(0.9)}>
                  {e.school}, {e.year}
                </Typography>
              </Box>
            ))}
          </Section>
        );
        
      default: return null;
    }
  };

  return (
    <Paper 
      ref={ref} 
      elevation={3} 
      sx={{ 
        p: isPreview ? 2 : 5, 
        minHeight: '100%', 
        fontFamily: font,
        transform: isPreview ? 'scale(0.9)' : 'none',
        transformOrigin: 'top left',
        // ✅ FORCE FONT FIX
        '& .MuiTypography-root': { fontFamily: font }
      }}
    >
      <Box mb={getSpacing(5)} display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h3" color={accentColor} fontWeight="300" fontSize={getFontSize(2.5)}>
            {personalInfo.fullName}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize={getFontSize(0.9)} mt={1}>
            {personalInfo.address} • {personalInfo.phone} • {personalInfo.email}
          </Typography>
        </Box>
        
        {/* ✅ PHOTO LOGIC APPLIED */}
        {shouldShowPhoto && (
           <Avatar 
             src={personalInfo.photo} 
             sx={{ width: isPreview ? 60 : 100, height: isPreview ? 60 : 100, border: `2px solid ${accentColor}40` }} 
           />
        )}
      </Box>

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

export default TemplateElena;