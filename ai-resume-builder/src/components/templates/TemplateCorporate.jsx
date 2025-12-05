import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Grid, Chip, Avatar, Divider } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import dayjs from 'dayjs';

const wrapTextStyle = { whiteSpace: 'pre-wrap', wordBreak: 'break-word' };

const formatDate = (date, format) => {
  if (!date) return 'Present';
  const d = dayjs(date);
  return d.isValid() ? d.format(format) : date;
};

const TemplateCorporate = forwardRef(({ data, visibleSections, sectionOrder, theme }, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;

  // --- DYNAMIC THEME ---
  const accentColor = theme?.accentColor || '#1A237E';
  const font = theme?.fontFamily || '"Helvetica Neue", Helvetica, Arial, sans-serif';
  // ---------------------

  const Section = ({ title, children }) => (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          fontSize: '0.85rem',
          color: accentColor,
          textTransform: 'uppercase',
          letterSpacing: 1,
          mb: 1,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );

  const MainSection = ({ title, children }) => (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: '1rem',
          color: accentColor,
          borderBottom: `2px solid ${accentColor}33`,
          pb: 0.5,
          mb: 1.5,
          textTransform: 'uppercase',
          letterSpacing: 0.8,
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );

  const ContactItem = ({ icon: Icon, text, link = false }) => {
    if (!text) return null;
    const content = (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
        <Icon size={14} color={accentColor} />
        <Typography
          variant="body2"
          sx={{
            fontSize: '0.85rem',
            ...wrapTextStyle,
            color: link ? accentColor : '#333',
          }}
        >
          {text}
        </Typography>
      </Box>
    );
    return link ? (
      <a
        href={text}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        {content}
      </a>
    ) : (
      content
    );
  };

  const renderSection = (sectionId, variant = 'main') => {
    switch (sectionId) {
      case 'summary':
        return (
          visibleSections.summary &&
          summary &&
          (variant === 'main') && (
            <MainSection title="Summary" key="summary">
              <Typography
                variant="body2"
                sx={{ fontSize: '0.95rem', ...wrapTextStyle }}
              >
                {summary}
              </Typography>
            </MainSection>
          )
        );

      case 'skills':
        return (
          visibleSections.skills &&
          skills.length > 0 &&
          (variant === 'sidebar') && (
            <Section title="Skills" key="skills">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                {skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    sx={{
                      bgcolor: `${accentColor}10`,
                      color: accentColor,
                      fontWeight: 600,
                      borderRadius: '999px',
                      fontSize: '0.75rem',
                    }}
                  />
                ))}
              </Box>
            </Section>
          )
        );

      case 'experience':
        return (
          visibleSections.experience &&
          experience[0]?.title &&
          (variant === 'main') && (
            <MainSection title="Experience" key="experience">
              {experience.map((exp) => (
                <Box key={exp.id} sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 2,
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, fontSize: '0.98rem' }}
                    >
                      {exp.title || 'Job Title'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: 'italic',
                        color: '#555',
                        fontSize: '0.8rem',
                      }}
                    >
                      {formatDate(exp.startDate, 'MMM YYYY')} –{' '}
                      {exp.isPresent
                        ? 'Present'
                        : formatDate(exp.endDate, 'MMM YYYY')}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: accentColor,
                      fontSize: '0.9rem',
                      mb: 0.3,
                    }}
                  >
                    {exp.company || 'Company'}
                    {exp.location && ` • ${exp.location}`}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ fontSize: '0.9rem', ...wrapTextStyle }}
                  >
                    {exp.description}
                  </Typography>
                </Box>
              ))}
            </MainSection>
          )
        );

      case 'projects':
        return (
          visibleSections.projects &&
          projects[0]?.title &&
          (variant === 'main') && (
            <MainSection title="Projects" key="projects">
              {projects.map((proj) => (
                <Box key={proj.id} sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, fontSize: '0.95rem' }}
                  >
                    {proj.title || 'Project Title'}
                  </Typography>
                  {proj.link && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontStyle: 'italic',
                        color: accentColor,
                        ...wrapTextStyle,
                      }}
                    >
                      {proj.link}
                    </Typography>
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.9rem',
                      ...wrapTextStyle,
                      mt: 0.5,
                    }}
                  >
                    {proj.description}
                  </Typography>
                </Box>
              ))}
            </MainSection>
          )
        );

      case 'education':
        // corporate me education main column me hi rakhenge
        return (
          visibleSections.education &&
          education[0]?.degree &&
          (variant === 'main') && (
            <MainSection title="Education" key="education">
              {education.map((edu) => (
                <Box key={edu.id} sx={{ mb: 1.5 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, fontSize: '0.95rem' }}
                  >
                    {edu.degree || 'Degree'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: '0.9rem' }}
                  >
                    {edu.school || 'Institution'}
                    {edu.city && ` • ${edu.city}`}
                  </Typography>
                  {edu.year && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: '0.8rem',
                        fontStyle: 'italic',
                        color: '#555',
                      }}
                    >
                      {formatDate(edu.year, 'YYYY')}
                    </Typography>
                  )}
                </Box>
              ))}
            </MainSection>
          )
        );

      case 'hobbies':
        return (
          visibleSections.hobbies &&
          hobbies &&
          (variant === 'sidebar') && (
            <Section title="Interests" key="hobbies">
              <Typography
                variant="body2"
                sx={{ fontSize: '0.9rem', ...wrapTextStyle }}
              >
                {hobbies}
              </Typography>
            </Section>
          )
        );

      default:
        return null;
    }
  };

  // Sidebar me kaunse sections jayenge:
  const sidebarIds = ['skills', 'hobbies'];
  const sidebarOrder = sectionOrder.filter((id) => sidebarIds.includes(id));
  const mainOrder = sectionOrder.filter((id) => !sidebarIds.includes(id));

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        fontFamily: font,
        minHeight: '100%',
        bgcolor: '#f5f6fa',
        borderRadius: 2,
      }}
    >
      {/* ===== HEADER ===== */}
      <Box
        sx={{
          mb: 3,
          pb: 2,
          borderBottom: `2px solid ${accentColor}33`,
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '1.8rem', sm: '2.1rem' },
              color: accentColor,
              mb: 1,
              ...wrapTextStyle,
            }}
          >
            {personalInfo.fullName?.toUpperCase() || 'YOUR NAME'}
          </Typography>

          <Grid container spacing={0.7}>
            <Grid item xs={12} sm={6}>
              <ContactItem icon={Mail} text={personalInfo.email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ContactItem icon={Phone} text={personalInfo.phone} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ContactItem icon={MapPin} text={personalInfo.address} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ContactItem icon={Linkedin} text={personalInfo.linkedin} link />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ContactItem icon={Globe} text={personalInfo.portfolio} link />
            </Grid>
          </Grid>
        </Box>

        {personalInfo.photo && (
          <Avatar
            src={personalInfo.photo}
            variant="rounded"
            sx={{
              width: 110,
              height: 110,
              border: `2px solid ${accentColor}33`,
              bgcolor: '#fff',
            }}
          />
        )}
      </Box>

      {/* ===== BODY: 2-COLUMN LAYOUT ===== */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3,
        }}
      >
        {/* SIDEBAR */}
        <Box
          sx={{
            width: { xs: '100%', md: '30%' },
            bgcolor: '#ffffff',
            borderRadius: 2,
            p: 2,
            border: `1px solid ${accentColor}15`,
          }}
        >
          {sidebarOrder.map((id) => renderSection(id, 'sidebar'))}
        </Box>

        {/* MAIN CONTENT */}
        <Box
          sx={{
            width: { xs: '100%', md: '70%' },
          }}
        >
          {mainOrder.map((id) => renderSection(id, 'main'))}
        </Box>
      </Box>
    </Paper>
  );
});

export default TemplateCorporate;
