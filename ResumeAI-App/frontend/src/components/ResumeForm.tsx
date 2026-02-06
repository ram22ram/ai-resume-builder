import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useResume } from '../context/ResumeContext';
import SectionEditor from './SectionEditor';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Plus, GripVertical } from 'lucide-react';

const SECTION_TYPES = [
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'custom', label: 'Custom Section' },
];

const ResumeForm = () => {
  const { resume, addSection, removeSection, reorderSection, updateSection } = useResume();
  
  // Menu State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleAdd = (type: string, label: string) => {
      addSection(type, label);
      handleClose();
  };

  const onDragEnd = (result: DropResult) => {
      if (!result.destination) return;
      reorderSection(result.source.index, result.destination.index);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" fontWeight="bold">Resume Editor</Typography>
          <Button 
            variant="contained" 
            startIcon={<Plus size={18} />} 
            onClick={handleClick}
            sx={{ textTransform: 'none', bgcolor: '#1e293b' }}
          >
            Add Section
          </Button>
      </Box>

      {/* Add Section Menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {SECTION_TYPES.map((type) => (
            <MenuItem key={type.id} onClick={() => handleAdd(type.id, type.label)}>
                {type.label}
            </MenuItem>
        ))}
      </Menu>

      <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="resume-sections">
              {(provided) => (
                  <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      {resume.sections.map((section, index) => (
                          <Draggable key={section.id} draggableId={section.id} index={index}>
                              {(provided) => (
                                  <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      style={{
                                          ...provided.draggableProps.style,
                                          marginBottom: '1rem'
                                      }}
                                  >
                                      <Box sx={{ position: 'relative' }}>
                                          {/* Drag Handle */}
                                          <Box 
                                            {...provided.dragHandleProps} 
                                            sx={{ 
                                                position: 'absolute', left: -24, top: 20, 
                                                cursor: 'grab', color: '#94a3b8',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                '&:hover': { color: '#475569' }
                                            }}
                                          >
                                              <GripVertical size={20} />
                                          </Box>

                                          <SectionEditor 
                                              section={section} 
                                              onUpdate={(content) => updateSection(section.id, content)}
                                              onRemove={() => removeSection(section.id)}
                                          />
                                      </Box>
                                  </div>
                              )}
                          </Draggable>
                      ))}
                      {provided.placeholder}
                  </Box>
              )}
          </Droppable>
      </DragDropContext>

      {resume.sections.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8, border: '2px dashed #e2e8f0', borderRadius: 3 }}>
              <Typography color="text.secondary">Your resume is empty.</Typography>
              <Button onClick={handleClick} sx={{ mt: 1 }}>Add your first section</Button>
          </Box>
      )}

      {/* Indian User Guidance */}
      <Box sx={{ mt: 4, p: 2, bgcolor: '#f0f9ff', borderRadius: 2, border: '1px solid #bae6fd' }}>
          <Typography variant="subtitle2" fontWeight="bold" color="#0369a1" gutterBottom>
              💡 Student Resume Tips:
          </Typography>
          <Box component="ul" sx={{ pl: 2, m: 0, fontSize: '0.875rem', color: '#0c4a6e' }}>
              <li>Freshers should list <strong>Education</strong> before Experience.</li>
              <li>Include at least <strong>2 Academic Projects</strong> with GitHub links.</li>
              <li>Mention "Internship" instead of "Experience" for shorter stints.</li>
          </Box>
      </Box>
    </Box>
  );
};

export default ResumeForm;
