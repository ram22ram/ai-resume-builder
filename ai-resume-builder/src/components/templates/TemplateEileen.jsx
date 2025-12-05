import React, { forwardRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TemplateEileen = forwardRef(({ 
  data, 
  visibleSections, 
  sectionOrder, 
  theme, 
  isPreview = false 
}, ref) => {
  const { personalInfo, summary, experience, education, projects, skills } = data;
  const accentColor = theme?.accentColor || '#374151'; 
  const font = theme?.fontFamily || 'Roboto, sans-serif';

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

  const renderMain = (id) => {
    if (['skills', 'education'].includes(id)) return null; 
    switch(id) {
      case 'summary': 
        return visibleSections.summary && summary && !isPreview && ( // No summary in preview
          <Box mb={getSpacing(3)}>
            <Typography 
              variant="h6" 
              color={accentColor} 
              fontWeight="bold" 
              mb={getSpacing(1)}
              fontSize={getFontSize(1)}
            >
              Professional Summary
            </Typography>
            <Typography variant="body2" fontSize={getFontSize(0.9)}>
              {summary}
            </Typography>
          </Box>
        );
      
      case 'experience': 
        const limitedExp = getLimitedExperience();
        return visibleSections.experience && limitedExp[0]?.title && (
          <Box mb={getSpacing(3)}>
            <Typography 
              variant="h6" 
              color={accentColor} 
              fontWeight="bold" 
              mb={getSpacing(2)}
              fontSize={getFontSize(1)}
            >
              Work History
            </Typography>
            {limitedExp.map(e => (
              <Box key={e.id} mb={getSpacing(2)}>
                <Typography 
                  fontWeight="bold" 
                  fontSize={getFontSize(0.95)}
                >
                  {e.title}
                </Typography>
                <Typography 
                  variant="caption" 
                  fontSize={getFontSize(0.8)}
                >
                  {e.company} | {e.startDate} - {e.endDate}
                </Typography>
                <Typography 
                  variant="body2" 
                  mt={getSpacing(0.5)} 
                  fontSize={getFontSize(0.85)}
                >
                  {isPreview ? `${e.description?.substring(0, 40)}...` : e.description}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      
      default: 
        return null;
    }
  };

  const renderSide = (id) => {
    if (!['skills', 'education'].includes(id)) return null;
    switch(id) {
      case 'skills': 
        return visibleSections.skills && skills.length > 0 && (
          <Box mb={getSpacing(4)}>
            <Typography 
              fontWeight="bold" 
              mb={getSpacing(1)}
              fontSize={getFontSize(0.9)}
            >
              SKILLS
            </Typography>
            {skills.slice(0, isPreview ? 3 : skills.length).map(s => (
              <Typography 
                key={s} 
                variant="body2" 
                mb={getSpacing(0.5)}
                fontSize={getFontSize(0.8)}
              >
                • {s}
              </Typography>
            ))}
          </Box>
        );
      
      case 'education': 
        const limitedEdu = getLimitedEducation();
        return visibleSections.education && (
          <Box mb={getSpacing(4)}>
            <Typography 
              fontWeight="bold" 
              mb={getSpacing(1)}
              fontSize={getFontSize(0.9)}
            >
              EDUCATION
            </Typography>
            {limitedEdu.map(e => (
              <Box key={e.id} mb={getSpacing(1)}>
                <Typography 
                  variant="body2" 
                  fontWeight="bold"
                  fontSize={getFontSize(0.85)}
                >
                  {e.degree}
                </Typography>
                <Typography 
                  variant="caption"
                  fontSize={getFontSize(0.75)}
                >
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
        display: 'flex', 
        minHeight: '100%', 
        fontFamily: font,
        transform: isPreview ? 'scale(0.9)' : 'none',
        transformOrigin: 'top left',
      }}
    >
      {/* Left Sidebar */}
      <Box 
        width={isPreview ? "35%" : "30%"} 
        bgcolor={accentColor} 
        color="white" 
        p={isPreview ? 1.5 : 3}
      >
        <Typography 
          variant="h5" 
          fontWeight="bold" 
          mb={getSpacing(3)} 
          lineHeight={1.2}
          fontSize={getFontSize(1.2)}
        >
          {isPreview 
            ? personalInfo.fullName?.substring(0, 10) || 'Your Name'
            : personalInfo.fullName || 'Your Name'
          }
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
        
        {sectionOrder.map(id => renderSide(id))}
      </Box>
      
      {/* Right Content */}
      <Box 
        width={isPreview ? "65%" : "70%"} 
        p={isPreview ? 2 : 4}
      >
        {sectionOrder.map(id => renderMain(id))}
      </Box>
    </Paper>
  );
});

export default TemplateEileen;