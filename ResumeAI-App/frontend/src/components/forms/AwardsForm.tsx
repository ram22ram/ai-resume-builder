import { Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { AwardItem } from '../../types/resume';

const AwardsForm = ({ sectionId }: { sectionId: string }) => {
    const { resume, dispatch } = useResume();
    const section = resume.sections.find(s => s.id === sectionId);

    if (!section) return null;

    const items = section.items as AwardItem[];

    const handleAdd = () => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                sectionId,
                item: {
                    id: Date.now().toString(),
                    title: '', // Award Name
                    issuer: '', // Issuer
                    date: '',
                    description: ''
                } as AwardItem
            }
        });
    };

    const handleUpdate = (itemId: string, field: keyof AwardItem, value: string) => {
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
             <Typography variant="h6" gutterBottom>Awards & Honors</Typography>
            
            {items.map((item, index) => (
                <Accordion key={item.id} defaultExpanded={index === items.length - 1} sx={{ mb: 2, '&:before': { display: 'none' }, boxShadow: 1 }}>
                    <AccordionSummary expandIcon={<ChevronDown />}>
                        <Box>
                            <Typography fontWeight="bold">{item.title || '(No Award Name)'}</Typography>
                            <Typography variant="caption" color="text.secondary">{item.issuer || '(No Issuer)'}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Award Name"
                                value={item.title || ''}
                                onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Issuer / Organization"
                                value={item.issuer || ''}
                                onChange={(e) => handleUpdate(item.id, 'issuer', e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Date Received"
                                placeholder="e.g. 2023"
                                value={item.date || ''}
                                onChange={(e) => handleUpdate(item.id, 'date', e.target.value)}
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Description (Optional)"
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
                Add Award
            </Button>
        </Box>
    );
};

export default AwardsForm;
