import React, { useState } from 'react';
import { Box, TextField, Typography, Button, Avatar, Stack, Alert } from '@mui/material';
import { Upload, Mail, Phone, MapPin, Linkedin, Globe, User, Trash2 } from 'lucide-react';

const StepPersonalInfo = ({ resumeData, handlers, errors = {} }: any) => {
  const { personalInfo } = resumeData;
  const { handlePersonalInfoChange, handleImageUpload } = handlers;
  const [uploadError, setUploadError] = useState('');

  // ✅ SMART IMAGE COMPRESSOR
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        
        img.onload = () => {
          const canvas = document.createElement('canvas');
          
          // Max dimensions (Resize to 300px width/height)
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions while maintaining aspect ratio
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
          
          // Convert to JPEG with 0.7 quality (High compression)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
        
        img.onerror = (err) => reject(err);
      };
      
      reader.onerror = (err) => reject(err);
    });
  };

  // ✅ HANDLER
  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError('');

    if (file) {
      // 1. Check Initial Size (Limit to 4MB input)
      if (file.size > 4 * 1024 * 1024) {
        setUploadError('File is too large! Please choose an image under 4MB.');
        return;
      }

      try {
        // 2. Compress Image
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
      bgcolor: 'rgba(255,255,255,0.05)', 
      borderRadius: 2,
      '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' }
    },
    '& .MuiInputLabel-root': { color: '#94a3b8' }
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
          sx={{ width: 80, height: 80, bgcolor: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)' }}
        >
          {!personalInfo.photo && <User />}
        </Avatar>
        
        <Stack spacing={1}>
          <Stack direction="row" spacing={2}>
            <Button component="label" variant="outlined" startIcon={<Upload size={18} />} sx={{ color: '#94a3b8', borderColor: 'rgba(255,255,255,0.3)' }}>
              Upload Photo
              <input type="file" hidden accept="image/png, image/jpeg, image/jpg" onChange={onFileChange} />
            </Button>
            {personalInfo.photo && (
              <Button color="error" onClick={() => handleImageUpload(null)} startIcon={<Trash2 size={18} />}>Remove</Button>
            )}
          </Stack>
          
          {uploadError && (
            <Typography variant="caption" color="error">
              {uploadError}
            </Typography>
          )}
          {!uploadError && (
            <Typography variant="caption" sx={{ color: 'white.600' }}>
              Max 4MB.
            </Typography>
          )}
        </Stack>
      </Box>

      {/* Inputs Layout */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        {[
          { label: 'Full Name', name: 'fullName', icon: <User size={18} /> },
          { label: 'Job Title', name: 'jobTitle', icon: null },
          { label: 'Email', name: 'email', icon: <Mail size={18} /> },
          { label: 'Phone', name: 'phone', icon: <Phone size={18} /> },
          { label: 'Address', name: 'address', icon: <MapPin size={18} /> },
          { label: 'LinkedIn', name: 'linkedin', icon: <Linkedin size={18} /> },
          { label: 'Portfolio', name: 'portfolio', icon: <Globe size={18} /> },
        ].map((field) => (
          <Box key={field.name}>
            <TextField
              fullWidth
              label={field.label}
              name={field.name}
              value={personalInfo[field.name] || ''}
              onChange={handlePersonalInfoChange}
              error={!!errors?.personalInfo?.[field.name]}
              helperText={errors?.personalInfo?.[field.name] || ''}
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