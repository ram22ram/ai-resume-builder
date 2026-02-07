import React from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useResume } from '../../context/ResumeContext';

const SummaryForm = ({ sectionId }: { sectionId: string }) => {
    const { resume, dispatch } = useResume();
    const section = resume.sections.find(s => s.id === sectionId);
    const item = section?.items[0];

    if (!item) {
         return (
            <Box sx={{ p: 3 }}>
                <Button 
                    variant="contained" 
                    onClick={() => dispatch({ 
                        type: 'ADD_ITEM', 
                        payload: { 
                            sectionId, 
                            item: { id: '1', description: '' } 
                        } 
                    })}
                >
                    Add Summary
                </Button>
            </Box>
        );
    }

    const handleChange = (value: string) => {
        dispatch({
            type: 'UPDATE_ITEM',
            payload: {
                sectionId,
                itemId: item.id,
                data: { description: value }
            }
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                 <Typography variant="h6">Professional Summary</Typography>
            </Box>

             <TextField
                fullWidth
                label="Section Title"
                value={section?.title || ''}
                onChange={(e) => handleTitleChange(e.target.value)}
                variant="outlined"
                size="small"
                sx={{ mb: 3 }}
            />
            
            <TextField
                fullWidth
                multiline
                rows={6}
                label="Summary"
                placeholder="Briefly describe your professional background and key achievements..."
                value={item.description || ''}
                onChange={(e) => handleChange(e.target.value)}
                helperText="Tip: Keep it between 2-4 sentences. Focus on your unique value proposition."
            />
        </Box>
    );
};

export default SummaryForm;
