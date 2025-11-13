import React from 'react';
import { 
  Box, TextField, Typography, Button, Grid, 
  IconButton, Checkbox, FormControlLabel 
} from '@mui/material';
import { Delete, Plus } from 'lucide-react';
import SuggestBullets from '../common/SuggestBullets';

const StepExperience = ({ resumeData, handlers, errors }) => {
  const { experience } = resumeData;
  // 'handleListChange' ab sabhi text fields ko handle karega
  // Naya 'handleExperienceCheckboxChange' checkbox ko handle karega
  const { handleListChange, addListItem, deleteListItem, handleExperienceCheckboxChange, handleAiGenerate } = handlers;

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Work Experience</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Start with your most recent job.
      </Typography>
      
      {experience.map((item, index) => (
        <Box 
          key={item.id} 
          sx={{ 
            mb: 3, 
            p: 2, 
            border: '1px solid #e2e8f0', 
            borderRadius: '12px',
            background: '#f8fafc'
          }}
        >
          <Grid container spacing={2}>
            
            {/* Job Title */}
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="title"
                value={item.title}
                onChange={(e) => handleListChange('experience', item.id, e)}
              />
            </Grid>
            
            {/* Company */}
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={item.company}
                onChange={(e) => handleListChange('experience', item.id, e)}
              />
            </Grid>

            {/* --- FIX 1: Location Field --- */}
            <Grid xs={12} sm={12}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={item.location}
                placeholder="e.g., Jabalpur, MP"
                onChange={(e) => handleListChange('experience', item.id, e)}
              />
            </Grid>

            {/* --- FIX 2: Start Date Field --- */}
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="startDate"
                type="date"
                value={item.startDate}
                onChange={(e) => handleListChange('experience', item.id, e)}
                InputLabelProps={{ shrink: true }} // Taaki label hamesha oopar rahe
              />
            </Grid>

            {/* --- FIX 3: End Date Field --- */}
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="endDate"
                type="date"
                value={item.endDate}
                onChange={(e) => handleListChange('experience', item.id, e)}
                InputLabelProps={{ shrink: true }}
                disabled={item.isPresent} // Checkbox checked hone par disable karein
              />
            </Grid>
            
            {/* --- FIX 4: "Present" Checkbox --- */}
            <Grid xs={12}>
              <FormControlLabel 
                control={
                  <Checkbox 
                    checked={item.isPresent}
                    onChange={(e) => handleExperienceCheckboxChange(item.id, e.target.checked)}
                  />
                } 
                label="I currently work here" 
              />
            </Grid>

            {/* Description */}
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Description (Key Responsibilities & Achievements)"
                name="description"
                multiline
                rows={5}
                value={item.description}
                onChange={(e) => handleListChange('experience', item.id, e)}
                placeholder="- Developed feature X, resulting in Y% user increase."
              />
              <SuggestBullets
                title={item.title}
                contextData={resumeData}
                // AI call ko 'handleAiGenerate' ke zariye route karein
                onGenerate={(title) => handleAiGenerate('bullets', title, resumeData)}
                onSelectBullet={(bullet) => {
                  const newValue = (item.description + `\n- ${bullet}`).trim();
                  handleListChange('experience', item.id, { target: { name: 'description', value: newValue } });
                }}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ textAlign: 'right', mt: 1 }}>
            <IconButton 
              onClick={() => deleteListItem('experience', item.id)} 
              color="error" 
              size="small"
              disabled={experience.length === 1} // Aakhri item delete na ho
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
      ))}
      
      <Button 
        startIcon={<Plus />} 
        // FIX 5: 'addListItem' ko "smart" tareeke se call karein
        onClick={() => addListItem('experience')} 
        variant="outlined"
      >
        Add Experience
      </Button>
    </Box>
  );
};

export default StepExperience;