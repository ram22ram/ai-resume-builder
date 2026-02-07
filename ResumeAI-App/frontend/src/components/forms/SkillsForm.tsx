import React from 'react';
import { Box, Button, TextField, Typography, Chip } from '@mui/material';
import { useResume } from '../../context/ResumeContext';
import { Plus, X } from 'lucide-react';

const SkillsForm = ({ sectionId }: { sectionId: string }) => {
    const { resume, dispatch } = useResume();
    const section = resume.sections.find(s => s.id === sectionId);

    // Local state for the new skill input to allow pressing "Enter"
    const [newItem, setNewItem] = React.useState('');

    if (!section) return null;

    const items = section.items;

    const handleAdd = () => {
        if (!newItem.trim()) return;
        
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                sectionId,
                item: {
                    id: Date.now().toString(),
                    name: newItem.trim(), // Storing skill name in name
                }
            }
        });
        setNewItem('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
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
             payload: { id: 'skills', title: value }
        });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Skills</Typography>

             <TextField
                fullWidth
                label="Section Title"
                value={section.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <TextField
                    fullWidth
                    label="Add Skill"
                    placeholder="e.g. React, Project Management, Python"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={handleKeyDown}
                    helperText="Press Enter to add"
                />
                <Button variant="contained" onClick={handleAdd} sx={{ height: 56 }}>
                    Add
                </Button>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {items.map((item) => (
                    <Chip
                        key={item.id}
                        label={item.title} // Displaying title as the skill name
                        onDelete={() => handleRemove(item.id)}
                        sx={{ fontSize: '0.9rem', py: 2 }}
                    />
                ))}
            </Box>

             {items.length === 0 && (
                <Typography color="text.secondary" align="center" mt={2}>
                    No skills added yet.
                </Typography>
            )}
        </Box>
    );
};

export default SkillsForm;
