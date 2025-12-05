import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Divider, Avatar } from '@mui/material';
import dayjs from 'dayjs';

const wrapTextStyle = {
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

// ⭐ UPGRADED MODERN TEMPLATE ⭐
const TemplateModern = forwardRef(({ 
  data, 
  visibleSections, 
  sectionOrder, 
  theme, 
  isPreview = false 
}, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;

  const accentColor = theme?.accentColor || '#0B57D0';
  const font = theme?.fontFamily || 'Inter';

  // PREVIEW SCALING
  const previewScale = isPreview ? 0.7 : 1;
  
  const getFontSize = (baseSize) => {
    return isPreview ? `${baseSize * previewScale}rem` : `${baseSize}rem`;
  };

  const getSpacing = (baseSpacing) => {
    return isPreview ? baseSpacing * 0.4 : baseSpacing;
  };

  // Get limited data for preview
  const getLimitedExperience = () => {
    if (isPreview && experience.length > 0) {
      return [experience[0]];
    }
    return experience;
  };

  const getLimitedEducation = () => {
    if (isPreview && education.length > 0) {
      return [education[0]];
    }
    return education;
  };

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
        mb: getSpacing(1),
        borderBottom: `2px solid ${accentColor}22`,
        pb: getSpacing(0.5),
        textTransform: 'uppercase',
        fontSize: getFontSize(1),
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
          summary && !isPreview && (
            <Box key="summary" sx={{ mb: getSpacing(2) }}>
              <SectionTitle>Summary</SectionTitle>
              <Typography sx={{...wrapTextStyle, fontSize: getFontSize(0.9)}}>
                {summary}
              </Typography>
            </Box>
          )
        );

      case 'experience':
        const limitedExp = getLimitedExperience();
        return (
          visibleSections.experience &&
          limitedExp[0]?.title && (
            <Box key="experience" sx={{ mb: getSpacing(2) }}>
              <SectionTitle>Experience</SectionTitle>

              {limitedExp.map((exp) => (
                <Box
                  key={exp.id}
                  sx={{
                    mb: getSpacing(2),
                    p: getSpacing(1.2),
                    borderLeft: `3px solid ${accentColor}`,
                    background: '#fafafa',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.95) }}>
                    {exp.title || 'Job Title'}
                  </Typography>

                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#555', fontSize: getFontSize(0.85) }}>
                    {exp.company} — {exp.location}
                  </Typography>

                  <Typography variant="caption" sx={{ display: 'block', mb: 1, fontStyle: 'italic', fontSize: getFontSize(0.8) }}>
                    {formatDate(exp.startDate, 'MMM YYYY')} –{' '}
                    {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')}
                  </Typography>

                  <Typography sx={{...wrapTextStyle, fontSize: getFontSize(0.9)}}>
                    {isPreview ? `${exp.description?.substring(0, 50)}...` : exp.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )
        );

      case 'education':
        const limitedEdu = getLimitedEducation();
        return (
          visibleSections.education &&
          limitedEdu[0]?.degree && (
            <Box key="education" sx={{ mb: getSpacing(2) }}>
              <SectionTitle>Education</SectionTitle>

              {limitedEdu.map((edu) => (
                <Box key={edu.id} sx={{ mb: getSpacing(1.5) }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.95) }}>
                    {edu.degree}
                  </Typography>
                  <Typography variant="body2" fontSize={getFontSize(0.9)}>
                    {edu.school}, {edu.city}
                  </Typography>
                  <Typography variant="caption" sx={{ fontStyle: 'italic', fontSize: getFontSize(0.8) }}>
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
          projects[0]?.title && !isPreview && (
            <Box key="projects" sx={{ mb: getSpacing(2) }}>
              <SectionTitle>Projects</SectionTitle>

              {projects.map((p) => (
                <Box
                  key={p.id}
                  sx={{
                    mb: getSpacing(1.5),
                    p: getSpacing(1),
                    border: `1px solid ${accentColor}33`,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: getFontSize(0.95) }}>
                    {p.title}{' '}
                    {p.link && !isPreview && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: accentColor, fontSize: getFontSize(0.8) }}
                      >
                        (Link)
                      </a>
                    )}
                  </Typography>
                  <Typography sx={{...wrapTextStyle, fontSize: getFontSize(0.9)}}>
                    {p.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )
        );

      case 'skills':
        return (
          visibleSections.skills &&
          skills.length > 0 && (
            <Box key="skills" sx={{ mb: getSpacing(2) }}>
              <SectionTitle>Skills</SectionTitle>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: getSpacing(1) }}>
                {skills.slice(0, isPreview ? 4 : skills.length).map((s, i) => (
                  <Box
                    key={i}
                    sx={{
                      px: getSpacing(1.3),
                      py: getSpacing(0.6),
                      background: `${accentColor}15`,
                      border: `1px solid ${accentColor}50`,
                      borderRadius: '12px',
                      fontSize: getFontSize(0.85),
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
          hobbies && !isPreview && (
            <Box key="hobbies" sx={{ mb: getSpacing(2) }}>
              <SectionTitle>Hobbies</SectionTitle>
              <Typography sx={{...wrapTextStyle, fontSize: getFontSize(0.9)}}>
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
        p: isPreview ? 2 : 4,
        fontFamily: font,
        minHeight: '100%',
        position: 'relative',
        color: '#222',
        borderLeft: `8px solid ${accentColor}`,
        transform: isPreview ? 'scale(0.85)' : 'none',
        transformOrigin: 'top left',
      }}
    >
      {/* ===== HEADER ===== */}
      <Box sx={{ textAlign: 'center', mb: getSpacing(3) }}>
        {personalInfo.photo && !isPreview && (
          <Avatar
            src={personalInfo.photo}
            sx={{
              width: isPreview ? 60 : 120,
              height: isPreview ? 60 : 120,
              mx: 'auto',
              mb: getSpacing(2),
              border: `3px solid ${accentColor}`,
            }}
          />
        )}

        <Typography
          variant="h3"
          sx={{ 
            fontWeight: 800, 
            color: accentColor, 
            letterSpacing: 0.5,
            fontSize: isPreview ? '1.2rem' : '2.5rem'
          }}
        >
          {isPreview ? personalInfo.fullName?.substring(0, 12) : personalInfo.fullName || 'Your Name'}
        </Typography>

        <Typography variant="body1" sx={{ mt: getSpacing(1), color: '#555', fontSize: getFontSize(0.9) }}>
          {isPreview ? `${personalInfo.address?.substring(0, 15)}...` : personalInfo.address}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: getSpacing(1), flexWrap: 'wrap' }}>
          {personalInfo.phone && (
            <Typography variant="body2" fontSize={getFontSize(0.85)}>
              📞 {personalInfo.phone}
            </Typography>
          )}
          {personalInfo.email && (
            <Typography variant="body2" fontSize={getFontSize(0.85)}>
              ✉️ {isPreview ? `${personalInfo.email.substring(0, 10)}...` : personalInfo.email}
            </Typography>
          )}
        </Box>

        {!isPreview && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: getSpacing(1) }}>
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} style={{ color: accentColor, fontSize: getFontSize(0.85) }}>
                LinkedIn
              </a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} style={{ color: accentColor, fontSize: getFontSize(0.85) }}>
                Portfolio
              </a>
            )}
          </Box>
        )}
      </Box>

      <Divider sx={{ mb: getSpacing(3), borderColor: `${accentColor}33` }} />

      {/* ===== DYNAMIC SECTIONS ===== */}
      {sectionOrder.map((sec) => renderSection(sec))}
    </Paper>
  );
});

export default TemplateModern;