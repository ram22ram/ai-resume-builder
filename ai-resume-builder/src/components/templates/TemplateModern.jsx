import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Divider, Avatar } from '@mui/material';
import dayjs from 'dayjs';

const wrapTextStyle = {
  whiteSpace: 'pre-wrap', 
  wordWrap: 'break-word',  
};

const TemplateModern = forwardRef(({ data, visibleSections, sectionOrder, theme }, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;
  
  // --- DYNAMIC THEME SETTINGS ---
  // Agar theme prop nahi mila toh default values use karo
  const accentColor = theme?.accentColor || '#0B57D0';
  const font = theme?.fontFamily || 'Roboto';
  // ------------------------------

  const formatDate = (date, format) => {
    if (!date) return 'Present'; 
    const dateObj = dayjs(date);
    if (!dateObj.isValid()) return typeof date === 'string' ? date : 'Present';
    return dateObj.format(format);
  };

  const renderSection = (sectionId) => {
    switch(sectionId) {
      case 'summary':
        return visibleSections.summary && summary && (
          <Box sx={{ marginBottom: 2 }} key="summary">
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: accentColor, borderBottom: `2px solid ${accentColor}20`, pb: 0.5, mb: 1 }}>Summary</Typography>
            <Typography variant="body2" sx={wrapTextStyle}>
              {summary}
            </Typography>
          </Box>
        );

      case 'experience':
        return visibleSections.experience && experience[0]?.title && (
          <Box sx={{ marginBottom: 2 }} key="experience">
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: accentColor, borderBottom: `2px solid ${accentColor}20`, pb: 0.5, mb: 1 }}>Experience</Typography>
            {experience.map(exp => (
              <Box key={exp.id} sx={{ marginBottom: 2, '&:last-child': {mb: 0} }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ...wrapTextStyle }}>
                  {exp.title || 'Job Title'} {exp.company && <span style={{ fontWeight: 'normal' }}>at {exp.company}</span>}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic', display: 'block', mb: 0.5 }}>
                  {formatDate(exp.startDate, 'MMM YYYY')} - {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')} | {exp.location}
                </Typography>
                <Typography variant="body2" sx={wrapTextStyle}>{exp.description}</Typography>
              </Box>
            ))}
          </Box>
        );

      case 'education':
        return visibleSections.education && education[0]?.degree && (
          <Box sx={{ marginBottom: 2 }} key="education">
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: accentColor, borderBottom: `2px solid ${accentColor}20`, pb: 0.5, mb: 1 }}>Education</Typography>
            {education.map(edu => (
              <Box key={edu.id} sx={{ marginBottom: 1.5, '&:last-child': {mb: 0} }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ...wrapTextStyle }}>
                  {edu.degree || 'Degree'}
                </Typography>
                <Typography variant="body2">
                  {edu.school && `${edu.school}, `}{edu.city}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  {edu.year && `Year of Completion: ${edu.year}`}
                </Typography>
              </Box>
            ))}
          </Box>
        );

      case 'projects':
        return visibleSections.projects && projects[0]?.title && (
          <Box sx={{ marginBottom: 2 }} key="projects">
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: accentColor, borderBottom: `2px solid ${accentColor}20`, pb: 0.5, mb: 1 }}>Projects</Typography>
            {projects.map(proj => (
              <Box key={proj.id} sx={{ marginBottom: 1.5, '&:last-child': {mb: 0} }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ...wrapTextStyle }}>
                  {proj.title || 'Project Title'} {proj.link && <a href={proj.link} style={{color: accentColor, fontSize: '0.85em', fontWeight: 'normal'}} target="_blank" rel="noreferrer">| Link</a>}
                </Typography>
                <Typography variant="body2" sx={wrapTextStyle}>{proj.description}</Typography>
              </Box>
            ))}
          </Box>
        );

      case 'skills':
        return visibleSections.skills && skills.length > 0 && (
          <Box sx={{ marginBottom: 2 }} key="skills">
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: accentColor, borderBottom: `2px solid ${accentColor}20`, pb: 0.5, mb: 1 }}>Skills</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills.map((skill, index) => (
                <Box key={index} sx={{ px: 1.5, py: 0.5, bgcolor: `${accentColor}10`, color: accentColor, borderRadius: 1, fontSize: '0.85rem', fontWeight: 500 }}>
                  {skill}
                </Box>
              ))}
            </Box>
          </Box>
        );

      case 'hobbies':
        return visibleSections.hobbies && hobbies && (
          <Box key="hobbies">
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: accentColor, borderBottom: `2px solid ${accentColor}20`, pb: 0.5, mb: 1 }}>Hobbies</Typography>
            <Typography variant="body2" sx={wrapTextStyle}>{hobbies}</Typography>
          </Box>
        );
      
      default: return null;
    }
  };

  return (
    <Paper 
      ref={ref}
      elevation={3} 
      sx={{ 
        padding: { xs: 2, sm: 3, md: 4 }, 
        fontFamily: font, // <-- Dynamic Font apply kiya
        minHeight: '100%',
        color: '#333'
      }}
    >
      {/* --- Header (Fixed at Top) --- */}
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        
        {/* --- PHOTO LOGIC ADDED HERE --- */}
        {personalInfo.photo && (
          <Avatar 
            src={personalInfo.photo} 
            sx={{ 
              width: 120, 
              height: 120, 
              margin: '0 auto 16px auto', 
              border: `3px solid ${accentColor}` 
            }}
          />
        )}
        {/* ------------------------------ */}

        <Typography variant="h3" sx={{ fontWeight: 'bold', color: accentColor, fontSize: { xs: '2rem', md: '2.5rem' }, ...wrapTextStyle }}>
          {personalInfo.fullName || 'Your Name'}
        </Typography>
        <Typography variant="body1" sx={{...wrapTextStyle, mt: 1, fontSize: '0.95rem' }}>
          {personalInfo.address}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 0.5 }}>
          {personalInfo.phone && <Typography variant="body2">📞 {personalInfo.phone}</Typography>}
          {personalInfo.email && <Typography variant="body2">✉️ {personalInfo.email}</Typography>}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', mt: 0.5 }}>
          {personalInfo.linkedin && <Typography variant="body2" component="a" href={personalInfo.linkedin} sx={{color: accentColor, textDecoration: 'none'}}>LinkedIn</Typography>}
          {personalInfo.portfolio && <Typography variant="body2" component="a" href={personalInfo.portfolio} sx={{color: accentColor, textDecoration: 'none'}}>Portfolio</Typography>}
        </Box>
      </Box>

      <Divider sx={{ marginY: 2, borderColor: `${accentColor}40` }} />

      {/* --- Dynamic Sections Rendered Here --- */}
      {sectionOrder.map(sectionId => renderSection(sectionId))}

    </Paper>
  );
});

export default TemplateModern;