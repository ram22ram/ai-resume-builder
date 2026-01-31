import React from 'react';
import StepPersonalInfo from './steps/StepPersonalInfo';
import StepSummary from './steps/StepSummary';
import StepExperience from './steps/StepExperience';
import StepEducation from './steps/StepEducation';
import StepProjects from './steps/StepProjects';
import StepSkills from './steps/StepSkills';
import StepCustom from './steps/StepCustom';
import StepSettingsDownload from './steps/StepSettingsDownload';

const StepContent = ({ resumeData, handlers, activeStep, loadingAi }: any) => {
  const currentSection = resumeData.sections[activeStep];
  const isSettings = activeStep === resumeData.sections.length;

  if (isSettings) {
    return <StepSettingsDownload sections={resumeData.sections} {...resumeData.theme} handlers={handlers} />;
  }

  if (!currentSection) return null;

  // ✅ Mapping fix: Directly pass content and correct change handler
  switch (currentSection.type) {
    case 'personal':
      return (
        <StepPersonalInfo 
          data={currentSection.content} 
          onChange={(e: any) => handlers.handleUpdateSection('personal', { ...currentSection.content, [e.target.name]: e.target.value })} 
        />
      );
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
    case 'custom':
      return <StepCustom sectionData={currentSection} handlers={handlers} />;
    default:
      return null;
  }
};

export default StepContent;