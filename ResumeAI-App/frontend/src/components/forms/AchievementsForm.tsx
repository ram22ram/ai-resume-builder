import { Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { AchievementItem } from '../../types/resume';

const AchievementsForm = ({ sectionId }: { sectionId: string }) => {
    const { resume, dispatch } = useResume();
    const section = resume.sections.find(s => s.id === sectionId);

    if (!section) return null;

    const items = section.items as AchievementItem[];

    const handleAdd = () => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                sectionId,
                item: {
                    id: Date.now().toString(),
                    title: '',
                    description: '',
                    date: ''
                } as AchievementItem
            }
        });
    };

    const handleUpdate = (itemId: string, field: keyof AchievementItem, value: string) => {
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Achievements</Typography>
            </Box>

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
                            <Typography fontWeight="bold">{item.title || '(No Title)'}</Typography>
                            <Typography variant="caption" color="text.secondary">{item.date || '(No Date)'}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Achievement Title"
                                value={item.title || ''}
                                onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                                placeholder="e.g. Hackathon Winner"
                            />
                            
                            <TextField
                                fullWidth
                                label="Date"
                                value={item.date || ''}
                                onChange={(e) => handleUpdate(item.id, 'date', e.target.value)}
                                placeholder="e.g. 2023"
                            />

                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Description"
                                value={item.description || ''}
                                onChange={(e) => handleUpdate(item.id, 'description', e.target.value)}
                                placeholder="Describe your achievement..."
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
                Add Achievement
            </Button>
        </Box>
    );
};

export default AchievementsForm;
