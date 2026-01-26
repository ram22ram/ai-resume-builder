// Create new file: src/components/steps/StepCustom.tsx
import React from 'react';
import { Box, TextField, Typography, Paper, IconButton } from '@mui/material';
import { Trash2 } from 'lucide-react';

interface StepCustomProps {
  sectionData: any;
  handlers: any;
}

const StepCustom = ({ sectionData, handlers }: StepCustomProps) => {
  const darkInput = {
    '& .MuiOutlinedInput-root': { 
      color: 'white', 
      bgcolor: 'rgba(30, 41, 59, 0.4)', 
      borderRadius: '8px',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
      '&.Mui-focused fieldset': { borderColor: '#a855f7' }
    },
    '& .MuiInputLabel-root': { color: '#94a3b8' },
    '& .MuiSvgIcon-root': { color: '#a855f7' }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handlers.updateCustomSectionTitle) {
      handlers.updateCustomSectionTitle(sectionData.id, e.target.value);
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (handlers.updateSectionContent) {
      handlers.updateSectionContent(sectionData.id, e.target.value);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {sectionData.title || 'Custom Section'}
        </Typography>
        {sectionData.type === 'custom' && (
          <IconButton 
            onClick={() => handlers.deleteSection && handlers.deleteSection(sectionData.id)} 
            sx={{ color: '#f87171', '&:hover': { bgcolor: 'rgba(248,113,113,0.1)' } }}
          >
            <Trash2 size={18} />
          </IconButton>
        )}
      </Box>
      
      <Typography variant="body2" sx={{ mb: 4, color: '#94a3b8' }}>
        Add your custom information here.
      </Typography>

      <Paper sx={{ 
        p: 3, 
        mb: 3, 
        bgcolor: 'rgba(15, 23, 42, 0.6)', 
        border: '1px solid rgba(255,255,255,0.1)', 
        borderRadius: 3 
      }}>
        {/* Section Title Editor */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Section Title"
            value={sectionData.title || ''}
            onChange={handleTitleChange}
            sx={darkInput}
          />
        </Box>
        
        {/* Content Editor */}
        <TextField
          fullWidth
          multiline
          rows={8}
          label="Content"
          value={sectionData.content || ''}
          onChange={handleContentChange}
          placeholder="Enter your content here..."
          sx={darkInput}
        />
      </Paper>
    </Box>
  );
};

export default StepCustom;