import { Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, ChevronDown } from 'lucide-react';

const ProjectsForm = ({ sectionId }: { sectionId: string }) => {
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
                    title: '',
                    subtitle: '', // Role or Technologies
                    date: '',
                    description: '',
                    url: '' // Custom field
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

    const handleTitleChange = (value: string) => {
        dispatch({
            type: 'UPDATE_SECTION_TITLE',
            payload: { id: sectionId, title: value }
        });
    };

    return (
        <Box sx={{ p: 3 }}>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">Projects</Typography>
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
                            <Typography fontWeight="bold">{item.title || '(No Project Name)'}</Typography>
                            <Typography variant="caption" color="text.secondary">{item.subtitle || '(No Role/Tech)'}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <TextField
                                fullWidth
                                label="Project Name"
                                value={item.title || ''}
                                onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Role / Tech Stack"
                                value={item.subtitle || ''}
                                onChange={(e) => handleUpdate(item.id, 'subtitle', e.target.value)}
                            />
                             <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Date / Duration"
                                    placeholder="e.g. Jan 2023 - Mar 2023"
                                    value={item.date || ''}
                                    onChange={(e) => handleUpdate(item.id, 'date', e.target.value)}
                                />
                                <TextField
                                    fullWidth
                                    label="Project URL"
                                    placeholder="e.g. github.com/username/project"
                                    value={item.url || ''} // Custom field "url"
                                    onChange={(e) => handleUpdate(item.id, 'url', e.target.value)}
                                />
                            </Box>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Description"
                                placeholder="What did you build? What technologies did you use?"
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
                                    Remove Project
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
                Add Project
            </Button>
        </Box>
    );
};

export default ProjectsForm;
