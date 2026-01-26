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

const TemplateFred = forwardRef(({ data, theme, isPreview = false }: any, ref: any) => {
  const sections = (data?.sections || []).filter(
  (s: any) => s.isVisible !== false
);

  const personal = getSection(sections, 'personal') || {};
  const summary = getSection(sections, 'summary');
  const experience = getSection(sections, 'experience') || [];
  const skills = getSection(sections, 'skills') || [];

  const {
    accentColor = '#333333',
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
  elevation={isPreview ? 0 : 1}
  sx={{
    p: space(4),
    fontFamily: font,
    color: textColor,
    backgroundColor: 'transparent', // 🔥
  }}
>

      <Box textAlign="center" mb={space(4)}>
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
        <Typography variant="h3" fontWeight={800} color={accentColor}>
          {personal.fullName
  ? personal.fullName.replace(/\b\w/g, c => c.toUpperCase())
  : 'Your Name'}
        </Typography>
        <Typography variant="body2">
          {personal.email} • {personal.phone}
        </Typography>
      </Box>

      {summary && (
        <Box mb={space(3)}>
          <Typography variant="h6" color={accentColor}>
            Profile
          </Typography>
          <Typography variant="body2">{summary}</Typography>
        </Box>
      )}

      {experience.length > 0 && (
        <Box mb={space(3)}>
          <Typography variant="h6" color={accentColor}>
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

      {skills.length > 0 && (
        <Box>
          <Typography variant="h6" color={accentColor}>
            Skills
          </Typography>
          {skills.map((s: string) => (
            <Typography key={s} variant="body2">• {s}</Typography>
          ))}
        </Box>
      )}
    </Paper>
  );
});

export default TemplateFred;
