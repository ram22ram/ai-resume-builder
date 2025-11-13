import React from 'react';
import { Box, Grid, TextField, Typography, Button, IconButton, Alert, Divider } from '@mui/material';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function EducationSection({ data, onChange, onDateChange, onAdd, onDelete, errors = [] }) {
  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc' }}>
      <Typography variant="body2" sx={{ mb: 3, color: 'grey.600', fontStyle: 'italic' }}>
        Add your educational qualifications.
      </Typography>

      {data.map((edu, index) => {
        const itemErrors = errors.find(err => err.id === edu.id) || {};

        return (
          <Box
            key={edu.id}
            sx={{
              mb: 2.5, bgcolor: 'white', borderRadius: '12px',
              border: '2px solid', boxShadow: 1,
              transition: 'all 0.3s',
              borderColor: (itemErrors.degree || itemErrors.school) ? '#d32f2f' : 'transparent',
              '&:hover': { 
                boxShadow: 4, 
                borderColor: (itemErrors.degree || itemErrors.school) ? '#d32f2f' : '#a855f7' 
              }
            }}
          >
            <Box sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#f3e8ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <GraduationCap size={16} color="#a855f7" />
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 'semibold', color: 'grey.700' }}>
                    Education #{index + 1}
                  </Typography>
                </Box>
                {data.length > 1 && (
                  <IconButton onClick={() => onDelete(edu.id)} size="small" sx={{ '&:hover': { bgcolor: '#fee2e2', color: '#dc2626' }}}>
                    <Trash2 size={20} />
                  </IconButton>
                )}
              </Box>
              
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <TextField 
                    label="Degree / Certificate" 
                    name="degree" 
                    value={edu.degree} 
                    onChange={(e) => onChange(edu.id, e)} 
                    fullWidth 
                    variant="outlined" 
                    error={!!itemErrors.degree}
                    helperText={itemErrors.degree || ' '}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField 
                    label="School / College" 
                    name="school" 
                    value={edu.school} 
                    onChange={(e) => onChange(edu.id, e)} 
                    fullWidth 
                    variant="outlined" 
                    error={!!itemErrors.school}
                    helperText={itemErrors.school || ' '}
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField 
                    label="City" 
                    name="city" 
                    value={edu.city} 
                    onChange={(e) => onChange(edu.id, e)} 
                    fullWidth 
                    variant="outlined" 
                    helperText=" "
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <DatePicker
                    label="Year of Completion"
                    views={['year']} format="YYYY"
                    value={edu.year ? dayjs(edu.year) : null}
                    onChange={(newValue) => onDateChange('education', edu.id, 'year', newValue)}
                    slotProps={{ textField: { fullWidth: true, variant: 'outlined', helperText: ' ' } }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        )
      })}

      <Button
        onClick={onAdd}
        variant="outlined"
        startIcon={<Plus size={18} />}
        sx={{
          width: '100%', py: 1.5,
          border: '2px dashed #a855f7',
          color: '#a855f7',
          borderRadius: '12px',
          fontWeight: 'semibold',
          '&:hover': {
            borderStyle: 'solid',
            bgcolor: '#f5f3ff',
            transform: 'translateY(-2px)',
            boxShadow: 2,
          }
        }}
      >
        Add Another Education
      </Button>
    </Box>
  );
}

export default EducationSection;