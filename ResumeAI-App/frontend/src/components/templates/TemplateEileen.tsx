import { forwardRef } from 'react';
import { Box, Typography, Paper } from '@mui/material';

const getFontFamily = (font: string) => {
  switch (font) {
    case 'inter': return '"Inter", sans-serif';
    case 'roboto': return '"Roboto", sans-serif';
    case 'opensans': return '"Open Sans", sans-serif';
    case 'lato': return '"Lato", sans-serif';
    case 'montserrat': return '"Montserrat", sans-serif';
    case 'poppins': return '"Poppins", sans-serif';
    default: return '"Roboto", sans-serif';
  }
};

const getSection = (sections: any[], type: string) =>
  sections.find(s => s.type === type)?.content;

const TemplateEileen = forwardRef(({ data, theme }: any, ref: any) => {
  const sections = (data?.sections || []).filter(
    (s: any) => s.isVisible !== false
  );

  const personal = getSection(sections, 'personal') || {};
  const summary = getSection(sections, 'summary');
  const experience = getSection(sections, 'experience') || [];
  const skills = getSection(sections, 'skills') || [];
  const education = getSection(sections, 'education') || [];

  const {
    accentColor = '#374151',
    fontFamily = 'roboto',
    textColor = '#111827',
    density = 'comfortable'
  } = theme || {};

  const font = getFontFamily(fontFamily);
  const space = (v: number) =>
    density === 'compact' ? v * 0.8 : density === 'spacious' ? v * 1.2 : v;

  return (
    <Paper
      ref={ref}
      elevation={2}
      sx={{
        display: 'flex',
        width: '100%',
        fontFamily: font,
        color: textColor,
      }}
    >
      {/* LEFT BAR */}
      <Box width="30%" bgcolor={accentColor} color="white" p={space(3)}>
        <Typography variant="h5" fontWeight={700} mb={space(3)}>
          {personal.fullName || 'Your Name'}
        </Typography>

        {[personal.email, personal.phone, personal.address]
          .filter(Boolean)
          .map((v: string, i: number) => (
            <Typography key={i} variant="body2">{v}</Typography>
          ))}

        {skills.length > 0 && (
          <Box mt={space(4)}>
            <Typography fontWeight={700}>SKILLS</Typography>
            {skills.map((s: string) => (
              <Typography key={s} variant="body2">• {s}</Typography>
            ))}
          </Box>
        )}
      </Box>

      {/* RIGHT CONTENT */}
      <Box width="70%" p={space(4)}>
        {summary && (
          <Box mb={space(3)}>
            <Typography variant="h6" color={accentColor} fontWeight={700}>
              Summary
            </Typography>
            <Typography variant="body2">{summary}</Typography>
          </Box>
        )}

        {experience.length > 0 && (
          <Box mb={space(3)}>
            <Typography variant="h6" color={accentColor} fontWeight={700}>
              Experience
            </Typography>
            {experience.map((e: any) => (
              <Box key={e.id} mb={space(2)}>
                <Typography fontWeight={600}>{e.title}</Typography>
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
            <Typography variant="h6" color={accentColor} fontWeight={700}>
              Education
            </Typography>
            {education.map((e: any) => (
              <Typography key={e.id} variant="body2">
                {e.degree} – {e.school}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Paper>
  );
});

export default TemplateEileen;
