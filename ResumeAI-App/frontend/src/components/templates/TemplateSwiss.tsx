import { forwardRef } from 'react';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';

type Section = {
  type: string;
  content: any;
  isVisible?: boolean;
};

const getSection = (sections: Section[], type: string) =>
  sections.find((s: Section) => s.type === type)?.content;

const TemplateSwiss = forwardRef(({ data, theme }: any, ref: any) => {
  const sections: Section[] = (data?.sections || []).filter(
    (s: Section) => s.isVisible !== false
  );

  const personal = getSection(sections, 'personal') || {};
  const summary = getSection(sections, 'summary');
  const experience = getSection(sections, 'experience') || [];
  const education = getSection(sections, 'education') || [];
  const skills = getSection(sections, 'skills') || [];

  const {
    accentColor = '#111827',
    textColor = '#111827',
    density = 'comfortable',
    photoMode = 'visible',
  } = theme || {};

  const space = (v: number) =>
    density === 'compact' ? v * 0.85 : density === 'spacious' ? v * 1.3 : v;

  const showPhoto = Boolean(personal.photo && photoMode !== 'hidden');

  return (
    <Paper
      ref={ref}
      elevation={1}
      sx={{ color: textColor, backgroundColor: '#ffffff' }}
    >
      {/* TOP BAR */}
      <Box sx={{ bgcolor: accentColor, color: 'white', p: space(4) }}>
        <Grid container spacing={3} alignItems="center">
          <Grid size={{ xs: showPhoto ? 9 : 12 }}>
            <Typography variant="h3" fontWeight={800}>
              {personal.fullName || 'Your Name'}
            </Typography>
            <Typography variant="body2">
              {[personal.email, personal.phone].filter(Boolean).join(' • ')}
            </Typography>
          </Grid>

          {showPhoto && (
            <Grid size={{ xs: 3 }}>
              <Avatar
                src={personal.photo}
                sx={{ width: 90, height: 90 }}
              />
            </Grid>
          )}
        </Grid>
      </Box>

      {/* BODY */}
      <Box p={space(4)}>
        {summary && (
          <Box mb={space(4)}>
            <Typography variant="subtitle2" fontWeight={700}>
              PROFILE
            </Typography>
            <Typography variant="body2">{summary}</Typography>
          </Box>
        )}

        {experience.length > 0 && (
          <Box mb={space(4)}>
            <Typography variant="subtitle2" fontWeight={700}>
              EXPERIENCE
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
          <Box mb={space(4)}>
            <Typography variant="subtitle2" fontWeight={700}>
              EDUCATION
            </Typography>
            {education.map((e: any) => (
              <Typography key={e.id} variant="body2">
                {e.degree} – {e.school}
              </Typography>
            ))}
          </Box>
        )}

        {skills.length > 0 && (
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>
              SKILLS
            </Typography>
            <Typography variant="body2">
              {skills.join(' • ')}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
});

export default TemplateSwiss;
