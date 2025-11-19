import React from 'react';
import { Box, Grid, TextField, Button, IconButton, Divider, Typography, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import { Plus, Trash2, Briefcase, Sparkles, MapPin, GripVertical } from 'lucide-react'; // Added GripVertical
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; // Import DND

const StepExperience = ({ resumeData, errors, handlers, loadingAi }) => {
  const { experience } = resumeData;
  const { 
    handleListChange, 
    handleDateChange, 
    addListItem, 
    deleteListItem, 
    handleAiGenerate,
    handleExperienceCheckboxChange,
    handleListReorder // <-- Extract reorder handler
  } = handlers;

  const experienceErrors = errors.experience || [];

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(experience);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    handleListReorder('experience', newItems);
  };

  return (
      <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            Add your professional experience.
          </Typography>
           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Drag to reorder items (most recent first is recommended).
          </Typography>
          
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="experience-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {experience.map((exp, index) => {
                const itemErrors = experienceErrors.find(err => err.id === exp.id) || {};
                
                return (
                  <Draggable key={exp.id} draggableId={String(exp.id)} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{
                          mb: 2.5,
                          bgcolor: 'white',
                          borderRadius: '12px',
                          border: '2px solid',
                          boxShadow: 1,
                          transition: 'all 0.3s',
                          borderColor: (itemErrors.title || itemErrors.company) ? '#d32f2f' : 'transparent',
                          '&:hover': {
                            boxShadow: 4,
                            borderColor: (itemErrors.title || itemErrors.company) ? '#d32f2f' : '#16a34a'
                          },
                          ...provided.draggableProps.style
                        }}
                      >
                        <Box sx={{ p: 2.5 }}>
                          {/* Header */}
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              
                              {/* DRAG HANDLE */}
                              <div {...provided.dragHandleProps} style={{ cursor: 'grab', display: 'flex', alignItems: 'center', color: '#94a3b8', marginRight: '8px' }}>
                                <GripVertical size={20} />
                              </div>

                              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Briefcase size={16} color="#16a34a" />
                              </Box>
                              <Typography variant="body1" sx={{ fontWeight: '600', color: 'grey.700' }}>
                                Experience #{index + 1}
                              </Typography>
                            </Box>
                            {experience.length > 1 && (
                              <IconButton onClick={() => deleteListItem('experience', exp.id)} size="small" sx={{ '&:hover': { bgcolor: '#fee2e2', color: '#dc2626' }}}>
                                <Trash2 size={18} />
                              </IconButton>
                            )}
                          </Box>
                          
                          <Divider sx={{ mb: 2 }} />

                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Job Title"
                                name="title"
                                value={exp.title}
                                onChange={(e) => handleListChange('experience', exp.id, e)}
                                fullWidth
                                variant="outlined"
                                error={!!itemErrors.title}
                                helperText={itemErrors.title || ''}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Company"
                                name="company"
                                value={exp.company}
                                onChange={(e) => handleListChange('experience', exp.id, e)}
                                fullWidth
                                variant="outlined"
                                error={!!itemErrors.company}
                                helperText={itemErrors.company || ''}
                              />
                            </Grid>
                             <Grid item xs={12}>
                              <TextField
                                label="Location"
                                name="location"
                                value={exp.location}
                                onChange={(e) => handleListChange('experience', exp.id, e)}
                                fullWidth
                                variant="outlined"
                                placeholder="e.g. New York, Remote"
                                InputProps={{
                                  startAdornment: <MapPin size={18} style={{ marginRight: 8, color: 'gray' }} />
                                }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <DatePicker
                                label="Start Date"
                                views={['year', 'month']}
                                format="MMM YYYY"
                                value={exp.startDate ? dayjs(exp.startDate) : null}
                                onChange={(newValue) => handleDateChange('experience', exp.id, 'startDate', newValue)}
                                slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <DatePicker
                                label="End Date"
                                views={['year', 'month']}
                                format="MMM YYYY"
                                value={exp.endDate ? dayjs(exp.endDate) : null}
                                onChange={(newValue) => handleDateChange('experience', exp.id, 'endDate', newValue)}
                                disabled={exp.isPresent}
                                slotProps={{ textField: { fullWidth: true, variant: 'outlined' } }}
                              />
                               <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={exp.isPresent || false}
                                    onChange={(e) => handleExperienceCheckboxChange(exp.id, e.target.checked)}
                                    size="small"
                                  />
                                }
                                label={<Typography variant="caption">I currently work here</Typography>}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Description"
                                name="description"
                                value={exp.description}
                                onChange={(e) => handleListChange('experience', exp.id, e)}
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={4}
                                placeholder="• Led a team of 5 engineers...&#10;• Improved system performance by 40%..."
                              />
                               <Button
                                variant="text"
                                startIcon={loadingAi ? <CircularProgress size={16} /> : <Sparkles size={16} />}
                                disabled={loadingAi}
                                onClick={() => handleAiGenerate('experience', exp.id, exp.title)}
                                sx={{ 
                                  mt: 1, 
                                  textTransform: 'none', 
                                  color: '#6366f1',
                                  '&:hover': { bgcolor: '#eef2ff' }
                                }}
                              >
                                {loadingAi ? 'Generating...' : 'Auto-generate with AI'}
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* STYLED ADD BUTTON (Green Theme for Experience) */}
      <Button
        onClick={() => addListItem('experience')}
        variant="outlined"
        startIcon={<Plus size={18} />}
        sx={{
          width: '100%', 
          py: 1.5,
          border: '2px dashed #16a34a', // Green border
          color: '#16a34a',            // Green text
          borderRadius: '12px',
          fontWeight: '600',
          textTransform: 'none',
          transition: 'all 0.2s',
          '&:hover': {
            borderStyle: 'solid',
            bgcolor: '#f0fdf4',        // Light green bg
            transform: 'translateY(-2px)',
            boxShadow: 2,
          }
        }}
      >
        Add Another Experience
      </Button>
    </Box>
  );
};

export default StepExperience;