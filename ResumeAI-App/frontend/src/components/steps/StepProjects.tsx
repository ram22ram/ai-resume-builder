import React from 'react';
import { Box, TextField, Button, IconButton, Typography, Paper, CircularProgress } from '@mui/material';
import { Plus, Trash2, FolderGit2, Sparkles, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const StepProjects = ({ resumeData, handlers, loadingAi }: any) => {
  const { projects } = resumeData;
  const { handleListChange, addListItem, deleteListItem, handleAiGenerate, handleListReorder } = handlers;

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newItems = Array.from(projects);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    handleListReorder('projects', newItems);
  };

  const darkInput = {
    '& .MuiOutlinedInput-root': { 
      color: 'white', bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2,
      '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' }
    },
    '& .MuiInputLabel-root': { color: '#94a3b8' }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <FolderGit2 color="#f59e0b" /> Projects
      </Typography>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {projects.map((proj: any, index: number) => (
                <Draggable key={proj.id} draggableId={String(proj.id)} index={index}>
                  {(provided) => (
                    <Paper 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{ p: 3, mb: 3, bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 3, ...provided.draggableProps.style }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <div {...provided.dragHandleProps} style={{ cursor: 'grab', color: '#64748b' }}><GripVertical size={20} /></div>
                          <Typography sx={{ color: 'white', fontWeight: 600 }}>Project #{index + 1}</Typography>
                        </Box>
                        <IconButton onClick={() => deleteListItem('projects', proj.id)} sx={{ color: '#ef4444', bgcolor: 'rgba(239,68,68,0.1)' }}><Trash2 size={16} /></IconButton>
                      </Box>
                      
                      {/* ✅ ROBUST LAYOUT: CSS Grid */}
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        <Box>
                          <TextField fullWidth label="Title" name="title" value={proj.title} onChange={(e) => handleListChange('projects', proj.id, e)} sx={darkInput} />
                        </Box>
                        <Box>
                          <TextField fullWidth label="Link" name="link" value={proj.link} onChange={(e) => handleListChange('projects', proj.id, e)} sx={darkInput} />
                        </Box>
                        <Box sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }}>
                          <TextField fullWidth multiline rows={2} label="Description" name="description" value={proj.description} onChange={(e) => handleListChange('projects', proj.id, e)} sx={darkInput} />
                          <Button startIcon={loadingAi ? <CircularProgress size={14} color="inherit"/> : <Sparkles size={14} />} onClick={() => handleAiGenerate('projects', proj.id, proj.title)} sx={{ mt: 1, color: '#f59e0b', textTransform: 'none' }}>
                            {loadingAi ? 'Writing...' : 'Enhance with AI'}
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

      <Button variant="outlined" startIcon={<Plus />} onClick={() => addListItem('projects')} fullWidth sx={{ color: '#f59e0b', borderColor: '#f59e0b', borderStyle: 'dashed', py: 1.5, '&:hover': { bgcolor: 'rgba(245,158,11,0.1)' } }}>
        Add Project
      </Button>
    </Box>
  );
};

export default StepProjects;