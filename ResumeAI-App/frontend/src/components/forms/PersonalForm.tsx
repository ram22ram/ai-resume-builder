import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useResume } from '../../context/ResumeContext';

const PersonalForm = ({ sectionId }: { sectionId: string }) => {
    const { resume, dispatch } = useResume();
    const section = resume.sections.find(s => s.id === sectionId);
    const item = section?.items[0];

    if (!item) return null;

    const handleChange = (field: string, value: string) => {
        dispatch({
            type: 'UPDATE_ITEM',
            payload: {
                sectionId,
                itemId: item.id,
                data: { [field]: value }
            }
        });
    };

    const handleTitleChange = (value: string) => {
        dispatch({
            type: 'UPDATE_SECTION_TITLE',
            payload: { id: 'personal', title: value }
        });
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Personal Details</Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                <Box sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Section Title"
                        value={section?.title || ''}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                    />
                </Box>

                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="First Name"
                        value={item.firstName || ''}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={item.lastName || ''}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                    />
                </Box>

                <Box sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Job Title"
                        value={item.title || ''}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="e.g. Software Engineer"
                    />
                </Box>

                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={item.email || ''}
                        onChange={(e) => handleChange('email', e.target.value)}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Phone"
                        value={item.phone || ''}
                        onChange={(e) => handleChange('phone', e.target.value)}
                    />
                </Box>

                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="City"
                        value={item.city || ''}
                        onChange={(e) => handleChange('city', e.target.value)}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Country"
                        value={item.country || ''}
                        onChange={(e) => handleChange('country', e.target.value)}
                    />
                </Box>
                 <Box sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="LinkedIn / Website"
                        value={item.url || ''}
                        onChange={(e) => handleChange('url', e.target.value)}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PersonalForm;
