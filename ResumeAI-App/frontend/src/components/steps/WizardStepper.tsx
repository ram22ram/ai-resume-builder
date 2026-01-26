// src/components/WizardStepper.tsx
import React, { useState } from 'react';
import { 
  Box, Stepper, Step, StepLabel, Button, 
  Paper, Alert 
} from '@mui/material';
import { Save } from 'lucide-react';

import { validateStep } from '../../utils/resumeUtils';

import StepPersonalInfo from './StepPersonalInfo';
import StepSummary from './StepSummary';
import StepExperience from './StepExperience';
import EducationSection from '../EducationSection';
import StepProjects from './StepProjects';
import StepSkills from './StepSkills';
import StepSettingsDownload from './StepSettingsDownload';

// Define proper types
interface WizardStepperProps {
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any>>;
  errors: any;
  loadingAi: boolean;
  handlers: any;
  visibleSections: string[];
  currentTemplate: string;
  accentColor: string;
  fontFamily: string;
  customizationHandlers: any;
  previewRef: React.RefObject<HTMLDivElement>;
  handleDownloadPDF: (previewRef: React.RefObject<HTMLDivElement>, resumeData: any, currentTemplate: string) => void;
}

const steps = [
  'Personal Info', 
  'Summary', 
  'Experience', 
  'Education', 
  'Projects', 
  'Skills', 
  'Settings & Download'
];

const WizardStepper = (props: WizardStepperProps) => {
  const { 
    resumeData,
    errors,
    loadingAi,
    handlers,
    visibleSections,
    currentTemplate,
    accentColor,
    fontFamily,
    customizationHandlers,
    previewRef,
    handleDownloadPDF
  } = props;

  const [activeStep, setActiveStep] = useState<number>(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleNext = () => {
    const { isValid, error } = validateStep(activeStep, resumeData);
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setValidationError(null);
    } else {
      setValidationError(error);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setValidationError(null);
  };

  const handleSave = () => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    alert('Your progress has been saved to this browser.');
  };

  const getStepContent = (step: number) => {
    const stepProps = { resumeData, errors, handlers, loadingAi };
    
    switch (step) {
      case 0:
        return <StepPersonalInfo {...stepProps} />;
      case 1:
        return <StepSummary {...stepProps} />;
      case 2:
        return <StepExperience {...stepProps} />;
      case 3:
        return (
          <EducationSection 
            data={resumeData.education || []}
            onChange={(id: string | number, e: React.ChangeEvent<HTMLInputElement>) => 
              handlers.handleListChange('education', id, e)}
            onDateChange={handlers.handleDateChange}
            onAdd={() => handlers.addListItem('education')}
            onDelete={(id: string | number) => handlers.deleteListItem('education', id)}
            errors={errors?.education || []}
          />
        );
      case 4:
        return <StepProjects {...stepProps} />;
      case 5:
        return <StepSkills {...stepProps} />;
      case 6:
        return (
          <StepSettingsDownload
            currentTemplate={currentTemplate}
            accentColor={accentColor}
            fontFamily={fontFamily}
            density={customizationHandlers.density}
            photoMode={customizationHandlers.photoMode}
            sections={visibleSections}
            handlers={customizationHandlers}
            resumeData={resumeData}
            handleDownloadPDF={() =>
                handleDownloadPDF(previewRef, resumeData, currentTemplate)
              }
            />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: '12px' }}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box>
        {getStepContent(activeStep)}
      </Box>

      {validationError && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {validationError}
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        
        <Button 
          startIcon={<Save size={16} />} 
          onClick={handleSave}
          color="secondary"
        >
          Save
        </Button>

        {activeStep < steps.length - 1 && (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default WizardStepper;