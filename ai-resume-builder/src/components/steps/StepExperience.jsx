import React from 'react';
import { Box, TextField, Typography, Button, Grid, IconButton } from '@mui/material';
import { Delete, Plus } from 'lucide-react';
// import { DatePicker } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SuggestBullets from '../common/SuggestBullets';

const StepExperience = ({ resumeData, handlers, errors }) => {
  const { experience } = resumeData;
  const { handleListChange, handleDateChange, addListItem, deleteListItem } = handlers;

  return (
    <Box>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        <Typography variant="h5" gutterBottom>Work Experience</Typography>
        {experience.map((item, index) => (
          <Box key={item.id} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
            <Grid container spacing={2}>
              
              {/* FIX: 'item' prop yahaan se hata diya gaya hai */}
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Job Title"
                  name="title"
                  value={item.title}
                  onChange={(e) => handleListChange('experience', item.id, e)}
                  // error & helperText logic
                />
              </Grid>
              
              {/* FIX: 'item' prop yahaan se hata diya gaya hai */}
              <Grid xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  name="company"
                  value={item.company}
                  onChange={(e) => handleListChange('experience', item.id, e)}
                />
              </Grid>
              {/* Add DatePickers here */}
              
              {/* FIX: 'item' prop yahaan se hata diya gaya hai */}
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
                  onSelectBullet={(bullet) => {
                    const newValue = (item.description + `\n- ${bullet}`).trim();
                    handleListChange('experience', item.id, { target: { name: 'description', value: newValue } });
                  }}
                />
              </Grid>
            </Grid>
            <IconButton onClick={() => deleteListItem('experience', item.id)} color="error" size="small" sx={{ mt: 1 }}>
              <Delete />
            </IconButton>
          </Box>
        ))}
        <Button 
          startIcon={<Plus />} 
          onClick={() => addListItem('experience', { id: Date.now(), title: '', company: '', startDate: null, endDate: null, description: '' })}
        >
          Add Experience
        </Button>
      {/* </LocalizationProvider> */}
    </Box>
  );
};

export default StepExperience;