import React from 'react';
import { Box, Grid, TextField, Typography, Button, IconButton, Alert, Divider, CircularProgress } from '@mui/material';
import { Plus, Trash2, Briefcase, Sparkles } from 'lucide-react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function ExperienceSection({ data, onChange, onDateChange, onAdd, onDelete, errors = [], onAiGenerate, loadingAi }) { 
  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc' }}>
      <Typography variant="body2" sx={{ mb: 3, color: 'grey.600', fontStyle: 'italic' }}>
        Add your professional experience. Start with your most recent position.
      </Typography>

      {data.map((exp, index) => {
        const itemErrors = errors.find(err => err.id === exp.id) || {};
        
        return (
          <Box
            key={exp.id}
            sx={{
              mb: 2.5, bgcolor: 'white', borderRadius: '12px',
              border: '2px solid', boxShadow: 1, transition: 'all 0.3s',
              borderColor: (itemErrors.title || itemErrors.company) ? '#d32f2f' : 'transparent', 
              '&:hover': {
                boxShadow: 4,
                borderColor: (itemErrors.title || itemErrors.company) ? '#d32f2f' : '#16a34a'
              }
            }}
          >
            <Box sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Briefcase size={16} color="#16a34a" />
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 'semibold', color: 'grey.700' }}>
                    Experience #{index + 1}
                  </Typography>
                </Box>
                {data.length > 1 && (
                  <IconButton onClick={() => onDelete(exp.id)} size="small" sx={{ '&:hover': { bgcolor: '#fee2e2', color: '#dc2626' }}}>
                    <Trash2 size={20} />
                  </IconButton>
                )}
              </Box>
              
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Job Title" name="title" value={exp.title} 
                    onChange={(e) => onChange(exp.id, e)} fullWidth variant="outlined"
                    error={!!itemErrors.title} helperText={itemErrors.title || ' '} 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Company" name="company" value={exp.company} 
                    onChange={(e) => onChange(exp.id, e)} fullWidth variant="outlined" 
                    error={!!itemErrors.company} helperText={itemErrors.company || ' '}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="Start Date"
                    views={['year', 'month']} format="MMM YYYY"
                    value={exp.startDate ? dayjs(exp.startDate) : null}
                    onChange={(newValue) => onDateChange('experience', exp.id, 'startDate', newValue)}
                    slotProps={{ textField: { fullWidth: true, variant: 'outlined', helperText: ' ' } }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    label="End Date"
                    views={['year', 'month']} format="MMM YYYY"
                    value={exp.endDate ? dayjs(exp.endDate) : null}
                    onChange={(newValue) => onDateChange('experience', exp.id, 'endDate', newValue)}
                    slotProps={{ textField: { fullWidth: true, variant: 'outlined', helperText: ' ' } }}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    label="Description (Use '•' for bullet points)"
                    name="description"
                    value={exp.description}
                    onChange={(e) => onChange(exp.id, e)}
                    fullWidth variant="outlined"
                    multiline rows={4}
                    placeholder="• Led a team of 5 engineers...&#10;• Improved system performance by 40%..."
                    helperText=" "
                  />
                  <Button
                    variant="outlined"
                    startIcon={loadingAi ? <CircularProgress size={16} /> : <Sparkles size={16} />}
                    disabled={loadingAi}
                    onClick={() => onAiGenerate('experience', exp.id, exp.title)}
                    sx={{
                      mt: 1,
                      color: '#6366f1',
                      borderColor: '#6366f1',
                      '&:hover': { bgcolor: '#e0e7ff', borderColor: '#4f46e5' }
                    }}
                  >
                    {loadingAi ? 'Generating...' : 'Generate with AI'}
                  </Button>
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
          border: '2px dashed #16a34a',
          color: '#16a34a',
          borderRadius: '12px',
          fontWeight: 'semibold',
          '&:hover': {
            borderStyle: 'solid',
            bgcolor: '#f0fdf4',
            transform: 'translateY(-2px)',
            boxShadow: 2,
          }
        }}
      >
        Add Another Experience
      </Button>
      
      <Alert severity="info" icon="💼" sx={{ mt: 3, borderRadius: '8px', bgcolor: '#fff7ed', color: '#9a3412' }}>
        Pro Tip: Quantify your achievements! Use numbers, percentages, and metrics to show your impact.
      </Alert>
    </Box>
  );
}

export default ExperienceSection;