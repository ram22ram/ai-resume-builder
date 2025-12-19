import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Avatar, Divider } from '@mui/material';
import dayjs from 'dayjs';

const getFontFamily = (fontName: string): string => {
  switch (fontName) {
    // Classic usually looks best with Serif, but we respect user choice
    case 'inter': return '"Inter", sans-serif';
    case 'roboto': return '"Roboto", sans-serif';
    case 'opensans': return '"Open Sans", sans-serif';
    case 'lato': return '"Lato", sans-serif';
    case 'montserrat': return '"Montserrat", sans-serif';
    case 'poppins': return '"Poppins", sans-serif';
    default: return '"Times New Roman", Times, serif';
  }
};

const wrapTextStyle = {
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
} as const;

const TemplateClassic = forwardRef(({ 
  data, 
  visibleSections = {}, 
  sectionOrder = [], 
  theme, 
  isPreview = false 
}: any, ref: any) => {
  
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data || {};

  // 1. EXTRACT THEME SETTINGS
  const accentColor = theme?.accentColor || '#000000';
  const fontFamily = theme?.fontFamily || 'serif'; // Default to serif if not chosen
  const font = getFontFamily(fontFamily);
  const density = theme?.density || 'comfortable';
  const photoMode = theme?.photoMode || 'visible';

  // 2. DENSITY MATH
  const densityMultiplier = 
    density === 'compact' ? 0.7 : 
    density === 'spacious' ? 1.3 : 1.0;

  const previewScale = isPreview ? 0.8 : 1;
  
  const getFontSize = (baseSize: number) => `${baseSize * previewScale}rem`;
  
  const getSpacing = (baseSpacing: number) => {
    const value = baseSpacing * densityMultiplier;
    return isPreview ? value * 0.5 : value;
  };

  const formatDate = (date: string, format: string) => {
    if (!date) return 'Present';
    const d = dayjs(date);
    return d.isValid() ? d.format(format) : date;
  };

  // 3. CLASSIC STYLING HELPERS
  // Classic headers are usually centered, uppercase, with a line underneath
  const SectionTitle = ({ children }: any) => (
    <Box sx={{ width: '100%', mb: getSpacing(1.5), mt: getSpacing(2) }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: font,
          fontWeight: 700,
          fontSize: getFontSize(1.1),
          letterSpacing: 2,
          textTransform: 'uppercase',
          color: accentColor,
          textAlign: 'center', // Classic style center
          pb: getSpacing(0.5),
          borderBottom: `1px solid ${accentColor}`
        }}
      >
        {children}
      </Typography>
    </Box>
  );

  const shouldShowPhoto = 
    personalInfo.photo && 
    (photoMode === 'visible' || (photoMode === 'conditional' && personalInfo.photo)) &&
    photoMode !== 'hidden';

  const getLimitedExperience = () => (isPreview && experience?.length > 0 ? [experience[0]] : experience);
  const getLimitedEducation = () => (isPreview && education?.length > 0 ? [education[0]] : education);

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return visibleSections.summary && summary && (
            <Box key="summary" sx={{ mb: getSpacing(2), textAlign: 'justify' }}>
              <SectionTitle>Professional Summary</SectionTitle>
              <Typography variant="body2" sx={{ ...wrapTextStyle, fontSize: getFontSize(0.95), lineHeight: 1.6 }}>
                {isPreview ? `${summary.substring(0, 150)}...` : summary}
              </Typography>
            </Box>
          );

      case 'skills':
        return visibleSections.skills && skills?.length > 0 && (
            <Box key="skills" sx={{ mb: getSpacing(2) }}>
              <SectionTitle>Technical Skills</SectionTitle>
              <Typography variant="body2" sx={{ textAlign: 'center', lineHeight: 1.8, fontSize: getFontSize(0.95) }}>
                {/* Traditional Comma Separated or Bullet Separated List - No Chips */}
                {skills.slice(0, isPreview ? 8 : skills.length).join(' • ')}
              </Typography>
            </Box>
          );

      case 'experience':
        const limitedExp = getLimitedExperience();
        if (!visibleSections.experience || !limitedExp?.length) return null;
        return (
            <Box key="experience" sx={{ mb: getSpacing(2) }}>
              <SectionTitle>Work Experience</SectionTitle>
              {limitedExp.map((exp: any, index: number) => (
                <Box key={exp.id || index} sx={{ mb: getSpacing(2.5) }}>
                  {/* Classic: Title Left, Date Right */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px dotted #ccc', pb: 0.5, mb: 0.5 }}>
                    <Typography variant="body1" sx={{ fontWeight: 700, fontSize: getFontSize(1) }}>
                      {exp.title || 'Job Title'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', fontSize: getFontSize(0.9), color: '#333' }}>
                       {formatDate(exp.startDate, 'MMM YYYY')} – {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')}
                    </Typography>
                  </Box>
                  
                  {/* Company & Location */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: getSpacing(1) }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#444', fontSize: getFontSize(0.95) }}>
                      {exp.company}
                    </Typography>
                    {exp.location && (
                      <Typography variant="caption" sx={{ color: '#666', fontSize: getFontSize(0.9) }}>
                        {exp.location}
                      </Typography>
                    )}
                  </Box>

                  <Typography variant="body2" sx={{ ...wrapTextStyle, fontSize: getFontSize(0.95), lineHeight: 1.5, textAlign: 'justify' }}>
                    {isPreview && exp.description ? `${exp.description.substring(0, 100)}...` : exp.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          );

      case 'projects':
        if (!visibleSections.projects || !projects?.length || isPreview) return null;
        return (
            <Box key="projects" sx={{ mb: getSpacing(2) }}>
              <SectionTitle>Key Projects</SectionTitle>
              {projects.map((proj: any, index: number) => (
                <Box key={proj.id || index} sx={{ mb: getSpacing(2) }}>
                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
                    <Typography variant="body1" sx={{ fontWeight: 700, fontSize: getFontSize(1) }}>
                       {proj.title}
                    </Typography>
                    {proj.link && (
                        <a href={proj.link} style={{ fontSize: getFontSize(0.85), color: accentColor, textDecoration: 'none' }}>
                            View Project
                        </a>
                    )}
                   </Box>
                  <Typography variant="body2" sx={{ ...wrapTextStyle, fontSize: getFontSize(0.95), lineHeight: 1.5 }}>
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
            <Box key="education" sx={{ mb: getSpacing(2) }}>
              <SectionTitle>Education</SectionTitle>
              {limitedEdu.map((edu: any, index: number) => (
                <Box key={edu.id || index} sx={{ mb: getSpacing(1.5) }}>
                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                     <Typography variant="body1" sx={{ fontWeight: 700, fontSize: getFontSize(1) }}>
                      {edu.school}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: getFontSize(0.9), fontStyle: 'italic' }}>
                      {edu.year}
                    </Typography>
                   </Box>
                   <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ fontSize: getFontSize(0.95) }}>
                        {edu.degree}
                    </Typography>
                    {edu.city && <Typography variant="caption" sx={{ color: '#666' }}>{edu.city}</Typography>}
                   </Box>
                </Box>
              ))}
            </Box>
          );

      case 'hobbies':
        return visibleSections.hobbies && hobbies && !isPreview && (
            <Box key="hobbies" sx={{ textAlign: 'center' }}>
              <SectionTitle>Interests</SectionTitle>
              <Typography variant="body2" sx={{ ...wrapTextStyle, fontSize: getFontSize(0.95) }}>
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
        p: isPreview ? 2 : { xs: 3, sm: 5 }, 
        fontFamily: font,
        color: '#000',
        bgcolor: '#ffffff',
        minHeight: '100%',
        transform: isPreview ? 'scale(0.9)' : 'none',
        transformOrigin: 'top left',
        '& .MuiTypography-root': { fontFamily: font },
        // Print specific overrides for strict black and white
        '@media print': {
            boxShadow: 'none',
            padding: '40px !important',
        }
      }}
    >
      {/* ===== CLASSIC HEADER (CENTERED) ===== */}
      <Box sx={{ textAlign: 'center', mb: getSpacing(1) }}>
        
        {shouldShowPhoto && (
          <Avatar
            src={personalInfo.photo}
            sx={{
              width: isPreview ? 70 : 100,
              height: isPreview ? 70 : 100,
              mx: 'auto',
              mb: getSpacing(2),
              border: `1px solid ${accentColor}`,
            }}
          />
        )}

        <Typography variant="h3" sx={{ 
            fontWeight: 700, 
            fontSize: getFontSize(2.4), 
            textTransform: 'uppercase', 
            letterSpacing: 1, 
            color: accentColor,
            mb: getSpacing(0.5)
        }}>
          {personalInfo.fullName || 'Your Name'}
        </Typography>

        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            gap: '12px', 
            mb: getSpacing(2),
            fontSize: getFontSize(0.9),
            color: '#333'
        }}>
           {/* Classic Bullet Separators */}
           {personalInfo.address && <span>{personalInfo.address}</span>}
           {personalInfo.address && (personalInfo.phone || personalInfo.email) && <span>•</span>}
           
           {personalInfo.phone && <span>{personalInfo.phone}</span>}
           {personalInfo.phone && personalInfo.email && <span>•</span>}
           
           {personalInfo.email && <span>{personalInfo.email}</span>}
           
           {(personalInfo.linkedin || personalInfo.portfolio) && <span>•</span>}
           
           {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
           )}
        </Box>
        
        {/* Full Width Line under Header */}
        <Divider sx={{ borderColor: '#000', borderWidth: '1px' }} />
      </Box>

      {/* ✅ BRANDED WATERMARK (Your Custom Design) */}
      <Box 
        sx={{ 
          py: 2, // Adjusted padding for A4 (Compact)
          mt: 4, 
          bgcolor: '#ffffff', 
          borderTop: '1px solid #e2e8f0', 
          textAlign: 'center',
          '@media print': {
             marginTop: 'auto',
             py: 1
          }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          {/* Make sure favicon.svg is inside /public folder */}
          <Box 
            component="img" 
            src="/favicon.svg" 
            alt="Logo" 
            sx={{ 
              width: 24, // Adjusted size for Resume
              height: 24, 
              borderRadius: '6px', 
              objectFit: 'cover' 
            }} 
          />
          <Typography 
            variant="body2" // Adjusted font size for Resume footer
            sx={{ fontWeight: '800', color: '#1e293b', fontSize: '1rem' }}
          >
            Resume<span style={{ color: '#7c3aed' }}>AI</span>
          </Typography>
        </Box>
      </Box>
      {/* ===== SECTIONS ===== */}
      {sectionOrder.map((sectionId: string) => renderSection(sectionId))}

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

export default TemplateClassic;