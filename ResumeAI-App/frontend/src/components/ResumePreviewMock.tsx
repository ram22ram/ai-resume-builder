import React from 'react';
import { Box, Typography } from '@mui/material';
import { ResumeData, ResumeSection } from '../types';
import { useResumeContext } from '../context/ResumeContext';

const ResumePreviewMock: React.FC = () => {
  const { resumeData } = useResumeContext(); // ✅ Use Context instead of initialData
  const data = resumeData || { sections: [] };

  const getSection = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type);

  const personal = getSection('personal')?.content as any;
  const summary = getSection('summary')?.content as string;
  const experience = (getSection('experience')?.content || []) as any[];
  const skills = (getSection('skills')?.content || []) as string[];

  return (
    // ✅ Scrollable container fix
    <Box sx={{ 
      fontSize: 9, 
      color: '#0f172a', 
      height: '100%', 
      maxHeight: 'calc(100vh - 200px)', 
      overflowY: 'auto',
      p: 2,
      bgcolor: 'white',
      '&::-webkit-scrollbar': { width: '4px' },
      '&::-webkit-scrollbar-thumb': { bgcolor: '#cbd5e1', borderRadius: '4px' }
    }}>
      {personal && (
        <Box mb={2}>
          <Typography fontWeight={700} fontSize={14}>{personal.fullName || 'Your Name'}</Typography>
          <Typography fontSize={10} color="text.secondary">{personal.jobTitle || 'Job Title'}</Typography>
          <Typography fontSize={8}>{personal.email} | {personal.phone}</Typography>
        </Box>
      )}

      {summary && (
        <Box mb={2}>
          <Typography fontWeight={700} fontSize={10} borderBottom="1px solid #e2e8f0" mb={0.5}>SUMMARY</Typography>
          <Typography fontSize={8} lineHeight={1.5}>{summary}</Typography>
        </Box>
      )}

      {experience.length > 0 && (
        <Box mb={2}>
          <Typography fontWeight={700} fontSize={10} borderBottom="1px solid #e2e8f0" mb={0.5}>EXPERIENCE</Typography>
          {experience.map((exp, idx) => (
            <Box key={idx} mb={1}>
              <Typography fontWeight={600} fontSize={9}>{exp.position || exp.title} - {exp.company}</Typography>
              <Typography fontSize={7} color="text.secondary">{exp.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {skills.length > 0 && (
        <Box>
          <Typography fontWeight={700} fontSize={10} borderBottom="1px solid #e2e8f0" mb={0.5}>SKILLS</Typography>
          <Typography fontSize={8}>{skills.join(', ')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ResumePreviewMock;