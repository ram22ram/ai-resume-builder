import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';

const TemplateHarvey = forwardRef(({ 
  data, 
  visibleSections, 
  sectionOrder, 
  theme, 
  isPreview = false 
}, ref) => {
  const { personalInfo, summary, experience, education, skills } = data;
  const accentColor = theme?.accentColor || '#0d9488';
  const font = theme?.fontFamily || 'Raleway, sans-serif';

  // PREVIEW SCALING
  const previewScale = isPreview ? 0.7 : 1;
  
  const getFontSize = (baseSize) => {
    return isPreview ? `${baseSize * previewScale}rem` : `${baseSize}rem`;
  };

  const getSpacing = (baseSpacing) => {
    return isPreview ? baseSpacing * 0.4 : baseSpacing;
  };

  // Get limited data for preview
  const getLimitedExperience = () => {
    if (isPreview && experience.length > 0) {
      return [experience[0]];
    }
    return experience;
  };

  const getLimitedEducation = () => {
    if (isPreview && education.length > 0) {
      return [education[0]];
    }
    return education;
  };

  const Head = ({t}) => (
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

  const renderSection = (id) => {
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
        return visibleSections.skills && skills.length > 0 && (
          <Box mb={getSpacing(3)}>
            <Head>Key Skills</Head>
            <Box display="flex" flexWrap="wrap" gap={getSpacing(2)}>
              {skills.slice(0, isPreview ? 3 : skills.length).map(s => (
                <Typography 
                  key={s} 
                  variant="body2" 
                  fontWeight="bold"
                  fontSize={getFontSize(0.85)}
                >
                  • {s}
                </Typography>
              ))}
            </Box>
          </Box>
        );
      
      case 'experience': 
        const limitedExp = getLimitedExperience();
        return visibleSections.experience && limitedExp[0]?.title && (
          <Box mb={getSpacing(3)}>
            <Head>Work History</Head>
            {limitedExp.map(e => (
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
        return visibleSections.education && limitedEdu.length > 0 && (
          <Box mb={getSpacing(3)}>
            <Head>Education</Head>
            {limitedEdu.map(e => (
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
      
      default: 
        return null;
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
      }}
    >
      <Box textAlign="center" mb={getSpacing(4)}>
        <Typography 
          variant="h3" 
          fontWeight="300" 
          color={accentColor} 
          textTransform="uppercase" 
          letterSpacing={4}
          fontSize={isPreview ? '1.5rem' : '2.5rem'}
        >
          {isPreview ? personalInfo.fullName?.substring(0, 10) : personalInfo.fullName}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          mt={getSpacing(1)}
          fontSize={getFontSize(0.9)}
        >
          {isPreview ? `${personalInfo.address?.substring(0, 15)}...` : personalInfo.address} | 
          {isPreview ? ` ${personalInfo.email?.substring(0, 10)}...` : ` ${personalInfo.email}`} | 
          {` ${personalInfo.phone}`}
        </Typography>
      </Box>
      <Divider sx={{ mb: getSpacing(4) }} />
      {sectionOrder.map(id => renderSection(id))}
    </Paper>
  );
});

export default TemplateHarvey;