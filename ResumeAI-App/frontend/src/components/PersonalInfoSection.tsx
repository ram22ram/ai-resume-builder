import React from 'react';
import { Box, TextField, Typography, Alert, TextFieldProps } from '@mui/material';
import { Mail, Phone, MapPin, Linkedin, Globe, User } from 'lucide-react';

// --- TYPES ---

// Define prop types for the helper component
// We extend standard TextFieldProps to allow passing ...props
type IconTextFieldProps = TextFieldProps & {
  icon: React.ElementType;
  error?: boolean;
  helperText?: string;
};

// Define structure for the data object to allow dynamic key access
interface PersonalInfoData {
  [key: string]: string | null | undefined;
}

// Define props for the main component
interface PersonalInfoSectionProps {
  data: PersonalInfoData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: Record<string, string>;
}

// --- COMPONENTS ---

// Helper component for text fields with icons
const IconTextField: React.FC<IconTextFieldProps> = ({ icon: Icon, error, helperText, ...props }) => (
  <TextField
    {...props}
    error={!!error} 
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
      // Keep layout stable when errors appear
      '& .MuiFormHelperText-root': {
        minHeight: '1.25em', 
        marginLeft: '4px'
      },
    }}
  />
);

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ data, onChange, errors = {} }) => {
  const fields = [
    { name: 'fullName', label: 'Full Name', placeholder: 'John Doe', icon: User, fullWidth: true },
    { name: 'email', label: 'Email Address', placeholder: 'john.doe@email.com', icon: Mail, type: 'email' },
    { name: 'phone', label: 'Phone Number', placeholder: '+1 (555) 123-4567', icon: Phone, type: 'tel' },
    { name: 'address', label: 'Location', placeholder: 'New York, NY', icon: MapPin },
    { name: 'linkedin', label: 'LinkedIn Profile', placeholder: 'linkedin.com/in/johndoe', icon: Linkedin, type: 'url' },
    { name: 'portfolio', label: 'Portfolio Website', placeholder: 'www.johndoe.com', icon: Globe, type: 'url' }
  ];

  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc' }}>
      <Typography variant="body2" sx={{ mb: 3, color: 'grey.600', fontStyle: 'italic' }}>
        Let's start with your basic information. This will appear at the top of your resume.
      </Typography>
      
      {/* Replaced Grid with Box CSS Grid to fix MUI TS overload errors.
         Layout behavior remains exactly 12-column logic: 
         - xs (mobile): 1 column (1fr)
         - sm (tablet+): 2 columns (1fr 1fr)
      */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, 
        gap: 2 
      }}>
        {fields.map((field) => (
          <Box 
            key={field.name} 
            sx={{ 
              // Replicates 'xs={12} sm={12}' for full width items, otherwise 'span 1'
              gridColumn: field.fullWidth ? { xs: '1 / -1', sm: '1 / -1' } : 'auto' 
            }}
          >
            <IconTextField
              label={field.label}
              name={field.name}
              placeholder={field.placeholder}
              icon={field.icon}
              type={field.type || 'text'}
              value={data[field.name] || ''} // Ensure controlled component
              onChange={onChange}
              error={!!errors[field.name]}
              helperText={errors[field.name] || ' '} 
            />
          </Box>
        ))}
      </Box>
      
      <Alert severity="info" icon="✨" sx={{ mt: 3, borderRadius: '8px', bgcolor: '#dbeafe', color: '#1e40af' }}>
        Pro Tip: Add your LinkedIn and portfolio to stand out from other candidates!
      </Alert>
    </Box>
  );
}

export default PersonalInfoSection;