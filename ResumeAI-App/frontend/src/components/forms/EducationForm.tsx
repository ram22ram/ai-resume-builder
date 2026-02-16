import { Box, Button, TextField, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { EducationItem } from '../../types/resume';

const EducationForm = ({ sectionId }: { sectionId: string }) => {
    const { resume, dispatch } = useResume();
    const section = resume.sections.find(s => s.id === sectionId);

    if (!section) return null;

    const items = section.items as EducationItem[];

    const handleAdd = () => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                sectionId,
                item: {
                    id: Date.now().toString(),
                    degree: '',
                    institution: '',
                    date: '',
                    description: ''
                } as EducationItem
            }
        });
    };

    const handleUpdate = (itemId: string, field: keyof EducationItem, value: string) => {
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
           <Typography variant="h6" gutterBottom>Education</Typography>

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
                            <Typography fontWeight="bold">{item.institution || '(No School)'}</Typography>
                            <Typography variant="caption" color="text.secondary">{item.degree || '(No Degree)'}</Typography>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    select
                                    fullWidth
                                    label="Level"
                                    value={item.standard || ''}
                                    onChange={(e) => handleUpdate(item.id, 'standard', e.target.value)}
                                    SelectProps={{ native: true }}
                                >
                                    <option value="">Select Level</option>
                                    <option value="PG">Post Graduation</option>
                                    <option value="UG">Graduation</option>
                                    <option value="12th">Class XII</option>
                                    <option value="10th">Class X</option>
                                    <option value="Diploma">Diploma</option>
                                </TextField> 
                                <TextField
                                    fullWidth
                                    label="Year of Passing"
                                    value={item.yearOfPassing || ''}
                                    onChange={(e) => handleUpdate(item.id, 'yearOfPassing', e.target.value)}
                                    placeholder="2024"
                                />
                            </Box>

                            <TextField
                                fullWidth
                                label={['10th', '12th'].includes(item.standard || '') ? "School Name" : "University / Institute"}
                                value={item.institution || ''} 
                                onChange={(e) => handleUpdate(item.id, 'institution', e.target.value)}
                            />

                            {['10th', '12th'].includes(item.standard || '') && (
                                <TextField
                                    fullWidth
                                    label="Board"
                                    placeholder="CBSE, ICSE, State Board"
                                    value={item.board || ''}
                                    onChange={(e) => handleUpdate(item.id, 'board', e.target.value)}
                                />
                            )}

                            <TextField
                                fullWidth
                                label={['10th', '12th'].includes(item.standard || '') ? "Stream / Subjects" : "Degree / Major"}
                                value={item.degree || ''}
                                onChange={(e) => handleUpdate(item.id, 'degree', e.target.value)}
                                helperText={['10th', '12th'].includes(item.standard || '') ? "e.g. Science (PCM), Commerce" : "e.g. B.Tech Computer Science"}
                            />

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Percentage / CGPA"
                                    value={item.percentage || item.cgpa || ''}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val.includes('%')) {
                                            handleUpdate(item.id, 'percentage', val);
                                            handleUpdate(item.id, 'cgpa', '');
                                        } else {
                                            handleUpdate(item.id, 'cgpa', val);
                                            handleUpdate(item.id, 'percentage', '');
                                        }
                                    }}
                                    placeholder="e.g. 9.5 or 95%"
                                />
                                <TextField
                                    fullWidth
                                    label="Duration"
                                    placeholder="e.g. 2020 - 2024"
                                    value={item.date || ''}
                                    onChange={(e) => handleUpdate(item.id, 'date', e.target.value)}
                                />
                            </Box>

                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Description / Coursework / Grade"
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
                Add Education
            </Button>
        </Box>
    );
};

export default EducationForm;
