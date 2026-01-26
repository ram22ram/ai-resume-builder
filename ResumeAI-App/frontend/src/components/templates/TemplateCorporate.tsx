import React, { forwardRef } from 'react';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';
import dayjs from 'dayjs';

const getFontFamily = (fontName: string) => {
  switch (fontName) {
    case 'inter': return '"Inter", sans-serif';
    case 'roboto': return '"Roboto", sans-serif';
    case 'opensans': return '"Open Sans", sans-serif';
    case 'lato': return '"Lato", sans-serif';
    case 'montserrat': return '"Montserrat", sans-serif';
    case 'poppins': return '"Poppins", sans-serif';
    default: return '"Helvetica Neue", Arial, sans-serif';
  }
};

const getSection = (sections: any[], type: string) =>
  sections.find(s => s.type === type);

const TemplateCorporate = forwardRef(({ data, theme, isPreview = false }: any, ref: any) => {
  const sections = (data?.sections || []).filter(
  (s: any) => s.isVisible !== false
);

  const personal = getSection(sections, 'personal')?.content || {};
  const summary = getSection(sections, 'summary')?.content;
  const experience = getSection(sections, 'experience')?.content || [];
  const education = getSection(sections, 'education')?.content || [];
  const skills = getSection(sections, 'skills')?.content || [];

  const {
    accentColor = '#1A237E',
    fontFamily = 'inter',
    textColor = '#111827',
    density = 'comfortable',
    photoMode = 'visible'
  } = theme || {};

  const font = getFontFamily(fontFamily);
  const densityMul = density === 'compact' ? 0.85 : density === 'spacious' ? 1.2 : 1;
  const space = (v: number) => v * densityMul;

  const showPhoto = personal.photo && photoMode !== 'hidden';

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{
        p: isPreview ? 2 : 4,
        fontFamily: font,
        bgcolor: '#f5f6fa',color: textColor,
        minHeight: '100%',
        '& .MuiTypography-root': { fontFamily: font,color: textColor, },
      }}
    >
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={space(3)}>
        <Box>
          <Typography variant="h3" fontWeight={800} color={accentColor}>
            {personal.fullName || 'Your Name'}
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

      {/* SUMMARY */}
      {summary && (
        <Box mb={space(3)}>
          <Typography variant="h6" color={accentColor} fontWeight={700}>
            Summary
          </Typography>
          <Typography variant="body2">{summary}</Typography>
        </Box>
      )}

      <Grid container spacing={space(3)}>
        {/* LEFT */}
        <Grid item xs={12} md={8}>
          {/* EXPERIENCE */}
          {experience.length > 0 && (
            <Box mb={space(3)}>
              <Typography variant="h6" color={accentColor} fontWeight={700}>
                Experience
              </Typography>
              {experience.map((e: any) => (
                <Box key={e.id} mb={space(2)}>
                  <Typography fontWeight={600}>{e.title}</Typography>
                  <Typography variant="caption">
                    {e.company} | {dayjs(e.startDate).format('MMM YYYY')} – {e.isPresent ? 'Present' : dayjs(e.endDate).format('MMM YYYY')}
                  </Typography>
                  <Typography variant="body2">{e.description}</Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* EDUCATION */}
          {education.length > 0 && (
            <Box>
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
        </Grid>

        {/* RIGHT */}
        <Grid item xs={12} md={4}>
          {/* SKILLS */}
          {skills.length > 0 && (
            <Box>
              <Typography variant="h6" color={accentColor} fontWeight={700}>
                Skills
              </Typography>
              {skills.map((s: string) => (
                <Typography key={s} variant="body2">• {s}</Typography>
              ))}
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
});

export default TemplateCorporate;
