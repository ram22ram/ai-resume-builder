import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Chip, Avatar } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import dayjs from 'dayjs';

const wrapTextStyle = { whiteSpace: 'pre-wrap', wordWrap: 'break-word' };

const formatDate = (date, format) => {
  if (!date) return 'Present';
  const dateObj = dayjs(date);
  if (!dateObj.isValid()) return typeof date === 'string' ? date : 'Present';
  return dateObj.format(format);
};

const TemplateSwiss = forwardRef(({ data, visibleSections, sectionOrder, theme }, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;
  
  // --- DYNAMIC THEME ---
  // Sidebar takes the accent color for a bold look
  const sidebarColor = theme?.accentColor || '#2d3748'; 
  const font = theme?.fontFamily || 'Arial, sans-serif';
  const mainColor = '#ffffff';
  const textColor = '#ffffff'; // Text in sidebar is always white
  // ---------------------

  const SidebarSection = ({ title, children }) => {
    return (
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 'bold', 
          fontSize: '0.9rem', 
          color: 'rgba(255,255,255,0.7)', 
          borderBottom: '1px solid rgba(255,255,255,0.2)', 
          pb: 0.5, mb: 1.5,
          textTransform: 'uppercase',
          letterSpacing: 1
        }}>
          {title}
        </Typography>
        {children}
      </Box>
    );
  };

  const MainSection = ({ title, children }) => {
    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold', 
          fontSize: '1.25rem', 
          color: '#1a202c', 
          borderBottom: `3px solid ${sidebarColor}`, 
          pb: 0.5, mb: 2,
          textTransform: 'uppercase'
        }}>
          {title}
        </Typography>
        {children}
      </Box>
    );
  };

  const ContactItem = ({ icon: Icon, text }) => {
    if (!text) return null;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Icon size={16} style={{ marginRight: '12px', opacity: 0.8 }} />
        <Typography variant="body2" sx={{ fontSize: '0.9rem', ...wrapTextStyle }}>
          {text}
        </Typography>
      </Box>
    );
  };

  // Helper to render sidebar specific sections
  const renderSidebarSection = (sectionId) => {
    switch(sectionId) {
      case 'skills':
        return visibleSections.skills && skills.length > 0 && (
          <SidebarSection title="Skills" key="skills">
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.15)', 
                    color: textColor, 
                    borderRadius: '4px',
                    border: 'none'
                  }}
                />
              ))}
            </Box>
          </SidebarSection>
        );
      case 'hobbies':
        return visibleSections.hobbies && hobbies && (
          <SidebarSection title="Hobbies" key="hobbies">
            <Typography variant="body2" sx={{ fontSize: '0.9rem', ...wrapTextStyle, lineHeight: 1.6 }}>
              {hobbies}
            </Typography>
          </SidebarSection>
        );
      default: return null;
    }
  };

  // Helper to render main content sections
  const renderMainSection = (sectionId) => {
    switch(sectionId) {
      case 'summary':
        return visibleSections.summary && summary && (
          <MainSection title="Profile" key="summary">
            <Typography variant="body1" sx={{ fontSize: '1rem', color: '#4a5568', lineHeight: 1.6, ...wrapTextStyle }}>
              {summary}
            </Typography>
          </MainSection>
        );
      case 'experience':
        return visibleSections.experience && experience[0]?.title && (
          <MainSection title="Experience" key="experience">
            {experience.map(exp => (
              <Box key={exp.id} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#2d3748' }}>
                  {exp.title || 'Job Title'}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: sidebarColor }}>
                    {exp.company || 'Company'}
                  </Typography>
                  <Typography variant="caption" sx={{ fontStyle: 'italic', color: '#718096', fontSize: '0.85rem' }}>
                    {formatDate(exp.startDate, 'MMM YYYY')} - {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')} | {exp.location}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ fontSize: '0.95rem', color: '#4a5568', lineHeight: 1.6, ...wrapTextStyle }}>
                  {exp.description}
                </Typography>
              </Box>
            ))}
          </MainSection>
        );
      case 'projects':
        return visibleSections.projects && projects[0]?.title && (
          <MainSection title="Projects" key="projects">
            {projects.map(proj => (
              <Box key={proj.id} sx={{ mb: 2.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#2d3748' }}>
                  {proj.title || 'Project Title'}
                </Typography>
                {proj.link && (
                  <Typography variant="caption" sx={{ display: 'block', mb: 0.5, color: sidebarColor, textDecoration: 'underline' }}>
                    {proj.link}
                  </Typography>
                )}
                <Typography variant="body2" sx={{ fontSize: '0.95rem', color: '#4a5568', lineHeight: 1.6, ...wrapTextStyle }}>
                  {proj.description}
                </Typography>
              </Box>
            ))}
          </MainSection>
        );
      case 'education':
        return visibleSections.education && education[0]?.degree && (
          <MainSection title="Education" key="education">
            {education.map(edu => (
              <Box key={edu.id} sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#2d3748' }}>
                  {edu.degree || 'Degree'}
                </Typography>
                <Typography variant="body2" sx={{ color: '#4a5568' }}>
                  {edu.school || 'School'} | {edu.city}
                </Typography>
                <Typography variant="caption" sx={{ color: '#718096' }}>
                   {edu.year && `Year: ${edu.year}`}
                </Typography>
              </Box>
            ))}
          </MainSection>
        );
      default: return null;
    }
  };

  return (
    <Paper ref={ref} elevation={3} sx={{ minHeight: '100%', fontFamily: font }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, minHeight: '100%' }}>
        
        {/* --- Left Sidebar --- */}
        <Box sx={{ 
          width: { xs: '100%', sm: '32%' }, 
          bgcolor: sidebarColor, 
          color: textColor, 
          p: 4,
          display: 'flex',
          flexDirection: 'column'
        }}>
          
          {/* --- PHOTO LOGIC --- */}
          {personalInfo.photo && (
            <Avatar 
              src={personalInfo.photo} 
              sx={{ 
                width: 140, 
                height: 140, 
                mb: 3, 
                border: '4px solid rgba(255,255,255,0.2)',
                alignSelf: 'center'
              }}
            />
          )}
          {/* ------------------- */}

          {/* Header (Sidebar) */}
          <Box sx={{ mb: 4, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', md: '2rem' }, lineHeight: 1.2, mb: 1, ...wrapTextStyle }}>
              {personalInfo.fullName || 'Your Name'}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.9rem', ...wrapTextStyle }}>
              {/* Job Title could go here if added to schema */}
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
        <Box sx={{ 
          width: { xs: '100%', sm: '68%' }, 
          bgcolor: mainColor, 
          p: { xs: 3, sm: 5 } 
        }}>
          {/* Dynamic Main Sections */}
          {sectionOrder.map(sectionId => renderMainSection(sectionId))}
        </Box>
      </Box>
    </Paper>
  );
});

export default TemplateSwiss;