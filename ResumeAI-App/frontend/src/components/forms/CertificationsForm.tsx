import React from 'react';
import { Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, ChevronDown } from 'lucide-react';

const CertificationsForm = ({ sectionId }: { sectionId: string }) => {
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
                    title: '', // Certification Name
                    subtitle: '', // Issuing Organization
                    date: '',
                    url: '' // Credential URL
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

    return (
        <Box sx={{ p: 3 }}>
             <Typography variant="h6" gutterBottom>Certifications</Typography>
            
            {items.map((item, index) => (
                <Accordion key={item.id} defaultExpanded={index === items.length - 1} sx={{ mb: 2, '&:before': { display: 'none' }, boxShadow: 1 }}>
                    <AccordionSummary expandIcon={<ChevronDown />}>
                        <Box>
                            <Typography fontWeight="bold">{item.title || '(No Certification Name)'}</Typography>
                            <Typography variant="caption" color="text.secondary">{item.subtitle || '(No Organization)'}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Certification Name"
                                value={item.title || ''}
                                onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Issuing Organization"
                                value={item.subtitle || ''}
                                onChange={(e) => handleUpdate(item.id, 'subtitle', e.target.value)}
                            />
                             <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Date Issued"
                                    placeholder="e.g. May 2023"
                                    value={item.date || ''}
                                    onChange={(e) => handleUpdate(item.id, 'date', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Credential URL"
                                    placeholder="e.g. udemy.com/cert/..."
                                    value={item.url || ''}
                                    onChange={(e) => handleUpdate(item.id, 'url', e.target.value)}
                                />
                            </Box>
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
                Add Certification
            </Button>
        </Box>
    );
};

export default CertificationsForm;
