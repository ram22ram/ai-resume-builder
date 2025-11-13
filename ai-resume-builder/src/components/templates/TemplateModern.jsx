import React, { forwardRef } from 'react';
// FIX: 'Chip' ko import karein (Skills section ke liye)
import { Box, Typography, Paper, Divider, Chip } from '@mui/material';
import dayjs from 'dayjs';

const wrapTextStyle = {
  whiteSpace: 'pre-wrap', 
  wordWrap: 'break-word',  
};

// FIX: 'theme' prop ko yahaan accept karein
const TemplateModern = forwardRef(({ data, visibleSections, theme }, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;

  // FIX: Naye props (Theme) ko set karein
  const accentColor = theme?.accentColor || '#1976d2'; // Default blue
  const fontFamily = theme?.fontFamily || 'Arial, sans-serif'; // Aapka default

  const formatDate = (date, format) => {
    if (!date) return 'Present'; 
    const dateObj = dayjs(date);
    if (!dateObj.isValid()) {
      if (typeof date === 'string') return date;
      return 'Present';
    }
    return dateObj.format(format);
  };

  // Ek helper component taaki har section mein color/font add kar sakein
  const SectionHeader = ({ title }) => (
    <Typography 
      variant="h6" 
      sx={{ 
        fontWeight: 'bold',
        // FIX: Accent color yahaan istemaal karein
        borderBottom: `2px solid ${accentColor}`,
        pb: 0.5,
        mb: 1
      }}
    >
      {title.toUpperCase()}
    </Typography>
  );

  return (
    <Paper 
      ref={ref}
      elevation={3} 
      sx={{ 
        padding: { xs: 2, sm: 3, md: 4 }, 
        // FIX: Font family ko state se link karein
        fontFamily: fontFamily,
        minHeight: '100%' 
      }}
    >
      
      {/* --- Header (Personal Info) --- */}
      <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', md: '2.5rem' }, ...wrapTextStyle }}>
          {personalInfo.fullName || 'Your Name'}
        </Typography>
        <Typography variant="body1" sx={{...wrapTextStyle, fontSize: { xs: '0.9rem', md: '1rem' }}}>
          {personalInfo.address} {personalInfo.phone && `| ${personalInfo.phone}`} {personalInfo.email && `| ${personalInfo.email}`}
        </Typography>
        <Typography variant="body1" sx={{...wrapTextStyle, fontSize: { xs: '0.9rem', md: '1rem' }}}>
          {personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`} {personalInfo.portfolio && `| Portfolio: ${personalInfo.portfolio}`}
        </Typography>
      </Box>

      {/* FIX: Divider mein accent color daalein */}
      <Divider sx={{ marginY: 2, borderColor: accentColor, borderWidth: '1px', opacity: 0.5 }} />

      {/* --- Summary (CONDITIONAL) --- */}
      {visibleSections.summary && summary && (
        <Box sx={{ marginBottom: 2 }}>
          <SectionHeader title="Summary" />
          <Typography variant="body2" sx={wrapTextStyle}>
            {summary}
          </Typography>
        </Box>
      )}

      {/* --- Experience (CONDITIONAL) --- */}
      {visibleSections.experience && experience[0]?.title && ( 
        <Box sx={{ marginBottom: 2 }}>
          <SectionHeader title="Experience" />
          {experience.map(exp => (
            <Box key={exp.id} sx={{ marginBottom: 1, '&:last-child': {mb: 0} }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ...wrapTextStyle }}>
                {exp.title || 'Job Title'} {exp.company && `at ${exp.company}`}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                {formatDate(exp.startDate, 'MMM YYYY')} - {formatDate(exp.endDate, 'MMM YYYY')}
              </Typography>
              <Typography variant="body2" sx={wrapTextStyle}>{exp.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* --- Education (CONDITIONAL) --- */}
      {visibleSections.education && education[0]?.degree && (
        <Box sx={{ marginBottom: 2 }}>
          <SectionHeader title="Education" />
          {education.map(edu => (
            <Box key={edu.id} sx={{ marginBottom: 1, '&:last-child': {mb: 0} }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ...wrapTextStyle }}>
                {edu.degree || 'Degree'} {edu.school && `from ${edu.school}`}
              </Typography>
              <Typography variant="caption" sx={{ fontStyle: 'italic', ...wrapTextStyle }}>
                {edu.city} {edu.year && `| ${formatDate(edu.year, 'YYYY')}`}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      
      {/* --- Projects (CONDITIONAL) --- */}
      {visibleSections.projects && projects[0]?.title && (
        <Box sx={{ marginBottom: 2 }}>
          <SectionHeader title="Projects" />
          {projects.map(proj => (
            <Box key={proj.id} sx={{ marginBottom: 1, '&:last-child': {mb: 0} }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ...wrapTextStyle }}>
                {proj.title || 'Project Title'}
              </Typography>
              {/* FIX: Link mein accent color daalein */}
              <Typography variant="caption" sx={{...wrapTextStyle, fontStyle: 'italic', color: accentColor}}>{proj.link}</Typography>
              <Typography variant="body2" sx={wrapTextStyle}>{proj.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* --- Skills (CONDITIONAL) --- */}
      {/* FIX: Skills ko Chips mein badal diya hai (UI behtar karne ke liye) */}
      {visibleSections.skills && skills.length > 0 && (
        <Box sx={{ marginBottom: 2 }}>
          <SectionHeader title="Skills" />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {skills.map(skill => (
              <Chip 
                key={skill} 
                label={skill} 
                size="small"
                sx={{ 
                  backgroundColor: `${accentColor}20`, // Halka accent
                  color: accentColor,
                  fontWeight: 'medium',
                  border: `1px solid ${accentColor}50`
                }} 
              />
            ))}
          </Box>
        </Box>
      )}
      
      {/* --- Hobbies (CONDITIONAL) --- */}
      {visibleSections.hobbies && hobbies && (
        <Box>
          <SectionHeader title="Hobbies" />
          <Typography variant="body2" sx={wrapTextStyle}>{hobbies}</Typography>
        </Box>
      )}

    </Paper>
  );
});

export default TemplateModern;