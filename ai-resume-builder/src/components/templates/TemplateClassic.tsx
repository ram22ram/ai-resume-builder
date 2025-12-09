import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Avatar, Divider } from '@mui/material';
import dayjs from 'dayjs';

const wrapTextStyle = {
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
};

const TemplateClassic = forwardRef(
  ({ data, visibleSections, sectionOrder, theme, isPreview = false }, ref) => {
    const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;

    // --- DYNAMIC THEME ---
    const accentColor = theme?.accentColor || '#000000';
    const font = theme?.fontFamily || '"Times New Roman", Times, serif';
    // ---------------------

    // PREVIEW MODE SCALING
    const previewScale = isPreview ? 0.8 : 1;
    
    const getFontSize = (baseSize) => {
      return isPreview ? `${baseSize * previewScale}rem` : `${baseSize}rem`;
    };

    const getSpacing = (baseSpacing) => {
      return isPreview ? baseSpacing * 0.5 : baseSpacing;
    };

    const formatDate = (date, format) => {
      if (!date) return 'Present';
      const d = dayjs(date);
      return d.isValid() ? d.format(format) : date;
    };

    const sectionTitleStyle = {
      fontFamily: font,
      fontWeight: 700,
      fontSize: getFontSize(1),
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: accentColor,
      borderBottom: `1px solid ${accentColor}`,
      paddingBottom: '2px',
      marginBottom: getSpacing(6),
      marginTop: getSpacing(14),
    };

    // Show only limited content in preview mode
    const getLimitedExperience = () => {
      if (isPreview && experience.length > 0) {
        return [experience[0]]; // Only first experience in preview
      }
      return experience;
    };

    const getLimitedEducation = () => {
      if (isPreview && education.length > 0) {
        return [education[0]]; // Only first education in preview
      }
      return education;
    };

    const renderSection = (sectionId) => {
      switch (sectionId) {
        case 'summary':
          return (
            visibleSections.summary &&
            summary && (
              <Box key="summary" sx={{ mb: getSpacing(1) }}>
                <Typography sx={sectionTitleStyle}>Summary</Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    ...wrapTextStyle, 
                    fontSize: getFontSize(0.95) 
                  }}
                >
                  {isPreview ? `${summary.substring(0, 60)}...` : summary}
                </Typography>
              </Box>
            )
          );

        case 'skills':
          return (
            visibleSections.skills &&
            skills.length > 0 && (
              <Box key="skills" sx={{ mb: getSpacing(1) }}>
                <Typography sx={sectionTitleStyle}>Skills</Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    ...wrapTextStyle, 
                    fontSize: getFontSize(0.95) 
                  }}
                >
                  {isPreview ? skills.slice(0, 4).join(' • ') : skills.join(' • ')}
                </Typography>
              </Box>
            )
          );

        case 'experience':
          const limitedExp = getLimitedExperience();
          return (
            visibleSections.experience &&
            limitedExp[0]?.title && (
              <Box key="experience" sx={{ mb: getSpacing(1) }}>
                <Typography sx={sectionTitleStyle}>Professional Experience</Typography>
                {limitedExp.map((exp) => (
                  <Box
                    key={exp.id}
                    sx={{ mb: getSpacing(1.2), '&:last-child': { mb: 0 } }}
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
                          fontSize: getFontSize(0.98),
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
                          fontSize: getFontSize(0.98),
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
                        fontSize: getFontSize(0.85),
                        color: '#444',
                      }}
                    >
                      {formatDate(exp.startDate, 'MMM YYYY')} –{' '}
                      {exp.isPresent ? 'Present' : formatDate(exp.endDate, 'MMM YYYY')}
                    </Typography>

                    {exp.location && (
                      <Typography
                        variant="body2"
                        sx={{ 
                          fontSize: getFontSize(0.85), 
                          color: '#444', 
                          mb: getSpacing(0.3) 
                        }}
                      >
                        {exp.location}
                      </Typography>
                    )}

                    <Typography
                      variant="body2"
                      sx={{ 
                        ...wrapTextStyle, 
                        fontSize: getFontSize(0.95) 
                      }}
                    >
                      {isPreview ? `${exp.description.substring(0, 40)}...` : exp.description}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )
          );

        case 'projects':
          return (
            visibleSections.projects &&
            projects[0]?.title && !isPreview && ( // Don't show projects in preview
              <Box key="projects" sx={{ mb: getSpacing(1) }}>
                <Typography sx={sectionTitleStyle}>Projects</Typography>
                {projects.map((proj) => (
                  <Box
                    key={proj.id}
                    sx={{ mb: getSpacing(1.1), '&:last-child': { mb: 0 } }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        fontFamily: font,
                        fontSize: getFontSize(0.98),
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
                      sx={{ 
                        ...wrapTextStyle, 
                        fontSize: getFontSize(0.95) 
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
          const limitedEdu = getLimitedEducation();
          return (
            visibleSections.education &&
            limitedEdu[0]?.degree && (
              <Box key="education" sx={{ mb: getSpacing(1) }}>
                <Typography sx={sectionTitleStyle}>Education</Typography>
                {limitedEdu.map((edu) => (
                  <Box
                    key={edu.id}
                    sx={{ mb: getSpacing(1), '&:last-child': { mb: 0 } }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        fontFamily: font,
                        fontSize: getFontSize(0.98),
                        ...wrapTextStyle,
                      }}
                    >
                      {edu.degree || 'Degree'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: getFontSize(0.95) }}
                    >
                      {edu.school || 'Institution'}
                      {edu.city ? `, ${edu.city}` : ''}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: 'italic',
                        fontSize: getFontSize(0.85),
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
            hobbies && !isPreview && ( // Don't show hobbies in preview
              <Box key="hobbies">
                <Typography sx={sectionTitleStyle}>Interests</Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    ...wrapTextStyle, 
                    fontSize: getFontSize(0.95) 
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
          p: isPreview ? 1.5 : { xs: 2, sm: 3, md: 4 },
          fontFamily: font,
          color: '#000',
          minHeight: '100%',
          border: '1px solid #000',
          transform: isPreview ? 'scale(0.9)' : 'none',
          transformOrigin: 'top left',
        }}
      >
        {/* ===== CLASSIC HEADER ===== */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: getSpacing(2.5) 
        }}>
          {personalInfo.photo && !isPreview && (
            <Avatar
              src={personalInfo.photo}
              sx={{
                width: isPreview ? 60 : 90,
                height: isPreview ? 60 : 90,
                mx: 'auto',
                mb: getSpacing(1.5),
                border: `1px solid ${accentColor}`,
              }}
            />
          )}

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontFamily: font,
              fontSize: getFontSize(1.9),
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
              sx={{ 
                ...wrapTextStyle, 
                fontSize: getFontSize(0.95), 
                mt: getSpacing(0.5) 
              }}
            >
              {isPreview ? `${personalInfo.address.substring(0, 20)}...` : personalInfo.address}
            </Typography>
          )}

          <Typography
            variant="body2"
            sx={{ 
              fontSize: getFontSize(0.9), 
              mt: getSpacing(0.5) 
            }}
          >
            {personalInfo.phone && `${personalInfo.phone}`}
            {personalInfo.phone && personalInfo.email && ' • '}
            {isPreview ? `${personalInfo.email?.substring(0, 15)}...` : personalInfo.email}
          </Typography>

          {(personalInfo.linkedin || personalInfo.portfolio) && !isPreview && (
            <Typography
              variant="body2"
              sx={{ 
                fontSize: getFontSize(0.9), 
                mt: getSpacing(0.2) 
              }}
            >
              {personalInfo.linkedin && `LinkedIn: ${personalInfo.linkedin}`}
              {personalInfo.linkedin && personalInfo.portfolio && ' • '}
              {personalInfo.portfolio && `Portfolio: ${personalInfo.portfolio}`}
            </Typography>
          )}
        </Box>

        <Divider sx={{ 
          mb: getSpacing(1.5), 
          borderColor: accentColor 
        }} />

        {/* ===== SECTIONS ===== */}
        {sectionOrder.map((sectionId) => renderSection(sectionId))}
      </Paper>
    );
  }
);

export default TemplateClassic;