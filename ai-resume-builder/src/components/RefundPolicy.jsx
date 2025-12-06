import React from 'react';
import { Box, Container, Typography, Button, Paper, Stack } from '@mui/material';
import { ArrowLeft } from 'lucide-react';

const RefundPolicy = ({ onBack, onNavigate }) => {
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
            <Typography variant="h3" fontWeight="900" mb={4} color="#0f172a">Refund & Cancellation</Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>Last Updated: December 6, 2025</Typography>

            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>1. Digital Products</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Since our product is a downloadable digital file (PDF), we generally do not offer refunds once the file has been generated, as it cannot be "returned."
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>2. Eligible Refunds</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  We will issue a full refund only if:
                  <ul>
                    <li>You were charged twice for the same transaction.</li>
                    <li>Payment was successful but the PDF was not generated due to a technical error.</li>
                  </ul>
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom>3. How to Request</Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Please email <strong>support@resumeai.in</strong> within 7 days of purchase with your Transaction ID. Refunds are processed within 5-7 business days.
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

export default RefundPolicy;