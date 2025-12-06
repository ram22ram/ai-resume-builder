// src/components/AllTemplatesPage.js
import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Button, Chip, Stack } from '@mui/material';
import { ArrowLeft } from 'lucide-react';
import TemplatePreviewCard from './common/TemplatePreviewCard'; // Ensure path is correct

// Aapke paas jo templates available hain, unki list yahan dalein
const allTemplates = [
  { id: 'modern', title: 'Modern', category: 'Tech', color: '#0B57D0' },
  { id: 'classic', title: 'Classic', category: 'Finance', color: '#000000' },
  { id: 'swiss', title: 'Swiss', category: 'Creative', color: '#2d3748' },
  { id: 'corporate', title: 'Corporate', category: 'Management', color: '#1A237E' },
  { id: 'fred', title: 'Fred', category: 'Creative', color: '#e11d48' },
  { id: 'kristy', title: 'Kristy', category: 'Fresher', color: '#059669' },
  // Baaki templates bhi yahan add kar sakte hain (Harvey, Elena, etc.)
];

const categories = ['All', 'Tech', 'Finance', 'Creative', 'Management', 'Fresher'];

const AllTemplatesPage = ({ onSelect, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? allTemplates 
    : allTemplates.filter(t => t.category === selectedCategory);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', py: 4 }}>
      <Container maxWidth="xl">
        
        {/* Back Button calls the prop function */}
        <Button startIcon={<ArrowLeft />} onClick={onBack} sx={{ mb: 4, color: '#64748b' }}>
          Back to Home
        </Button>

        <Typography variant="h3" fontWeight="900" mb={1} color="#0f172a">
          Pick a Template
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 6, overflowX: 'auto', pb: 1 }}>
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat)}
              sx={{
                fontWeight: 'bold',
                cursor: 'pointer',
                bgcolor: selectedCategory === cat ? '#7c3aed' : 'white',
                color: selectedCategory === cat ? 'white' : '#64748b',
                border: selectedCategory === cat ? 'none' : '1px solid #e2e8f0',
              }}
            />
          ))}
        </Stack>

        <Grid container spacing={4}>
          {filteredTemplates.map((tpl) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={tpl.id}>
              <Box 
                sx={{ 
                  bgcolor: 'white', borderRadius: '16px', overflow: 'hidden',
                  border: '1px solid #e2e8f0', cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }
                }}
                onClick={() => onSelect(tpl.id)} // Selects template and redirects
              >
                <Box sx={{ height: 250, bgcolor: '#f1f5f9', position: 'relative' }}>
                   {/* Agar TemplatePreviewCard component nahi hai, to simple image use karein */}
                   <TemplatePreviewCard templateId={tpl.id} color={tpl.color} />
                </Box>
                <Box sx={{ p: 2 }}>
                  <Typography fontWeight="bold">{tpl.title}</Typography>
                  <Typography variant="caption" color="text.secondary">{tpl.category}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AllTemplatesPage;