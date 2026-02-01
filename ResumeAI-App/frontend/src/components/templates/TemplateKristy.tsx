import { forwardRef } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';

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

const TemplateKristy = forwardRef(({ data, theme }: any, ref: any) => {
  const sections = (data?.sections || []).filter((s: { isVisible: boolean; }) => s.isVisible !== false);

  const personal = getSection(sections, 'personal') || {};
  const summary = getSection(sections, 'summary');
  const experience = getSection(sections, 'experience') || [];
  const skills = getSection(sections, 'skills') || [];
  const education = getSection(sections, 'education') || [];

  const {
    accentColor = '#7c3aed',
    fontFamily = 'poppins',
    textColor = '#111827',
    density = 'comfortable',
  } = theme || {};

  const font = getFontFamily(fontFamily);
  const space = (v: number) =>
    density === 'compact' ? v * 0.8 : density === 'spacious' ? v * 1.25 : v;

  return (
    <Paper
      ref={ref}
      elevation={2}
      sx={{
        p: space(4),
        fontFamily: font,
        color: textColor,
        backgroundColor: '#ffffff',
      }}
    >
      {/* HEADER */}
      <Box mb={space(4)} textAlign="center">
        <Typography variant="h3" fontWeight={800} color={accentColor}>
          {personal.fullName || 'Your Name'}
        </Typography>
        <Typography variant="body2">
          {[personal.email, personal.phone].filter(Boolean).join(' • ')}
        </Typography>
      </Box>

      <Grid container spacing={space(4)}>
        <Grid size={{ md:8, xs: 12 }}>
          {summary && (
            <Box mb={space(3)}>
              <Typography variant="h6" fontWeight={700} color={accentColor}>
                About Me
              </Typography>
              <Typography variant="body2">{summary}</Typography>
            </Box>
          )}

          {experience.length > 0 && (
            <Box mb={space(3)}>
              <Typography variant="h6" fontWeight={700} color={accentColor}>
                Experience
              </Typography>
              {experience.map((e: any) => (
                <Box key={e.id} mb={space(2)}>
                  <Typography fontWeight={700}>{e.title}</Typography>
                  <Typography variant="caption">{e.company}</Typography>
                  {e.description && (
                    <Typography variant="body2">{e.description}</Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {education.length > 0 && (
            <Box>
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
        </Grid>

        <Grid size={{ md:4, xs: 12 }}>
          {skills.length > 0 && (
            <Box>
              <Typography variant="h6" fontWeight={700} color={accentColor}>
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

export default TemplateKristy;
