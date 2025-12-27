import { useState, type ChangeEvent } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Chip,
  FormHelperText,
} from '@mui/material';
import { Plus } from 'lucide-react';

/* ================= TYPES ================= */

interface SkillsSectionProps {
  data: string[];
  onAdd: (skill: string) => void;
  onDelete: (skill: string) => void;
  error?: string;
}

/* ================= COMPONENT ================= */

function SkillsSection({
  data,
  onAdd,
  onDelete,
  error,
}: SkillsSectionProps) {
  const [skill, setSkill] = useState('');

  const handleAddClick = () => {
    onAdd(skill);

    if (
      skill.trim() !== '' &&
      !data.map(s => s.toLowerCase()).includes(skill.trim().toLowerCase())
    ) {
      setSkill('');
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: '#f8fafc' }}>
      <Typography
        variant="body2"
        sx={{ mb: 3, color: 'grey.600', fontStyle: 'italic' }}
      >
        Add your skills. Press Enter or click &quot;Add&quot; to add a skill.
      </Typography>

      <Box sx={{ display: 'flex', mb: 0 }}>
        <TextField
          label="Add a Skill (e.g., Python)"
          variant="outlined"
          fullWidth
          value={skill}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSkill(e.target.value)
          }
          onKeyDown={(e) => e.key === 'Enter' && handleAddClick()}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px 0 0 8px',
              bgcolor: 'white',
            },
          }}
          error={!!error}
        />

        <Button
          variant="contained"
          onClick={handleAddClick}
          sx={{
            py: 1.9,
            borderRadius: '0 8px 8px 0',
            bgcolor: '#ec4899',
            '&:hover': { bgcolor: '#db2777' },
            boxShadow: 'none',
          }}
        >
          <Plus size={20} />
        </Button>
      </Box>

      <FormHelperText error={!!error} sx={{ minHeight: '1.25em', ml: 1.5 }}>
        {error || ' '}
      </FormHelperText>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          p: 1,
          mt: 1,
          bgcolor: 'white',
          borderRadius: '8px',
          minHeight: '40px',
        }}
      >
        {data.map((s: string, index: number) => (
          <Chip
            key={`${s}-${index}`}
            label={s}
            onDelete={() => onDelete(s)}
            sx={{
              bgcolor: '#fce7f3',
              color: '#831843',
              fontWeight: 500,
              '& .MuiChip-deleteIcon': {
                color: '#db2777',
                '&:hover': { color: '#831843' },
              },
            }}
          />
        ))}

        {data.length === 0 && (
          <Typography variant="body2" sx={{ color: 'grey.500', p: 1 }}>
            Your skills will appear here...
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default SkillsSection;
