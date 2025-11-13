import React, { useState } from 'react';
import { 
  Box, Stepper, Step, StepLabel, Button, 
  Typography, Paper, Alert 
} from '@mui/material';
import { Save } from 'lucide-react';

// FIX 1: Path ko ../../ karna hai taaki yeh 'src/utils/' tak pahuche
import { validateStep } from '../../utils/resumeUtils';

// FIX 2: Path se './steps/' hatana hai kyunki file pehle se hi 'steps' folder mein hai
import StepPersonalInfo from './StepPersonalInfo';
import StepSummary from './StepSummary';
import StepExperience from './StepExperience';
import StepProjects from './StepProjects';
import StepSkills from './StepSkills';
import StepSettingsDownload from './StepSettingsDownload';

const steps = [
  'Personal Info', 
  'Summary', 
  'Experience', 
  'Projects', 
  'Skills', 
  'Settings & Download'
];

const WizardStepper = (props) => {
  const { 
    resumeData, setResumeData, errors, loadingAi, handlers,
    visibleSections, currentTemplate, accentColor, fontFamily,
    customizationHandlers, previewRef, handleDownloadPDF
  } = props;

  const [activeStep, setActiveStep] = useState(0);
  const [validationError, setValidationError] = useState(null);

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

  const getStepContent = (step) => {
    const stepProps = { resumeData, errors, handlers, loadingAi };
    switch (step) {
      case 0:
        return <StepPersonalInfo {...stepProps} />;
      case 1:
        return <StepSummary {...stepProps} />;
      case 2:
        return <StepExperience {...stepProps} />;
      case 3:
        return <StepProjects {...stepProps} />;
      case 4:
        return <StepSkills {...stepProps} PREDEFINED_SKILL_LIST={[]} />;
      case 5:
        return <StepSettingsDownload
          visibleSections={visibleSections}
          currentTemplate={currentTemplate}
          accentColor={accentColor}
          fontFamily={fontFamily}
          handlers={customizationHandlers}
          previewRef={previewRef}
          resumeData={resumeData}
          handleDownloadPDF={() => handleDownloadPDF(previewRef, resumeData, currentTemplate)}
        />;
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