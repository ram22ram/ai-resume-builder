import { Box, Typography, Divider, Grid, Stack, Avatar } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

type Section = {
  type: string;
  content: any;
  isVisible?: boolean;
};

const getSection = (sections: Section[], type: string) =>
  sections.find((s: Section) => s.type === type)?.content;

const TemplateModern = ({ data, theme }: any) => {
  const sections: Section[] = (data?.sections || []).filter(
    (s: Section) => s.isVisible !== false
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
    density = 'comfortable',
    photoMode = 'visible',
  } = theme || {};

  const space = (v: number) =>
    density === 'compact' ? v * 0.85 : density === 'spacious' ? v * 1.25 : v;

  const showPhoto = Boolean(personal.photo && photoMode !== 'hidden');

  return (
    <Box
      sx={{
        p: space(4),
        color: textColor,
        backgroundColor: '#ffffff',
      }}
    >
      {/* HEADER */}
      <Box mb={space(4)}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: showPhoto ? 9 : 12 }}>
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
            <Grid size={{ xs: 3 }}>
              <Avatar
                src={personal.photo}
                sx={{ width: 90, height: 90 }}
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

      {/* PROJECTS */}
      {projects.length > 0 && (
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
