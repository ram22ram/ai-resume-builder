import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import dayjs from 'dayjs';

const wrapTextStyle = {
  whiteSpace: 'pre-wrap', 
  wordWrap: 'break-word',  
};

const TemplateClassic = forwardRef(({ data, visibleSections, sectionOrder, theme }, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;

  // --- DYNAMIC THEME ---
  const accentColor = theme?.accentColor || '#000000';
  const font = theme?.fontFamily || '"Times New Roman", Times, serif';
  // ---------------------

  const formatDate = (date, format) => {
    if (!date) return 'Present'; 
    const dateObj = dayjs(date);
    if (!dateObj.isValid()) return typeof date === 'string' ? date : 'Present';
    return dateObj.format(format);
  };

  const sectionTitleStyle = {
    fontFamily: font,
    fontWeight: 'bold',
    fontSize: '1.2rem', 
    borderBottom: `2px solid ${accentColor}`, // Theme color applied
    color: accentColor, // Theme color applied
    paddingBottom: '2px',
    marginBottom: '8px',
    marginTop: '12px'
  };

  const renderSection = (sectionId) => {
    switch(sectionId) {
      case 'summary':
        return visibleSections.summary && summary && (
          <Box sx={{ marginBottom: 1 }} key="summary">
            <Typography sx={sectionTitleStyle}>SUMMARY</Typography>
            <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem'}}>
              {summary}
            </Typography>
          </Box>
        );

      case 'skills':
        return visibleSections.skills && skills.length > 0 && (
          <Box sx={{ marginBottom: 1 }} key="skills">
            <Typography sx={sectionTitleStyle}>SKILLS</Typography>
            <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem'}}>
              {skills.join(' | ')}
            </Typography>
          </Box>
        );

      case 'experience':
        return visibleSections.experience && experience[0]?.title && (
          <Box sx={{ marginBottom: 1 }} key="experience">
            <Typography sx={sectionTitleStyle}>EXPERIENCE</Typography>
            {experience.map(exp => (
              <Box key={exp.id} sx={{ marginBottom: 1, '&:last-child': {mb: 0} }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: font, fontSize: '1rem', ...wrapTextStyle }}>
                    {exp.title || 'Job Title'}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: font, fontSize: '1rem', ...wrapTextStyle }}>
                    {exp.company || 'Company'}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                  {formatDate(exp.startDate, 'MMM YYYY')} - {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')}
                </Typography>
                <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem'}}>{exp.description}</Typography>
              </Box>
            ))}
          </Box>
        );

      case 'projects':
        return visibleSections.projects && projects[0]?.title && (
          <Box sx={{ marginBottom: 1 }} key="projects">
            <Typography sx={sectionTitleStyle}>PROJECTS</Typography>
            {projects.map(proj => (
              <Box key={proj.id} sx={{ marginBottom: 1, '&:last-child': {mb: 0} }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: font, fontSize: '1rem', ...wrapTextStyle }}>
                  {proj.title || 'Project Title'} {proj.link && `| ${proj.link}`}
                </Typography>
                <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem'}}>{proj.description}</Typography>
              </Box>
            ))}
          </Box>
        );

      case 'education':
        return visibleSections.education && education[0]?.degree && (
          <Box sx={{ marginBottom: 1 }} key="education">
            <Typography sx={sectionTitleStyle}>EDUCATION</Typography>
            {education.map(edu => (
              <Box key={edu.id} sx={{ marginBottom: 1, '&:last-child': {mb: 0} }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: font, fontSize: '1rem', ...wrapTextStyle }}>
                  {edu.degree || 'Degree'} | {edu.school || 'School'} | {edu.city} | {formatDate(edu.year, 'YYYY')}
                </Typography>
              </Box>
            ))}
          </Box>
        );

      case 'hobbies':
        return visibleSections.hobbies && hobbies && (
          <Box key="hobbies">
            <Typography sx={sectionTitleStyle}>HOBBIES</Typography>
            <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem'}}>{hobbies}</Typography>
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
        fontFamily: font, // Dynamic Font
        color: '#000',
        minHeight: '100%' 
      }}
    >
      
      {/* --- Header (Classic Style) --- */}
      <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
        
        {/* --- PHOTO LOGIC --- */}
        {personalInfo.photo && (
          <Avatar 
            src={personalInfo.photo} 
            sx={{ 
              width: 100, 
              height: 100, 
              margin: '0 auto 12px auto', 
              border: `1px solid ${accentColor}` // Thoda subtle border classic ke liye
            }}
          />
        )}
        {/* ------------------- */}

        <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: font, fontSize: '2rem', textTransform: 'uppercase', letterSpacing: 1, color: accentColor }}>
          {personalInfo.fullName || 'YOUR NAME'}
        </Typography>
        <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem', mt: 1 }}>
          {personalInfo.address}
        </Typography>
        <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem' }}>
          {personalInfo.phone && `${personalInfo.phone} | `}{personalInfo.email && `${personalInfo.email}`}
        </Typography>
        <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem' }}>
          {personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`} {personalInfo.portfolio && `| Portfolio: ${personalInfo.portfolio}`}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2, borderColor: accentColor }} />

      {/* --- Dynamic Sections --- */}
      {sectionOrder.map(sectionId => renderSection(sectionId))}

    </Paper>
  );
});

export default TemplateClassic;