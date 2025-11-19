import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import dayjs from 'dayjs';

const wrapTextStyle = { whiteSpace: 'pre-wrap', wordWrap: 'break-word' };

const formatDate = (date, format) => {
  if (!date) return 'Present';
  const dateObj = dayjs(date);
  if (!dateObj.isValid()) return typeof date === 'string' ? date : 'Present';
  return dateObj.format(format);
};

const SidebarSection = ({ title, children, visible = true }) => {
  if (!visible || !children) return null;
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#ffffff', borderBottom: '1px solid #6b7280', pb: 0.5, mb: 1 }}>
        {title.toUpperCase()}
      </Typography>
      {children}
    </Box>
  );
};

const ContactItem = ({ icon: Icon, text }) => {
  if (!text) return null;
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
      <Icon size={14} style={{ marginRight: '8px' }} />
      <Typography variant="body2" sx={{ fontSize: '0.9rem', ...wrapTextStyle }}>
        {text}
      </Typography>
    </Box>
  );
};

const TemplateSwiss = forwardRef(({ data, visibleSections, sectionOrder }, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;
  const sidebarColor = '#2d3748';
  const mainColor = '#ffffff';
  const textColor = '#f7fafc';

  // Helper to decide which sections go to Main vs Sidebar
  const renderMainSection = (sectionId) => {
    switch(sectionId) {
      case 'summary':
        return visibleSections.summary && summary && (
          <Box sx={{ mb: 2 }} key="summary">
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827', borderBottom: '2px solid #e0e0e0', pb: 0.5, mb: 1 }}>SUMMARY</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.95rem', ...wrapTextStyle }}>
              {summary}
            </Typography>
          </Box>
        );
      case 'experience':
        return visibleSections.experience && experience[0]?.title && (
          <Box sx={{ mb: 2 }} key="experience">
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827', borderBottom: '2px solid #e0e0e0', pb: 0.5, mb: 1 }}>EXPERIENCE</Typography>
            {experience.map(exp => (
              <Box key={exp.id} sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{exp.title || 'Job Title'}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{exp.company || 'Company'}</Typography>
                </Box>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  {formatDate(exp.startDate, 'MMM YYYY')} - {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.95rem', ...wrapTextStyle, mt: 0.5 }}>{exp.description}</Typography>
              </Box>
            ))}
          </Box>
        );
      case 'projects':
        return visibleSections.projects && projects[0]?.title && (
          <Box sx={{ mb: 2 }} key="projects">
             <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827', borderBottom: '2px solid #e0e0e0', pb: 0.5, mb: 1 }}>PROJECTS</Typography>
            {projects.map(proj => (
              <Box key={proj.id} sx={{ mb: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {proj.title || 'Project Title'}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'blue.800', ...wrapTextStyle }}>{proj.link}</Typography>
                <Typography variant="body2" sx={{ fontSize: '0.95rem', ...wrapTextStyle, mt: 0.5 }}>{proj.description}</Typography>
              </Box>
            ))}
          </Box>
        );
      case 'education':
        return visibleSections.education && education[0]?.degree && (
          <Box sx={{ mb: 2 }} key="education">
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827', borderBottom: '2px solid #e0e0e0', pb: 0.5, mb: 1 }}>EDUCATION</Typography>
            {education.map(edu => (
              <Box key={edu.id} sx={{ mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {edu.degree || 'Degree'}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '0.95rem' }}>
                  {edu.school || 'School'} | {edu.city} | {edu.year && `Year of Completion: ${edu.year}`}
                </Typography>
              </Box>
            ))}
          </Box>
        );
      default: return null;
    }
  };

  const renderSidebarSection = (sectionId) => {
    switch(sectionId) {
      case 'skills':
        return visibleSections.skills && skills.length > 0 && (
          <SidebarSection title="Skills" key="skills">
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: textColor, mr: 0.5, mb: 0.5 }}
              />
            ))}
          </SidebarSection>
        );
      case 'hobbies':
        return visibleSections.hobbies && hobbies && (
          <SidebarSection title="Hobbies" key="hobbies">
            <Typography variant="body2" sx={{ fontSize: '0.9rem', ...wrapTextStyle }}>
              {hobbies}
            </Typography>
          </SidebarSection>
        );
      default: return null;
    }
  };

  return (
    <Paper ref={ref} elevation={3} sx={{ minHeight: '100%', fontFamily: 'Arial, sans-serif' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        
        {/* --- Left Sidebar --- */}
        <Box sx={{ width: { xs: '100%', sm: '35%' }, bgcolor: sidebarColor, color: textColor, p: 3 }}>
          {/* Header */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', md: '2.2rem' }, ...wrapTextStyle }}>
              {personalInfo.fullName || 'Your Name'}
            </Typography>
          </Box>

          <SidebarSection title="Contact">
            <ContactItem icon={Phone} text={personalInfo.phone} />
            <ContactItem icon={Mail} text={personalInfo.email} />
            <ContactItem icon={MapPin} text={personalInfo.address} />
            <ContactItem icon={Linkedin} text={personalInfo.linkedin} />
            <ContactItem icon={Globe} text={personalInfo.portfolio} />
          </SidebarSection>
          
          {/* Dynamic Sidebar Sections */}
          {sectionOrder.map(sectionId => renderSidebarSection(sectionId))}
        </Box>

        {/* --- Right Main Content --- */}
        <Box sx={{ width: { xs: '100%', sm: '65%' }, bgcolor: mainColor, color: '#333', p: 3 }}>
          {/* Dynamic Main Sections */}
          {sectionOrder.map(sectionId => renderMainSection(sectionId))}
        </Box>
      </Box>
    </Paper>
  );
});

export default TemplateSwiss;