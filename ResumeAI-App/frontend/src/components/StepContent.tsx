// StepContent.tsx - REPLACE ENTIRE FILE
import React from 'react';
import { Box } from '@mui/material';
import StepPersonalInfo from './steps/StepPersonalInfo';
import StepSummary from './steps/StepSummary';
import StepExperience from './steps/StepExperience';
import StepEducation from './steps/StepEducation';
import StepProjects from './steps/StepProjects';
import StepSkills from './steps/StepSkills';
import StepCustom from './steps/StepCustom'; // ✅ ADDED IMPORT
import StepSettingsDownload from './steps/StepSettingsDownload';

const StepContent = ({ resumeData, handlers, activeStep, loadingAi }: any) => {
  const currentSection = resumeData.sections[activeStep];
  const isSettings = activeStep === resumeData.sections.length;

  if (isSettings) {
    return <StepSettingsDownload sections={resumeData.sections} {...resumeData.theme} handlers={handlers} />;
  }

  if (!currentSection) return null;

  switch (currentSection.type) {
    case 'personal':
      return <StepPersonalInfo resumeData={{ personalInfo: currentSection.content }} handlers={handlers} />;
    case 'summary':
      return <StepSummary resumeData={currentSection.content} handlers={handlers} loadingAi={loadingAi} />;
    case 'experience':
      return <StepExperience resumeData={currentSection.content} handlers={handlers} loadingAi={loadingAi} />;
    case 'education':
      return <StepEducation resumeData={currentSection.content} handlers={handlers} />;
    case 'projects':
      return <StepProjects resumeData={currentSection.content} handlers={handlers} loadingAi={loadingAi} />;
    case 'skills':
      return <StepSkills resumeData={currentSection.content} handlers={handlers} />;
    case 'custom': // ✅ ADDED CUSTOM CASE
      return <StepCustom sectionData={currentSection} handlers={handlers} />;
    default:
      return null;
  }
};

export default StepContent;