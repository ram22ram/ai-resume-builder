import React, { useState } from 'react';
import { Box, Typography, Chip, Paper, Grid, Tab, Tabs } from '@mui/material';
import { Lock, CheckCircle } from 'lucide-react';
import { ALL_TEMPLATES, TemplateCategory, ResumeTemplate } from '../templates/templates.config';
import MiniResumePreview from './MiniResumePreview';

interface Props {
  selected: string;
  onChange: (id: string) => void;
}

const categories: { id: TemplateCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Templates' },
  { id: 'fresher', label: 'Students / Freshers' },
  { id: 'tech', label: 'Tech / Developers' },
  { id: 'professional', label: 'Professional / MBA' },
  { id: 'creative', label: 'Creative' },
];

const TemplateSelector: React.FC<Props> = ({ selected, onChange }) => {
  const [activeTab, setActiveTab] = useState<TemplateCategory | 'all'>('all');

  const filteredTemplates = activeTab === 'all' 
    ? ALL_TEMPLATES 
    : ALL_TEMPLATES.filter(t => t.category === activeTab);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Categories Tabs */}
      <Tabs 
        value={activeTab} 
        onChange={(_, v) => setActiveTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
      >
        {categories.map((cat) => (
          <Tab key={cat.id} label={cat.label} value={cat.id} sx={{ textTransform: 'none', fontWeight: 600 }} />
        ))}
      </Tabs>

      {/* Grid */}
      <Grid spacing={2}>
        {filteredTemplates.map((tpl) => {
           const isSelected = selected === tpl.id;
           return (
            <Grid size={{ xs: 6, md: 4, lg: 3 }} key={tpl.id}>
              <Paper
                elevation={isSelected ? 4 : 1}
                onClick={() => onChange(tpl.id)}
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
                }}
              >
                {/* Thumbnail */}
                <Box sx={{ height: 140, bgcolor: '#f3f4f6', borderBottom: '1px solid #eee' }}>
                   <MiniResumePreview 
                      layout={tpl.layout as any} 
                      color={tpl.isPremium ? '#f59e0b' : '#3b82f6'} 
                      isActive={isSelected} 
                   />
                </Box>

                {/* Info */}
                <Box sx={{ p: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {tpl.name}
                    </Typography>
                    {tpl.isPremium ? (
                      <Lock size={14} color="#f59e0b" />
                    ) : (
                      <Box sx={{ color: 'green', fontSize: '10px', fontWeight: 'bold' }}>FREE</Box>
                    )}
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2, display: 'block', mb: 1 }}>
                    {tpl.description}
                  </Typography>

                  {/* Recommendation Tags */}
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                     {tpl.recommendedFor.slice(0, 2).map((tag, i) => (
                       <Chip key={i} label={tag} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                     ))}
                  </Box>
                </Box>

                {/* Selected Overlay Indicator */}
                {isSelected && (
                  <Box sx={{ position: 'absolute', top: 8, right: 8, bgcolor: '#3b82f6', color: 'white', borderRadius: '50%', p: 0.5 }}>
                    <CheckCircle size={16} />
                  </Box>
                )}
              </Paper>
            </Grid>
           );
        })}
      </Grid>
    </Box>
  );
};

export default TemplateSelector;
