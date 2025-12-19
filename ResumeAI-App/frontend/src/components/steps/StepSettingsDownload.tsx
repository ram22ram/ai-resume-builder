// StepSettingsDownload.tsx - Fixed for MUI v6
import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  Select,
  MenuItem,
  Switch,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  TextField,
  SelectChangeEvent
} from '@mui/material';
import { Palette, FontDownload, DensitySmall, PhotoCamera } from '@mui/icons-material';

interface StepSettingsDownloadProps {
  visibleSections: any;
  sectionOrder: any;
  currentTemplate: string;
  accentColor: string;
  fontFamily: string;
  density: string;
  photoMode: string;
  handlers: any;
}

const StepSettingsDownload: React.FC<StepSettingsDownloadProps> = ({
  visibleSections,
  currentTemplate,
  accentColor,
  fontFamily,
  density,
  photoMode,
  handlers
}) => {
  // Font options
  const fontOptions = [
    { value: 'inter', label: 'Inter', sample: 'Aa' },
    { value: 'roboto', label: 'Roboto', sample: 'Aa' },
    { value: 'opensans', label: 'Open Sans', sample: 'Aa' },
    { value: 'lato', label: 'Lato', sample: 'Aa' },
    { value: 'montserrat', label: 'Montserrat', sample: 'Aa' },
    { value: 'poppins', label: 'Poppins', sample: 'Aa' }
  ];

  // Color options
  const colorOptions = [
    { value: '#3b82f6', label: 'Blue' },
    { value: '#10b981', label: 'Green' },
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#ef4444', label: 'Red' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#6366f1', label: 'Indigo' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#000000', label: 'Black' }
  ];

  // Density options
  const densityOptions = [
    { value: 'compact', label: 'Compact' },
    { value: 'comfortable', label: 'Comfortable' },
    { value: 'spacious', label: 'Spacious' }
  ];

  // Photo mode options
  const photoModeOptions = [
    { value: 'visible', label: 'Show Photo' },
    { value: 'hidden', label: 'Hide Photo' },
    { value: 'conditional', label: 'Show if Available' }
  ];

  // Template options
const templateOptions = [
  { value: 'modern', label: 'Modern' },
  { value: 'classic', label: 'Classic' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'eileen', label: 'Eileen' },
  { value: 'elena', label: 'Elena' },
  { value: 'fred', label: 'Fred' },
  { value: 'harvey', label: 'Harvey' },
  { value: 'kristy', label: 'Kristy' },
  { value: 'swiss', label: 'Swiss' }
];

  const handleFontChange = (event: SelectChangeEvent) => {
    handlers.handleFontChange(event.target.value);
  };

  const handleDensityChange = (event: SelectChangeEvent) => {
    handlers.handleDensityChange(event.target.value);
  };

  const handleTemplateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handlers.handleTemplateChange(event, (event.target as HTMLInputElement).value);
  };

  return (
    <Box sx={{ color: 'white' }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Customize Your Resume
      </Typography>

      {/* Layout/Design Section */}
      <Stack spacing={3}>
        <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Palette />
              <Typography variant="h6">1. Choose Layout & Design</Typography>
            </Stack>
            
            <FormControl fullWidth>
              <FormLabel sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>Template</FormLabel>
              <RadioGroup
                value={currentTemplate}
                onChange={handleTemplateChange}
                row
                sx={{ flexWrap: 'wrap', gap: 1 }}
              >
                {templateOptions.map((template) => (
                  <FormControlLabel
                    key={template.value}
                    value={template.value}
                    control={
                      <Radio 
                        sx={{ 
                          '&.Mui-checked': { color: accentColor },
                          color: 'rgba(255,255,255,0.6)'
                        }} 
                      />
                    }
                    label={template.label}
                    sx={{ 
                      mr: 2,
                      '& .MuiFormControlLabel-label': { color: 'rgba(255,255,255,0.8)' }
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Box mt={3}>
              <FormLabel sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>Accent Color</FormLabel>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {colorOptions.map((color) => (
                  <Button
                    key={color.value}
                    variant="outlined"
                    onClick={() => handlers.handleColorChange(color.value)}
                    sx={{
                      minWidth: 'auto',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      border: accentColor === color.value ? `3px solid ${color.value}` : `2px solid rgba(255,255,255,0.3)`,
                      backgroundColor: color.value,
                      '&:hover': {
                        backgroundColor: color.value,
                        opacity: 0.9
                      }
                    }}
                    title={color.label}
                  />
                ))}
              </Stack>
            </Box>

            <Box mt={2}>
              <FormLabel sx={{ color: 'rgba(255,255,255,0.8)' }}>Custom Color</FormLabel>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.3)',
                    backgroundColor: accentColor
                  }}
                />
                <TextField
                  type="color"
                  value={accentColor}
                  onChange={(e) => handlers.handleColorChange(e.target.value)}
                  size="small"
                  sx={{
                    '& .MuiInputBase-input': {
                      width: 60,
                      height: 40,
                      padding: '8px 12px',
                      cursor: 'pointer'
                    }
                  }}
                />
                <Typography sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  {accentColor}
                </Typography>
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Font & Spacing Sections in Row */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          {/* Font Section */}
          <Box sx={{ flex: 1 }}>
            <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', height: '100%' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <FontDownload />
                  <Typography variant="h6">2. Font & Typography</Typography>
                </Stack>

                <FormControl fullWidth>
                  <FormLabel sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>Font Family</FormLabel>
                  <Select
                    value={fontFamily}
                    onChange={handleFontChange}
                    sx={{
                      color: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.5)' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' }
                    }}
                  >
                    {fontOptions.map((font) => (
                      <MenuItem 
                        key={font.value} 
                        value={font.value}
                        sx={{ 
                          fontFamily: font.value === 'inter' ? '"Inter", sans-serif' :
                                      font.value === 'roboto' ? '"Roboto", sans-serif' :
                                      font.value === 'opensans' ? '"Open Sans", sans-serif' :
                                      font.value === 'lato' ? '"Lato", sans-serif' :
                                      font.value === 'montserrat' ? '"Montserrat", sans-serif' :
                                      '"Poppins", sans-serif'
                        }}
                      >
                        {font.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box mt={3}>
                  <FormLabel sx={{ color: 'rgba(255,255,255,0.8)' }}>Font Size</FormLabel>
                  <Slider
                    value={density === 'compact' ? 1 : density === 'comfortable' ? 2 : 3}
                    onChange={(_, value) => {
                      const newDensity = value === 1 ? 'compact' : value === 2 ? 'comfortable' : 'spacious';
                      handlers.handleDensityChange(newDensity);
                    }}
                    min={1}
                    max={3}
                    step={1}
                    marks={[
                      { value: 1, label: 'Small' },
                      { value: 2, label: 'Medium' },
                      { value: 3, label: 'Large' }
                    ]}
                    sx={{
                      color: accentColor,
                      '& .MuiSlider-markLabel': { color: 'rgba(255,255,255,0.6)' }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Spacing Section */}
          <Box sx={{ flex: 1 }}>
            <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', height: '100%' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <DensitySmall />
                  <Typography variant="h6">3. Spacing & Layout</Typography>
                </Stack>

                <FormControl fullWidth>
                  <FormLabel sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>Density</FormLabel>
                  <Select
                    value={density}
                    onChange={handleDensityChange}
                    sx={{
                      color: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      '& .MuiSelect-icon': { color: 'rgba(255,255,255,0.5)' },
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.3)' }
                    }}
                  >
                    {densityOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box mt={3}>
                  <FormLabel sx={{ color: 'rgba(255,255,255,0.8)' }}>Line Spacing</FormLabel>
                  <Slider
                    value={density === 'compact' ? 1.2 : density === 'comfortable' ? 1.5 : 1.8}
                    onChange={(_, value) => {
                      const newValue = value as number;
                      const newDensity = newValue <= 1.3 ? 'compact' : newValue <= 1.6 ? 'comfortable' : 'spacious';
                      handlers.handleDensityChange(newDensity);
                    }}
                    min={1.0}
                    max={2.0}
                    step={0.1}
                    marks={[
                      { value: 1.2, label: 'Tight' },
                      { value: 1.5, label: 'Normal' },
                      { value: 1.8, label: 'Loose' }
                    ]}
                    sx={{
                      color: accentColor,
                      '& .MuiSlider-markLabel': { color: 'rgba(255,255,255,0.6)' }
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Stack>

        {/* Photo and Visibility in Row */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          {/* Photo Settings */}
          <Box sx={{ flex: 1 }}>
            <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', height: '100%' }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <PhotoCamera />
                  <Typography variant="h6">Photo Settings</Typography>
                </Stack>

                <FormControl fullWidth>
                  <FormLabel sx={{ color: 'rgba(255,255,255,0.8)', mb: 1 }}>Photo Display</FormLabel>
                  <RadioGroup
                    value={photoMode}
                    onChange={(e) => handlers.handlePhotoModeChange(e.target.value)}
                  >
                    {photoModeOptions.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={
                          <Radio 
                            sx={{ 
                              '&.Mui-checked': { color: accentColor },
                              color: 'rgba(255,255,255,0.6)'
                            }} 
                          />
                        }
                        label={option.label}
                        sx={{ '& .MuiFormControlLabel-label': { color: 'rgba(255,255,255,0.8)' } }}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Box>

          {/* Section Visibility */}
          <Box sx={{ flex: 1 }}>
            <Card sx={{ bgcolor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" mb={2}>Section Visibility</Typography>
                
                <Stack spacing={1}>
                  {Object.entries(visibleSections).map(([section, isVisible]) => (
                    <Stack 
                      key={section} 
                      direction="row" 
                      justifyContent="space-between" 
                      alignItems="center"
                      sx={{ 
                        p: 1, 
                        borderRadius: 1,
                        bgcolor: 'rgba(255,255,255,0.05)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                      }}
                    >
                      <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                      </Typography>
                      <Switch
                        checked={isVisible as boolean}
                        onChange={handlers.handleSectionToggle}
                        name={section}
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': { color: accentColor },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: accentColor }
                        }}
                      />
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Stack>

      <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

      {/* Preview Note */}
      <Box sx={{ 
        p: 2, 
        bgcolor: 'rgba(59, 130, 246, 0.1)', 
        borderRadius: 2,
        border: '1px solid rgba(59, 130, 246, 0.3)'
      }}>
        <Typography sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.9rem' }}>
          💡 <strong>Tip:</strong> All changes are instantly reflected in the preview on the right.
          Customize your resume's look and feel to match your personal style.
        </Typography>
      </Box>
    </Box>
  );
};

export default StepSettingsDownload;