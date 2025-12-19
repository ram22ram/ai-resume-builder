import React from 'react';
import { Box, TextField, Typography, Button, Alert, CircularProgress } from '@mui/material';
import { Wand2, Sparkles } from 'lucide-react';

const StepSummary = ({ resumeData, handlers, loadingAi }: any) => {
  // ✅ FIX: Safety check
  if (!resumeData) return null;

  const { summary } = resumeData;
  const { handleSummaryChange, handleAiGenerate } = handlers;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>Professional Summary</Typography>
        <Button 
          startIcon={loadingAi ? <CircularProgress size={16} color="inherit" /> : <Wand2 size={16} />} 
          size="small"
          disabled={loadingAi}
          onClick={() => handleAiGenerate('summary', null, summary)}
          sx={{ color: '#d8b4fe', bgcolor: 'rgba(168, 85, 247, 0.1)', '&:hover': { bgcolor: 'rgba(168, 85, 247, 0.2)' } }}
        >
          {loadingAi ? 'Generating...' : 'Auto-Generate with AI'}
        </Button>
      </Box>

      <TextField
        fullWidth
        multiline
        rows={6}
        label="Summary"
        placeholder="E.g. Senior Software Engineer with 5+ years of experience in..."
        value={summary || ''} 
        onChange={handleSummaryChange}
        sx={{
          '& .MuiOutlinedInput-root': { 
            color: 'white', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2,
            '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
            '&.Mui-focused fieldset': { borderColor: '#a855f7' }
          },
          '& .MuiInputLabel-root': { color: '#94a3b8' }
        }}
      />
      
      <Alert 
        severity="info" 
        icon={<Sparkles size={20} />}
        sx={{ 
          mt: 3, 
          bgcolor: 'rgba(59, 130, 246, 0.1)', 
          color: '#93c5fd', 
          border: '1px solid rgba(59, 130, 246, 0.2)',
          '& .MuiAlert-icon': { color: '#60a5fa' }
        }}
      >
        Tip: Keep it between 2-4 sentences. Highlight your key achievements and skills.
      </Alert>
    </Box>
  );
};

export default StepSummary;