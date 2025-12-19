import { Box, TextField, Typography, Alert, Button, CircularProgress } from '@mui/material';
import { Sparkles } from 'lucide-react';
import React from 'react';

// ✅ 1. Define the interface for props to fix "implicitly has an any type" errors
interface SummarySectionProps {
  data: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  onAiGenerate: (section: string, id: any, text: string) => void;
  loadingAi: boolean;
}

const SummarySection: React.FC<SummarySectionProps> = ({ 
  data, 
  onChange, 
  error, 
  onAiGenerate, 
  loadingAi 
}) => {
  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc' }}>
      <Typography variant="body2" sx={{ mb: 3, color: 'grey.600', fontStyle: 'italic' }}>
        Write a 2-3 line summary about your professional self.
      </Typography>
      
      <TextField
        label="Professional Summary"
        name="summary"
        value={data}
        onChange={onChange}
        fullWidth
        variant="outlined"
        multiline
        rows={5}
        placeholder="e.g., Highly motivated software developer with 5+ years of experience in..."
        sx={{ 
          '& .MuiOutlinedInput-root': { borderRadius: '8px', bgcolor: 'white' },
          '& .MuiFormHelperText-root': { minHeight: '1.25em', marginLeft: '4px' }
        }}
        error={!!error}
        helperText={error || ' '}
      />

      <Button
        variant="outlined"
        startIcon={loadingAi ? <CircularProgress size={16} /> : <Sparkles size={16} />}
        disabled={loadingAi}
        onClick={() => onAiGenerate('summary', null, data || 'a software developer')}
        sx={{
          mt: 1,
          color: '#6366f1',
          borderColor: '#6366f1',
          '&:hover': { bgcolor: '#e0e7ff', borderColor: '#4f46e5' }
        }}
      >
        {loadingAi ? 'Generating...' : 'Generate Summary with AI'}
      </Button>

      <Alert severity="info" icon={<span>✨</span>} sx={{ mt: 3, borderRadius: '8px', bgcolor: '#fff7ed', color: '#9a3412' }}>
        Pro Tip: Mention your top 2-3 skills and years of experience.
      </Alert>
    </Box>
  );
}

export default SummarySection;