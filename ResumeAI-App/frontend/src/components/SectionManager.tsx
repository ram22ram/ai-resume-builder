import React from 'react';
import {
    Box, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, List, ListItem, ListItemText,
    IconButton, Typography, Switch
} from '@mui/material';
import { useResume } from '../context/ResumeContext';
import { ArrowUp, ArrowDown, Plus, Trash2, GripVertical } from 'lucide-react';
import { SectionType } from '../types/resume';

const SectionManager = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const { resume, dispatch } = useResume();

    const handleToggle = (id: string) => {
        dispatch({ type: 'TOGGLE_SECTION_VISIBILITY', payload: id });
    };

    const handleMove = (index: number, direction: 'up' | 'down') => {
        const newSections = [...resume.sections];
        if (direction === 'up' && index > 0) {
            [newSections[index], newSections[index - 1]] = [newSections[index - 1], newSections[index]];
        } else if (direction === 'down' && index < newSections.length - 1) {
            [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
        }
        dispatch({ type: 'REORDER_SECTIONS', payload: newSections });
    };

    const handleAdd = (type: SectionType, title: string) => {
        dispatch({ type: 'ADD_SECTION', payload: { type, title } });
    };

    const handleRemove = (id: string) => {
        if (confirm('Are you sure you want to delete this section? This cannot be undone.')) {
            dispatch({ type: 'REMOVE_SECTION', payload: id });
        }
    };

    // Available sections to add (that can have multiple instances or optional ones)
    // We filter out core sections if they already exist, but "custom" or "projects" can be multiple?
    // For MVP, let's just show a list of addable types.
    const addableSections: { type: SectionType; label: string }[] = [
        { type: 'projects', label: 'Projects' },
        { type: 'certifications', label: 'Certifications' },
        { type: 'awards', label: 'Awards' },
        { type: 'custom', label: 'Custom Section' },
        { type: 'skills', label: 'Skills' }, // In case they deleted it
        { type: 'experience', label: 'Experience' },
        { type: 'education', label: 'Education' },
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Manage Sections</DialogTitle>
            <DialogContent dividers>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Reorder or hide sections.
                </Typography>
                
                <List sx={{ bgcolor: 'background.default', borderRadius: 2, mb: 3 }}>
                    {resume.sections.map((section, index) => (
                        <ListItem 
                            key={section.id} 
                            divider={index !== resume.sections.length - 1}
                            secondaryAction={
                                <Box display="flex" alignItems="center">
                                    <IconButton 
                                        size="small" 
                                        onClick={() => handleMove(index, 'up')} 
                                        disabled={index === 0}
                                    >
                                        <ArrowUp size={16} />
                                    </IconButton>
                                    <IconButton 
                                        size="small" 
                                        onClick={() => handleMove(index, 'down')} 
                                        disabled={index === resume.sections.length - 1}
                                    >
                                        <ArrowDown size={16} />
                                    </IconButton>
                                    <Switch 
                                        checked={section.isVisible} 
                                        onChange={() => handleToggle(section.id)} 
                                        size="small"
                                    />
                                    {/* Only allow deleting non-core sections or allow all? Let's allow all but warn. */}
                                    <IconButton 
                                        size="small" 
                                        color="error" 
                                        onClick={() => handleRemove(section.id)}
                                    >
                                        <Trash2 size={16} />
                                    </IconButton>
                                </Box>
                            }
                        >
                            <GripVertical size={16} color="#94a3b8" style={{ marginRight: 8 }} />
                            <ListItemText 
                                primary={section.title || section.type.toUpperCase()} 
                                primaryTypographyProps={{ 
                                    sx: { 
                                        opacity: section.isVisible ? 1 : 0.5,
                                        fontWeight: section.isVisible ? 500 : 400
                                    } 
                                }}
                            />
                        </ListItem>
                    ))}
                </List>

                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Add New Section
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                    {addableSections.map((item) => (
                        <Button
                            key={item.type}
                            variant="outlined"
                            startIcon={<Plus size={16} />}
                            size="small"
                            onClick={() => handleAdd(item.type, item.label)}
                        >
                            {item.label}
                        </Button>
                    ))}
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Done</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SectionManager;
