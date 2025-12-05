import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Chip, Avatar, Grid } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import dayjs from 'dayjs';

const wrapTextStyle = { whiteSpace: 'pre-wrap', wordBreak: 'break-word' };

const formatDate = (date, format) => {
  if (!date) return 'Present';
  const d = dayjs(date);
  return d.isValid() ? d.format(format) : date;
};

const TemplateSwiss = forwardRef(
  ({ data, visibleSections, sectionOrder, theme }, ref) => {
    const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;

    // --- DYNAMIC THEME ---
    const accentColor = theme?.accentColor || '#111827'; // dark neutral
    const font = theme?.fontFamily || 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    // ---------------------

    const SectionTitle = ({ children }) => (
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          fontSize: '0.8rem',
          color: '#4b5563',
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          borderBottom: '1px solid #e5e7eb',
          pb: 0.5,
          mb: 1.5,
        }}
      >
        {children}
      </Typography>
    );

    const ContactItem = ({ icon: Icon, text, link = false }) => {
      if (!text) return null;
      const content = (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
          <Icon size={14} color="white" />
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.82rem',
              color: 'white',
              ...wrapTextStyle,
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

    const renderSection = (sectionId) => {
      switch (sectionId) {
        case 'summary':
          return (
            visibleSections.summary &&
            summary && (
              <Box key="summary" sx={{ mb: 3 }}>
                <SectionTitle>Profile</SectionTitle>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.95rem',
                    color: '#374151',
                    lineHeight: 1.6,
                    ...wrapTextStyle,
                  }}
                >
                  {summary}
                </Typography>
              </Box>
            )
          );

        case 'experience':
          return (
            visibleSections.experience &&
            experience[0]?.title && (
              <Box key="experience" sx={{ mb: 3 }}>
                <SectionTitle>Experience</SectionTitle>
                {experience.map((exp) => (
                  <Box key={exp.id} sx={{ mb: 2.5 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.98rem',
                        color: '#111827',
                      }}
                    >
                      {exp.title || 'Job Title'}
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                        alignItems: 'baseline',
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: accentColor,
                          fontSize: '0.85rem',
                        }}
                      >
                        {exp.company || 'Company'}
                        {exp.location && ` • ${exp.location}`}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.8rem',
                          color: '#6b7280',
                          fontStyle: 'italic',
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
                        fontSize: '0.9rem',
                        color: '#374151',
                        lineHeight: 1.6,
                        ...wrapTextStyle,
                      }}
                    >
                      {exp.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )
          );

        case 'projects':
          return (
            visibleSections.projects &&
            projects[0]?.title && (
              <Box key="projects" sx={{ mb: 3 }}>
                <SectionTitle>Projects</SectionTitle>
                {projects.map((proj) => (
                  <Box key={proj.id} sx={{ mb: 2.2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: '#111827',
                      }}
                    >
                      {proj.title || 'Project Title'}
                    </Typography>
                    {proj.link && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mb: 0.4,
                          color: accentColor,
                          textDecoration: 'underline',
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
                        color: '#374151',
                        lineHeight: 1.6,
                        ...wrapTextStyle,
                      }}
                    >
                      {proj.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )
          );

        case 'education':
          return (
            visibleSections.education &&
            education[0]?.degree && (
              <Box key="education" sx={{ mb: 3 }}>
                <SectionTitle>Education</SectionTitle>
                {education.map((edu) => (
                  <Box key={edu.id} sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.95rem',
                        color: '#111827',
                      }}
                    >
                      {edu.degree || 'Degree'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.9rem', color: '#4b5563' }}
                    >
                      {edu.school || 'Institution'}
                      {edu.city && ` • ${edu.city}`}
                    </Typography>
                    {edu.year && (
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.8rem',
                          color: '#6b7280',
                          fontStyle: 'italic',
                        }}
                      >
                        {edu.year}
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            )
          );

        case 'skills':
          return (
            visibleSections.skills &&
            skills.length > 0 && (
              <Box key="skills" sx={{ mb: 3 }}>
                <SectionTitle>Skills</SectionTitle>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {skills.map((skill, idx) => (
                    <Chip
                      key={idx}
                      label={skill}
                      size="small"
                      sx={{
                        borderRadius: '999px',
                        border: '1px solid #e5e7eb',
                        bgcolor: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        color: '#111827',
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )
          );

        case 'hobbies':
          return (
            visibleSections.hobbies &&
            hobbies && (
              <Box key="hobbies" sx={{ mb: 3 }}>
                <SectionTitle>Interests</SectionTitle>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: '0.9rem',
                    color: '#374151',
                    lineHeight: 1.6,
                    ...wrapTextStyle,
                  }}
                >
                  {hobbies}
                </Typography>
              </Box>
            )
          );

        default:
          return null;
      }
    };

    return (
      <Paper
        ref={ref}
        elevation={0}
        sx={{
          minHeight: '100%',
          fontFamily: font,
          bgcolor: '#f3f4f6',
        }}
      >
        {/* ===== TOP HEADER BLOCK (BOLD SWISS STYLE) ===== */}
        <Box
          sx={{
            bgcolor: accentColor,
            color: 'white',
            px: { xs: 3, sm: 4 },
            py: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: { xs: 'column-reverse', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.8rem', sm: '2.2rem' },
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                mb: 1,
                ...wrapTextStyle,
              }}
            >
              {personalInfo.fullName || 'Your Name'}
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
              sx={{
                width: 110,
                height: 110,
                border: '3px solid rgba(255,255,255,0.7)',
                bgcolor: 'white',
              }}
            />
          )}
        </Box>

        {/* ===== MAIN BODY (MINIMAL, SINGLE COLUMN) ===== */}
        <Box
          sx={{
            px: { xs: 3, sm: 4 },
            py: { xs: 3, sm: 4 },
            bgcolor: 'white',
          }}
        >
          {sectionOrder.map((id) => renderSection(id))}
        </Box>
      </Paper>
    );
  }
);

export default TemplateSwiss;
