import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import StepPersonalInfo from './steps/StepPersonalInfo';
import StepSummary from './steps/StepSummary';
import StepExperience from './steps/StepExperience';
import StepEducation from './steps/StepEducation';
import StepProjects from './steps/StepProjects';
import StepSkills from './steps/StepSkills';

const StepContent = ({ resumeData, handlers, loadingAi }: any) => {
  if (!resumeData || !resumeData.sections) return null;

  const getSectionContent = (type: string) => 
    resumeData.sections.find((s: any) => s.type === type)?.content;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 8, pb: 10 }}>
      
      {/* 1. PERSONAL INFO */}
      <Box id="section-personal">
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: 'white', letterSpacing: -0.5 }}>
          Personal Information
        </Typography>
        <StepPersonalInfo 
          resumeData={{ personalInfo: getSectionContent('personal') }} 
          handlers={handlers} 
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

      {/* 2. SUMMARY */}
      <Box id="section-summary">
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: 'white' }}>
          Professional Summary
        </Typography>
        <StepSummary 
          resumeData={getSectionContent('summary')} 
          handlers={handlers} 
          loadingAi={loadingAi} 
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

      {/* 3. EXPERIENCE */}
      <Box id="section-experience">
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: 'white' }}>
          Work Experience
        </Typography>
        <StepExperience 
          resumeData={getSectionContent('experience')} 
          handlers={handlers} 
          loadingAi={loadingAi} 
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

      {/* 4. EDUCATION */}
      <Box id="section-education">
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: 'white' }}>
          Education
        </Typography>
        <StepEducation 
          resumeData={getSectionContent('education')} 
          handlers={handlers} 
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

      {/* 5. PROJECTS */}
      <Box id="section-projects">
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: 'white' }}>
          Key Projects
        </Typography>
        <StepProjects 
          resumeData={getSectionContent('projects')} 
          handlers={handlers} 
          loadingAi={loadingAi} 
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

      {/* 6. SKILLS */}
      <Box id="section-skills">
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: 'white' }}>
          Skills & Expertise
        </Typography>
        <StepSkills 
          resumeData={getSectionContent('skills')} 
          handlers={handlers} 
        />
      </Box>

    </Box>
  );
};

export default StepContent;