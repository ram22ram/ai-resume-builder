import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Divider, Chip } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import dayjs from 'dayjs';

const wrapTextStyle = { whiteSpace: 'pre-wrap', wordWrap: 'break-word' };

const formatDate = (date, format) => {
  if (!date) return 'Present';
  const dateObj = dayjs(date);
  if (!dateObj.isValid()) return typeof date === 'string' ? date : 'Present';
  return dateObj.format(format);
};

// Helper component
const Section = ({ title, children, visible = true }) => {
  if (!visible || !children) return null;
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#111827', borderBottom: '2px solid #e0e0e0', pb: 0.5, mb: 1 }}>
        {title.toUpperCase()}
      </Typography>
      {children}
    </Box>
  );
};

// Helper component
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

// Helper component
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

const TemplateSwiss = forwardRef(({ data, visibleSections }, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;
  const sidebarColor = '#2d3748'; // Dark Gray
  const mainColor = '#ffffff';
  const textColor = '#f7fafc'; // Off-white

  return (
    <Paper ref={ref} elevation={3} sx={{ minHeight: '100%', fontFamily: 'Arial, sans-serif' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        
        {/* --- Left Sidebar --- */}
        <Box sx={{
          width: { xs: '100%', sm: '35%' },
          bgcolor: sidebarColor,
          color: textColor,
          p: 3,
        }}>
          {/* Header */}
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', md: '2.2rem' }, ...wrapTextStyle }}>
              {personalInfo.fullName || 'Your Name'}
            </Typography>
          </Box>

          {/* Contact */}
          <SidebarSection title="Contact">
            <ContactItem icon={Phone} text={personalInfo.phone} />
            <ContactItem icon={Mail} text={personalInfo.email} />
            <ContactItem icon={MapPin} text={personalInfo.address} />
            <ContactItem icon={Linkedin} text={personalInfo.linkedin} />
            <ContactItem icon={Globe} text={personalInfo.portfolio} />
          </SidebarSection>
          
          {/* Skills */}
          <SidebarSection title="Skills" visible={visibleSections.skills && skills.length > 0}>
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: textColor,
                  mr: 0.5, mb: 0.5
                }}
              />
            ))}
          </SidebarSection>
          
          {/* Hobbies */}
          <SidebarSection title="Hobbies" visible={visibleSections.hobbies && hobbies}>
            <Typography variant="body2" sx={{ fontSize: '0.9rem', ...wrapTextStyle }}>
              {hobbies}
            </Typography>
          </SidebarSection>
        </Box>

        {/* --- Right Main Content --- */}
        <Box sx={{
          width: { xs: '100%', sm: '65%' },
          bgcolor: mainColor,
          color: '#333',
          p: 3,
        }}>
          
          {/* Summary */}
          <Section title="Summary" visible={visibleSections.summary && summary}>
            <Typography variant="body2" sx={{ fontSize: '0.95rem', ...wrapTextStyle }}>
              {summary}
            </Typography>
          </Section>

          {/* Experience */}
          <Section title="Experience" visible={visibleSections.experience && experience[0]?.title}>
            {experience.map(exp => (
              <Box key={exp.id} sx={{ mb: 1.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{exp.title || 'Job Title'}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>{exp.company || 'Company'}</Typography>
                </Box>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  {formatDate(exp.startDate, 'MMM YYYY')} - {formatDate(exp.endDate, 'MMM YYYY')}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '0.95rem', ...wrapTextStyle, mt: 0.5 }}>{exp.description}</Typography>
              </Box>
            ))}
          </Section>

          {/* Projects */}
          <Section title="Projects" visible={visibleSections.projects && projects[0]?.title}>
            {projects.map(proj => (
              <Box key={proj.id} sx={{ mb: 1.5 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {proj.title || 'Project Title'}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'blue.800', ...wrapTextStyle }}>{proj.link}</Typography>
                <Typography variant="body2" sx={{ fontSize: '0.95rem', ...wrapTextStyle, mt: 0.5 }}>{proj.description}</Typography>
              </Box>
            ))}
          </Section>

          {/* Education */}
          <Section title="Education" visible={visibleSections.education && education[0]?.degree}>
            {education.map(edu => (
              <Box key={edu.id} sx={{ mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {edu.degree || 'Degree'}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: '0.95rem' }}>
                  {edu.school || 'School'} | {edu.city} | {formatDate(edu.year, 'YYYY')}
                </Typography>
              </Box>
            ))}
          </Section>

        </Box>
      </Box>
    </Paper>
  );
});

export default TemplateSwiss;