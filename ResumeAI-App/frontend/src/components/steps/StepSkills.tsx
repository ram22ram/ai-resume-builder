import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Chip, Autocomplete } from '@mui/material';
import { PREDEFINED_SKILL_LIST } from '../../utils/constants';
import { Plus, X } from 'lucide-react';

const StepSkills = ({ resumeData, handlers, errors = {} }: any) => {
  // ✅ Skills array check
  const skills = Array.isArray(resumeData) ? resumeData : (resumeData?.skills || []);
  // ✅ MATCHED HANDLERS
  const { handleAddSkill, handleDeleteSkill } = handlers; 
  const [inputValue, setInputValue] = useState('');

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white', mb: 1 }}>Skills</Typography>
      <Typography variant="body2" sx={{ color: '#94a3b8', mb: 3 }}>Add your top professional skills.</Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Autocomplete
          freeSolo
          options={PREDEFINED_SKILL_LIST.filter(skill => !skills.includes(skill))}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
          onChange={(_, newValue) => {
            if (newValue) { handleAddSkill(newValue); setInputValue(''); }
          }}
          renderInput={(params) => (
            <TextField 
                {...params} 
                label="Add a Skill" 
                sx={{ 
                    '& .MuiOutlinedInput-root': { color: 'white', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' } },
                    '& .MuiInputLabel-root': { color: '#94a3b8' }
                }}
            />
          )}
          fullWidth
        />
        <Button variant="contained" onClick={() => { if(inputValue) { handleAddSkill(inputValue); setInputValue(''); } }} sx={{ bgcolor: '#3b82f6', minWidth: '60px' }}>
            <Plus />
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {skills.map((skill: string) => (
          <Chip
            key={skill}
            label={skill}
            onDelete={() => handleDeleteSkill(skill)}
            deleteIcon={<X size={14} />}
            sx={{ bgcolor: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', '& .MuiChip-deleteIcon': { color: '#60a5fa', '&:hover': { color: 'white' } } }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StepSkills;