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
  Card,
  CardContent,
  Stack,
  Divider,
  TextField,
  SelectChangeEvent,
  Button,
  Alert,
  Collapse,
  IconButton,
  CircularProgress
} from '@mui/material';
import { 
  Palette, 
  FontDownload, 
  DensitySmall, 
  PhotoCamera, 
  Visibility,
  AutoFixHigh,
  Close,
  Share,
  Download
} from '@mui/icons-material';

// --- INTERFACE UPDATE ---
interface StepSettingsDownloadProps {
  sections: any[]; // Lego Array
  currentTemplate: string;
  accentColor: string;
  fontFamily: string;
  density: string;
  photoMode: string;
  handlers: any;
  loadingAi?: boolean; // Add this optional prop
  resumeData: any;
  handleDownloadPDF: () => void;
}

const StepSettingsDownload: React.FC<StepSettingsDownloadProps> = ({
  sections,
  currentTemplate,
  accentColor,
  fontFamily,
  density,
  photoMode,
  handlers,
  loadingAi = false // Default value
}) => {
  
  const [showAiPanel, setShowAiPanel] = React.useState(false);
  const [aiPrompt, setAiPrompt] = React.useState('');
  const [aiResponse, setAiResponse] = React.useState('');

  const fontOptions = [
    { value: 'inter', label: 'Inter' },
    { value: 'roboto', label: 'Roboto' },
    { value: 'opensans', label: 'Open Sans' },
    { value: 'lato', label: 'Lato' },
    { value: 'montserrat', label: 'Montserrat' },
    { value: 'poppins', label: 'Poppins' }
  ];

  const colorOptions = [
    { value: '#3b82f6', label: 'Blue' },
    { value: '#10b981', label: 'Green' },
    { value: '#7c3aed', label: 'Purple' },
    { value: '#ef4444', label: 'Red' },
    { value: '#f59e0b', label: 'Amber' },
    { value: '#000000', label: 'Black' }
  ];

const templateOptions = [
  { value: 'modern', label: 'Modern' },
  { value: 'classic', label: 'Classic' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'eileen', label: 'Eileen' },
  { value: 'elena', label: 'Elena' },
  { value: 'fred', label: 'Fred' },
  { value: 'harvey', label: 'Harvey' },
  { value: 'kristy', label: 'Kristy' },
  { value: 'swiss', label: 'Swiss' },
];

  const photoOptions = [
    { value: 'visible', label: 'Show' },
    { value: 'hidden', label: 'Hide' },
    { value: 'circle', label: 'Circle' },
    { value: 'square', label: 'Square' }
  ];

  const handleAiSubmit = async () => {
    if (!aiPrompt.trim() || !handlers.handleAiAction) return;
    
    try {
      const response = await handlers.handleAiAction('improve');
      setAiResponse(response || 'No response from AI');
    } catch (error) {
      setAiResponse('Error getting AI response');
    }
  };

  return (
    <Box sx={{ color: 'white' }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Final Polish & Settings
      </Typography>

      <Stack spacing={3}>
        {/* AI Assistant Panel */}
        <Collapse in={showAiPanel}>
          <Card sx={{ 
            bgcolor: 'rgba(255,255,255,0.05)', 
            border: '1px solid rgba(255,255,255,0.1)',
            mb: 2 
          }}>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AutoFixHigh color="primary" />
                  <Typography variant="h6">AI Resume Assistant</Typography>
                </Stack>
                <IconButton 
                  size="small" 
                  onClick={() => setShowAiPanel(false)}
                  sx={{ color: 'rgba(255,255,255,0.7)' }}
                >
                  <Close />
                </IconButton>
              </Stack>
              
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Ask AI to improve your resume, suggest changes, or roast it..."
                value={aiPrompt}
                onChange={(e) =>  handlers.handleTemplateChange(e, e.target.value)}
                sx={{ 
                  mb: 2,
                  '& .MuiInputBase-root': {
                    color: 'white',
                    bgcolor: 'rgba(0,0,0,0.2)'
                  }
                }}
              />
              
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handleAiSubmit}
                  disabled={loadingAi || !handlers.handleAiAction}
                  startIcon={loadingAi ? <CircularProgress size={20} /> : <AutoFixHigh />}
                  sx={{
                    flex: 1,
                    bgcolor: accentColor,
                    '&:hover': { bgcolor: accentColor, opacity: 0.9 }
                  }}
                >
                  {loadingAi ? 'AI Thinking...' : 'Ask AI'}
                </Button>
                
                <Button
                  variant="outlined"
                  onClick={async () => {
                    if (handlers.handleAiAction) {
                      const response = await handlers.handleAiAction('roast');
                      setAiResponse(response || '');
                    }
                  }}
                  disabled={loadingAi || !handlers.handleAiAction}
                  sx={{ borderColor: accentColor, color: accentColor }}
                >
                  Roast My Resume
                </Button>
              </Stack>
              
              {aiResponse && (
                <Alert 
                  severity="info" 
                  sx={{ 
                    mt: 2,
                    bgcolor: 'rgba(59, 130, 246, 0.1)',
                    color: 'white',
                    '& .MuiAlert-icon': { color: accentColor }
                  }}
                >
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {aiResponse}
                  </Typography>
                </Alert>
              )}
            </CardContent>
          </Card>
        </Collapse>

        {/* 1. DESIGN & COLOR */}
        <Card sx={{ bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Palette color="primary" />
              <Typography variant="h6">1. Design & Color</Typography>
            </Stack>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel sx={{ color: 'rgba(255,255,255,0.7)', mb: 1 }}>Select Template</FormLabel>
              <RadioGroup
                value={currentTemplate}
                onChange={(e) => handlers.handleTemplateChange(e, e.target.value)}
                row
              >
                {templateOptions.map((t) => (
                  <FormControlLabel 
                    key={t.value} 
                    value={t.value} 
                    control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: accentColor } }} />} 
                    label={t.label} 
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormLabel sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'block' }}>Accent Color</FormLabel>
            <Stack direction="row" spacing={1.5} flexWrap="wrap" mb={3}>
              {colorOptions.map((color) => (
                <Box
                  key={color.value}
                  onClick={() => handlers.handleColorChange(color.value)}
                  sx={{
                    width: 35,
                    height: 35,
                    borderRadius: '50%',
                    bgcolor: color.value,
                    cursor: 'pointer',
                    border: accentColor === color.value ? '3px solid white' : 'none',
                    boxShadow: accentColor === color.value ? `0 0 10px ${color.value}` : 'none'
                  }}
                />
              ))}
              <TextField
                type="color"
                value={accentColor}
                onChange={(e) => handlers.handleColorChange(e.target.value)}
                sx={{ 
                  width: 40, 
                  height: 40, 
                  '& input': { 
                    p: 0, 
                    border: 'none', 
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%'
                  } 
                }}
              />
            </Stack>

            {/* Photo Mode Selector */}
            <FormLabel sx={{ color: 'rgba(255,255,255,0.7)', mb: 1, display: 'block' }}>Photo Display</FormLabel>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {photoOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={photoMode === option.value ? 'contained' : 'outlined'}
                  onClick={() => handlers.handlePhotoModeChange(option.value)}
                  size="small"
                  sx={{
                    color: photoMode === option.value ? 'white' : '#aaa',
                    borderColor: 'rgba(255,255,255,0.3)',
                    bgcolor: photoMode === option.value ? accentColor : 'transparent',
                    '&:hover': {
                      borderColor: accentColor
                    }
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* 2. TYPOGRAPHY & SPACING */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Card sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <FontDownload color="primary" />
                <Typography variant="h6">2. Typography</Typography>
              </Stack>
              <Select
                fullWidth
                value={fontFamily}
                onChange={(e: SelectChangeEvent) => handlers.handleFontChange(e.target.value)}
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255,255,255,0.3)'
                  },
                  '& .MuiSvgIcon-root': { color: 'white' }
                }}
              >
                {fontOptions.map(f => (
                  <MenuItem key={f.value} value={f.value}>
                    {f.label}
                  </MenuItem>
                ))}
              </Select>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                <DensitySmall color="primary" />
                <Typography variant="h6">3. Spacing</Typography>
              </Stack>
              <Slider
                value={density === 'compact' ? 1 : density === 'comfortable' ? 2 : 3}
                min={1} max={3} step={1}
                marks={[
                  {value: 1, label: 'Tight'}, 
                  {value: 2, label: 'Normal'}, 
                  {value: 3, label: 'Wide'}
                ]}
                onChange={(_, v) => {
                  const val = Array.isArray(v) ? v[0] : v;
                  handlers.handleDensityChange(
                    val === 1 ? 'compact' : 
                    val === 2 ? 'comfortable' : 'spacious'
                  );
                }}
                sx={{ color: accentColor }}
              />
            </CardContent>
          </Card>
        </Stack>

        {/* 3. SECTION VISIBILITY (Lego Map) */}
        <Card sx={{ bgcolor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} mb={2}>
              <Visibility color="primary" />
              <Typography variant="h6">4. Section Visibility</Typography>
            </Stack>
            <Stack spacing={1}>
              {sections && sections.map((section: any) => (
                <Stack 
                  key={section.id} 
                  direction="row" 
                  justifyContent="space-between" 
                  alignItems="center"
                  sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: 'rgba(255,255,255,0.03)',
                    border: section.isVisible ? `1px solid ${accentColor}40` : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <Typography variant="body2">{section.title}</Typography>
                  <Switch
                    checked={section.isVisible}
                    onChange={(e) => handlers.handleSectionToggle(section.id, e.target.checked)}
                    sx={{ 
                      '& .MuiSwitch-switchBase.Mui-checked': { color: accentColor },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: accentColor }
                    }}
                  />
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>

      </Stack>
    </Box>
  );
};

export default StepSettingsDownload;