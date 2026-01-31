import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { ResumeSection } from '../types';
import { useResumeContext } from '../context/ResumeContext';

const ResumePreviewMock: React.FC = () => {
  const { resumeData } = useResumeContext(); 
  const data = resumeData || { sections: [] };

  const getSection = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type);

  // Mapping all sections including missing ones
  const personal = getSection('personal')?.content as any;
  const summary = getSection('summary')?.content as string;
  const experience = (getSection('experience')?.content || []) as any[];
  const education = (getSection('education')?.content || []) as any[];
  const projects = (getSection('projects')?.content || []) as any[];
  const skills = (getSection('skills')?.content || []) as string[];

  return (
    <Box sx={{ 
      fontSize: '0.75rem', 
      color: '#1e293b', 
      width: '100%',
      minHeight: '100%',
      bgcolor: 'white',
      p: 4,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      // Standard A4 aspect ratio feel
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      fontFamily: '"Inter", sans-serif'
    }}>
      
      {/* 1. PERSONAL HEADER */}
      {personal && (
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: 1 }}>
            {personal.fullName || 'Your Name'}
          </Typography>
          <Typography sx={{ fontWeight: 600, color: '#3b82f6', fontSize: '0.9rem', mb: 1 }}>
            {personal.jobTitle || 'Professional Title'}
          </Typography>
          <Typography sx={{ fontSize: '0.7rem', color: '#64748b' }}>
            {personal.email} {personal.phone && ` | ${personal.phone}`} {personal.address && ` | ${personal.address}`}
          </Typography>
        </Box>
      )}

      {/* 2. PROFESSIONAL SUMMARY */}
      {summary && (
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#3b82f6', borderBottom: '1px solid #e2e8f0', mb: 0.5 }}>
            PROFESSIONAL SUMMARY
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', lineHeight: 1.6, textAlign: 'justify' }}>
            {summary}
          </Typography>
        </Box>
      )}

      {/* 3. EXPERIENCE SECTION */}
      {experience.length > 0 && (
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#3b82f6', borderBottom: '1px solid #e2e8f0', mb: 1 }}>
            WORK EXPERIENCE
          </Typography>
          {experience.map((exp, idx) => (
            <Box key={idx} sx={{ mb: 1.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '0.8rem' }}>{exp.position || exp.title}</Typography>
                <Typography sx={{ fontSize: '0.65rem', color: '#64748b' }}>{exp.startDate} - {exp.endDate || 'Present'}</Typography>
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#475569', mb: 0.5 }}>{exp.company}</Typography>
              <Typography sx={{ fontSize: '0.7rem', color: '#1e293b', whiteSpace: 'pre-line' }}>{exp.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* 4. EDUCATION SECTION */}
      {education.length > 0 && (
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#3b82f6', borderBottom: '1px solid #e2e8f0', mb: 1 }}>
            EDUCATION
          </Typography>
          {education.map((edu, idx) => (
            <Box key={idx} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.75rem' }}>{edu.degree}</Typography>
                <Typography sx={{ fontSize: '0.7rem' }}>{edu.institution || edu.school}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.65rem', color: '#64748b' }}>{edu.year || edu.endDate}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* 5. PROJECTS SECTION */}
      {projects.length > 0 && (
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#3b82f6', borderBottom: '1px solid #e2e8f0', mb: 1 }}>
            KEY PROJECTS
          </Typography>
          {projects.map((proj, idx) => (
            <Box key={idx} sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.75rem' }}>{proj.title || proj.name}</Typography>
              <Typography sx={{ fontSize: '0.7rem' }}>{proj.description}</Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* 6. SKILLS SECTION */}
      {skills.length > 0 && (
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.7rem', color: '#3b82f6', borderBottom: '1px solid #e2e8f0', mb: 0.5 }}>
            TECHNICAL SKILLS
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', letterSpacing: 0.5 }}>
            {skills.join(' • ')}
          </Typography>
        </Box>
      )}

    </Box>
  );
};

export default ResumePreviewMock;