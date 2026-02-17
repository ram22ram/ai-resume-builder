// StepExperience.tsx - REPLACE ENTIRE FILE
import { Box, TextField, Button, IconButton, Typography, Paper, Checkbox, FormControlLabel, CircularProgress } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Plus, Trash2, Briefcase, GripVertical, Zap } from 'lucide-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import dayjs from 'dayjs';

const StepExperience = ({ resumeData, handlers, loadingAi }: any) => {
  const experience = Array.isArray(resumeData) ? resumeData : (resumeData?.experience || []);
  
  // Destructure handlers properly
  const { 
    handleListChange, 
    handleDateChange, 
    addListItem, 
    deleteListItem, 
    handleAiAction, 
    handleExperienceCheckboxChange, 
    handleListReorder 
  } = handlers || {};

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newItems = Array.from(experience);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    handleListReorder && handleListReorder('experience', newItems);
  };

  const parseDate = (dateValue: any) => {
    if (!dateValue) return null;
    
    // Handle different date formats
    if (typeof dateValue === 'string') {
      // Try to parse date string (handle YYYY-MM-DD format)
      if (dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return dayjs(dateValue, 'YYYY-MM-DD');
      }
      // Try parsing as ISO string
      const d = dayjs(dateValue);
      return d.isValid() ? d : null;
    }
    
    // If it's already a dayjs object
    if (dayjs.isDayjs(dateValue)) {
      return dateValue.isValid() ? dateValue : null;
    }
    
    return null;
  };

  // Simplified date handler
  const handleDateSelect = (field: 'startDate' | 'endDate', id: string, newValue: any) => {
    if (!newValue || !dayjs.isDayjs(newValue)) {
      // Clear the date
      if (handleDateChange) {
        handleDateChange('experience', id, field, null);
      }
      return;
    }
    
    if (!newValue.isValid()) {
      console.warn('Invalid date selected');
      return;
    }
    
    // Ensure month is set (default to January if only year selected)
    let finalDate = newValue;
    if (finalDate.month() === undefined || finalDate.month() === null) {
      finalDate = finalDate.month(0); // January
    }
    
    // Format as YYYY-MM-DD (consistent format)
    const formattedDate = finalDate.format('YYYY-MM-DD');
    
    if (handleDateChange) {
      handleDateChange('experience', id, field, formattedDate);
    }
  };

  const darkInput = {
    '& .MuiOutlinedInput-root': { 
      color: 'white', 
      bgcolor: 'rgba(30, 41, 59, 0.4)', 
      borderRadius: '8px',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
      '&.Mui-focused fieldset': { borderColor: '#3b82f6' }
    },
    '& .MuiInputLabel-root': { color: '#94a3b8' },
    '& .MuiSvgIcon-root': { color: '#3b82f6' },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Briefcase color="#3b82f6" /> Work Experience
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: '#94a3b8' }}>
          Describe your impact. Drag items to change order.
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
                          p: 3, mb: 4, 
                          bgcolor: 'rgba(15, 23, 42, 0.6)', 
                          border: '1px solid rgba(255,255,255,0.08)', 
                          borderRadius: 4,
                          position: 'relative',
                          zIndex: 1,
                          ...provided.draggableProps.style
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <div {...provided.dragHandleProps} style={{ cursor: 'grab', color: '#475569' }}>
                              <GripVertical size={20} />
                            </div>
                            <Typography sx={{ color: '#60a5fa', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                              Experience #{index + 1}
                            </Typography>
                          </Box>
                          <IconButton 
                            size="small" 
                            onClick={() => deleteListItem && deleteListItem('experience', exp.id)} 
                            sx={{ color: '#f87171', '&:hover': { bgcolor: 'rgba(248,113,113,0.1)' } }}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Box>

                        <Grid container spacing={2.5}>
                          <Grid size={{ xs: 12, sm: 6 }} >
                            <TextField 
                              fullWidth 
                              label="Job Title" 
                              name="title" 
                              value={exp.title || ''} 
                              onChange={(e) => handleListChange && handleListChange('experience', exp.id, e)} 
                              sx={darkInput} 
                            />
                          </Grid>
                          <Grid size={{ xs: 12, sm: 6 }} >
                            <TextField 
                              fullWidth 
                              label="Company" 
                              name="company" 
                              value={exp.company || ''} 
                              onChange={(e) => handleListChange && handleListChange('experience', exp.id, e)} 
                              sx={darkInput} 
                            />
                          </Grid>
                          
                          <Grid size={{ xs: 6 }} >
                            <DatePicker 
                              label="From" 
                              views={['year', 'month']} 
                              format="MM/YYYY"
                              value={parseDate(exp.startDate)}
                              onChange={(newVal) => handleDateSelect('startDate', exp.id, newVal)}
                              openTo="year"
                              slotProps={{ 
                                textField: { 
                                  fullWidth: true, 
                                  sx: darkInput,
                                },
                                popper: { 
                                  sx: { 
                                    zIndex: 99999,
                                    '& .MuiPickersCalendarHeader-root': {
                                      color: 'white'
                                    },
                                    '& .MuiPickersMonth-monthButton': {
                                      color: 'white',
                                      '&.Mui-selected': {
                                        backgroundColor: '#3b82f6'
                                      }
                                    },
                                    '& .MuiPickersYear-yearButton': {
                                      color: 'white',
                                      '&.Mui-selected': {
                                        backgroundColor: '#3b82f6'
                                      }
                                    }
                                  },
                                  placement: 'bottom-start'
                                }
                              }}
                            />
                          </Grid>
                          <Grid size={{ xs: 6 }} >
                            <DatePicker 
                              label="To" 
                              views={['year', 'month']} 
                              format="MM/YYYY"
                              value={parseDate(exp.endDate)}
                              onChange={(newVal) => handleDateSelect('endDate', exp.id, newVal)}
                              disabled={exp.isPresent} 
                              openTo="year"
                              slotProps={{ 
                                textField: { 
                                  fullWidth: true, 
                                  sx: darkInput,
                                },
                                popper: { 
                                  sx: { 
                                    zIndex: 99999,
                                    '& .MuiPickersCalendarHeader-root': {
                                      color: 'white'
                                    },
                                    '& .MuiPickersMonth-monthButton': {
                                      color: 'white',
                                      '&.Mui-selected': {
                                        backgroundColor: '#3b82f6'
                                      }
                                    },
                                    '& .MuiPickersYear-yearButton': {
                                      color: 'white',
                                      '&.Mui-selected': {
                                        backgroundColor: '#3b82f6'
                                      }
                                    }
                                  },
                                  placement: 'bottom-start'
                                }
                              }}
                            />
                          </Grid>

                          <Grid size={{ xs: 12 }}  sx={{ mt: -1 }}>
                            <FormControlLabel 
                              control={
                                <Checkbox 
                                  size="small"
                                  checked={exp.isPresent || false} 
                                  onChange={(e) => handleExperienceCheckboxChange && handleExperienceCheckboxChange(exp.id, e.target.checked)} 
                                  sx={{ color: '#475569', '&.Mui-checked': { color: '#3b82f6' } }} 
                                />
                              } 
                              label={<Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500 }}>Currently working here</Typography>} 
                            />
                          </Grid>
                          
                          <Grid size={{ xs: 12 }} >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>Role Description</Typography>
                              <Button 
                                size="small"
                                variant="contained"
                                startIcon={loadingAi ? <CircularProgress size={12} color="inherit"/> : <Zap size={14} />} 
                                onClick={() => handleAiAction && handleAiAction('improve', 'experience', exp.id)} 
                                disabled={loadingAi || !exp.title}
                                sx={{ 
                                  bgcolor: '#7c3aed', 
                                  textTransform: 'none',
                                  fontSize: '0.7rem', 
                                  px: 2,
                                  '&:hover': { bgcolor: '#6d28d9' } 
                                }}
                              >
                                {loadingAi ? 'Writing...' : 'AI Auto-Write'}
                              </Button>
                            </Box>
                            <TextField 
                              fullWidth 
                              multiline 
                              rows={4} 
                              name="description" 
                              placeholder="Key achievements and responsibilities..."
                              value={exp.description || ''} 
                              onChange={(e) => handleListChange && handleListChange('experience', exp.id, e)} 
                              sx={darkInput} 
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Button 
          variant="outlined" 
          startIcon={<Plus size={18}/>} 
          onClick={() => addListItem && addListItem('experience')} 
          fullWidth 
          sx={{ 
            color: '#3b82f6', 
            borderColor: 'rgba(59,130,246,0.3)', 
            borderStyle: 'dashed', 
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            '&:hover': { borderColor: '#3b82f6', bgcolor: 'rgba(59,130,246,0.05)' }
          }}
        >
          Add New Position
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default StepExperience;