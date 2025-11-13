import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
// Note: You could add your *old* AI Enhance button here
// import { Sparkles } from 'lucide-react'; 

const StepSummary = ({ resumeData, handlers, errors }) => {
  const { summary } = resumeData;
  const { handleSummaryChange } = handlers;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Professional Summary</Typography>
      <TextField
        fullWidth
        label="Summary"
        name="summary"
        multiline
        rows={6}
        value={summary}
        onChange={handleSummaryChange}
        error={!!errors.summary}
        helperText={errors.summary || "A short, powerful summary of your career."}
      />
      {/* <Button 
        startIcon={<Sparkles size={16} />}
        onClick={() => handlers.handleAiGenerate('summary', null, summary)}
      >
        Enhance with AI
      </Button> 
      */}
    </Box>
  );
};

export default StepSummary;