import React from 'react';
import { Box, Typography, Divider, Grid, Stack, Avatar } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

const getFontFamily = (font: string) => {
  switch (font) {
    case 'inter': return '"Inter", sans-serif';
    case 'roboto': return '"Roboto", sans-serif';
    case 'poppins': return '"Poppins", sans-serif';
    case 'montserrat': return '"Montserrat", sans-serif';
    default: return '"Inter", sans-serif';
  }
};

const getSection = (sections: any[], type: string) =>
  sections.find(s => s.type === type)?.content;

const TemplateModern = ({ data, theme, isPreview = false }: any) => {
  const sections = (data?.sections || []).filter(
  (s: any) => s.isVisible !== false
);

  const personal = getSection(sections, 'personal') || {};
  const summary = getSection(sections, 'summary');
  const experience = getSection(sections, 'experience') || [];
  const education = getSection(sections, 'education') || [];
  const skills = getSection(sections, 'skills') || [];
  const projects = getSection(sections, 'projects') || [];

  const {
    accentColor = '#2563eb',
    textColor = '#111827',
    fontFamily = 'inter',
    density = 'comfortable',
    photoMode = 'visible'
  } = theme || {};

  const font = getFontFamily(fontFamily);
  const space = (v: number) =>
    density === 'compact' ? v * 0.85 : density === 'spacious' ? v * 1.25 : v;

  const showPhoto = personal.photo && photoMode !== 'hidden';

  return (
    <Box
      sx={{
        p: space(4),
        fontFamily: font,
        color: textColor,
        backgroundColor: 'transparent',
        '& .MuiTypography-root': { fontFamily: font, color: textColor,  },
      }}
    >
      {/* HEADER */}
      <Box mb={space(4)}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={showPhoto ? 9 : 12}>
            <Typography variant="h3" fontWeight={800} color={accentColor}>
              {personal.fullName || 'Your Name'}
            </Typography>
            {personal.jobTitle && (
              <Typography variant="h6" color="text.secondary">
                {personal.jobTitle}
              </Typography>
            )}

            <Stack direction="row" spacing={2} mt={1} flexWrap="wrap">
              {personal.email && <Mail size={14} />}
              {personal.phone && <Phone size={14} />}
              {personal.address && <MapPin size={14} />}
              {personal.linkedin && <Linkedin size={14} />}
              {personal.portfolio && <Globe size={14} />}
            </Stack>
          </Grid>

          {showPhoto && (
            <Grid item xs={3}>
              <Avatar
  src={personal.photo}
  sx={{
    width: 90,
    height: 90,
    border: `2px solid ${accentColor}`,
    borderRadius:
      photoMode === 'square'
        ? '8px'
        : '50%',
  }}
/>
            </Grid>
          )}
        </Grid>

        <Divider sx={{ mt: space(2), borderColor: accentColor }} />
      </Box>

      {/* SUMMARY */}
      {summary && (
        <Box mb={space(4)}>
          <Typography variant="h6" fontWeight={700} color={accentColor}>
            Professional Summary
          </Typography>
          <Typography variant="body2">{summary}</Typography>
        </Box>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <Box mb={space(4)}>
          <Typography variant="h6" fontWeight={700} color={accentColor}>
            Experience
          </Typography>
         {(isPreview ? experience.slice(0, 1) : experience).map((e: any) => (
  <Box key={e.id} mb={space(2)}>
    <Typography fontWeight={700}>{e.title}</Typography>
    <Typography variant="caption">{e.company}</Typography>

    {!isPreview && (
      <Typography variant="body2">{e.description}</Typography>
    )}
  </Box>
))}
        </Box>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && !isPreview && (
        <Box mb={space(4)}>
          <Typography variant="h6" fontWeight={700} color={accentColor}>
            Projects
          </Typography>
          {projects.map((p: any) => (
            <Box key={p.id} mb={space(2)}>
              <Typography fontWeight={700}>{p.title}</Typography>
              <Typography variant="body2">{p.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <Box mb={space(4)}>
          <Typography variant="h6" fontWeight={700} color={accentColor}>
            Education
          </Typography>
          {education.map((e: any) => (
            <Typography key={e.id} variant="body2">
              {e.degree} – {e.school}
            </Typography>
          ))}
        </Box>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <Box>
          <Typography variant="h6" fontWeight={700} color={accentColor}>
            Skills
          </Typography>
          <Typography variant="body2">{skills.join(' • ')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default TemplateModern;
