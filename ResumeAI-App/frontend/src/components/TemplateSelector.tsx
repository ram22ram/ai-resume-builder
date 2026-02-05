import { Box, Typography } from '@mui/material';
import { Lock } from 'lucide-react';
import { ALL_TEMPLATES } from '../templates/templates.config';

interface Props {
  selected: string;
  onChange: (id: string) => void;
}

const TemplateSelector = ({ selected, onChange }: Props) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3 }}>
      {ALL_TEMPLATES.map((tpl) => (
        <Box
          key={tpl.id}
          sx={{
            p: 2,
            width: 180,
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer',
            position: 'relative',
          }}
          onClick={() => onChange(tpl.id)}
        >
          <Typography fontWeight="bold">{tpl.name}</Typography>

          {tpl.isPremium && (
            <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
              <Lock size={16} />
            </Box>
          )}

          {selected === tpl.id && (
            <Typography color="#22c55e">Selected</Typography>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TemplateSelector;
