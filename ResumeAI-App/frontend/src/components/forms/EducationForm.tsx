import React from 'react';
import { Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, ChevronDown } from 'lucide-react';

const EducationForm = ({ sectionId }: { sectionId: string }) => {
    const { resume, dispatch } = useResume();
    const section = resume.sections.find(s => s.id === sectionId);

    if (!section) return null;

    const items = section.items;

    const handleAdd = () => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                sectionId,
                item: {
                    id: Date.now().toString(),
                    title: '',
                    subtitle: '',
                    date: '',
                    description: ''
                }
            }
        });
    };

    const handleUpdate = (itemId: string, field: string, value: string) => {
        dispatch({
            type: 'UPDATE_ITEM',
            payload: {
                sectionId,
                itemId,
                data: { [field]: value }
            }
        });
    };

    const handleRemove = (itemId: string) => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: { sectionId, itemId }
        });
    };

    const handleTitleChange = (value: string) => {
        dispatch({
             type: 'UPDATE_SECTION_TITLE',
             payload: { id: sectionId, title: value }
        });
    };

    return (
        <Box sx={{ p: 3 }}>
           <Typography variant="h6" gutterBottom>Education</Typography>

           <TextField
                fullWidth
                label="Section Title"
                value={section.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mb: 3 }}
            />

            {items.map((item, index) => (
                <Accordion key={item.id} defaultExpanded={index === items.length - 1} sx={{ mb: 2, '&:before': { display: 'none' }, boxShadow: 1 }}>
                     <AccordionSummary expandIcon={<ChevronDown />}>
                        <Box>
                            <Typography fontWeight="bold">{item.subtitle || '(No School)'}</Typography>
                            <Typography variant="caption" color="text.secondary">{item.title || '(No Degree)'}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="School / University"
                                value={item.subtitle || ''} // Subtitle = School for Education
                                onChange={(e) => handleUpdate(item.id, 'subtitle', e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Degree / Major"
                                value={item.title || ''} // Title = Degree
                                onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Graduation Date"
                                placeholder="e.g. May 2024"
                                value={item.date || ''}
                                onChange={(e) => handleUpdate(item.id, 'date', e.target.value)}
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Description / Coursework / Grade"
                                value={item.description || ''}
                                onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button 
                                    startIcon={<Trash2 size={16} />} 
                                    color="error" 
                                    onClick={() => handleRemove(item.id)}
                                    size="small"
                                >
                                    Remove
                                </Button>
                            </Box>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}

            <Button 
                variant="outlined" 
                startIcon={<Plus />} 
                onClick={handleAdd}
                fullWidth
                sx={{ py: 1.5, borderStyle: 'dashed' }}
            >
                Add Education
            </Button>
        </Box>
    );
};

export default EducationForm;
