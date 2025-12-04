import React from 'react';
import { 
  Box, Typography, ToggleButton, ToggleButtonGroup, 
  Select, MenuItem, FormControl, 
  FormGroup, Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material'; 
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Check } from 'lucide-react';
import { LAYOUTS, COLORS, FONTS } from '../../utils/templateConfig'; // <-- Import Config

// --- Styled Components ---

const LayoutButton = styled(Box)(({ theme, selected }) => ({
  border: selected ? `2px solid ${theme.palette.primary.main}` : `1px solid #e2e8f0`,
  borderRadius: '12px',
  padding: '12px',
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: selected ? '#f5f3ff' : 'white',
  transition: 'all 0.2s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
  }
}));

const StyledColorButton = styled(ToggleButton)(({ theme, colorValue }) => ({
  width: 40,
  height: 40,
  borderRadius: '50%',
  backgroundColor: colorValue,
  border: `2px solid transparent`,
  margin: '4px !important',
  padding: 0,
  minWidth: 0,
  '&:hover': {
    opacity: 0.8,
    backgroundColor: colorValue,
  },
  '&.Mui-selected': {
    backgroundColor: colorValue,
    borderColor: theme.palette.primary.main,
    borderWidth: '2px',
    boxShadow: `0 0 0 2px white inset`, // White ring inside
    '&:hover': {
       backgroundColor: colorValue,
    }
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
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Customize & Download
      </Typography>

      {/* --- 1. LAYOUT SELECTION --- */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>Choose Layout</Typography>
        <Grid container spacing={2}>
          {LAYOUTS.map((layout) => (
            <Grid item xs={6} key={layout.id}>
              <LayoutButton 
                selected={currentTemplate === layout.id}
                onClick={() => handlers.handleTemplateChange(null, layout.id)}
              >
                <Typography variant="subtitle1" fontWeight="bold">{layout.label}</Typography>
                <Typography variant="caption" color="text.secondary">{layout.description}</Typography>
              </LayoutButton>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* --- 2. ACCENT COLOR (Using Config) --- */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>Accent Color</Typography>
        <ToggleButtonGroup
          value={accentColor}
          exclusive
          onChange={(e, newValue) => { if (newValue) handlers.handleColorChange(newValue); }}
          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
        >
          {COLORS.map((color) => (
            <StyledColorButton 
              key={color.id} 
              value={color.value} 
              aria-label={color.label} 
              colorValue={color.value}
              title={color.label}
            >
              {accentColor === color.value && <Check size={20} color="white" style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' }} />}
            </StyledColorButton>
          ))}
        </ToggleButtonGroup>
      </Box>
      
      {/* --- 3. TYPOGRAPHY (Using Config) --- */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>Typography</Typography>
        <FormControl fullWidth size="small">
          <Select
            value={fontFamily}
            onChange={(e) => handlers.handleFontChange(e.target.value)}
            sx={{ borderRadius: '8px', bgcolor: 'white' }}
          >
            {FONTS.map(font => (
              <MenuItem key={font.id} value={font.value} sx={{ fontFamily: font.value }}>
                {font.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* --- 4. SECTION ORDER & VISIBILITY --- */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>Reorder Sections</Typography>
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
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}
                            </Typography>
                          </Box>

                          <StyledSwitch 
                            size="small"
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