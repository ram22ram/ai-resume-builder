import React from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import TemplateSelector from './templates/TemplateSelector';
import { DUMMY_RESUME_DATA } from '../data/dummyResume';

/* ---------------- TEMPLATE LIST ---------------- */
// Aapki saari templates yahan list hain
const GALLERY_TEMPLATES = [
  { id: 'modern', name: 'Modern Pro', desc: 'Clean & Tech-focused' },
  { id: 'classic', name: 'Executive Classic', desc: 'Traditional & Professional' },
  { id: 'swiss', name: 'Swiss Minimal', desc: 'Bold & High-impact' },
  { id: 'corporate', name: 'Corporate', desc: 'Strictly Corporate' },
  { id: 'fred', name: 'The Fred', desc: 'Modern Sidebar Layout' },
  { id: 'kristy', name: 'The Kristy', desc: 'Compact & Info-rich' },
  { id: 'elena', name: 'The Elena', desc: 'Creative & Artistic' },
  { id: 'harvey', name: 'The Harvey', desc: 'Elegant & Sophisticated' },
];

/* ---------------- MAIN COMPONENT ---------------- */

const TemplateGallery: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ backgroundColor: '#020617', py: 8 }} id="templates">
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography
            variant="h3"
            fontWeight={800}
            sx={{ mb: 2, color: '#ffffff' }}
          >
            Pick a <span style={{ color: '#7c3aed' }}>CV template</span>
          </Typography>
          <Typography color="text.secondary" variant="h6">
            AI-enhanced templates, recruiter-approved.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {GALLERY_TEMPLATES.map((tpl) => (
            <Grid key={tpl.id} size={{ xs: 12, sm:6, md: 4 }}>
              
              {/* ---------- MAIN CARD WRAPPER ---------- */}
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: 'rgba(15, 23, 42, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
                  }
                }}
              >
                {/* ---------- PREVIEW VIEWPORT (The Gray Box) ---------- */}
                <Box
                  sx={{
                    height: 520, // Card height
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    overflow: 'hidden',
                    backgroundColor: '#f1f5f9', // Light gray background
                    position: 'relative',
                    pt: 4, // Top spacing for the paper look
                  }}
                >
                  {/* ---------- FIXED A4 CANVAS ---------- */}
                  {/* RCA Fix: Is container ko force kiya gaya hai A4 size lene ke liye */}
                  <Box
                    sx={{
                      width: '794px',         // Standard A4 Width
                      minHeight: '1123px',   // Standard A4 Height
                      backgroundColor: '#020617',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.15)', // Resume shadow
                      transform: 'scale(0.9)', // Scaling to fit 380px grid width
                      transformOrigin: 'top center',
                      pointerEvents: 'none', // Prevents interaction inside gallery
                      // Taaki andar ki templates height cut na karein
                      '& > div': {
                        height: 'auto !important',
                        minHeight: '1123px !important'
                      }
                    }}
                  >
                    <TemplateSelector
                      templateName={tpl.id}
                      data={DUMMY_RESUME_DATA} // Professional data use ho raha hai
                      theme={{
                        accentColor: '#3b82f6',
                        fontFamily: 'inter',
                        density: 'compact',
                        photoMode: 'hidden',
                      }}
                      visibleSections={{
                        summary: true,
                        experience: true,
                        education: true,
                        projects: true,
                        skills: true,
                        hobbies: true,
                      }}
                      sectionOrder={[
                        'summary',
                        'experience',
                        'education',
                        'projects',
                        'skills',
                        'hobbies',
                      ]}
                      // ✅ SMART FIX: isPreview false rakha hai taaki content substring na ho
                      isPreview={false} 
                    />
                  </Box>
                </Box>

                {/* ---------- CARD FOOTER ---------- */}
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography fontWeight={800} color="white" variant="h6" mb={0.5}>
                    {tpl.name}
                  </Typography>
                  <Typography variant="caption" color="rgba(255,255,255,0.5)" display="block" mb={2}>
                    {tpl.desc}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                      fontWeight: 'bold',
                      py: 1.2,
                      borderRadius: 2,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      '&:hover': { backgroundColor: '#6d28d9' },
                    }}
                    onClick={() =>
                      navigate('/builder', {
                        state: { selectedTemplate: tpl.id },
                      })
                    }
                  >
                    Use This Template
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TemplateGallery;