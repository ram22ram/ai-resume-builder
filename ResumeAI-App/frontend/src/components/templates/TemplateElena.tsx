import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';

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

const TemplateElena = forwardRef(({ data, theme, isPreview = false }: any, ref: any) => {
  const sections = (data?.sections || []).filter(
  (s: any) => s.isVisible !== false
);

  const personal = getSection(sections, 'personal') || {};
  const summary = getSection(sections, 'summary');
  const experience = getSection(sections, 'experience') || [];
  const education = getSection(sections, 'education') || [];
  const skills = getSection(sections, 'skills') || [];

  const {
    accentColor = '#2563eb',
    fontFamily = 'inter',
    textColor = '#111827',
    density = 'comfortable',
    photoMode = 'visible'
  } = theme || {};

  const font = getFontFamily(fontFamily);
  const space = (v: number) =>
    density === 'compact' ? v * 0.8 : density === 'spacious' ? v * 1.2 : v;

  const showPhoto = personal.photo && photoMode !== 'hidden';

  return (
        <Paper
        ref={ref}
        elevation={isPreview ? 0 : 3}
        sx={{
          p: space(4),
          fontFamily: font,
          color: textColor,
          backgroundColor: isPreview ? 'transparent' : 'background.paper',
        }}
      >

      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" mb={space(4)}>
        <Box>
          <Typography variant="h3" color={accentColor}>
            {personal.fullName
  ? personal.fullName.replace(/\b\w/g, c => c.toUpperCase())
  : 'Your Name'}
          </Typography>
          <Typography variant="body2">
            {personal.email} • {personal.phone}
          </Typography>
        </Box>

        {showPhoto && (
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
        )}
      </Box>

      {summary && (
        <Box mb={space(3)}>
          <Typography variant="h6" color={accentColor}>Summary</Typography>
          <Typography variant="body2">{summary}</Typography>
        </Box>
      )}

      {experience.length > 0 && (
        <Box mb={space(3)}>
          <Typography variant="h6" color={accentColor}>Experience</Typography>
          {experience.map((e: any) => (
            <Box key={e.id} mb={space(2)}>
              <Typography fontWeight={600}>{e.title}</Typography>
              <Typography variant="caption">{e.company}</Typography>
              <Typography variant="body2">{e.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {skills.length > 0 && (
        <Box mb={space(3)}>
          <Typography variant="h6" color={accentColor}>Skills</Typography>
          <Typography variant="body2">{skills.join(', ')}</Typography>
        </Box>
      )}

      {education.length > 0 && (
        <Box>
          <Typography variant="h6" color={accentColor}>Education</Typography>
          {education.map((e: any) => (
            <Typography key={e.id} variant="body2">
              {e.degree} – {e.school}
            </Typography>
          ))}
        </Box>
      )}
    </Paper>
  );
});

export default TemplateElena;
