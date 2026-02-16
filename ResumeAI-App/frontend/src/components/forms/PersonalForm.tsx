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

    // Generic handler
    const handleChangeWithDispatch = (field: keyof PersonalItem, value: string) => {
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
                        onChange={(e) => handleChangeWithDispatch('jobTitle', e.target.value)}
                        placeholder="e.g. Software Engineer"
                    />
                </Box>

                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={item.email || ''}
                        onChange={(e) => handleChangeWithDispatch('email', e.target.value)}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Phone"
                        value={item.phone || ''}
                        onChange={(e) => handleChangeWithDispatch('phone', e.target.value)}
                    />
                </Box>

                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="City"
                        value={item.city || ''}
                        onChange={(e) => handleChangeWithDispatch('city', e.target.value)}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Country"
                        value={item.country || ''}
                        onChange={(e) => handleChangeWithDispatch('country', e.target.value)}
                    />
                </Box>
                 <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="LinkedIn URL"
                        value={item.linkedin || ''}
                        onChange={(e) => handleChangeWithDispatch('linkedin', e.target.value)}
                        placeholder="linkedin.com/in/username"
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="GitHub URL"
                        value={item.github || ''}
                        onChange={(e) => handleChangeWithDispatch('github', e.target.value)}
                        placeholder="github.com/username"
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Portfolio URL"
                        value={item.portfolio || ''}
                        onChange={(e) => handleChangeWithDispatch('portfolio', e.target.value)}
                        placeholder="your-portfolio.com"
                    />
                </Box>

                {/* Indian Standard Fields */}
                <Box sx={{ width: '100%', mt: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">Additional Details (Indian Standard)</Typography>
                </Box>

                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Father's Name"
                        value={item.fatherName || ''}
                        onChange={(e) => handleChangeWithDispatch('fatherName', e.target.value)}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Date of Birth"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={item.dateOfBirth || ''}
                        onChange={(e) => handleChangeWithDispatch('dateOfBirth', e.target.value)}
                    />
                </Box>

                <Box sx={{ width: { xs: '100%', sm: 'calc(33% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Gender"
                        value={item.gender || ''}
                        onChange={(e) => handleChangeWithDispatch('gender', e.target.value)}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(33% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Nationality"
                        value={item.nationality || ''}
                        onChange={(e) => handleChangeWithDispatch('nationality', e.target.value)}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(33% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Marital Status"
                        value={item.maritalStatus || ''}
                        onChange={(e) => handleChangeWithDispatch('maritalStatus', e.target.value)}
                    />
                </Box>
                <Box sx={{ width: { xs: '100%', sm: 'calc(33% - 12px)' } }}>
                    <TextField
                        fullWidth
                        label="Pincode"
                        value={item.pincode || ''}
                        onChange={(e) => handleChangeWithDispatch('pincode', e.target.value)}
                    />
                </Box>

                <Box sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Languages Known (Comma separated)"
                        value={item.languages?.join(', ') || ''}
                        onChange={(e) => {
                            const val = e.target.value;
                            // Split by comma and trim, or empty array if empty string
                            const arr = val ? val.split(',').map(s => s.trim()) : [];
                            // We need to pass the array to dispatch
                             dispatch({
                                type: 'UPDATE_ITEM',
                                payload: {
                                    sectionId,
                                    itemId: item.id,
                                    data: { languages: arr }
                                }
                            });
                        }}
                        placeholder="English, Hindi, Spanish"
                    />
                </Box>

                <Box sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Full Address (For Govt/Formal Resumes)"
                        value={item.address || ''}
                        onChange={(e) => handleChangeWithDispatch('address', e.target.value)}
                        multiline
                        rows={2}
                        placeholder="#123, Street Name, Locality, City, State"
                    />
                </Box>

                <Box sx={{ width: '100%' }}>
                    <TextField
                        fullWidth
                        label="Career Objective"
                        multiline
                        rows={3}
                        value={item.objective || ''}
                        onChange={(e) => handleChangeWithDispatch('objective', e.target.value)}
                        placeholder="Brief statement about your career goals..."
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default PersonalForm;
