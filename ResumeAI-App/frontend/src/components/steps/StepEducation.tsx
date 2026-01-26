// StepEducation.tsx - REPLACE ENTIRE FILE
import { Box, TextField, Button, IconButton, Typography, Paper } from '@mui/material';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const StepEducation = ({ resumeData, handlers }: any) => {
  const education = Array.isArray(resumeData) ? resumeData : (resumeData?.education || []);
  const { handleListChange, handleDateChange, addListItem, deleteListItem } = handlers;

  // Simplified date parser
  const parseDate = (dateValue: any) => {
    if (!dateValue) return null;
    
    try {
      // If it's a dayjs object
      if (dayjs.isDayjs(dateValue) && dateValue.isValid()) {
        return dateValue;
      }
      
      // If it's a string
      if (typeof dateValue === 'string') {
        // Handle YYYY-MM-DD format
        if (dateValue.match(/^\d{4}-\d{2}-\d{2}$/)) {
          return dayjs(dateValue, 'YYYY-MM-DD');
        }
        // Try parsing as ISO
        const d = dayjs(dateValue);
        return d.isValid() ? d : null;
      }
      
      return null;
    } catch (error) {
      console.warn('Error parsing date:', error);
      return null;
    }
  };

  // Simplified date handler
  const handleDateSelect = (section: string, id: string, field: string, newValue: any) => {
    if (!newValue || !dayjs.isDayjs(newValue)) {
      // Clear the date
      if (handleDateChange) {
        handleDateChange(section, id, field, null);
      }
      return;
    }
    
    if (!newValue.isValid()) {
      console.warn('Invalid date selected');
      return;
    }
    
    // Ensure month is set
    let finalDate = newValue;
    if (finalDate.month() === undefined || finalDate.month() === null) {
      finalDate = finalDate.month(0); // January
    }
    
    // Format as YYYY-MM-DD
    const formattedDate = finalDate.format('YYYY-MM-DD');
    
    if (handleDateChange) {
      handleDateChange(section, id, field, formattedDate);
    }
  };

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <GraduationCap color="#a855f7" /> Education
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, color: '#94a3b8' }}>
          Add your academic details.
        </Typography>

        {education.map((edu: any, index: number) => (
          <Paper key={edu.id} sx={{ 
            p: 3, 
            mb: 3, 
            bgcolor: 'rgba(15, 23, 42, 0.6)', 
            border: '1px solid rgba(255,255,255,0.1)', 
            borderRadius: 3 
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: '#d8b4fe', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                Education #{index + 1}
              </Typography>
              <IconButton 
                onClick={() => deleteListItem && deleteListItem('education', edu.id)} 
                sx={{ color: '#f87171', '&:hover': { bgcolor: 'rgba(248,113,113,0.1)' } }}
              >
                <Trash2 size={18} />
              </IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 45%' }}>
                <TextField
                  fullWidth 
                  label="School / University" 
                  name="school" 
                  value={edu.school || ''} 
                  onChange={(e) => handleListChange && handleListChange('education', edu.id, e)}
                  sx={darkInput}
                />
              </Box>
              <Box sx={{ flex: '1 1 45%' }}>
                <TextField
                  fullWidth 
                  label="Degree" 
                  name="degree" 
                  value={edu.degree || ''} 
                  onChange={(e) => handleListChange && handleListChange('education', edu.id, e)}
                  sx={darkInput}
                />
              </Box>
              
              {/* Simplified DatePicker */}
              <Box sx={{ flex: '1 1 45%' }}>
                <DatePicker 
                  label="Start Date" 
                  views={['year', 'month']} 
                  format="MM/YYYY"
                  value={parseDate(edu.startDate)}
                  onChange={(newValue) => handleDateSelect('education', edu.id, 'startDate', newValue)}
                  openTo="year"
                  slotProps={{ 
                    textField: { 
                      fullWidth: true, 
                      sx: darkInput 
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
                            backgroundColor: '#a855f7'
                          }
                        },
                        '& .MuiPickersYear-yearButton': {
                          color: 'white',
                          '&.Mui-selected': {
                            backgroundColor: '#a855f7'
                          }
                        }
                      }
                    }
                  }}
                />
              </Box>
              
              <Box sx={{ flex: '1 1 45%' }}>
                <DatePicker 
                  label="End Date" 
                  views={['year', 'month']} 
                  format="MM/YYYY"
                  value={parseDate(edu.endDate)}
                  onChange={(newValue) => handleDateSelect('education', edu.id, 'endDate', newValue)}
                  openTo="year"
                  slotProps={{ 
                    textField: { 
                      fullWidth: true, 
                      sx: darkInput 
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
                            backgroundColor: '#a855f7'
                          }
                        },
                        '& .MuiPickersYear-yearButton': {
                          color: 'white',
                          '&.Mui-selected': {
                            backgroundColor: '#a855f7'
                          }
                        }
                      }
                    }
                  }}
                />
              </Box>
            </Box>
          </Paper>
        ))}

        <Button 
          variant="outlined" 
          startIcon={<Plus />} 
          onClick={() => addListItem && addListItem('education')} 
          fullWidth 
          sx={{ 
            color: '#a855f7', 
            borderColor: 'rgba(168,85,247,0.3)', 
            borderStyle: 'dashed', 
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            '&:hover': { 
              borderColor: '#a855f7', 
              bgcolor: 'rgba(168,85,247,0.1)' 
            } 
          }}
        >
          Add Education
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default StepEducation;