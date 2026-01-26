// BuilderPanel.tsx - REPLACE ENTIRE FILE
import { Paper, Box } from '@mui/material';
import StepNavigator from './StepNavigator';
import StepContent from './StepContent';
import StepActions from './StepActions';
import { ResumeData, ResumeHandlers } from '../resume.types';

interface BuilderPanelProps {
  resumeData: ResumeData;
  handlers: ResumeHandlers;
  variant: 'desktop' | 'mobile' | 'tablet';
  onClose?: () => void;
}

const BuilderPanel = ({ resumeData, handlers, variant }: BuilderPanelProps) => {
  return (
    <Paper 
      elevation={0}
      sx={{
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(30, 41, 59, 0.6)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <StepNavigator
        sections={resumeData.sections}
        activeStep={handlers.activeStep}
        onStepClick={handlers.setActiveStep}
        variant={variant}
      />
      
      <Box sx={{ 
        p: 3, 
        flex: 1, 
        minHeight: 0,
        overflowY: 'auto',
        color: 'white'
      }}>
        <StepContent
          resumeData={resumeData}
          handlers={handlers}
          activeStep={handlers.activeStep}
          loadingAi={handlers.loadingAi}
        />
      </Box>
      
      <StepActions
        activeStep={handlers.activeStep}
        totalSteps={resumeData.sections.length}
        onBack={handlers.handleBack}
        onNext={handlers.handleNext}
        onSave={handlers.handleSave} // ✅ CHANGED FROM generateShareLink
        onAddSection={handlers.addCustomSection} // ✅ ADDED PROP
        onDownload={handlers.generatePDF}
        variant={variant}
      />
    </Paper>
  );
};

export default BuilderPanel;