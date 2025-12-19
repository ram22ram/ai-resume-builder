import React from 'react';
import { Box, TextField, Button, IconButton, Typography, Paper } from '@mui/material';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
// ✅ Date Handling Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const StepEducation = ({ resumeData, handlers }: any) => {
  const { education } = resumeData;
  const { handleListChange, handleDateChange, addListItem, deleteListItem } = handlers;

  const darkInput = {
    '& .MuiOutlinedInput-root': { 
      color: 'white', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2,
      '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' }
    },
    '& .MuiInputLabel-root': { color: '#94a3b8' },
    '& .MuiSvgIcon-root': { color: '#94a3b8' } // Fix icon color
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
          <Paper key={edu.id} sx={{ p: 3, mb: 3, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography sx={{ color: 'white', fontWeight: 600 }}>Education #{index + 1}</Typography>
              <IconButton onClick={() => deleteListItem('education', edu.id)} sx={{ color: '#ef4444', bgcolor: 'rgba(239,68,68,0.1)' }}><Trash2 size={16} /></IconButton>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 45%' }}>
                <TextField
                  fullWidth label="School / University" name="school" value={edu.school} 
                  onChange={(e) => handleListChange('education', edu.id, e)}
                  sx={darkInput}
                />
              </Box>
              <Box sx={{ flex: '1 1 45%' }}>
                <TextField
                  fullWidth label="Degree" name="degree" value={edu.degree} 
                  onChange={(e) => handleListChange('education', edu.id, e)}
                  sx={darkInput}
                />
              </Box>
              
              {/* ✅ DATE PICKER FIXED: Only Month & Year */}
              <Box sx={{ flex: '1 1 45%' }}>
                <DatePicker 
                  label="Start Date" 
                  views={['year', 'month']} 
                  format="MM/YYYY" 
                  value={edu.startDate ? dayjs(edu.startDate) : null} 
                  onChange={(newValue) => handleDateChange('education', edu.id, 'startDate', newValue)} 
                  slotProps={{ textField: { fullWidth: true, sx: darkInput } }} 
                />
              </Box>
              <Box sx={{ flex: '1 1 45%' }}>
                <DatePicker 
                  label="End Date" 
                  views={['year', 'month']} 
                  format="MM/YYYY" 
                  value={edu.endDate ? dayjs(edu.endDate) : null} 
                  onChange={(newValue) => handleDateChange('education', edu.id, 'endDate', newValue)} 
                  slotProps={{ textField: { fullWidth: true, sx: darkInput } }} 
                />
              </Box>
            </Box>
          </Paper>
        ))}

        <Button variant="outlined" startIcon={<Plus />} onClick={() => addListItem('education')} fullWidth sx={{ color: '#a855f7', borderColor: '#a855f7', borderStyle: 'dashed', py: 1.5, '&:hover': { bgcolor: 'rgba(168,85,247,0.1)' } }}>
          Add Education
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default StepEducation;