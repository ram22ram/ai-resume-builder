import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Grid, Avatar, Divider } from '@mui/material';

const getFontFamily = (font: string) => {
  switch (font) {
    case 'inter': return '"Inter", sans-serif';
    case 'roboto': return '"Roboto", sans-serif';
    case 'opensans': return '"Open Sans", sans-serif';
    case 'lato': return '"Lato", sans-serif';
    case 'montserrat': return '"Montserrat", sans-serif';
    case 'poppins': return '"Poppins", sans-serif';
    default: return '"Inter", sans-serif';
  }
};

const getSection = (sections: any[], type: string) =>
  sections.find(s => s.type === type)?.content;

const TemplateHarvey = forwardRef(({ data, theme, isPreview = false }: any, ref: any) => {
  const sections = (data?.sections || []).filter(
  (s: any) => s.isVisible !== false
);

  const personal = getSection(sections, 'personal') || {};
  const summary = getSection(sections, 'summary');
  const experience = getSection(sections, 'experience') || [];
  const education = getSection(sections, 'education') || [];
  const skills = getSection(sections, 'skills') || [];

  const {
    accentColor = '#0f172a',
    fontFamily = 'inter',
    textColor = '#111827',
    density = 'comfortable',
    photoMode = 'visible'
  } = theme || {};

  const font = getFontFamily(fontFamily);
  const space = (v: number) =>
    density === 'compact' ? v * 0.85 : density === 'spacious' ? v * 1.25 : v;

  const showPhoto = personal.photo && photoMode !== 'hidden';

  return (
<Paper
  ref={ref}
  elevation={isPreview ? 0 : 1}
  sx={{
    p: space(4),
    fontFamily: font,
    color: textColor,
    backgroundColor: isPreview ? 'transparent' : 'background.paper',
  }}
>


      {/* HEADER */}
      <Box mb={space(4)}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={showPhoto ? 9 : 12}>
            <Typography variant="h3" fontWeight={800} color={accentColor}>
              {personal.fullName || 'Your Name'}
            </Typography>
            <Typography variant="body2">
              {personal.email} • {personal.phone}
            </Typography>
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
        <Divider sx={{ mt: space(2) }} />
      </Box>

      {/* SUMMARY */}
      {summary && (
        <Box mb={space(3)}>
          <Typography variant="h6" color={accentColor} fontWeight={700}>
            Professional Summary
          </Typography>
          <Typography variant="body2">{summary}</Typography>
        </Box>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <Box mb={space(3)}>
          <Typography variant="h6" color={accentColor} fontWeight={700}>
            Experience
          </Typography>
          {experience.map((e: any) => (
            <Box key={e.id} mb={space(2)}>
              <Typography fontWeight={700}>{e.title}</Typography>
              <Typography variant="caption">{e.company}</Typography>
              <Typography variant="body2">{e.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <Box mb={space(3)}>
          <Typography variant="h6" color={accentColor} fontWeight={700}>
            Education
          </Typography>
          {education.map((e: any) => (
            <Box key={e.id}>
              <Typography fontWeight={600}>{e.degree}</Typography>
              <Typography variant="body2">{e.school}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <Box>
          <Typography variant="h6" color={accentColor} fontWeight={700}>
            Skills
          </Typography>
          <Typography variant="body2">{skills.join(' • ')}</Typography>
        </Box>
      )}
    </Paper>
  );
});

export default TemplateHarvey;
