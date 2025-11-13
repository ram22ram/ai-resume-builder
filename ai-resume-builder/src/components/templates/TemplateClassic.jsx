import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import dayjs from 'dayjs';

const wrapTextStyle = {
  whiteSpace: 'pre-wrap', 
  wordWrap: 'break-word',  
};

const TemplateClassic = forwardRef(({ data, visibleSections }, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;

  const formatDate = (date, format) => {
    if (!date) return 'Present'; 
    const dateObj = dayjs(date);
    if (!dateObj.isValid()) {
      if (typeof date === 'string') return date;
      return 'Present';
    }
    return dateObj.format(format);
  };

  const sectionTitleStyle = {
    fontFamily: '"Times New Roman", Times, serif',
    fontWeight: 'bold',
    fontSize: '1.2rem', 
    borderBottom: '2px solid #000',
    paddingBottom: '2px',
    marginBottom: '8px',
    marginTop: '12px'
  };

  return (
    <Paper 
      ref={ref}
      elevation={3} 
      sx={{ 
        padding: { xs: 2, sm: 3, md: 4 }, 
        fontFamily: '"Times New Roman", Times, serif', 
        color: '#000',
        minHeight: '100%' 
      }}
    >
      
      {/* --- Header (Classic Style) --- */}
      <Box sx={{ textAlign: 'center', marginBottom: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: '"Times New Roman", Times, serif', fontSize: '2rem' }}>
          {personalInfo.fullName || 'YOUR NAME'}
        </Typography>
        <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem' }}>
          {personalInfo.address}
        </Typography>
        <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem' }}>
          {personalInfo.phone && `${personalInfo.phone} | `}{personalInfo.email && `${personalInfo.email}`}
        </Typography>
        <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem' }}>
          {personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`} {personalInfo.portfolio && `| Portfolio: ${personalInfo.portfolio}`}
        </Typography>
      </Box>

      {/* --- Summary (CONDITIONAL) --- */}
      {visibleSections.summary && summary && (
        <Box sx={{ marginBottom: 1 }}>
          <Typography sx={sectionTitleStyle}>SUMMARY</Typography>
          <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem'}}>
            {summary}
          </Typography>
        </Box>
      )}

      {/* --- Skills (CONDITIONAL) --- */}
      {visibleSections.skills && skills.length > 0 && (
        <Box sx={{ marginBottom: 1 }}>
          <Typography sx={sectionTitleStyle}>SKILLS</Typography>
          <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem'}}>
            {skills.join(' | ')}
          </Typography>
        </Box>
      )}

      {/* --- Experience (CONDITIONAL) --- */}
      {visibleSections.experience && experience[0]?.title && ( 
        <Box sx={{ marginBottom: 1 }}>
          <Typography sx={sectionTitleStyle}>EXPERIENCE</Typography>
          {experience.map(exp => (
            <Box key={exp.id} sx={{ marginBottom: 1, '&:last-child': {mb: 0} }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: '"Times New Roman", Times, serif', fontSize: '1rem', ...wrapTextStyle }}>
                  {exp.title || 'Job Title'}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: '"Times New Roman", Times, serif', fontSize: '1rem', ...wrapTextStyle }}>
                  {exp.company || 'Company'}
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                {formatDate(exp.startDate, 'MMM YYYY')} - {formatDate(exp.endDate, 'MMM YYYY')}
              </Typography>
              <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem'}}>{exp.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* --- Projects (CONDITIONAL) --- */}
      {visibleSections.projects && projects[0]?.title && (
        <Box sx={{ marginBottom: 1 }}>
          <Typography sx={sectionTitleStyle}>PROJECTS</Typography>
          {projects.map(proj => (
            <Box key={proj.id} sx={{ marginBottom: 1, '&:last-child': {mb: 0} }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: '"Times New Roman", Times, serif', fontSize: '1rem', ...wrapTextStyle }}>
                {proj.title || 'Project Title'} {proj.link && `| ${proj.link}`}
              </Typography>
              <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem'}}>{proj.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* --- Education (CONDITIONAL) --- */}
      {visibleSections.education && education[0]?.degree && (
        <Box sx={{ marginBottom: 1 }}>
          <Typography sx={sectionTitleStyle}>EDUCATION</Typography>
          {education.map(edu => (
            <Box key={edu.id} sx={{ marginBottom: 1, '&:last-child': {mb: 0} }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: '"Times New Roman", Times, serif', fontSize: '1rem', ...wrapTextStyle }}>
                {edu.degree || 'Degree'} | {edu.school || 'School'} | {edu.city} | {formatDate(edu.year, 'YYYY')}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      
      {/* --- Hobbies (CONDITIONAL) --- */}
      {visibleSections.hobbies && hobbies && (
        <Box>
          <Typography sx={sectionTitleStyle}>HOBBIES</Typography>
          <Typography variant="body1" sx={{...wrapTextStyle, fontSize: '0.95rem'}}>{hobbies}</Typography>
        </Box>
      )}

    </Paper>
  );
});

export default TemplateClassic;