import React, { useRef } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  IconButton,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import TemplateSelector from './templates/TemplateSelector';
import { DUMMY_RESUME_DATA } from '../data/dummyResume';

/* ---------------- TEMPLATE LIST ---------------- */
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

const CARD_WIDTH = 360;
const CARD_GAP = 24;
const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;

/* ---------------- MAIN COMPONENT ---------------- */

const TemplateGallery: React.FC = () => {
  const navigate = useNavigate();
  const carouselRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({
      left: -SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({
      left: SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };

  return (
    <Box sx={{ backgroundColor: '#020617', py: 10 }} id="templates">
      <Container maxWidth="xl">

        {/* ---------- HEADER ---------- */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={800} sx={{ mb: 2, color: 'white' }}>
            Pick a <span style={{ color: '#7c3aed' }}>CV template</span>
          </Typography>
          <Typography variant="h6" sx={{ color: '#94a3b8' }}>
            AI-enhanced templates, recruiter-approved.
          </Typography>
        </Box>

        {/* ---------- CAROUSEL WRAPPER ---------- */}
        <Box sx={{ position: 'relative' }}>

          {/* LEFT BUTTON */}
          {!isMobile && (
            <IconButton
              onClick={scrollLeft}
              sx={{
                position: 'absolute',
                top: '50%',
                left: -24,
                transform: 'translateY(-50%)',
                zIndex: 10,
                bgcolor: '#020617',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                '&:hover': { bgcolor: '#0f172a' },
              }}
            >
              <ChevronLeft />
            </IconButton>
          )}

          {/* RIGHT BUTTON */}
          {!isMobile && (
            <IconButton
              onClick={scrollRight}
              sx={{
                position: 'absolute',
                top: '50%',
                right: -24,
                transform: 'translateY(-50%)',
                zIndex: 10,
                bgcolor: '#020617',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                '&:hover': { bgcolor: '#0f172a' },
              }}
            >
              <ChevronRight />
            </IconButton>
          )}

          {/* ---------- CAROUSEL ---------- */}
          <Box
            ref={carouselRef}
            sx={{
              display: 'flex',
              gap: `${CARD_GAP}px`,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              pb: 4,
              px: 2,
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {GALLERY_TEMPLATES.map((tpl) => (
              <Paper
                key={tpl.id}
                elevation={0}
                sx={{
                  minWidth: CARD_WIDTH,
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: 'rgba(15,23,42,0.7)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  transformOrigin: 'center center',

                  /* ✅ HOVER SCALE + SIZE JUMP */
                  '&:hover': {
                    transform: 'scale(1.06)',
                    boxShadow: '0 40px 80px rgba(124,58,237,0.35)',
                    zIndex: 5,
                  },
                }}
              >
                {/* PREVIEW */}
                <Box
                  sx={{
                    height: 520,
                    backgroundColor: '#ffffff',
                    p: 2,
                    overflow: 'hidden',
                  }}
                >
                  <TemplateSelector
                    templateName={tpl.id}
                    data={DUMMY_RESUME_DATA}
                    theme={{
                      accentColor: '#2563eb',
                      fontFamily: 'inter',
                      density: 'compact',
                      photoMode: 'hidden',
                      mode: 'preview',
                    }}
                    isPreview
                  />
                </Box>

                {/* FOOTER */}
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight={800} color="white">
                    {tpl.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: 'rgba(255,255,255,0.6)' }}
                  >
                    {tpl.desc}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 2,
                      background:
                        'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
                      fontWeight: 700,
                      borderRadius: 2,
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)',
                      },
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
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TemplateGallery;
