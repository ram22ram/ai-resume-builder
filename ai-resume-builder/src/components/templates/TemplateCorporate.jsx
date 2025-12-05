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

const TemplateCorporate = forwardRef(({ 
  data, 
  visibleSections, 
  sectionOrder, 
  theme, 
  isPreview = false 
}, ref) => {
  const { personalInfo, summary, experience, education, projects, skills, hobbies } = data;

  // --- DYNAMIC THEME ---
  const accentColor = theme?.accentColor || '#1A237E';
  const font = theme?.fontFamily || '"Helvetica Neue", Helvetica, Arial, sans-serif';
  // ---------------------

  // PREVIEW SCALING
  const previewScale = isPreview ? 0.7 : 1;
  
  const getFontSize = (baseSize) => {
    return isPreview ? `${baseSize * previewScale}rem` : `${baseSize}rem`;
  };

  const getSpacing = (baseSpacing) => {
    return isPreview ? baseSpacing * 0.4 : baseSpacing;
  };

  const Section = ({ title, children }) => (
    <Box sx={{ mb: getSpacing(2.5) }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: 700,
          fontSize: getFontSize(0.85),
          color: accentColor,
          textTransform: 'uppercase',
          letterSpacing: 1,
          mb: getSpacing(1),
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );

  const MainSection = ({ title, children }) => (
    <Box sx={{ mb: getSpacing(3) }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: getFontSize(1),
          color: accentColor,
          borderBottom: `2px solid ${accentColor}33`,
          pb: getSpacing(0.5),
          mb: getSpacing(1.5),
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: getSpacing(0.7) }}>
        <Icon size={isPreview ? 10 : 14} color={accentColor} />
        <Typography
          variant="body2"
          sx={{
            fontSize: getFontSize(0.85),
            ...wrapTextStyle,
            color: link ? accentColor : '#333',
          }}
        >
          {isPreview && text.length > 15 ? `${text.substring(0, 12)}...` : text}
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

  const renderSection = (sectionId, variant = 'main') => {
    switch (sectionId) {
      case 'summary':
        return (
          visibleSections.summary &&
          summary &&
          (variant === 'main') && !isPreview && ( // No summary in preview
            <MainSection title="Summary" key="summary">
              <Typography
                variant="body2"
                sx={{ 
                  fontSize: getFontSize(0.95), 
                  ...wrapTextStyle 
                }}
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
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: getSpacing(0.8) 
              }}>
                {skills.slice(0, isPreview ? 4 : skills.length).map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    sx={{
                      bgcolor: `${accentColor}10`,
                      color: accentColor,
                      fontWeight: 600,
                      borderRadius: '999px',
                      fontSize: getFontSize(0.75),
                      height: isPreview ? 20 : 'auto',
                    }}
                  />
                ))}
              </Box>
            </Section>
          )
        );

      case 'experience':
        const limitedExp = getLimitedExperience();
        return (
          visibleSections.experience &&
          limitedExp[0]?.title &&
          (variant === 'main') && (
            <MainSection title="Experience" key="experience">
              {limitedExp.map((exp) => (
                <Box key={exp.id} sx={{ mb: getSpacing(2) }}>
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
                      sx={{ 
                        fontWeight: 700, 
                        fontSize: getFontSize(0.98) 
                      }}
                    >
                      {exp.title || 'Job Title'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: 'italic',
                        color: '#555',
                        fontSize: getFontSize(0.8),
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
                      fontSize: getFontSize(0.9),
                      mb: getSpacing(0.3),
                    }}
                  >
                    {exp.company || 'Company'}
                    {exp.location && ` • ${exp.location}`}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ 
                      fontSize: getFontSize(0.9), 
                      ...wrapTextStyle 
                    }}
                  >
                    {isPreview ? `${exp.description?.substring(0, 40)}...` : exp.description}
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
          (variant === 'main') && !isPreview && ( // No projects in preview
            <MainSection title="Projects" key="projects">
              {projects.map((proj) => (
                <Box key={proj.id} sx={{ mb: getSpacing(2) }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: getFontSize(0.95) 
                    }}
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
                      fontSize: getFontSize(0.9),
                      ...wrapTextStyle,
                      mt: getSpacing(0.5),
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
        const limitedEdu = getLimitedEducation();
        return (
          visibleSections.education &&
          limitedEdu[0]?.degree &&
          (variant === 'main') && (
            <MainSection title="Education" key="education">
              {limitedEdu.map((edu) => (
                <Box key={edu.id} sx={{ mb: getSpacing(1.5) }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ 
                      fontWeight: 700, 
                      fontSize: getFontSize(0.95) 
                    }}
                  >
                    {edu.degree || 'Degree'}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: getFontSize(0.9) }}
                  >
                    {edu.school || 'Institution'}
                    {edu.city && ` • ${edu.city}`}
                  </Typography>
                  {edu.year && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: getFontSize(0.8),
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
          (variant === 'sidebar') && !isPreview && ( // No hobbies in preview
            <Section title="Interests" key="hobbies">
              <Typography
                variant="body2"
                sx={{ 
                  fontSize: getFontSize(0.9), 
                  ...wrapTextStyle 
                }}
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
        p: isPreview ? 1 : { xs: 2, sm: 3, md: 4 },
        fontFamily: font,
        minHeight: '100%',
        bgcolor: '#f5f6fa',
        borderRadius: 2,
        transform: isPreview ? 'scale(0.85)' : 'none',
        transformOrigin: 'top left',
      }}
    >
      {/* ===== HEADER ===== */}
      <Box
        sx={{
          mb: getSpacing(3),
          pb: getSpacing(2),
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
              fontSize: isPreview ? '1.2rem' : { xs: '1.8rem', sm: '2.1rem' },
              color: accentColor,
              mb: getSpacing(1),
              ...wrapTextStyle,
            }}
          >
            {isPreview 
              ? personalInfo.fullName?.toUpperCase().substring(0, 15) || 'YOUR NAME'
              : personalInfo.fullName?.toUpperCase() || 'YOUR NAME'
            }
          </Typography>

          <Grid container spacing={getSpacing(0.7)}>
            <Grid item xs={12} sm={6}>
              <ContactItem icon={Mail} text={personalInfo.email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ContactItem icon={Phone} text={personalInfo.phone} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ContactItem icon={MapPin} text={personalInfo.address} />
            </Grid>
            {!isPreview && (
              <>
                <Grid item xs={12} sm={6}>
                  <ContactItem icon={Linkedin} text={personalInfo.linkedin} link />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ContactItem icon={Globe} text={personalInfo.portfolio} link />
                </Grid>
              </>
            )}
          </Grid>
        </Box>

        {personalInfo.photo && !isPreview && (
          <Avatar
            src={personalInfo.photo}
            variant="rounded"
            sx={{
              width: isPreview ? 60 : 110,
              height: isPreview ? 60 : 110,
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
          flexDirection: { xs: 'column', md: isPreview ? 'column' : 'row' },
          gap: getSpacing(3),
        }}
      >
        {/* SIDEBAR - Only skills in preview */}
        {(!isPreview || (isPreview && sidebarOrder.includes('skills'))) && (
          <Box
            sx={{
              width: isPreview ? '100%' : { xs: '100%', md: '30%' },
              bgcolor: '#ffffff',
              borderRadius: 2,
              p: isPreview ? 1 : 2,
              border: `1px solid ${accentColor}15`,
            }}
          >
            {sidebarOrder.map((id) => renderSection(id, 'sidebar'))}
          </Box>
        )}

        {/* MAIN CONTENT */}
        <Box
          sx={{
            width: isPreview ? '100%' : { xs: '100%', md: '70%' },
          }}
        >
          {mainOrder.map((id) => renderSection(id, 'main'))}
        </Box>
      </Box>
    </Paper>
  );
});

export default TemplateCorporate;