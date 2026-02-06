import React from 'react';
import { 
    Box, Typography, TextField, IconButton, Button, 
    Accordion, AccordionSummary, AccordionDetails, 
    FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';
import { Trash2, GripVertical, Plus } from 'lucide-react';
import { ResumeSection } from '../types';

interface Props {
  section: ResumeSection;
  onUpdate: (content: any) => void;
  onRemove: () => void;
}

const SectionEditor: React.FC<Props> = ({ section, onUpdate, onRemove }) => {
  // --- PERSONAL INFO HEADER ---
  if (section.type === 'personal') {
      const data = section.content || {};
      const handleChange = (field: string, val: string) => onUpdate({ ...data, [field]: val });

      return (
          <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Personal Information</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                  <TextField label="Full Name" value={data.fullName || ''} onChange={e => handleChange('fullName', e.target.value)} fullWidth />
                  <TextField label="Job Title" value={data.jobTitle || ''} onChange={e => handleChange('jobTitle', e.target.value)} fullWidth />
                  <TextField label="Email" value={data.email || ''} onChange={e => handleChange('email', e.target.value)} fullWidth />
                  <TextField label="Phone" value={data.phone || ''} onChange={e => handleChange('phone', e.target.value)} fullWidth />
                  <TextField label="Location" value={data.address || ''} onChange={e => handleChange('address', e.target.value)} fullWidth sx={{ gridColumn: 'span 2' }} />
              </Box>
          </Box>
      );
  }

  // --- SUMMARY ---
  if (section.type === 'summary') {
      return (
          <Box sx={{ mb: 4, position: 'relative' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Professional Summary</Typography>
              </Box>
              <TextField 
                  multiline rows={4} fullWidth 
                  placeholder="Write a compelling summary..."
                  value={section.content || ''} 
                  onChange={e => onUpdate(e.target.value)} 
              />
          </Box>
      );
  }

  // --- GENERIC LIST HANDLING (Education, Experience, Projects) ---
  const listData = Array.isArray(section.content) ? section.content : [];

  const addItem = () => {
     onUpdate([...listData, { id: Date.now().toString(), title: '', subtitle: '', date: '', description: '' }]);
  };

  const updateItem = (index: number, field: string, value: string) => {
     const newData = [...listData];
     newData[index] = { ...newData[index], [field]: value };
     onUpdate(newData);
  };

  const removeItem = (index: number) => {
     const newData = listData.filter((_, i) => i !== index);
     onUpdate(newData);
  };

  // Define Fields based on Type
  const renderFields = (item: any, index: number) => {
      if (section.type === 'education') {
          return (
             <>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                   <TextField label="Degree / Class (e.g. B.Tech / 12th)" value={item.degree || ''} onChange={e => updateItem(index, 'degree', e.target.value)} size="small" fullWidth />
                   <TextField label="College / University / Board" value={item.institution || ''} onChange={e => updateItem(index, 'institution', e.target.value)} size="small" fullWidth />
                   <TextField label="Year (e.g. 2021-2025)" value={item.year || ''} onChange={e => updateItem(index, 'year', e.target.value)} size="small" fullWidth />
                   <TextField label="CGPA / Percentage" value={item.grade || ''} onChange={e => updateItem(index, 'grade', e.target.value)} size="small" fullWidth />
                </Box>
             </>
          );
      }
      
      if (section.type === 'projects') {
          return (
             <>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                   <TextField label="Project Title" value={item.title || ''} onChange={e => updateItem(index, 'title', e.target.value)} size="small" fullWidth />
                   <TextField label="Tech Stack (e.g. React, Node)" value={item.tech || ''} onChange={e => updateItem(index, 'tech', e.target.value)} size="small" fullWidth />
                   <TextField label="Project Link" value={item.link || ''} onChange={e => updateItem(index, 'link', e.target.value)} size="small" fullWidth />
                </Box>
                <TextField label="Description" multiline rows={2} value={item.description || ''} onChange={e => updateItem(index, 'description', e.target.value)} fullWidth size="small" />
             </>
          );
      }

      if (section.type === 'experience') {
          return (
             <>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
                   <TextField label="Job Title" value={item.role || ''} onChange={e => updateItem(index, 'role', e.target.value)} size="small" fullWidth />
                   <TextField label="Company" value={item.company || ''} onChange={e => updateItem(index, 'company', e.target.value)} size="small" fullWidth />
                   <TextField label="Duration" value={item.date || ''} onChange={e => updateItem(index, 'date', e.target.value)} size="small" fullWidth />
                   <TextField label="Location" value={item.location || ''} onChange={e => updateItem(index, 'location', e.target.value)} size="small" fullWidth />
                </Box>
                <TextField label="Key Achievements" multiline rows={3} value={item.description || ''} onChange={e => updateItem(index, 'description', e.target.value)} fullWidth size="small" />
             </>
          );
      }

      if (section.type === 'skills') {
          // Skills are often just a list of strings, but let's support robust object structure
          return (
             <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                 <TextField label="Skill Name" value={item.name || ''} onChange={e => updateItem(index, 'name', e.target.value)} size="small" sx={{ flexGrow: 1 }} />
                 <FormControl size="small" sx={{ width: 140 }}>
                     <InputLabel>Level</InputLabel>
                     <Select value={item.level || 'Intermediate'} label="Level" onChange={e => updateItem(index, 'level', e.target.value)}>
                         <MenuItem value="Beginner">Beginner</MenuItem>
                         <MenuItem value="Intermediate">Intermediate</MenuItem>
                         <MenuItem value="Advanced">Advanced</MenuItem>
                         <MenuItem value="Expert">Expert</MenuItem>
                     </Select>
                 </FormControl>
             </Box>
          );
      }

      // Default Generic
      return (
         <Box sx={{ display: 'grid', gap: 2 }}>
             <TextField label="Title" value={item.title || ''} onChange={e => updateItem(index, 'title', e.target.value)} size="small" fullWidth />
             <TextField label="Subtitle" value={item.subtitle || ''} onChange={e => updateItem(index, 'subtitle', e.target.value)} size="small" fullWidth />
             <TextField label="Description" multiline rows={2} value={item.description || ''} onChange={e => updateItem(index, 'description', e.target.value)} fullWidth size="small" />
         </Box>
      );
  };

  return (
    <Box sx={{ mb: 4, p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#fff' }}>
       {/* Section Header */}
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
           <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
               {section.title}
           </Typography>
           <IconButton size="small" color="error" onClick={onRemove} title="Remove Section">
               <Trash2 size={16} />
           </IconButton>
       </Box>

       {/* List Items */}
       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
           {listData.map((item: any, idx: number) => (
               <Accordion key={idx} variant="outlined" sx={{ borderRadius: 1 }}>
                   <AccordionSummary expandIcon={<GripVertical size={16} />}>
                       <Typography fontWeight={500}>{item.title || item.degree || item.role || item.name || `Item ${idx + 1}`}</Typography>
                   </AccordionSummary>
                   <AccordionDetails>
                       {renderFields(item, idx)}
                       <Button size="small" color="error" onClick={() => removeItem(idx)} sx={{ mt: 1 }}>Remove Item</Button>
                   </AccordionDetails>
               </Accordion>
           ))}
       </Box>

       <Button 
          startIcon={<Plus size={16} />} 
          variant="outlined" 
          size="small" 
          onClick={addItem} 
          sx={{ mt: 2, textTransform: 'none', borderRadius: 2 }}
       >
          Add {section.title.slice(0, -1)}
       </Button>
    </Box>
  );
};

export default SectionEditor;
