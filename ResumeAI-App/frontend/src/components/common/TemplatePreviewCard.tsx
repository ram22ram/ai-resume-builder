import React from 'react';
import { Box, Paper } from '@mui/material';

import TemplateModern from '../templates/TemplateModern';
import TemplateClassic from '../templates/TemplateClassic';
import TemplateSwiss from '../templates/TemplateSwiss';
import TemplateCorporate from '../templates/TemplateCorporate';
import TemplateFred from '../templates/TemplateFred';
import TemplateKristy from '../templates/TemplateKristy';
import TemplateElena from '../templates/TemplateElena';
import TemplateEileen from '../templates/TemplateEileen';
import TemplateHarvey from '../templates/TemplateHarvey';

// ✅ FIX 1: Define Interface for Props
interface TemplatePreviewCardProps {
  templateId: string;
  color?: string;
}

const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({ templateId, color = '#0B57D0' }) => {
  
  const dummyData = {
    personalInfo: {
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      address: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johnsmith',
      portfolio: 'johnsmith.dev'
    },
    summary: 'Experienced software engineer with 8+ years in full-stack development.',
    experience: [
      {
        id: 1,
        title: 'Senior Engineer',
        company: 'Tech Corp',
        location: 'SF, CA',
        startDate: '2020-03',
        endDate: 'Present',
        isPresent: true,
        description: 'Lead development of scalable microservices architecture.'
      },
      {
        id: 2,
        title: 'Developer',
        company: 'Startup Labs',
        location: 'NY, NY',
        startDate: '2018-01',
        endDate: '2020-02',
        isPresent: false,
        description: 'Developed and maintained React applications.'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'M.S. CS',
        school: 'Stanford University',
        city: 'Stanford, CA',
        year: '2017'
      }
    ],
    skills: ['React', 'Node.js', 'AWS', 'Docker'],
    projects: [],
    hobbies: ''
  };

  const allVisibleSections = {
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: false,
    hobbies: false
  };

  const defaultSectionOrder = ['summary', 'experience', 'education', 'skills'];

  // ✅ FIX 2 & 3: Removed 'pat' and added Type Definition
  // Record<string, any> tells TS: "This object accepts any string key and returns a component"
  const templateComponents: Record<string, any> = {
    modern: TemplateModern,
    classic: TemplateClassic,
    swiss: TemplateSwiss,
    corporate: TemplateCorporate,
    fred: TemplateFred,
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
        minHeight: 250,
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          transform: 'translateY(-2px)',
          transition: 'all 0.2s ease'
        }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': { cursor: 'pointer' }
        }}
      >
        <Box sx={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>
          <TemplateComponent
            data={dummyData}
            visibleSections={allVisibleSections}
            sectionOrder={defaultSectionOrder}
            theme={{ 
              accentColor: color, 
              fontFamily: 'inter',
              density: 'compact',
              photoMode: 'visible'
            }}
            isPreview={true}
          />
        </Box>

        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to bottom, transparent 80%, rgba(0,0,0,0.05) 100%)',
            pointerEvents: 'none',
            zIndex: 10
          }}
        />
      </Paper>

      <Box
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          bgcolor: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(4px)',
          color: 'white',
          px: 1.2,
          py: 0.5,
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: 'bold',
          zIndex: 20,
          letterSpacing: 0.5
        }}
      >
        {templateId.charAt(0).toUpperCase() + templateId.slice(1)}
      </Box>
    </Box>
  );
};

export default TemplatePreviewCard;