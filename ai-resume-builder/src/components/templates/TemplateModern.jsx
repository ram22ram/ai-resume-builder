import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Divider, Avatar } from '@mui/material';
import dayjs from 'dayjs';

const wrapTextStyle = {
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

// ⭐ UPGRADED MODERN TEMPLATE ⭐
const TemplateModern = forwardRef(({ data, visibleSections, sectionOrder, theme }, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;

  const accentColor = theme?.accentColor || '#0B57D0';
  const font = theme?.fontFamily || 'Inter';

  const formatDate = (date, format) => {
    if (!date) return 'Present';
    const d = dayjs(date);
    return d.isValid() ? d.format(format) : date;
  };

  const SectionTitle = ({ children }) => (
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        color: accentColor,
        letterSpacing: 0.3,
        mb: 1,
        borderBottom: `2px solid ${accentColor}22`,
        pb: 0.5,
        textTransform: 'uppercase',
      }}
    >
      {children}
    </Typography>
  );

  const renderSection = (sectionId) => {
    switch (sectionId) {
      case 'summary':
        return (
          visibleSections.summary &&
          summary && (
            <Box key="summary" sx={{ mb: 2 }}>
              <SectionTitle>Summary</SectionTitle>
              <Typography sx={wrapTextStyle}>{summary}</Typography>
            </Box>
          )
        );

      case 'experience':
        return (
          visibleSections.experience &&
          experience[0]?.title && (
            <Box key="experience" sx={{ mb: 2 }}>
              <SectionTitle>Experience</SectionTitle>

              {experience.map((exp) => (
                <Box
                  key={exp.id}
                  sx={{
                    mb: 2,
                    p: 1.2,
                    borderLeft: `3px solid ${accentColor}`,
                    background: '#fafafa',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {exp.title || 'Job Title'}
                  </Typography>

                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#555' }}>
                    {exp.company} — {exp.location}
                  </Typography>

                  <Typography variant="caption" sx={{ display: 'block', mb: 1, fontStyle: 'italic' }}>
                    {formatDate(exp.startDate, 'MMM YYYY')} –{' '}
                    {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')}
                  </Typography>

                  <Typography sx={wrapTextStyle}>{exp.description}</Typography>
                </Box>
              ))}
            </Box>
          )
        );

      case 'education':
        return (
          visibleSections.education &&
          education[0]?.degree && (
            <Box key="education" sx={{ mb: 2 }}>
              <SectionTitle>Education</SectionTitle>

              {education.map((edu) => (
                <Box key={edu.id} sx={{ mb: 1.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2">
                    {edu.school}, {edu.city}
                  </Typography>
                  <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                    {edu.year}
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
            <Box key="projects" sx={{ mb: 2 }}>
              <SectionTitle>Projects</SectionTitle>

              {projects.map((p) => (
                <Box
                  key={p.id}
                  sx={{
                    mb: 1.5,
                    p: 1,
                    border: `1px solid ${accentColor}33`,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {p.title}{' '}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: accentColor, fontSize: '0.8rem' }}
                      >
                        (Link)
                      </a>
                    )}
                  </Typography>
                  <Typography sx={wrapTextStyle}>{p.description}</Typography>
                </Box>
              ))}
            </Box>
          )
        );

      case 'skills':
        return (
          visibleSections.skills &&
          skills.length > 0 && (
            <Box key="skills" sx={{ mb: 2 }}>
              <SectionTitle>Skills</SectionTitle>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {skills.map((s, i) => (
                  <Box
                    key={i}
                    sx={{
                      px: 1.3,
                      py: 0.6,
                      background: `${accentColor}15`,
                      border: `1px solid ${accentColor}50`,
                      borderRadius: '12px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: accentColor,
                    }}
                  >
                    {s}
                  </Box>
                ))}
              </Box>
            </Box>
          )
        );

      case 'hobbies':
        return (
          visibleSections.hobbies &&
          hobbies && (
            <Box key="hobbies" sx={{ mb: 2 }}>
              <SectionTitle>Hobbies</SectionTitle>
              <Typography sx={wrapTextStyle}>{hobbies}</Typography>
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
        p: 4,
        fontFamily: font,
        minHeight: '100%',
        position: 'relative',
        color: '#222',
        borderLeft: `8px solid ${accentColor}`, // ⭐ Signature Modern Accent Bar
      }}
    >
      {/* ===== HEADER ===== */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        {personalInfo.photo && (
          <Avatar
            src={personalInfo.photo}
            sx={{
              width: 120,
              height: 120,
              mx: 'auto',
              mb: 2,
              border: `3px solid ${accentColor}`,
            }}
          />
        )}

        <Typography
          variant="h3"
          sx={{ fontWeight: 800, color: accentColor, letterSpacing: 0.5 }}
        >
          {personalInfo.fullName || 'Your Name'}
        </Typography>

        <Typography variant="body1" sx={{ mt: 1, color: '#555' }}>
          {personalInfo.address}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1, flexWrap: 'wrap' }}>
          {personalInfo.phone && <Typography variant="body2">📞 {personalInfo.phone}</Typography>}
          {personalInfo.email && <Typography variant="body2">✉️ {personalInfo.email}</Typography>}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} style={{ color: accentColor }}>
              LinkedIn
            </a>
          )}
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} style={{ color: accentColor }}>
              Portfolio
            </a>
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 3, borderColor: `${accentColor}33` }} />

      {/* ===== DYNAMIC SECTIONS ===== */}
      {sectionOrder.map((sec) => renderSection(sec))}
    </Paper>
  );
});

export default TemplateModern;
