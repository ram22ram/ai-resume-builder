import { type ChangeEvent } from 'react';
import { Box, TextField, Typography } from '@mui/material';

/* ================= TYPES ================= */

interface HobbiesSectionProps {
  data: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/* ================= COMPONENT ================= */

function HobbiesSection({ data, onChange }: HobbiesSectionProps) {
  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc' }}>
      <Typography
        variant="body2"
        sx={{ mb: 3, color: 'grey.600', fontStyle: 'italic' }}
      >
        Add some of your hobbies (optional). Keep it short and separate by commas.
      </Typography>

      <TextField
        label="Hobbies (e.g., Reading, Coding, Cricket)"
        name="hobbies"
        value={data}
        onChange={onChange}
        fullWidth
        variant="outlined"
        placeholder="Reading, Coding, Cricket..."
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            bgcolor: 'white',
          },
          '& .MuiFormHelperText-root': {
            minHeight: '1.25em',
            marginLeft: '4px',
          },
        }}
        helperText=" "
      />
    </Box>
  );
}

export default HobbiesSection;
