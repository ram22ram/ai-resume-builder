import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import TemplateModern from '../templates/TemplateModern';
import TemplateClassic from '../templates/TemplateClassic';
import TemplateSwiss from '../templates/TemplateSwiss';
import TemplateCorporate from '../templates/TemplateCorporate';
import TemplateFred from '../templates/TemplateFred';
import TemplatePat from '../templates/TemplatePat';
import TemplateKristy from '../templates/TemplateKristy';
import TemplateElena from '../templates/TemplateElena';
import TemplateEileen from '../templates/TemplateEileen';
import TemplateHarvey from '../templates/TemplateHarvey';

const TemplatePreviewCard = ({ templateId, color = '#0B57D0' }) => {
  // Dummy data in CORRECT format for your templates
  const dummyData = {
    personalInfo: {
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      address: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johnsmith',
      portfolio: 'johnsmith.dev'
    },
    summary: 'Experienced software engineer with 8+ years in full-stack development. Passionate about creating scalable solutions and leading cross-functional teams.',
    experience: [  // 👈 NOTE: 'experience' not 'workExperience'
      {
        id: 1,
        title: 'Senior Software Engineer',
        company: 'Tech Corp Inc.',
        location: 'San Francisco, CA',
        startDate: '2020-03',
        endDate: 'Present',
        isPresent: true,
        description: 'Lead development of scalable microservices architecture. Improved system performance by 40%. Mentored 5 junior developers.'
      },
      {
        id: 2,
        title: 'Software Developer',
        company: 'Startup Labs',
        location: 'New York, NY',
        startDate: '2018-01',
        endDate: '2020-02',
        isPresent: false,
        description: 'Developed and maintained React applications. Collaborated with design team on UI/UX improvements.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'M.S. in Computer Science',
        school: 'Stanford University',  // 👈 NOTE: 'school' not 'institution'
        city: 'Stanford, CA',
        year: '2017'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    projects: [],
    hobbies: ''
  };

  // All sections visible in preview
  const allVisibleSections = {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: false,
    hobbies: false
  };

  const defaultSectionOrder = ['summary', 'experience', 'education', 'skills'];

  // Template component mapping
  const templateComponents = {
    modern: TemplateModern,
    classic: TemplateClassic,
    swiss: TemplateSwiss,
    corporate: TemplateCorporate,
    fred: TemplateFred,
    pat: TemplatePat,
    kristy: TemplateKristy,
    elena: TemplateElena,
    eileen: TemplateEileen,
    harvey: TemplateHarvey
  };

  const TemplateComponent = templateComponents[templateId] || TemplateModern;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 220,
        borderRadius: '12px',
        overflow: 'hidden',
        '&:hover': {
          transform: 'scale(1.02)',
          transition: 'transform 0.2s ease'
        }
      }}
    >
      {/* Template preview container */}
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          height: '100%',
          transform: 'scale(0.85)',
          transformOrigin: 'top left',
          overflow: 'hidden',
          borderRadius: '8px',
          bgcolor: '#ffffff',
          position: 'relative',
          '&:hover': {
            cursor: 'pointer'
          }
        }}
      >
        {/* Template content */}
        <Box sx={{ 
          width: '100%', 
          height: '100%',
          position: 'relative',
          zIndex: 1
        }}>
          <TemplateComponent
            data={dummyData}  // 👈 PASS AS 'data' prop
            visibleSections={allVisibleSections}
            sectionOrder={defaultSectionOrder}
            theme={{ accentColor: color }}
            isPreview={true}
          />
        </Box>

        {/* Overlay gradient for better visibility */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to bottom, transparent 70%, rgba(0,0,0,0.1) 100%)`,
            pointerEvents: 'none'
          }}
        />
      </Paper>

      {/* Template indicator */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          bgcolor: color,
          color: 'white',
          px: 1,
          py: 0.5,
          borderRadius: '4px',
          fontSize: '0.7rem',
          fontWeight: 'bold',
          zIndex: 2
        }}
      >
        {templateId.toUpperCase()}
      </Box>
    </Box>
  );
};

export default TemplatePreviewCard;