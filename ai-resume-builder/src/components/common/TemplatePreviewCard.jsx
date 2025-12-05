import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import {TemplateModern} from '../templates/TemplateModern';
import {TemplateClassic} from '../templates/TemplateClassic';
import {TemplateSwiss} from '../templates/TemplateSwiss';
import {TemplateCorporate} from '../templates/TemplateCorporate';
import {TemplateFred} from '../templates/TemplateFred';
import {TemplatePat} from '../templates/TemplatePat';
import {TemplateKristy} from '../components/templates/TemplateKristy';
import {TemplateElena} from '../components/templates/TemplateElena';
import {TemplateEileen} from '../components/templates/TemplateEileen';
import {TemplateHarvey} from '../components/templates/TemplateHarvey';


const TemplatePreviewCard = ({ templateId, color = '#0B57D0' }) => {
  // Dummy data for preview
  const dummyData = {
    personalInfo: {
      name: 'John Smith',
      title: 'Senior Software Engineer',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      summary: 'Experienced software engineer with 8+ years in full-stack development. Passionate about creating scalable solutions and leading cross-functional teams.'
    },
    workExperience: [
      {
        title: 'Senior Software Engineer',
        company: 'Tech Corp Inc.',
        location: 'San Francisco, CA',
        startDate: '2020-03',
        endDate: 'Present',
        description: 'Lead development of scalable microservices architecture. Improved system performance by 40%. Mentored 5 junior developers.'
      },
      {
        title: 'Software Developer',
        company: 'Startup Labs',
        location: 'New York, NY',
        startDate: '2018-01',
        endDate: '2020-02',
        description: 'Developed and maintained React applications. Collaborated with design team on UI/UX improvements.'
      }
    ],
    education: [
      {
        degree: 'M.S. in Computer Science',
        institution: 'Stanford University',
        location: 'Stanford, CA',
        year: '2017'
      }
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'CI/CD']
  };

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
            personalInfo={dummyData.personalInfo}
            workExperience={dummyData.workExperience}
            education={dummyData.education}
            skills={dummyData.skills}
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