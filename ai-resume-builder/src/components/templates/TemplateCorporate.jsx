import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Grid, Chip } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import dayjs from 'dayjs';

const wrapTextStyle = { whiteSpace: 'pre-wrap', wordWrap: 'break-word' };

const formatDate = (date, format) => {
  if (!date) return 'Present';
  const dateObj = dayjs(date);
  if (!dateObj.isValid()) return typeof date === 'string' ? date : 'Present';
  return dateObj.format(format);
};

const Section = ({ title, children }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ 
        fontWeight: 'bold', 
        fontSize: '1.2rem', 
        color: '#1A237E', // Dark Blue
        borderBottom: '2px solid #1A237E',
        pb: 0.5, mb: 1.5 
      }}>
        {title.toUpperCase()}
      </Typography>
      {children}
    </Box>
  );
};

const ContactItem = ({ icon: Icon, text, link = false }) => {
  if (!text) return null;
  const content = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Icon size={14} color="#1A237E" />
      <Typography variant="body2" sx={{ fontSize: '0.9rem', ...wrapTextStyle, color: link ? 'blue' : 'inherit' }}>
        {text}
      </Typography>
    </Box>
  );
  return link ? <a href={text} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>{content}</a> : content;
};

const TemplateCorporate = forwardRef(({ data, visibleSections, sectionOrder }, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;

  const renderSection = (sectionId) => {
    switch(sectionId) {
      case 'summary':
        return visibleSections.summary && summary && (
          <Section title="Summary" key="summary">
            <Typography variant="body1" sx={{ fontSize: '0.95rem', ...wrapTextStyle }}>
              {summary}
            </Typography>
          </Section>
        );

      case 'skills':
        return visibleSections.skills && skills.length > 0 && (
          <Section title="Skills" key="skills">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  sx={{ bgcolor: '#E3F2FD', color: '#0D47A1', fontWeight: 'medium' }} 
                />
              ))}
            </Box>
          </Section>
        );

      case 'experience':
        return visibleSections.experience && experience[0]?.title && (
          <Section title="Experience" key="experience">
            {experience.map(exp => (
              <Box key={exp.id} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#000' }}>
                    {exp.title || 'Job Title'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555' }}>
                    {formatDate(exp.startDate, 'MMM YYYY')} - {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#333', mb: 0.5 }}>
                  {exp.company || 'Company'}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.95rem', ...wrapTextStyle }}>{exp.description}</Typography>
              </Box>
            ))}
          </Section>
        );

      case 'projects':
        return visibleSections.projects && projects[0]?.title && (
          <Section title="Projects" key="projects">
            {projects.map(proj => (
              <Box key={proj.id} sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.05rem' }}>
                  {proj.title || 'Project Title'}
                </Typography>
                {proj.link && (
                  <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'blue.800', ...wrapTextStyle }}>{proj.link}</Typography>
                )}
                <Typography variant="body2" sx={{ fontSize: '0.95rem', ...wrapTextStyle, mt: 0.5 }}>{proj.description}</Typography>
              </Box>
            ))}
          </Section>
        );

      case 'education':
        return visibleSections.education && education[0]?.degree && (
          <Section title="Education" key="education">
            {education.map(edu => (
              <Box key={edu.id} sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.05rem' }}>
                    {edu.school || 'School/University'}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555' }}>
                    {edu.year && `Year of Completion: ${edu.year}`}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'medium', color: '#333' }}>
                  {edu.degree || 'Degree'} {edu.city && `| ${edu.city}`}
                </Typography>
              </Box>
            ))}
          </Section>
        );

      case 'hobbies':
        return visibleSections.hobbies && hobbies && (
          <Section title="Hobbies" key="hobbies">
            <Typography variant="body1" sx={{ fontSize: '0.95rem', ...wrapTextStyle }}>
              {hobbies}
            </Typography>
          </Section>
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
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        minHeight: '100%',
        bgcolor: '#f8f9fa'
      }}
    >
      
      {/* --- Header (Fixed) --- */}
      <Box sx={{ textAlign: 'left', mb: 2, borderBottom: '3px solid #1A237E', pb: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1A237E', ...wrapTextStyle }}>
          {personalInfo.fullName || 'YOUR NAME'}
        </Typography>
        
        <Grid container spacing={1} sx={{ mt: 1.5 }}>
          <Grid item xs={12} sm={6}><ContactItem icon={Mail} text={personalInfo.email} /></Grid>
          <Grid item xs={12} sm={6}><ContactItem icon={Phone} text={personalInfo.phone} /></Grid>
          <Grid item xs={12} sm={6}><ContactItem icon={MapPin} text={personalInfo.address} /></Grid>
          <Grid item xs={12} sm={6}><ContactItem icon={Linkedin} text={personalInfo.linkedin} link /></Grid>
          <Grid item xs={12} sm={6}><ContactItem icon={Globe} text={personalInfo.portfolio} link /></Grid>
        </Grid>
      </Box>

      {/* --- Dynamic Sections --- */}
      {sectionOrder.map(sectionId => renderSection(sectionId))}

    </Paper>
  );
});

export default TemplateCorporate;