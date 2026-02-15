import { Box, TextField, Typography, Button } from '@mui/material';
import { useResume } from '../../context/ResumeContext';
import { PersonalItem } from '../../types/resume';

const PersonalForm = ({ sectionId }: { sectionId: string }) => {
    const { resume, dispatch } = useResume();
    const section = resume.sections.find(s => s.id === sectionId);
    const item = section?.items[0] as PersonalItem | undefined;

    if (!item) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">Personal Details data is missing.</Typography>
                <Button 
                    variant="contained" 
                    onClick={() => dispatch({ 
                        type: 'ADD_ITEM', 
                        payload: { 
                            sectionId, 
                            item: { id: '1', firstName: '', lastName: '', fullName: '', email: '', phone: '', city: '', country: '', jobTitle: '' } as PersonalItem
                        } 
                    })}
                >
                    Initialize Personal Details
                </Button>
            </Box>
        );
    }

    const handleChange = (field: keyof PersonalItem, value: string) => {
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

    // Auto-update fullName when first/last name changes
    const handleNameChange = (field: 'firstName' | 'lastName', value: string) => {
        const newData = { [field]: value } as Partial<PersonalItem>;
        if (field === 'firstName') newData.fullName = `${value} ${item.lastName}`;
        if (field === 'lastName') newData.fullName = `${item.firstName} ${value}`;
        
        dispatch({
            type: 'UPDATE_ITEM',
            payload: {
                sectionId,
                itemId: item.id,
                data: newData
            }
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
                        onChange={(e) => handleNameChange('firstName', e.target.value)}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Last Name"
                        value={item.lastName || ''}
                        onChange={(e) => handleNameChange('lastName', e.target.value)}
                    />
                </Box>

                <Box sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Job Title"
                        value={item.jobTitle || ''} 
                        onChange={(e) => handleChange('jobTitle', e.target.value)}
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
                        value={item.linkedin || ''}
                        onChange={(e) => handleChange('linkedin', e.target.value)}
                    />
                </Box>
                <Box sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="GitHub Profile"
                        value={item.github || ''}
                        onChange={(e) => handleChange('github', e.target.value)}
                    />
                </Box>
                 <Box sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Career Objective"
                        multiline
                        rows={2}
                        value={item.objective || ''}
                        onChange={(e) => handleChange('objective', e.target.value)}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PersonalForm;
