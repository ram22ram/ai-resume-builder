import { Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { ExperienceItem } from '../../types/resume';

const ExperienceForm = ({ sectionId }: { sectionId: string }) => {
    const { resume, dispatch } = useResume();
    const section = resume.sections.find(s => s.id === sectionId);

    if (!section) return null;

    const items = section.items as ExperienceItem[];

    const handleAdd = () => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                sectionId,
                item: {
                    id: Date.now().toString(),
                    position: '',
                    company: '',
                    date: '',
                    description: [],
                    location: ''
                } as ExperienceItem
            }
        });
    };

    const handleUpdate = (itemId: string, field: keyof ExperienceItem, value: string | string[]) => {
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

    const handleDescriptionChange = (itemId: string, value: string) => {
         // Split by newline and filter empty strings for better bullet point handling
         const points = value.split('\n');
         handleUpdate(itemId, 'description', points);
    }

    return (
        <Box sx={{ p: 3 }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Work Experience</Typography>
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
                            <Typography fontWeight="bold">{item.position || '(No Job Title)'}</Typography>
                            <Typography variant="caption" color="text.secondary">{item.company || '(No Company)'}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Job Title"
                                value={item.position || ''}
                                onChange={(e) => handleUpdate(item.id, 'position', e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Company"
                                value={item.company || ''}
                                onChange={(e) => handleUpdate(item.id, 'company', e.target.value)}
                            />
                             <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Date Range"
                                    placeholder="e.g. Jan 2020 - Present"
                                    value={item.date || ''}
                                    onChange={(e) => handleUpdate(item.id, 'date', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Location"
                                    placeholder="e.g. New York, NY"
                                    value={item.location || ''} 
                                    onChange={(e) => handleUpdate(item.id, 'location', e.target.value)}
                                />
                            </Box>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Description (Bullet points)"
                                placeholder="Achievements and responsibilities... (One per line)"
                                value={Array.isArray(item.description) ? item.description.join('\n') : item.description}
                                onChange={(e) => handleDescriptionChange(item.id, e.target.value)}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button 
                                    startIcon={<Trash2 size={16} />} 
                                    color="error" 
                                    onClick={() => handleRemove(item.id)}
                                    size="small"
                                >
                                    Remove Position
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
                Add Experience
            </Button>
        </Box>
    );
};

export default ExperienceForm;
