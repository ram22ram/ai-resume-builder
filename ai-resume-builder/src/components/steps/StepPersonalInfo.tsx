import React from 'react';
import { Box, Grid, TextField, Typography, Alert } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe, User } from 'lucide-react';
import ImageUpload from '../common/ImageUpload'; // <-- Import Component

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
      '& .MuiFormHelperText-root': {
        minHeight: '1.25em', 
        marginLeft: '4px'
      },
    }}
  />
);

function StepPersonalInfo({ resumeData, handlers, errors = {} }) {
  const { handlePersonalInfoChange, handleImageUpload } = handlers; // <-- New Handler

  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 2 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
        Personal Information
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: 'grey.600' }}>
        Get started with the basics. Add your photo to make it personal.
      </Typography>

      {/* --- IMAGE UPLOAD SECTION --- */}
      <ImageUpload 
        image={resumeData.personalInfo.photo}
        onImageSave={(base64) => handleImageUpload(base64)}
        onImageRemove={() => handleImageUpload(null)}
      />
      {/* -------------------------- */}
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <IconTextField
            label="Full Name"
            name="fullName"
            placeholder="John Doe"
            icon={User}
            value={resumeData.personalInfo.fullName}
            onChange={handlePersonalInfoChange}
            error={!!errors.personalInfo?.fullName}
            helperText={errors.personalInfo?.fullName || ' '}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IconTextField
            label="Email Address"
            name="email"
            placeholder="john.doe@email.com"
            icon={Mail}
            value={resumeData.personalInfo.email}
            onChange={handlePersonalInfoChange}
            error={!!errors.personalInfo?.email}
            helperText={errors.personalInfo?.email || ' '}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IconTextField
            label="Phone Number"
            name="phone"
            placeholder="+1 (555) 123-4567"
            icon={Phone}
            value={resumeData.personalInfo.phone}
            onChange={handlePersonalInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IconTextField
            label="Location"
            name="address"
            placeholder="New York, NY"
            icon={MapPin}
            value={resumeData.personalInfo.address}
            onChange={handlePersonalInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IconTextField
            label="LinkedIn Profile"
            name="linkedin"
            placeholder="linkedin.com/in/johndoe"
            icon={Linkedin}
            value={resumeData.personalInfo.linkedin}
            onChange={handlePersonalInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <IconTextField
            label="Portfolio Website"
            name="portfolio"
            placeholder="www.johndoe.com"
            icon={Globe}
            value={resumeData.personalInfo.portfolio}
            onChange={handlePersonalInfoChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default StepPersonalInfo;