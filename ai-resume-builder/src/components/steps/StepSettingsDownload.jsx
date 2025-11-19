import React from 'react';
import { 
  Box, Typography, ToggleButton, ToggleButtonGroup, 
  Select, MenuItem, FormControl, 
  FormGroup, FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material'; 
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react'; // Drag handle icon

// --- Styled Components ---

const StyledTemplateButton = styled(ToggleButton)(({ theme }) => ({
  color: theme.palette.text.primary,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '20px !important', 
  padding: '6px 16px',
  textTransform: 'none',
  fontWeight: 'medium',
  margin: '4px !important',
  '&.Mui-selected': {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.dark,
  }
}));

const StyledColorButton = styled(ToggleButton)(({ theme, colorValue }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: colorValue,
  border: `2px solid transparent`,
  margin: '4px !important',
  '&:hover': {
    opacity: 0.8,
  },
  '&.Mui-selected': {
    borderColor: theme.palette.primary.main,
    borderWidth: '3px',
    boxShadow: `0 0 10px ${theme.palette.primary.light}`,
  },
}));

const StyledSwitch = styled(Switch)(({ theme }) => ({
  // Custom switch styling can go here if needed
}));

const DraggableItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1.5),
  borderRadius: '8px',
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  transition: 'background-color 0.2s',
  '&:hover': {
    backgroundColor: '#f1f5f9',
  }
}));

const accentColors = [
  { value: '#0B57D0', label: 'Blue' }, 
  { value: '#d32f2f', label: 'Red' },
  { value: '#388e3c', label: 'Green' },
  { value: '#000000', label: 'Black' },
  { value: '#6d28d9', label: 'Purple' },
  { value: '#ed6c02', label: 'Orange' },
];

const fontFamilies = [
  'Roboto', 'Helvetica', 'Arial', 'Times New Roman', 'Georgia'
];
// ------------------------------

const StepSettingsDownload = (props) => {
  const { 
    visibleSections, sectionOrder, currentTemplate, accentColor, fontFamily, 
    handlers 
  } = props;

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newOrder = Array.from(sectionOrder);
    const [reorderedItem] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, reorderedItem);

    handlers.handleSectionReorder(newOrder);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold' }}>
        Settings & Download
      </Typography>

      {/* --- TEMPLATE --- */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>TEMPLATE</Typography>
        <ToggleButtonGroup
          value={currentTemplate}
          exclusive
          onChange={handlers.handleTemplateChange}
          sx={{ flexWrap: 'wrap', gap: 1 }}
        >
          <StyledTemplateButton value="modern">Modern</StyledTemplateButton>
          <StyledTemplateButton value="classic">Classic</StyledTemplateButton>
          <StyledTemplateButton value="swiss">Swiss</StyledTemplateButton>
          <StyledTemplateButton value="corporate">Corporate</StyledTemplateButton>
        </ToggleButtonGroup>
      </Box>

      {/* --- ACCENT COLOR --- */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>ACCENT COLOR</Typography>
        <ToggleButtonGroup
          value={accentColor}
          exclusive
          onChange={(e, newValue) => handlers.handleColorChange(newValue)}
        >
          {accentColors.map(color => (
            <StyledColorButton 
              key={color.value} 
              value={color.value} 
              aria-label={color.label} 
              colorValue={color.value}
            />
          ))}
        </ToggleButtonGroup>
      </Box>
      
      {/* --- FONT FAMILY --- */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>FONT FAMILY</Typography>
        <FormControl fullWidth>
          <Select
            value={fontFamily}
            onChange={(e) => handlers.handleFontChange(e.target.value)}
            sx={{ borderRadius: '8px' }}
          >
            {fontFamilies.map(font => (
              <MenuItem key={font} value={font} sx={{ fontFamily: font }}>{font}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* --- SECTIONS ORDER & VISIBILITY (DRAG & DROP) --- */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>REORDER & TOGGLE SECTIONS</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', mb: 2, display: 'block' }}>
          Drag to reorder. Toggle to show/hide.
        </Typography>
        
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <FormGroup>
                  {sectionOrder.map((sectionName, index) => (
                    <Draggable key={sectionName} draggableId={sectionName} index={index}>
                      {(provided) => (
                        <DraggableItem
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                              {...provided.dragHandleProps}
                              sx={{ mr: 2, display: 'flex', alignItems: 'center', cursor: 'grab', color: '#94a3b8' }}
                            >
                              <GripVertical size={20} />
                            </Box>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}
                            </Typography>
                          </Box>

                          <StyledSwitch 
                            checked={visibleSections[sectionName]} 
                            onChange={handlers.handleSectionToggle}
                            name={sectionName} 
                            inputProps={{ 'aria-label': sectionName }}
                          />
                        </DraggableItem>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </FormGroup>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </Box>
  );
};

export default StepSettingsDownload;