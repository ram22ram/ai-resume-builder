import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import dayjs from 'dayjs';

const TemplateFred = forwardRef(({ 
  data, 
  visibleSections, 
  sectionOrder, 
  theme, 
  isPreview = false 
}, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;
  const accentColor = theme?.accentColor || '#333';
  const font = theme?.fontFamily || 'Merriweather, serif';

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

  const formatDate = (date) => {
    if (!date) return 'Present';
    const d = dayjs(date);
    return d.isValid() ? d.format('MMM YYYY') : date;
  };

  const SectionTitle = ({ children }) => (
    <Typography variant="h6" sx={{ 
      fontWeight: 'bold', 
      textTransform: 'uppercase', 
      letterSpacing: 2, 
      fontSize: getFontSize(0.9), 
      color: '#444', 
      borderBottom: '1px solid #ccc', 
      pb: 0.5, 
      mb: getSpacing(2), 
      mt: getSpacing(3) 
    }}>
      {children}
    </Typography>
  );

  const renderSection = (id) => {
    switch(id) {
      case 'summary': 
        return visibleSections.summary && summary && !isPreview && (
          <Box>
            <SectionTitle>Professional Summary</SectionTitle>
            <Typography variant="body2" lineHeight={1.8} fontSize={getFontSize(0.9)}>
              {summary}
            </Typography>
          </Box>
        );
      
      case 'skills': 
        return visibleSections.skills && skills.length > 0 && (
          <Box>
            <SectionTitle>Skills</SectionTitle>
            <Typography variant="body2" lineHeight={1.8} fontSize={getFontSize(0.9)}>
              {isPreview ? skills.slice(0, 4).join(' • ') : skills.join(' • ')}
            </Typography>
          </Box>
        );
      
      case 'experience': 
        const limitedExp = getLimitedExperience();
        return visibleSections.experience && limitedExp[0]?.title && (
          <Box>
            <SectionTitle>Experience</SectionTitle>
            {limitedExp.map(e => (
              <Box key={e.id} mb={getSpacing(2)}>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="bold" fontSize={getFontSize(0.95)}>
                    {e.title}
                  </Typography>
                  <Typography variant="caption" fontSize={getFontSize(0.8)}>
                    {formatDate(e.startDate)} - {e.isPresent?'Present':formatDate(e.endDate)}
                  </Typography>
                </Box>
                <Typography fontStyle="italic" color="text.secondary" mb={1} fontSize={getFontSize(0.85)}>
                  {e.company}, {e.location}
                </Typography>
                <Typography variant="body2" whiteSpace="pre-wrap" fontSize={getFontSize(0.9)}>
                  {isPreview ? `${e.description?.substring(0, 50)}...` : e.description}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      
      case 'education': 
        const limitedEdu = getLimitedEducation();
        return visibleSections.education && limitedEdu[0]?.school && (
          <Box>
            <SectionTitle>Education</SectionTitle>
            {limitedEdu.map(e => (
              <Box key={e.id} mb={getSpacing(1)}>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight="bold" fontSize={getFontSize(0.95)}>
                    {e.school}
                  </Typography>
                  <Typography variant="caption" fontSize={getFontSize(0.8)}>
                    {e.year}
                  </Typography>
                </Box>
                <Typography variant="body2" fontSize={getFontSize(0.9)}>
                  {e.degree}, {e.city}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      
      case 'projects': 
        return visibleSections.projects && projects[0]?.title && !isPreview && (
          <Box>
            <SectionTitle>Projects</SectionTitle>
            {projects.map(p => (
              <Box key={p.id} mb={getSpacing(2)}>
                <Typography fontWeight="bold" fontSize={getFontSize(0.95)}>{p.title}</Typography>
                <Typography variant="body2" fontSize={getFontSize(0.9)}>{p.description}</Typography>
              </Box>
            ))}
          </Box>
        );
      
      case 'hobbies': 
        return visibleSections.hobbies && hobbies && !isPreview && (
          <Box>
            <SectionTitle>Hobbies</SectionTitle>
            <Typography variant="body2" fontSize={getFontSize(0.9)}>{hobbies}</Typography>
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
        fontFamily: font, 
        minHeight: '100%', 
        color: '#333',
        transform: isPreview ? 'scale(0.85)' : 'none',
        transformOrigin: 'top left',
      }}
    >
      <Box textAlign="center" mb={getSpacing(4)}>
        <Typography 
          variant="h3" 
          fontWeight="bold" 
          textTransform="uppercase" 
          letterSpacing={3} 
          color={accentColor}
          fontSize={isPreview ? '1.5rem' : '2.5rem'}
        >
          {isPreview ? personalInfo.fullName?.substring(0, 12) : personalInfo.fullName}
        </Typography>
        <Box 
          mt={getSpacing(2)} 
          display="flex" 
          justifyContent="center" 
          gap={getSpacing(2)} 
          fontSize={getFontSize(0.85)} 
          color="#666"
          flexWrap="wrap"
        >
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.email && <span>• {isPreview ? `${personalInfo.email.substring(0, 10)}...` : personalInfo.email}</span>}
          {personalInfo.address && <span>• {isPreview ? `${personalInfo.address.substring(0, 15)}...` : personalInfo.address}</span>}
        </Box>
        {personalInfo.linkedin && !isPreview && (
          <Typography variant="caption" display="block" mt={getSpacing(0.5)}>
            {personalInfo.linkedin}
          </Typography>
        )}
      </Box>
      {sectionOrder.map(id => renderSection(id))}
    </Paper>
  );
});

export default TemplateFred;