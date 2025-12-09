import React from 'react';
import { Box, Grid, TextField, Typography, Button, IconButton, Alert, Divider, CircularProgress } from '@mui/material';
import { Plus, Trash2, Code, Sparkles } from 'lucide-react';

function ProjectsSection({ data, onChange, onAdd, onDelete, errors = [], onAiGenerate, loadingAi }) {
  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc' }}>
      <Typography variant="body2" sx={{ mb: 3, color: 'grey.600', fontStyle: 'italic' }}>
        Showcase your best projects.
      </Typography>

      {data.map((proj, index) => {
        const itemErrors = errors.find(err => err.id === proj.id) || {};

        return (
          <Box
            key={proj.id}
            sx={{
              mb: 2.5, bgcolor: 'white', borderRadius: '12px',
              border: '2px solid', boxShadow: 1,
              transition: 'all 0.3s',
              borderColor: itemErrors.title ? '#d32f2f' : 'transparent',
              '&:hover': { 
                boxShadow: 4, 
                borderColor: itemErrors.title ? '#d32f2f' : '#6366f1' 
              }
            }}
          >
            <Box sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Code size={16} color="#6366f1" />
                  </Box>
                  <Typography variant="body1" sx={{ fontWeight: 'semibold', color: 'grey.700' }}>
                    Project #{index + 1}
                  </Typography>
                </Box>
                {data.length > 1 && (
                  <IconButton onClick={() => onDelete(proj.id)} size="small" sx={{ '&:hover': { bgcolor: '#fee2e2', color: '#dc2626' }}}>
                    <Trash2 size={20} />
                  </IconButton>
                )}
              </Box>
              
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Project Title" name="title" value={proj.title} 
                    onChange={(e) => onChange(proj.id, e)} fullWidth variant="outlined" 
                    error={!!itemErrors.title} helperText={itemErrors.title || ' '}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Project Link (GitHub/Live)" name="link" value={proj.link} 
                    onChange={(e) => onChange(proj.id, e)} fullWidth variant="outlined" 
                    helperText=" "
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    label="Description (Use '•' for bullet points)"
                    name="description"
                    value={proj.description}
                    onChange={(e) => onChange(proj.id, e)}
                    fullWidth variant="outlined"
                    multiline rows={4}
                    placeholder="• Built a full-stack e-commerce site...&#10;• Deployed using Vercel and Supabase..."
                    helperText=" "
                  />
                  <Button
                    variant="outlined"
                    startIcon={loadingAi ? <CircularProgress size={16} /> : <Sparkles size={16} />}
                    disabled={loadingAi}
                    onClick={() => onAiGenerate('projects', proj.id, proj.title)}
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
          border: '2px dashed #6366f1',
          color: '#6366f1',
          borderRadius: '12px',
          fontWeight: 'semibold',
          '&:hover': {
            borderStyle: 'solid',
            bgcolor: '#eef2ff',
            transform: 'translateY(-2px)',
            boxShadow: 2,
          }
        }}
      >
        Add Another Project
      </Button>
    </Box>
  );
}

export default ProjectsSection;