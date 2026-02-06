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

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8, bgcolor: '#f8fafc', borderRadius: 2 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
                No templates found for this category yet.
            </Typography>
            <Typography variant="body2" color="text.disabled">
                Try switching to "All Templates" or another category.
            </Typography>
        </Box>
      )}

      {/* Grid */}
      <Grid spacing={3}>
        {filteredTemplates.map((tpl) => {
           const isSelected = selected === tpl.id;
           return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={tpl.id}>
              <Paper
                elevation={isSelected ? 4 : 1}
                onClick={() => onChange(tpl.id)}
                sx={{
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: isSelected ? '2px solid #3b82f6' : '2px solid transparent',
                  transition: 'all 0.2s ease',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 }
                }}
              >
                {/* Thumbnail */}
                <Box sx={{ height: 180, bgcolor: '#f3f4f6', borderBottom: '1px solid #eee', position: 'relative' }}>
                   <MiniResumePreview 
                      layout={tpl.layout} 
                      templateId={tpl.id} 
                      scale={0.25} // Smaller scale for selector list
                   />
                   
                   {/* Premium Overlay */}
                   {tpl.isPremium && !isSelected && (
                       <Box sx={{ 
                           position: 'absolute', inset: 0, 
                           bgcolor: 'rgba(255,255,255,0.6)', 
                           backdropFilter: 'blur(2px)',
                           display: 'flex', alignItems: 'center', justifyContent: 'center',
                           opacity: 0, transition: 'opacity 0.2s',
                           '&:hover': { opacity: 1 }
                       }}>
                           <Chip label="Premium" color="warning" size="small" icon={<Lock size={12} />} />
                       </Box>
                   )}
                </Box>

                {/* Info */}
                <Box sx={{ p: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                      {tpl.name}
                    </Typography>
                    {tpl.isPremium ? (
                      <Lock size={16} color="#f59e0b" style={{ minWidth: 16 }} />
                    ) : (
                      <Chip label="FREE" size="small" color="success" variant="outlined" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 'bold' }} />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                    {tpl.description}
                  </Typography>

                  {/* Recommendation Tags */}
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                     {tpl.recommendedFor.slice(0, 2).map((tag, i) => (
                       <Chip key={i} label={tag} size="small" sx={{ height: 22, fontSize: '0.7rem', bgcolor: '#f1f5f9' }} />
                     ))}
                  </Box>
                </Box>

                {/* Selected Overlay Indicator */}
                {isSelected && (
                  <Box sx={{ position: 'absolute', top: 10, right: 10, bgcolor: '#3b82f6', color: 'white', borderRadius: '50%', p: 0.5, boxShadow: 2 }}>
                    <CheckCircle size={18} />
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
