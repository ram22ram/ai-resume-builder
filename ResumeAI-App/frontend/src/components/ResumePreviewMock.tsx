import React from 'react';
import { Box, Typography } from '@mui/material';
import { ResumeData, ResumeSection } from '../types';
import { initialData } from '../constants/initialData';

/**
 * Mock preview uses SAME architecture as builder
 * No flat data, no hacks
 */
const ResumePreviewMock: React.FC = () => {
  const resumeData: ResumeData = initialData;

  const getSection = (type: ResumeSection['type']) =>
    resumeData.sections.find((s) => s.type === type);

  const personal = getSection('personal')?.content;
  const summary = getSection('summary')?.content as string | undefined;
  const experience = (getSection('experience')?.content || []) as any[];
  const education = (getSection('education')?.content || []) as any[];
  const skills = (getSection('skills')?.content || []) as string[];

  return (
    <Box sx={{ fontSize: 9, color: '#0f172a' }}>
      {/* Header */}
      {personal && (
        <>
          <Typography fontWeight={700} fontSize={11}>
            {personal.fullName || 'Your Name'}
          </Typography>
          <Typography fontSize={9} color="text.secondary" gutterBottom>
            {personal.jobTitle || 'Job Title'}
          </Typography>
        </>
      )}

      {/* Summary */}
      {summary && (
        <Section title="Summary">
          <Typography fontSize={8} lineHeight={1.4}>
            {summary.slice(0, 180)}
          </Typography>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience">
          {experience.slice(0, 1).map((exp, idx) => (
            <Box key={idx} mb={0.5}>
              <Typography fontWeight={600} fontSize={8}>
                {exp.position || 'Role'} – {exp.company || 'Company'}
              </Typography>
              <Typography fontSize={7} color="text.secondary">
                {exp.startDate} – {exp.endDate || 'Present'}
              </Typography>
            </Box>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.slice(0, 1).map((edu, idx) => (
            <Typography key={idx} fontSize={8}>
              {edu.degree || 'Degree'} – {edu.institution || 'Institute'}
            </Typography>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Skills">
          <Typography fontSize={7}>
            {skills.slice(0, 6).join(', ')}
          </Typography>
        </Section>
      )}
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
