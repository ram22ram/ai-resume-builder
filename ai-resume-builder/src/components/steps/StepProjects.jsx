import React from 'react';
import { Box, Grid, TextField, Button, IconButton, Divider, Typography, CircularProgress } from '@mui/material';
import { Plus, Trash2, Code, Sparkles, Link as LinkIcon, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'; // Import DND

const StepProjects = ({ resumeData, errors, handlers, loadingAi }) => {
  const { projects } = resumeData;
  const { 
    handleListChange, 
    addListItem, 
    deleteListItem, 
    handleAiGenerate,
    handleListReorder // <-- Extract reorder handler
  } = handlers;

  const projectsErrors = errors.projects || [];

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(projects);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    handleListReorder('projects', newItems);
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Showcase your best projects.
      </Typography>
       <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
         Add your Projects. Drag to reorder them based on relevance.
      </Typography>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {projects.map((proj, index) => {
                const itemErrors = projectsErrors.find(err => err.id === proj.id) || {};

                return (
                  <Draggable key={proj.id} draggableId={String(proj.id)} index={index}>
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
                          borderColor: itemErrors.title ? '#d32f2f' : 'transparent',
                          '&:hover': {
                            boxShadow: 4,
                            borderColor: itemErrors.title ? '#d32f2f' : '#6366f1' // Indigo color
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

                              <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Code size={16} color="#6366f1" />
                              </Box>
                              <Typography variant="body1" sx={{ fontWeight: '600', color: 'grey.700' }}>
                                Project #{index + 1}
                              </Typography>
                            </Box>
                            {projects.length > 1 && (
                              <IconButton onClick={() => deleteListItem('projects', proj.id)} size="small" sx={{ '&:hover': { bgcolor: '#fee2e2', color: '#dc2626' }}}>
                                <Trash2 size={18} />
                              </IconButton>
                            )}
                          </Box>
                          
                          <Divider sx={{ mb: 2 }} />

                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Project Title"
                                name="title"
                                value={proj.title}
                                onChange={(e) => handleListChange('projects', proj.id, e)}
                                fullWidth
                                variant="outlined"
                                error={!!itemErrors.title}
                                helperText={itemErrors.title || ''}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                label="Project Link (GitHub/Live)"
                                name="link"
                                value={proj.link}
                                onChange={(e) => handleListChange('projects', proj.id, e)}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                  startAdornment: <LinkIcon size={18} style={{ marginRight: 8, color: 'gray' }} />
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Description"
                                name="description"
                                value={proj.description}
                                onChange={(e) => handleListChange('projects', proj.id, e)}
                                fullWidth
                                variant="outlined"
                                multiline
                                rows={4}
                                placeholder="• Built a full-stack e-commerce site...&#10;• Deployed using Vercel and Supabase..."
                              />
                              <Button
                                variant="text"
                                startIcon={loadingAi ? <CircularProgress size={16} /> : <Sparkles size={16} />}
                                disabled={loadingAi}
                                onClick={() => handleAiGenerate('projects', proj.id, proj.title)}
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

      {/* STYLED ADD BUTTON (Indigo Theme for Projects) */}
      <Button
        onClick={() => addListItem('projects')}
        variant="outlined"
        startIcon={<Plus size={18} />}
        sx={{
          width: '100%', 
          py: 1.5,
          border: '2px dashed #6366f1', // Indigo border
          color: '#6366f1',            // Indigo text
          borderRadius: '12px',
          fontWeight: '600',
          textTransform: 'none',
          transition: 'all 0.2s',
          '&:hover': {
            borderStyle: 'solid',
            bgcolor: '#eef2ff',        // Light indigo bg
            transform: 'translateY(-2px)',
            boxShadow: 2,
          }
        }}
      >
        Add Another Project
      </Button>
    </Box>
  );
};

export default StepProjects;