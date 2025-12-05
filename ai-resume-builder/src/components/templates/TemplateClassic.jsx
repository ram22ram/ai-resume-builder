import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Avatar, Divider } from '@mui/material';
import dayjs from 'dayjs';

const wrapTextStyle = {
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

const TemplateClassic = forwardRef(
  ({ data, visibleSections, sectionOrder, theme }, ref) => {
    const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;

    // --- DYNAMIC THEME ---
    const accentColor = theme?.accentColor || '#000000';
    const font = theme?.fontFamily || '"Times New Roman", Times, serif';
    // ---------------------

    const formatDate = (date, format) => {
      if (!date) return 'Present';
      const d = dayjs(date);
      return d.isValid() ? d.format(format) : date;
    };

    const sectionTitleStyle = {
      fontFamily: font,
      fontWeight: 700,
      fontSize: '1rem',
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: accentColor,
      borderBottom: `1px solid ${accentColor}`,
      paddingBottom: '2px',
      marginBottom: '6px',
      marginTop: '14px',
    };

    const renderSection = (sectionId) => {
      switch (sectionId) {
        case 'summary':
          return (
            visibleSections.summary &&
            summary && (
              <Box key="summary" sx={{ mb: 1 }}>
                <Typography sx={sectionTitleStyle}>Summary</Typography>
                <Typography
                  variant="body2"
                  sx={{ ...wrapTextStyle, fontSize: '0.95rem' }}
                >
                  {summary}
                </Typography>
              </Box>
            )
          );

        case 'skills':
          return (
            visibleSections.skills &&
            skills.length > 0 && (
              <Box key="skills" sx={{ mb: 1 }}>
                <Typography sx={sectionTitleStyle}>Skills</Typography>
                <Typography
                  variant="body2"
                  sx={{ ...wrapTextStyle, fontSize: '0.95rem' }}
                >
                  {skills.join(' • ')}
                </Typography>
              </Box>
            )
          );

        case 'experience':
          return (
            visibleSections.experience &&
            experience[0]?.title && (
              <Box key="experience" sx={{ mb: 1 }}>
                <Typography sx={sectionTitleStyle}>Professional Experience</Typography>
                {experience.map((exp) => (
                  <Box
                    key={exp.id}
                    sx={{ mb: 1.2, '&:last-child': { mb: 0 } }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 700,
                          fontFamily: font,
                          fontSize: '0.98rem',
                          ...wrapTextStyle,
                        }}
                      >
                        {exp.title || 'Job Title'}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 700,
                          fontFamily: font,
                          fontSize: '0.98rem',
                          textAlign: 'right',
                          ...wrapTextStyle,
                        }}
                      >
                        {exp.company || 'Company'}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: 'italic',
                        fontSize: '0.85rem',
                        color: '#444',
                      }}
                    >
                      {formatDate(exp.startDate, 'MMM YYYY')} –{' '}
                      {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')}
                    </Typography>

                    {exp.location && (
                      <Typography
                        variant="body2"
                        sx={{ fontSize: '0.85rem', color: '#444', mb: 0.3 }}
                      >
                        {exp.location}
                      </Typography>
                    )}

                    <Typography
                      variant="body2"
                      sx={{ ...wrapTextStyle, fontSize: '0.95rem' }}
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
              <Box key="projects" sx={{ mb: 1 }}>
                <Typography sx={sectionTitleStyle}>Projects</Typography>
                {projects.map((proj) => (
                  <Box
                    key={proj.id}
                    sx={{ mb: 1.1, '&:last-child': { mb: 0 } }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        fontFamily: font,
                        fontSize: '0.98rem',
                        ...wrapTextStyle,
                      }}
                    >
                      {proj.title || 'Project Title'}
                      {proj.link && (
                        <span style={{ fontWeight: 400 }}>
                          {' '}
                          | {proj.link}
                        </span>
                      )}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ ...wrapTextStyle, fontSize: '0.95rem' }}
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
              <Box key="education" sx={{ mb: 1 }}>
                <Typography sx={sectionTitleStyle}>Education</Typography>
                {education.map((edu) => (
                  <Box
                    key={edu.id}
                    sx={{ mb: 1, '&:last-child': { mb: 0 } }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        fontFamily: font,
                        fontSize: '0.98rem',
                        ...wrapTextStyle,
                      }}
                    >
                      {edu.degree || 'Degree'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.95rem' }}
                    >
                      {edu.school || 'Institution'}
                      {edu.city ? `, ${edu.city}` : ''}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: 'italic',
                        fontSize: '0.85rem',
                        color: '#444',
                      }}
                    >
                      {edu.year || ''}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )
          );

        case 'hobbies':
          return (
            visibleSections.hobbies &&
            hobbies && (
              <Box key="hobbies">
                <Typography sx={sectionTitleStyle}>Interests</Typography>
                <Typography
                  variant="body2"
                  sx={{ ...wrapTextStyle, fontSize: '0.95rem' }}
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
          p: { xs: 2, sm: 3, md: 4 },
          fontFamily: font,
          color: '#000',
          minHeight: '100%',
          border: '1px solid #000',
        }}
      >
        {/* ===== CLASSIC HEADER ===== */}
        <Box sx={{ textAlign: 'center', mb: 2.5 }}>
          {personalInfo.photo && (
            <Avatar
              src={personalInfo.photo}
              sx={{
                width: 90,
                height: 90,
                mx: 'auto',
                mb: 1.5,
                border: `1px solid ${accentColor}`,
              }}
            />
          )}

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontFamily: font,
              fontSize: '1.9rem',
              textTransform: 'uppercase',
              letterSpacing: 2,
              color: accentColor,
            }}
          >
            {personalInfo.fullName || 'Your Name'}
          </Typography>

          {personalInfo.address && (
            <Typography
              variant="body2"
              sx={{ ...wrapTextStyle, fontSize: '0.95rem', mt: 0.5 }}
            >
              {personalInfo.address}
            </Typography>
          )}

          <Typography
            variant="body2"
            sx={{ fontSize: '0.9rem', mt: 0.5 }}
          >
            {personalInfo.phone && `${personalInfo.phone}`}
            {personalInfo.phone && personalInfo.email && ' • '}
            {personalInfo.email}
          </Typography>

          {(personalInfo.linkedin || personalInfo.portfolio) && (
            <Typography
              variant="body2"
              sx={{ fontSize: '0.9rem', mt: 0.2 }}
            >
              {personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`}
              {personalInfo.linkedin && personalInfo.portfolio && ' • '}
              {personalInfo.portfolio && `Portfolio: ${personalInfo.portfolio}`}
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: 1.5, borderColor: accentColor }} />

        {/* ===== SECTIONS ===== */}
        {sectionOrder.map((sectionId) => renderSection(sectionId))}
      </Paper>
    );
  }
);

export default TemplateClassic;
