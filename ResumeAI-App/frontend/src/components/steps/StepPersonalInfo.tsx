// StepPersonalInfo.tsx - UPDATE WITH VALIDATION
import { useState } from 'react';
import { Box, TextField, Typography, Button, Avatar, Stack, Alert } from '@mui/material';
import { Upload, Mail, Phone, MapPin, Linkedin, Globe, User, Trash2 } from 'lucide-react';
import { validateEmail, validatePhone } from '../../utils/validationUtils';

const StepPersonalInfo = ({ resumeData, handlers, errors: propErrors = {} }: any) => {
  const { personalInfo } = resumeData;
  const { handlePersonalInfoChange, handleImageUpload } = handlers;
  const [uploadError, setUploadError] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Validate on blur
  const handleBlur = (field: string, value: string) => {
    const errors = { ...validationErrors };
    
    switch (field) {
      case 'email':
        if (value && !validateEmail(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'phone':
        if (value && !validatePhone(value)) {
          errors.phone = 'Please enter a valid phone number';
        } else {
          delete errors.phone;
        }
        break;
      case 'fullName':
        if (!value?.trim()) {
          errors.fullName = 'Full name is required';
        } else {
          delete errors.fullName;
        }
        break;
      case 'jobTitle':
        if (!value?.trim()) {
          errors.jobTitle = 'Job title is required';
        } else {
          delete errors.jobTitle;
        }
        break;
    }
    
    setValidationErrors(errors);
  };

  // Combine prop errors and validation errors
  const allErrors = { ...propErrors?.personalInfo, ...validationErrors };

  // Smart image compressor
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          
          // Max dimensions
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
        
        img.onerror = (err) => reject(err);
      };
      
      reader.onerror = (err) => reject(err);
    });
  };

  // File change handler
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError('');

    if (file) {
      // Check size (4MB limit)
      if (file.size > 4 * 1024 * 1024) {
        setUploadError('File is too large! Please choose an image under 4MB.');
        return;
      }

      try {
        const compressedBase64 = await compressImage(file);
        handleImageUpload(compressedBase64);
      } catch (err) {
        setUploadError('Error processing image. Try another one.');
        console.error(err);
      }
    }
  };

  const darkInput = {
    '& .MuiOutlinedInput-root': { 
      color: 'white', 
      bgcolor: 'rgba(30, 41, 59, 0.4)', 
      borderRadius: '8px',
      '& fieldset': { borderColor: allErrors ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255,255,255,0.1)' },
      '&:hover fieldset': { borderColor: allErrors ? 'rgba(239, 68, 68, 0.7)' : 'rgba(255,255,255,0.2)' },
      '&.Mui-focused fieldset': { borderColor: allErrors ? '#ef4444' : '#3b82f6' }
    },
    '& .MuiInputLabel-root': { color: '#94a3b8' },
    '& .MuiFormHelperText-root': { color: '#ef4444' }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: 'white' }}>Personal Details</Typography>
      <Typography variant="body2" sx={{ mb: 4, color: '#94a3b8' }}>
        Start with the basics. Add a professional photo.
      </Typography>
      
      {/* Upload Section */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Avatar 
          src={personalInfo.photo || undefined} 
          sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: 'rgba(255,255,255,0.1)', 
            border: personalInfo.photo ? '2px solid #3b82f6' : '2px solid rgba(255,255,255,0.2)'
          }}
        >
          {!personalInfo.photo && <User />}
        </Avatar>
        
        <Stack spacing={1}>
          <Stack direction="row" spacing={2}>
            <Button 
              component="label" 
              variant="outlined" 
              startIcon={<Upload size={18} />} 
              sx={{ color: '#94a3b8', borderColor: 'rgba(255,255,255,0.3)' }}
            >
              Upload Photo
              <input type="file" hidden accept="image/png, image/jpeg, image/jpg" onChange={onFileChange} />
            </Button>
            {personalInfo.photo && (
              <Button 
                color="error" 
                onClick={() => handleImageUpload(null)} 
                startIcon={<Trash2 size={18} />}
              >
                Remove
              </Button>
            )}
          </Stack>
          
          {uploadError && (
            <Typography variant="caption" color="error">
              {uploadError}
            </Typography>
          )}
          {!uploadError && (
            <Typography variant="caption" sx={{ color: '#94a3b8' }}>
              Max 4MB. Recommended: 300x300px
            </Typography>
          )}
        </Stack>
      </Box>

      {/* Validation Alert */}
      {Object.keys(allErrors).length > 0 && (
        <Alert 
          severity="warning" 
          sx={{ 
            mb: 3, 
            bgcolor: 'rgba(245, 158, 11, 0.1)',
            color: '#fbbf24',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            '& .MuiAlert-icon': { color: '#f59e0b' }
          }}
        >
          Please fix the errors below to continue.
        </Alert>
      )}

      {/* Inputs Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {[
          { label: 'Full Name', name: 'fullName', icon: <User size={18} />, required: true },
          { label: 'Job Title', name: 'jobTitle', icon: null, required: true },
          { label: 'Email', name: 'email', icon: <Mail size={18} />, required: true },
          { label: 'Phone', name: 'phone', icon: <Phone size={18} />, required: false },
          { label: 'Address', name: 'address', icon: <MapPin size={18} />, required: false },
          { label: 'LinkedIn', name: 'linkedin', icon: <Linkedin size={18} />, required: false },
          { label: 'Portfolio', name: 'portfolio', icon: <Globe size={18} />, required: false },
        ].map((field) => (
          <Box key={field.name}>
            <TextField
              fullWidth
              label={field.label + (field.required ? ' *' : '')}
              name={field.name}
              value={personalInfo[field.name] || ''}
              onChange={handlePersonalInfoChange}
              onBlur={(e) => handleBlur(field.name, e.target.value)}
              error={!!allErrors[field.name]}
              helperText={allErrors[field.name] || ''}
              InputProps={{
                startAdornment: field.icon ? <Box sx={{ mr: 1.5, color: '#64748b', display: 'flex' }}>{field.icon}</Box> : null
              }}
              sx={darkInput}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StepPersonalInfo;