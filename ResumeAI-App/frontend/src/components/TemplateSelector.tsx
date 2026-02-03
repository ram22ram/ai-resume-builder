import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useAuth } from '../context/AuthContext';
import {
  ALL_TEMPLATES,
  ResumeTemplate,
} from '../templates/templates.config';

type Props = {
  selected: string;
  onChange: (id: string) => void;
};

const TemplateSelector: React.FC<Props> = ({ selected, onChange }) => {
  const { user } = useAuth();

  const isPremiumUser = Boolean(user); 
  // 👉 abhi premium = logged-in
  // future me: user.plan === 'premium'

  const handleSelect = (tpl: ResumeTemplate) => {
    if (tpl.isPremium && !isPremiumUser) {
      alert('This is a Premium Template. Please login / upgrade.');
      return;
    }
    onChange(tpl.id);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" mb={2}>
        Choose Template
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 2,
        }}
      >
        {ALL_TEMPLATES.map((tpl) => {
          const locked = tpl.isPremium && !isPremiumUser;

          return (
            <Box
              key={tpl.id}
              onClick={() => handleSelect(tpl)}
              sx={{
                p: 2,
                borderRadius: 2,
                border:
                  tpl.id === selected
                    ? '2px solid #8b5cf6'
                    : '1px solid #334155',
                cursor: locked ? 'not-allowed' : 'pointer',
                opacity: locked ? 0.5 : 1,
                position: 'relative',
                bgcolor: '#020617',
                transition: '0.2s',
                '&:hover': {
                  borderColor: '#8b5cf6',
                },
              }}
            >
              {/* PREVIEW IMAGE */}
              <Box
                sx={{
                  height: 120,
                  mb: 1,
                  borderRadius: 1,
                  backgroundImage: `url(${tpl.previewImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid #1e293b',
                }}
              />

              {/* LOCK ICON */}
              {locked && (
                <LockIcon
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: '#facc15',
                  }}
                />
              )}

              <Typography fontWeight={600}>{tpl.name}</Typography>

              <Typography
                variant="caption"
                sx={{ color: '#94a3b8', display: 'block' }}
              >
                {tpl.description}
              </Typography>

              <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {tpl.isPremium && (
                  <Chip
                    label="PREMIUM"
                    size="small"
                    color="warning"
                  />
                )}
                <Chip
                  label={tpl.category.toUpperCase()}
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TemplateSelector;
