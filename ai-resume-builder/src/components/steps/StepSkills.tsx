import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Chip, Autocomplete } from '@mui/material';

// FIX: Import ka path 'App.jsx' se badalkar 'constants.js' kar diya gaya hai
// Purana: import { PREDEFINED_SKILL_LIST } from '../../App'; 
import { PREDEFINED_SKILL_LIST } from '../../utils/constants'; // Naya

const StepSkills = ({ resumeData, handlers, errors }) => {
  const { skills } = resumeData;
  const { handleAddSkill, handleDeleteSkill } = handlers;
  const [inputValue, setInputValue] = useState('');

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Skills</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Add your top professional skills. Start typing to see suggestions.
      </Typography>
      <Autocomplete
        freeSolo
        options={PREDEFINED_SKILL_LIST.filter(skill => !skills.includes(skill))}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onChange={(event, newValue) => {
          if (newValue) {
            handleAddSkill(newValue);
            setInputValue('');
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Add a Skill"
            variant="outlined"
            error={!!errors.skills}
            helperText={errors.skills || "e.g., 'React' or 'Project Management'"}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue) {
                e.preventDefault();
                handleAddSkill(inputValue);
                setInputValue('');
              }
            }}
          />
        )}
      />
      <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            onDelete={() => handleDeleteSkill(skill)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </Box>
  );
};

export default StepSkills;