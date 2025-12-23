import React from 'react';
import { Box, Typography } from '@mui/material';
import { DUMMY_RESUME_DATA } from '../data/dummyResume';

const ResumePreviewMock: React.FC = () => {
  const {
    personalInfo,
    summary,
    experience,
    education,
    skills,
  } = DUMMY_RESUME_DATA;

  return (
    <Box sx={{ fontSize: 9, color: '#0f172a' }}>
      {/* Header */}
      <Typography fontWeight={700} fontSize={11}>
        {personalInfo.fullName}
      </Typography>
      <Typography fontSize={9} color="text.secondary" gutterBottom>
        {personalInfo.jobTitle}
      </Typography>

      {/* Summary */}
      <Section title="Summary">
        <Typography fontSize={8} lineHeight={1.4}>
          {summary.slice(0, 180)}...
        </Typography>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        {experience.slice(0, 1).map((exp) => (
          <Box key={exp.id} mb={0.5}>
            <Typography fontWeight={600} fontSize={8}>
              {exp.title} – {exp.company}
            </Typography>
            <Typography fontSize={7} color="text.secondary">
              {exp.location}
            </Typography>
          </Box>
        ))}
      </Section>

      {/* Education */}
      <Section title="Education">
        {education.slice(0, 1).map((edu) => (
          <Typography key={edu.id} fontSize={8}>
            {edu.degree}, {edu.school}
          </Typography>
        ))}
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <Typography fontSize={7}>
          {skills.slice(0, 6).join(', ')}...
        </Typography>
      </Section>
    </Box>
  );
};

export default ResumePreviewMock;

/* ---------------- Helper ---------------- */

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box mt={1}>
    <Typography
      fontWeight={700}
      fontSize={8}
      sx={{ textTransform: 'uppercase' }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);
