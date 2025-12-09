import React, { useState } from 'react';
import { Box, Container, Typography, Button, Chip, Stack, Paper } from '@mui/material';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
// @ts-ignore
import TemplatePreviewCard from './common/TemplatePreviewCard'; 

interface AllTemplatesPageProps {
  onSelect: (templateId: string) => void;
  onBack: () => void;
}

const allTemplates = [
  { id: 'modern', title: 'Modern', desc: 'Clean & minimalist.', category: 'Tech', color: '#0B57D0' },
  { id: 'classic', title: 'Classic', desc: 'Traditional & elegant.', category: 'Finance', color: '#000000' },
  { id: 'swiss', title: 'Swiss', desc: 'Strong sidebar.', category: 'Creative', color: '#2d3748' },
  { id: 'corporate', title: 'Corporate', desc: 'Structured.', category: 'Management', color: '#1A237E' },
  { id: 'fred', title: 'Fred', desc: 'Bold headers.', category: 'Creative', color: '#e11d48' },
  { id: 'kristy', title: 'Kristy', desc: 'Soft colors.', category: 'Fresher', color: '#059669' },
  { id: 'elena', title: 'Elena', desc: 'Professional layout.', category: 'Professional', color: '#2E7D32' },
  { id: 'harvey', title: 'Harvey', desc: 'Dark theme accents.', category: 'Management', color: '#424242' },
];

const categories = ['All', 'Tech', 'Finance', 'Creative', 'Management', 'Fresher', 'Professional'];

const AllTemplatesPage: React.FC<AllTemplatesPageProps> = ({ onSelect, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredTemplates = selectedCategory === 'All' 
    ? allTemplates 
    : allTemplates.filter(t => t.category === selectedCategory);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', fontFamily: '"Roboto", sans-serif' }}>
      <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={onBack}>
              <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 32, height: 32, borderRadius: '8px', objectFit: 'cover' }} />
              <Typography variant="h5" sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: -0.5 }}>Resume<span style={{ color: '#7c3aed' }}>AI</span></Typography>
            </Box>
            <Button startIcon={<ArrowLeft />} onClick={onBack} sx={{ color: '#64748b', fontWeight: 'bold' }}>Back to Home</Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box mb={6} textAlign="center">
            <Typography variant="h3" fontWeight="900" mb={2} color="#0f172a">Pick Your Perfect Template</Typography>
        </Box>

        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 8, flexWrap: 'wrap', gap: 1 }}>
          {categories.map((cat) => (
            <Chip key={cat} label={cat} onClick={() => setSelectedCategory(cat)} sx={{ fontWeight: 'bold', cursor: 'pointer', bgcolor: selectedCategory === cat ? '#7c3aed' : 'white', color: selectedCategory === cat ? 'white' : '#64748b' }} />
          ))}
        </Stack>

        <Stack spacing={4}>
          {filteredTemplates.map((tpl) => (
            <Paper key={tpl.id} elevation={0} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, overflow: 'hidden', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', '&:hover': { borderColor: '#a855f7' } }}>
              <Box sx={{ width: { xs: '100%', md: '40%' }, bgcolor: '#f1f5f9', position: 'relative', minHeight: '300px' }}>
                 <Box sx={{ position: 'absolute', inset: 0, p: 2 }}>
                    <TemplatePreviewCard templateId={tpl.id} color={tpl.color} />
                 </Box>
              </Box>
              <Box sx={{ width: { xs: '100%', md: '60%' }, p: { xs: 3, md: 5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <Box mb={2}>
                    <Chip label={tpl.category} size="small" sx={{ mb: 2, bgcolor: '#f3e8ff', color: '#7c3aed', fontWeight: 'bold' }} />
                    <Typography variant="h4" fontWeight="800" color="#1e293b" mb={1}>{tpl.title}</Typography>
                    <Typography variant="body1" color="#64748b" mb={3}>{tpl.desc}</Typography>
                    <Stack spacing={1} mb={4}>
                        <Box display="flex" alignItems="center" gap={1} color="#475569"><CheckCircle2 size={18} color="#16a34a" /> <Typography variant="body2">ATS-Friendly Layout</Typography></Box>
                    </Stack>
                  </Box>
                  <Button variant="contained" size="large" onClick={() => onSelect(tpl.id)} sx={{ alignSelf: 'flex-start', bgcolor: '#7c3aed', borderRadius: '50px' }}>Use This Template</Button>
              </Box>
            </Paper>
          ))}
        </Stack>
      </Container>
      
      <Box sx={{ py: 6, bgcolor: '#ffffff', borderTop: '1px solid #e2e8f0', textAlign: 'center', mt: 8 }}>
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mb: 2 }}>
              <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 32, height: 32, borderRadius: '8px', objectFit: 'cover' }} />
              <Typography variant="h6" sx={{ fontWeight: '800', color: '#1e293b' }}>Resume<span style={{ color: '#7c3aed' }}>AI</span></Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">© 2025 ResumeAI Builder. All rights reserved.</Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default AllTemplatesPage;