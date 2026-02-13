import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import { TEMPLATES } from '../templates/TemplateRegistry';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { Lock } from 'lucide-react';
import Layout from '../components/Layout';
import ResumeRenderer from '../components/renderer/ResumeRenderer';
import { DUMMY_RESUME } from '../data/dummyResume';

const TemplateSelectPage = () => {
    const navigate = useNavigate();
    const { dispatch } = useResume();
    const [filter, setFilter] = useState('all');

    const handleSelect = (templateId: string) => {
  const template = TEMPLATES.find((t: any) => t.id === templateId);

  if (template) {
    dispatch({ type: 'SET_TEMPLATE', payload: templateId });

    dispatch({
      type: 'UPDATE_METADATA',
      payload: {
        fontFamily: template.defaultFont,
        accentColor: template.defaultColor
      }
    });
  }

  navigate('/builder');
};


    const categories = ['all', 'fresher', 'professional', 'modern', 'creative'];

    const displayedTemplates = filter === 'all' 
        ? TEMPLATES 
        : TEMPLATES.filter((t: any) => t.category === filter);

    return (
        <Layout>
            <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', py: 6 }}>
                <Container maxWidth="xl">
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 6 }}>
                        <Typography variant="h3" fontWeight="800" sx={{ mb: 2, color: '#1e293b' }}>
                            Choose Your Template
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#64748b', maxWidth: 600, mx: 'auto' }}>
                            Professional, ATS-friendly templates designed for top-tier companies. 
                            Select one to start building.
                        </Typography>
                    </Box>

                    {/* Filters */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 6, flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <Chip 
                                key={cat} 
                                label={cat.charAt(0).toUpperCase() + cat.slice(1)} 
                                onClick={() => setFilter(cat)}
                                sx={{ 
                                    textTransform: 'capitalize',
                                    bgcolor: filter === cat ? '#3b82f6' : 'white',
                                    color: filter === cat ? 'white' : '#64748b',
                                    fontWeight: 600,
                                    px: 2,
                                    '&:hover': { bgcolor: filter === cat ? '#2563eb' : '#f1f5f9' }
                                }}
                            />
                        ))}
                    </Box>

                    {/* Grid */}
                    <Grid container spacing={4}>
                        {displayedTemplates.map((item: any) => (
                            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <Paper 
                                    elevation={0}
                                    sx={{ 
                                        position: 'relative', 
                                        overflow: 'hidden', 
                                        borderRadius: 3,
                                        transition: 'all 0.3s ease',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            transform: 'translateY(-8px)',
                                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                >
                                    {/* A4 Preview Container */}
                                    <Box 
                                        className="group"
                                        sx={{ 
                                            bgcolor: '#e2e8f0', 
                                            aspectRatio: '210/297', // A4 Ratio
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative'
                                        }}
                                    >
                                        {/* Mock Paper Look - NOW LIVE PREVIEW */}
                                        <Box sx={{ 
                                            width: '100%', 
                                            height: '100%', 
                                            bgcolor: 'white', 
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                            overflow: 'hidden',
                                            position: 'relative'
                                        }}>
                                             {/* 
                                                Scaling Container: 
                                                Render the resume at a larger fixed width (e.g. 800px) 
                                                and scale it down to fit the card.
                                             */}
                                             <Box sx={{
                                                 width: '800px', // A4-ish width
                                                 height: '1132px', // A4-ish height
                                                 transform: 'scale(0.35)', // Fixed scale for thumbnail
                                                 transformOrigin: 'top left',
                                                 bgcolor: 'white'
                                             }}>
                                                <ResumeRenderer
                                                        templateId={item.id}
                                                        data={{
                                                            ...DUMMY_RESUME,
                                                            templateId: item.id,
                                                            metadata: {
                                                            ...DUMMY_RESUME.metadata,
                                                            fontFamily: item.defaultFont,
                                                            accentColor: item.defaultColor
                                                            }
                                                        }}
                                                        />
                                             </Box>
                                        </Box>

                                        {/* Hover Overlay */}
                                        <Box sx={{
                                            position: 'absolute', inset: 0,
                                            bgcolor: 'rgba(15, 23, 42, 0.6)',
                                            display: 'flex', flexDirection: 'column',
                                            alignItems: 'center', justifyContent: 'center',
                                            gap: 2,
                                            opacity: 0,
                                            transition: 'opacity 0.2s',
                                            '&:hover': { opacity: 1 },
                                            // FIX: Add hover effect capability manually if group-hover is not working from CSS
                                            // (MUI sx hover is on parent, need to target this child)
                                        }}>
                                            <Button 
                                                variant="contained" 
                                                onClick={() => handleSelect(item.id)}
                                                sx={{ bgcolor: '#3b82f6', fontWeight: 'bold' }}
                                            >
                                                Use Template
                                            </Button>
                                        </Box> 
                                        
                                        {/* Premium Badge */}
                                        {item.isPremium && (
                                            <Box sx={{ 
                                                position: 'absolute', top: 12, right: 12, 
                                                bgcolor: '#f59e0b', color: 'white', 
                                                px: 1, py: 0.5, borderRadius: 1,
                                                display: 'flex', alignItems: 'center', gap: 0.5,
                                                fontSize: '0.75rem', fontWeight: 'bold',
                                                zIndex: 10
                                            }}>
                                                <Lock size={12} /> Premium
                                            </Box>
                                        )}
                                    </Box>

                                    {/* Info */}
                                    <Box sx={{ p: 2, bgcolor: 'white' }}>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                                            {item.category} • {item.layout}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
};

export default TemplateSelectPage;
