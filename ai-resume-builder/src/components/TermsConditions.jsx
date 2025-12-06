import React from 'react';
import { Box, Container, Typography, Button, Paper, Stack } from '@mui/material';
import { ArrowLeft } from 'lucide-react';

const TermsConditions = ({ onBack, onNavigate }) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER */}
      <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={onBack}>
              <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 32, height: 32, borderRadius: '8px' }} />
              <Typography variant="h5" sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: -0.5 }}>
                Resume<span style={{ color: '#7c3aed' }}>AI</span>
              </Typography>
            </Box>
            <Button variant="text" startIcon={<ArrowLeft />} onClick={onBack} sx={{ color: '#64748b', fontWeight: 'bold' }}>
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>

      {/* CONTENT */}
      <Box sx={{ flexGrow: 1, py: 6 }}>
        <Container maxWidth="md">
          <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            <Typography variant="h3" fontWeight="900" mb={4} color="#0f172a">Terms & Conditions</Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>Last Updated: December 6, 2025</Typography>

            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>1. Acceptance of Terms</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  By accessing and using ResumeAI, you accept and agree to be bound by the terms and provisions of this agreement.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>2. Use of Service</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  ResumeAI provides tools to build and analyze resumes. You agree to use this information for personal job-seeking purposes only.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>3. Limitation of Liability</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  In no event shall ResumeAI be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use our service. We do not guarantee job placement.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>4. AI Disclaimer</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Our services use Artificial Intelligence. While we strive for accuracy, AI models can make mistakes. You verify all information before submitting your resume to employers.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box sx={{ py: 6, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
        <Container maxWidth="lg">
           <Stack direction="row" spacing={3} justifyContent="center" mb={3}>
              <Typography onClick={() => onNavigate('privacy')} sx={{ cursor: 'pointer', color: '#64748b', fontSize: '0.9rem', '&:hover': { color: '#7c3aed' } }}>Privacy Policy</Typography>
              <Typography onClick={() => onNavigate('terms')} sx={{ cursor: 'pointer', color: '#64748b', fontSize: '0.9rem', '&:hover': { color: '#7c3aed' } }}>Terms & Conditions</Typography>
              <Typography onClick={() => onNavigate('refund')} sx={{ cursor: 'pointer', color: '#64748b', fontSize: '0.9rem', '&:hover': { color: '#7c3aed' } }}>Refund Policy</Typography>
           </Stack>
           <Typography variant="caption" color="text.secondary">© 2025 ResumeAI Builder. All rights reserved.</Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default TermsConditions;