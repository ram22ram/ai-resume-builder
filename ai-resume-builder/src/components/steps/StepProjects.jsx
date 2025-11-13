import React from 'react';
import { Box, TextField, Typography, Button, Grid, IconButton } from '@mui/material';
import { Delete, Plus } from 'lucide-react';
import SuggestBullets from '../common/SuggestBullets';

const StepProjects = ({ resumeData, handlers, errors }) => {
  const { projects } = resumeData;
  const { handleListChange, addListItem, deleteListItem } = handlers;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Projects</Typography>
      {projects.map((item, index) => (
        <Box key={item.id} sx={{ mb: 3, p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
          <Grid container spacing={2}>
            
            {/* FIX: 'item' prop yahaan se hata diya gaya hai */}
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Title"
                name="title"
                value={item.title}
                onChange={(e) => handleListChange('projects', item.id, e)}
              />
            </Grid>
            
            {/* FIX: 'item' prop yahaan se hata diya gaya hai */}
            <Grid xs={12} sm={6}>
              <TextField
                fullWidth
                label="Project Link (GitHub/Live)"
                name="link"
                value={item.link}
                onChange={(e) => handleListChange('projects', item.id, e)}
              />
            </Grid>
            
            {/* FIX: 'item' prop yahaan se hata diya gaya hai */}
            <Grid xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={item.description}
                onChange={(e) => handleListChange('projects', item.id, e)}
              />
              <SuggestBullets
                title={item.title}
                contextData={resumeData}
                onSelectBullet={(bullet) => {
                  const newValue = (item.description + `\n- ${bullet}`).trim();
                  handleListChange('projects', item.id, { target: { name: 'description', value: newValue } });
                }}
              />
            </Grid>
          </Grid>
          <IconButton onClick={() => deleteListItem('projects', item.id)} color="error" size="small" sx={{ mt: 1 }}>
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Button 
        startIcon={<Plus />} 
        onClick={() => addListItem('projects', { id: Date.now(), title: '', link: '', description: '' })}
      >
        Add Project
      </Button>
    </Box>
  );
};

export default StepProjects;