import React from 'react';
import { Box, Container, Grid, Typography, Link, Stack } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#020617', pt: 10, pb: 5, borderTop: '1px solid #334155' }}>
      <Container>
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, sm:6, md:3}}>
            <Typography variant="h6" sx={{ color: '#f8fafc', mb: 3, fontWeight: 700 }}>Resume-AI</Typography>
            <Stack spacing={1.5}>
              <Link href="/privacy" sx={{ color: '#cbd5e1', textDecoration: 'none' }}>Privacy Policy</Link>
              <Link href="/terms" sx={{ color: '#cbd5e1', textDecoration: 'none' }}>Terms & Conditions</Link>
              <Link href="/refund" sx={{ color: '#cbd5e1', textDecoration: 'none' }}>Refund Policy</Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm:6, md:3}}>
            <Typography variant="h6" sx={{ color: '#f8fafc', mb: 3, fontWeight: 700 }}>AI Tools</Typography>
            <Stack spacing={1.5}>
              <Link href="#services" sx={{ color: '#cbd5e1', textDecoration: 'none' }}>Resume Builder</Link>
              <Link href="#services" sx={{ color: '#cbd5e1', textDecoration: 'none' }}>Mock Interviews</Link>
              <Link href="#services" sx={{ color: '#cbd5e1', textDecoration: 'none' }}>GitHub Converter</Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm:6, md:3}}>
            <Typography variant="h6" sx={{ color: '#f8fafc', mb: 3, fontWeight: 700 }}>Support</Typography>
            <Link href="mailto:contact-us@resume-ai.co.in" sx={{ color: '#cbd5e1', textDecoration: 'none' }}>
              contact-us@resume-ai.co.in
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ textAlign: 'center', pt: 4, borderTop: '1px solid rgba(51, 65, 85, 0.2)', color: '#94a3b8' }}>
          <Typography variant="body2">© 2025 Resume-AI. Built for Modern Job Seekers.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;