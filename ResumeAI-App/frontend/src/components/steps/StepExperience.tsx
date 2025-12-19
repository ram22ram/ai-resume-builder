import React from 'react';
import { Box, TextField, Button, IconButton, Typography, Paper, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import { Plus, Trash2, Briefcase, Sparkles, GripVertical } from 'lucide-react';
// ✅ Date Handling Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import dayjs from 'dayjs';

const StepExperience = ({ resumeData, handlers, loadingAi }: any) => {
  const { experience } = resumeData;
  const { handleListChange, handleDateChange, addListItem, deleteListItem, handleAiGenerate, handleExperienceCheckboxChange, handleListReorder } = handlers;

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newItems = Array.from(experience);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    handleListReorder('experience', newItems);
  };

  const darkInput = {
    '& .MuiOutlinedInput-root': { 
      color: 'white', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2,
      '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' }
    },
    '& .MuiInputLabel-root': { color: '#94a3b8' },
    '& .MuiSvgIcon-root': { color: '#94a3b8' }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Briefcase color="#3b82f6" /> Work Experience
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: '#94a3b8' }}>
          Highlight your past roles. Drag to reorder.
        </Typography>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="experience-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {experience.map((exp: any, index: number) => (
                  <Draggable key={exp.id} draggableId={String(exp.id)} index={index}>
                    {(provided) => (
                      <Paper 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{ 
                          p: 3, mb: 3, 
                          bgcolor: 'rgba(255,255,255,0.03)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: 3,
                          ...provided.draggableProps.style
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <div {...provided.dragHandleProps} style={{ cursor: 'grab', color: '#64748b' }}><GripVertical size={20} /></div>
                            <Typography sx={{ color: 'white', fontWeight: 600 }}>Job #{index + 1}</Typography>
                          </Box>
                          <IconButton onClick={() => deleteListItem('experience', exp.id)} sx={{ color: '#ef4444', bgcolor: 'rgba(239,68,68,0.1)' }}><Trash2 size={16} /></IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                          <Box sx={{ flex: '1 1 45%' }}>
                            <TextField fullWidth label="Job Title" name="title" value={exp.title} onChange={(e) => handleListChange('experience', exp.id, e)} sx={darkInput} />
                          </Box>
                          <Box sx={{ flex: '1 1 45%' }}>
                            <TextField fullWidth label="Company" name="company" value={exp.company} onChange={(e) => handleListChange('experience', exp.id, e)} sx={darkInput} />
                          </Box>
                          
                          {/* ✅ DATE PICKER FIXED: MM/YYYY Format */}
                          <Box sx={{ flex: '1 1 45%' }}>
                            <DatePicker 
                              label="Start Date" 
                              views={['year', 'month']} 
                              format="MM/YYYY" 
                              value={exp.startDate ? dayjs(exp.startDate) : null} 
                              onChange={(newValue) => handleDateChange('experience', exp.id, 'startDate', newValue)} 
                              slotProps={{ textField: { fullWidth: true, sx: darkInput } }} 
                            />
                          </Box>
                          <Box sx={{ flex: '1 1 45%' }}>
                            <DatePicker 
                              label="End Date" 
                              views={['year', 'month']} 
                              format="MM/YYYY" 
                              value={exp.endDate ? dayjs(exp.endDate) : null} 
                              onChange={(newValue) => handleDateChange('experience', exp.id, 'endDate', newValue)} 
                              disabled={exp.isPresent} 
                              slotProps={{ textField: { fullWidth: true, sx: darkInput } }} 
                            />
                            <FormControlLabel control={<Checkbox checked={exp.isPresent || false} onChange={(e) => handleExperienceCheckboxChange(exp.id, e.target.checked)} sx={{ color: '#94a3b8', '&.Mui-checked': { color: '#3b82f6' } }} />} label={<Typography variant="caption" color="#94a3b8">Currently working here</Typography>} />
                          </Box>
                          
                          <Box sx={{ flex: '1 1 100%' }}>
                            <TextField fullWidth multiline rows={3} label="Description" name="description" value={exp.description} onChange={(e) => handleListChange('experience', exp.id, e)} sx={darkInput} />
                            
                            {/* ✅ AI BUTTON */}
                            <Button 
                              startIcon={loadingAi ? <CircularProgress size={14} color="inherit"/> : <Sparkles size={14} />} 
                              onClick={() => handleAiGenerate('experience', exp.id, exp.title)} 
                              disabled={loadingAi}
                              sx={{ mt: 1, color: '#60a5fa', textTransform: 'none' }}
                            >
                              {loadingAi ? 'Writing...' : 'Auto-Write with AI'}
                            </Button>
                          </Box>
                        </Box>
                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Button variant="outlined" startIcon={<Plus />} onClick={() => addListItem('experience')} fullWidth sx={{ color: '#3b82f6', borderColor: '#3b82f6', borderStyle: 'dashed', py: 1.5, '&:hover': { bgcolor: 'rgba(59,130,246,0.1)' } }}>
          Add Position
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default StepExperience;