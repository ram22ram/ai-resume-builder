import React, { forwardRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const TemplateElena = forwardRef(({ data, visibleSections, sectionOrder, theme }, ref) => {
  const { personalInfo, summary, experience, education, projects, skills } = data;
  const accentColor = theme?.accentColor || '#2563eb';
  const font = theme?.fontFamily || 'Open Sans, sans-serif';

  const Section = ({ title, children }) => (
    <Box mb={4}>
      <Typography variant="h6" color={accentColor} sx={{ borderBottom: `1px solid ${accentColor}40`, mb: 2 }}>{title}</Typography>
      {children}
    </Box>
  );

  const renderSection = (id) => {
    switch(id) {
      case 'summary': return visibleSections.summary && summary && <Section title="Summary"><Typography variant="body2">{summary}</Typography></Section>;
      case 'experience': return visibleSections.experience && experience[0]?.title && <Section title="Experience">{experience.map(e => (<Box key={e.id} mb={2}><Typography fontWeight="bold">{e.title}</Typography><Typography variant="caption" color="text.secondary">{e.company}</Typography><Typography variant="body2" mt={0.5}>{e.description}</Typography></Box>))}</Section>;
      case 'skills': return visibleSections.skills && skills.length > 0 && <Section title="Skills"><Typography variant="body2">{skills.join(', ')}</Typography></Section>;
      case 'education': return visibleSections.education && education[0]?.school && <Section title="Education">{education.map(e => (<Box key={e.id}><Typography fontWeight="bold">{e.degree}</Typography><Typography variant="body2">{e.school}, {e.year}</Typography></Box>))}</Section>;
      default: return null;
    }
  };

  return (
    <Paper ref={ref} elevation={3} sx={{ p: 5, minHeight: '100%', fontFamily: font }}>
      <Box mb={5}>
        <Typography variant="h3" color={accentColor} fontWeight="300">{personalInfo.fullName}</Typography>
        <Typography variant="body2" color="text.secondary">{personalInfo.address} • {personalInfo.phone} • {personalInfo.email}</Typography>
      </Box>
      {sectionOrder.map(id => renderSection(id))}
    </Paper>
  );
});
export default TemplateElena;