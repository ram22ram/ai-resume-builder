import { forwardRef } from 'react';
import { Box, Typography, Paper, Avatar, Divider } from '@mui/material';
import dayjs from 'dayjs';

const getFontFamily = (fontName: string) => {
  switch (fontName) {
    case 'inter': return '"Inter", sans-serif';
    case 'roboto': return '"Roboto", sans-serif';
    case 'opensans': return '"Open Sans", sans-serif';
    case 'lato': return '"Lato", sans-serif';
    case 'montserrat': return '"Montserrat", sans-serif';
    case 'poppins': return '"Poppins", sans-serif';
    default: return '"Times New Roman", Times, serif';
  }
};

const getSection = (sections: any[], type: string) =>
  sections.find(s => s.type === type);

const TemplateClassic = forwardRef(({ data, theme }: any, ref: any) => {
  const sections = (data?.sections || []).filter(
    (s: any) => s.isVisible !== false
  );

  const personal = getSection(sections, 'personal')?.content || {};
  const summary = getSection(sections, 'summary')?.content;
  const experience = getSection(sections, 'experience')?.content || [];
  const education = getSection(sections, 'education')?.content || [];
  const skills = getSection(sections, 'skills')?.content || [];
  const hobbies = getSection(sections, 'hobbies')?.content;

  const {
    accentColor = '#000',
    textColor = '#111827',
    fontFamily = 'inter',
    density = 'comfortable',
    photoMode = 'visible'
  } = theme || {};

  const font = getFontFamily(fontFamily);
  const densityMul = density === 'compact' ? 0.8 : density === 'spacious' ? 1.2 : 1;
  const space = (v: number) => v * densityMul;

  const showPhoto = personal.photo && photoMode !== 'hidden';

  return (
    <Paper
      ref={ref}
      elevation={0}
      sx={{
        p: 4,
        fontFamily: font,
        color: textColor,
        backgroundColor: 'background.paper',
      }}
    >
      {/* HEADER */}
      <Box textAlign="center" mb={space(2)}>
        {showPhoto && (
          <Avatar
            src={personal.photo}
            sx={{
              width: 90,
              height: 90,
              border: `2px solid ${accentColor}`,
              borderRadius: photoMode === 'square' ? '8px' : '50%',
              mx: 'auto',
              mb: 1,
            }}
          />
        )}

        <Typography variant="h3" fontWeight={700} color={accentColor}>
          {personal.fullName || 'Your Name'}
        </Typography>

        <Typography variant="body2" mt={1}>
          {[personal.email, personal.phone, personal.address].filter(Boolean).join(' • ')}
        </Typography>

        <Divider sx={{ my: 2 }} />
      </Box>

      {/* SUMMARY */}
      {summary && (
        <Box mb={space(2)}>
          <Typography variant="h6" color={accentColor} fontWeight={700}>
            Professional Summary
          </Typography>
          <Typography variant="body2">{summary}</Typography>
        </Box>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <Box mb={space(2)}>
          <Typography variant="h6" color={accentColor} fontWeight={700}>
            Experience
          </Typography>
          {experience.map((e: any) => (
            <Box key={e.id} mb={space(1.5)}>
              <Typography fontWeight={600}>{e.title}</Typography>
              <Typography variant="caption">
                {e.company}
                {e.startDate && (
                  <> | {dayjs(e.startDate).format('MMM YYYY')} – {e.isPresent ? 'Present' : dayjs(e.endDate).format('MMM YYYY')}</>
                )}
              </Typography>
              {e.description && (
                <Typography variant="body2">{e.description}</Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <Box mb={space(2)}>
          <Typography variant="h6" color={accentColor} fontWeight={700}>
            Education
          </Typography>
          {education.map((e: any) => (
            <Box key={e.id} mb={1}>
              <Typography fontWeight={600}>{e.degree}</Typography>
              <Typography variant="body2">
                {e.school}{e.year ? ` (${e.year})` : ''}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <Box mb={space(2)}>
          <Typography variant="h6" color={accentColor} fontWeight={700}>
            Skills
          </Typography>
          <Typography variant="body2">{skills.join(' • ')}</Typography>
        </Box>
      )}

      {/* HOBBIES */}
      {hobbies && (
        <Box>
          <Typography variant="h6" color={accentColor} fontWeight={700}>
            Interests
          </Typography>
          <Typography variant="body2">{hobbies}</Typography>
        </Box>
      )}
    </Paper>
  );
});

export default TemplateClassic;
