// StepProjects.tsx - UPDATE WITH LOADING STATES
import React, { useState } from 'react';
import { Box, TextField, Button, IconButton, Typography, Paper, CircularProgress } from '@mui/material';
import { Plus, Trash2, FolderGit2, Sparkles, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { SectionLoadingSkeleton } from '../LoadingSkeleton';

const StepProjects = ({ resumeData, handlers, loadingAi }: any) => {
  const projects = Array.isArray(resumeData) ? resumeData : (resumeData?.projects || []);
  const { handleListChange, addListItem, deleteListItem, handleListReorder, handleAiAction } = handlers || {};
  const [aiLoadingId, setAiLoadingId] = useState<number | null>(null);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newItems = Array.from(projects);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    handleListReorder && handleListReorder('projects', newItems);
  };

  const handleEnhanceWithAI = async (id: number, title: string) => {
    if (!handleAiAction) {
      console.error('No AI handler available');
      return;
    }
    
    setAiLoadingId(id);
    try {
      const result = await handleAiAction('improve', 'projects', id);
      
      // Update the project description
      if (result && !result.includes('unavailable') && !result.includes('timeout')) {
        handleListChange && handleListChange('projects', id, {
          target: {
            name: 'description',
            value: result
          }
        });
      }
    } catch (error) {
      console.error('AI enhancement failed:', error);
    } finally {
      setAiLoadingId(null);
    }
  };

  const darkInput = {
    '& .MuiOutlinedInput-root': { 
      color: 'white', 
      bgcolor: 'rgba(30, 41, 59, 0.4)', 
      borderRadius: '8px',
      '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
      '&.Mui-focused fieldset': { borderColor: '#f59e0b' }
    },
    '& .MuiInputLabel-root': { color: '#94a3b8' },
    '& .MuiSvgIcon-root': { color: '#f59e0b' }
  };

  // Show skeleton while loading
  if (loadingAi && projects.length === 0) {
    return <SectionLoadingSkeleton count={2} />;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: 'white', display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <FolderGit2 color="#f59e0b" /> Projects
      </Typography>
      <Typography variant="body2" sx={{ mb: 4, color: '#94a3b8' }}>
        Showcase your best work. Drag items to change order.
      </Typography>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="projects-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {projects.map((proj: any, index: number) => {
                const isAiLoading = aiLoadingId === proj.id;
                
                return (
                  <Draggable key={proj.id} draggableId={String(proj.id)} index={index}>
                    {(provided) => (
                      <Paper 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        sx={{ 
                          p: 3, 
                          mb: 3, 
                          bgcolor: 'rgba(15, 23, 42, 0.6)', 
                          border: '1px solid rgba(255,255,255,0.1)', 
                          borderRadius: 3, 
                          opacity: isAiLoading ? 0.8 : 1,
                          transition: 'opacity 0.3s ease',
                          ...provided.draggableProps.style 
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <div {...provided.dragHandleProps} style={{ cursor: 'grab', color: '#64748b' }}>
                              <GripVertical size={20} />
                            </div>
                            <Typography sx={{ color: '#fbbf24', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                              Project #{index + 1}
                            </Typography>
                          </Box>
                          <IconButton 
                            onClick={() => deleteListItem && deleteListItem('projects', proj.id)} 
                            sx={{ color: '#f87171', '&:hover': { bgcolor: 'rgba(248,113,113,0.1)' } }}
                            disabled={isAiLoading}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Box>
                        
                        {/* Layout Grid */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                          <Box>
                            <TextField 
                              fullWidth 
                              label="Title" 
                              name="title" 
                              value={proj.title || ''} 
                              onChange={(e) => handleListChange && handleListChange('projects', proj.id, e)} 
                              sx={darkInput}
                              disabled={isAiLoading}
                            />
                          </Box>
                          <Box>
                            <TextField 
                              fullWidth 
                              label="Link" 
                              name="link" 
                              value={proj.link || ''} 
                              onChange={(e) => handleListChange && handleListChange('projects', proj.id, e)} 
                              sx={darkInput}
                              disabled={isAiLoading}
                            />
                          </Box>
                          <Box sx={{ gridColumn: { xs: '1 / -1', md: '1 / -1' } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 600 }}>
                                Project Description
                              </Typography>
                              <Button 
                                startIcon={isAiLoading ? <CircularProgress size={12} color="inherit"/> : <Sparkles size={14} />} 
                                onClick={() => handleEnhanceWithAI(proj.id, proj.title)}
                                disabled={isAiLoading || loadingAi || !handleAiAction || !proj.title}
                                sx={{ 
                                  color: '#f59e0b', 
                                  textTransform: 'none',
                                  fontSize: '0.7rem',
                                  px: 2,
                                  minWidth: 120,
                                  '&:hover': { 
                                    bgcolor: 'rgba(245,158,11,0.1)' 
                                  },
                                  '&.Mui-disabled': {
                                    color: 'rgba(245,158,11,0.3)'
                                  }
                                }}
                              >
                                {isAiLoading ? 'AI Writing...' : 'Enhance with AI'}
                              </Button>
                            </Box>
                            <TextField 
                              fullWidth 
                              multiline 
                              rows={4} 
                              label="Description" 
                              name="description" 
                              value={proj.description || ''} 
                              onChange={(e) => handleListChange && handleListChange('projects', proj.id, e)} 
                              sx={darkInput} 
                              placeholder="Describe your project, technologies used, challenges faced, and outcomes..."
                              disabled={isAiLoading}
                            />
                            
                            {/* AI Status Indicator */}
                            {isAiLoading && (
                              <Typography variant="caption" sx={{ 
                                display: 'block', 
                                mt: 1, 
                                color: '#fbbf24',
                                fontStyle: 'italic'
                              }}>
                                AI is enhancing your project description...
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Paper>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button 
        variant="outlined" 
        startIcon={<Plus />} 
        onClick={() => addListItem && addListItem('projects')} 
        fullWidth 
        sx={{ 
          color: '#f59e0b', 
          borderColor: 'rgba(245,158,11,0.3)', 
          borderStyle: 'dashed', 
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          '&:hover': { 
            borderColor: '#f59e0b', 
            bgcolor: 'rgba(245,158,11,0.1)' 
          } 
        }}
      >
        Add Project
      </Button>
    </Box>
  );
};

export default StepProjects;