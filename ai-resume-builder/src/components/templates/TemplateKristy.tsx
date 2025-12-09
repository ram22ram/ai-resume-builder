import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';
import dayjs from 'dayjs';

const TemplateKristy = forwardRef(({ 
  data, 
  visibleSections, 
  sectionOrder, 
  theme, 
  isPreview = false 
}, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;
  const accentColor = theme?.accentColor || '#e11d48';
  const font = theme?.fontFamily || 'Lato, sans-serif';

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

  const HeaderTitle = ({ children }) => (
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

  const renderSection = (id) => {
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
        return visibleSections.experience && limitedExp[0]?.title && (
          <Box mb={getSpacing(3)}>
            <HeaderTitle>Work History</HeaderTitle>
            {limitedExp.map(e => (
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
        return visibleSections.education && limitedEdu[0]?.school && (
          <Box mb={getSpacing(3)}>
            <HeaderTitle>Education</HeaderTitle>
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
      
      case 'skills': 
        return visibleSections.skills && skills.length > 0 && (
          <Box mb={getSpacing(3)}>
            <HeaderTitle>Skills</HeaderTitle>
            <Box display="flex" flexWrap="wrap" gap={getSpacing(1)}>
              {skills.slice(0, isPreview ? 4 : skills.length).map(s => (
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
      
      default: 
        return null;
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
      }}
    >
      <Grid container spacing={getSpacing(3)} mb={getSpacing(4)} alignItems="center">
        <Grid item xs={isPreview ? 3 : 2}>
          {!isPreview && personalInfo.photo ? (
            <Avatar src={personalInfo.photo} sx={{width: 80, height: 80}} />
          ) : (
            <Box 
              width={isPreview ? 40 : 80} 
              height={isPreview ? 40 : 80} 
              bgcolor="#eee" 
              borderRadius="50%" 
            />
          )}
        </Grid>
        <Grid item xs={isPreview ? 9 : 10}>
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            color="#333"
            fontSize={isPreview ? '1.2rem' : '2rem'}
          >
            {isPreview ? personalInfo.fullName?.substring(0, 12) : personalInfo.fullName}
          </Typography>
          <Typography 
            variant="body1" 
            color={accentColor}
            fontSize={getFontSize(0.9)}
          >
            {isPreview ? `${personalInfo.email?.substring(0, 10)}...` : personalInfo.email} | 
            {` ${personalInfo.phone}`} | 
            {isPreview ? ` ${personalInfo.address?.substring(0, 10)}...` : ` ${personalInfo.address}`}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ columnCount: 1 }}>
        {sectionOrder.map(id => renderSection(id))}
      </Box>
    </Paper>
  );
});

export default TemplateKristy;