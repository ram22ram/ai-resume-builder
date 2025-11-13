import React from 'react';
import { Box, TextField, Typography, Grid } from '@mui/material';

const StepPersonalInfo = ({ resumeData, handlers, errors }) => {
  const { personalInfo } = resumeData;
  const { handlePersonalInfoChange } = handlers;
  
  return (
    <Box>
      <Typography variant="h5" gutterBottom>Personal Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={personalInfo.fullName}
            onChange={handlePersonalInfoChange}
            error={!!errors.personalInfo?.fullName}
            helperText={errors.personalInfo?.fullName}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={personalInfo.email}
            onChange={handlePersonalInfoChange}
            error={!!errors.personalInfo?.email}
            helperText={errors.personalInfo?.email}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={personalInfo.phone}
            onChange={handlePersonalInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Address"
            name="address"
            value={personalInfo.address}
            onChange={handlePersonalInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="LinkedIn Profile"
            name="linkedin"
            value={personalInfo.linkedin}
            onChange={handlePersonalInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Portfolio/Website"
            name="portfolio"
            value={personalInfo.portfolio}
            onChange={handlePersonalInfoChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default StepPersonalInfo;