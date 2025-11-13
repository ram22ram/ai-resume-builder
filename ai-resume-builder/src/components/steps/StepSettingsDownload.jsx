import React from 'react';
import { 
  Box, Typography, ToggleButton, ToggleButtonGroup, 
  Select, MenuItem, FormControl, InputLabel,
  FormGroup, FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material'; 

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
  // Custom switch styling yahaan daalein
}));

const accentColors = [
  { value: '#0B57D0', label: 'Blue' }, 
  { value: '#d32f2f', label: 'Red' },
  { value: '#388e3c', label: 'Green' },
  { value: '#000000', label: 'Black' },
];

const fontFamilies = [
  'Roboto', 'Helvetica', 'Arial', 'Times New Roman', 'Georgia'
];
// ------------------------------

const StepSettingsDownload = (props) => {
  const { 
    visibleSections, currentTemplate, accentColor, fontFamily, 
    handlers // <-- Yahaan 'handlers' prop aa raha hai
  } = props;

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
          onChange={handlers.handleTemplateChange} // <-- 'handlers' se function call karein
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
          onChange={(e, newValue) => handlers.handleColorChange(newValue)} // <-- 'handlers' se function call karein
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
            onChange={(e) => handlers.handleFontChange(e.target.value)} // <-- 'handlers' se function call karein
            sx={{ borderRadius: '8px' }}
          >
            {fontFamilies.map(font => (
              <MenuItem key={font} value={font} sx={{ fontFamily: font }}>{font}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* --- VISIBLE SECTIONS --- */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>VISIBLE SECTIONS</Typography>
        <FormGroup>
          {Object.keys(visibleSections).map(sectionName => (
            <FormControlLabel 
              key={sectionName}
              control={
                <StyledSwitch 
                  checked={visibleSections[sectionName]} 
                  onChange={handlers.handleSectionToggle} // <-- 'handlers' se function call karein
                  name={sectionName} 
                />
              } 
              label={sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}
              sx={{ 
                justifyContent: 'space-between', 
                ml: 0, 
                mb: 1,
                p: 1.5,
                borderRadius: '8px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0'
              }}
              labelPlacement="start" 
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
};

export default StepSettingsDownload;