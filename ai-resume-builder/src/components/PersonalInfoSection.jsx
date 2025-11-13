import React from 'react';
import { Box, Grid, TextField, Typography, Alert } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe, User } from 'lucide-react';

// Helper component icon waale TextField ke liye
const IconTextField = ({ icon: Icon, error, helperText, ...props }) => (
  <TextField
    {...props}
    error={error} 
    helperText={helperText} 
    InputProps={{
      startAdornment: (
        <Box sx={{ mr: 1.5, display: 'flex' }}>
          <Icon size={20} color={error ? '#d32f2f' : '#6b7280'} /> 
        </Box>
      ),
    }}
    variant="outlined"
    fullWidth
    sx={{
      '& .MuiOutlinedInput-root': {
        borderRadius: '8px',
        backgroundColor: 'white',
        '&:hover .MuiOutlinedInput-notchedOutline': { 
          borderColor: error ? '#d32f2f' : '#3b82f6' 
        },
      },
      // FIX: Layout shift hone se rokega
      '& .MuiFormHelperText-root': {
        minHeight: '1.25em', 
        marginLeft: '4px'
      },
    }}
  />
);

function PersonalInfoSection({ data, onChange, errors = {} }) {
  const fields = [
    { name: 'fullName', label: 'Full Name', placeholder: 'John Doe', icon: User, fullWidth: true },
    { name: 'email', label: 'Email Address', placeholder: 'john.doe@email.com', icon: Mail, type: 'email' },
    { name: 'phone', label: 'Phone Number', placeholder: '+1 (555) 123-4567', icon: Phone, type: 'tel' },
    { name: 'address', label: 'Location', placeholder: 'New York, NY', icon: MapPin }, // Address ab 'address' hai
    { name: 'linkedin', label: 'LinkedIn Profile', placeholder: 'linkedin.com/in/johndoe', icon: Linkedin, type: 'url' },
    { name: 'portfolio', label: 'Portfolio Website', placeholder: 'www.johndoe.com', icon: Globe, type: 'url' }
  ];

  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc' }}>
      <Typography variant="body2" sx={{ mb: 3, color: 'grey.600', fontStyle: 'italic' }}>
        Let's start with your basic information. This will appear at the top of your resume.
      </Typography>
      
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid key={field.name} xs={12} sm={field.fullWidth ? 12 : 6}>
            <IconTextField
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              icon={field.icon}
              type={field.type || 'text'}
              value={data[field.name]}
              onChange={onChange}
              error={!!errors[field.name]}
              helperText={errors[field.name] || ' '} // ' ' khaali space deta hai
            />
          </Grid>
        ))}
      </Grid>
      
      <Alert severity="info" icon="✨" sx={{ mt: 3, borderRadius: '8px', bgcolor: '#dbeafe', color: '#1e40af' }}>
        Pro Tip: Add your LinkedIn and portfolio to stand out from other candidates!
      </Alert>
    </Box>
  );
}

export default PersonalInfoSection;