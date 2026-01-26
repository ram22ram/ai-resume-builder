import React from 'react';
import { Box, TextField, Typography, Button, Alert, CircularProgress, Stack } from '@mui/material';
import { Wand2, Sparkles, Zap } from 'lucide-react';

const StepSummary = ({ resumeData, handlers, loadingAi }: any) => {
  // ✅ Logic: resumeData yahan direct summary string ho sakta hai ya object
  // Humne modular architecture mein ise string ki tarah pass kiya hai
  const summaryText = typeof resumeData === 'string' ? resumeData : resumeData?.content || '';

  return (
    <Box sx={{ animation: 'fadeIn 0.5s ease-in' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', mb: 0.5 }}>
            Professional Summary
          </Typography>
          <Typography variant="body2" sx={{ color: '#94a3b8' }}>
            Tell them who you are and what you bring to the table.
          </Typography>
        </Box>

        {/* AI MAGIC BUTTON */}
        <Button 
          variant="contained"
          startIcon={loadingAi ? <CircularProgress size={16} color="inherit" /> : <Zap size={16} />} 
          size="medium"
          disabled={loadingAi}
          onClick={() => handlers.handleAiAction('improve', 'summary')}
          sx={{ 
            textTransform: 'none',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #7c3aed 30%, #3b82f6 90%)',
            boxShadow: '0 4px 15px rgba(124, 58, 237, 0.4)',
            borderRadius: '10px',
            '&:hover': {
              background: 'linear-gradient(45deg, #6d28d9 30%, #2563eb 90%)',
              transform: 'translateY(-2px)',
              transition: 'all 0.2s'
            }
          }}
        >
          {loadingAi ? 'AI Writing...' : 'Magic Improve'}
        </Button>
      </Stack>

      <TextField
        fullWidth
        multiline
        rows={8}
        placeholder="E.g. Passionate Frontend Developer with a focus on React and UI/UX. Proven track record of building scalable web apps..."
        value={summaryText} 
        onChange={(e) => handlers.handleSummaryChange(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': { 
            color: 'white', 
            bgcolor: 'rgba(30, 41, 59, 0.5)', 
            borderRadius: 3,
            fontSize: '1rem',
            lineHeight: 1.6,
            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
            '&.Mui-focused fieldset': { borderColor: '#3b82f6', borderWidth: '2px' }
          }
        }}
      />
      
      {/* AI STATUS TIP */}
      <Alert 
        severity="info" 
        icon={<Sparkles size={20} />}
        sx={{ 
          mt: 4, 
          bgcolor: 'rgba(59, 130, 246, 0.05)', 
          color: '#93c5fd', 
          borderRadius: '12px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          '& .MuiAlert-icon': { color: '#60a5fa' }
        }}
      >
        <Typography variant="caption" sx={{ fontSize: '0.85rem' }}>
          <strong>Pro Tip:</strong> Click 'Magic Improve' to let our AI rewrite your summary into a high-impact, professional statement using job-specific keywords.
        </Typography>
      </Alert>
    </Box>
  );
};

export default StepSummary;