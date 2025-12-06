import React from 'react';
import { Box, Container, Typography, Button, Paper, Stack } from '@mui/material';
import { ArrowLeft } from 'lucide-react';

const TermsConditions = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      
      {/* === HEADER === */}
      <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', cursor: 'pointer' }}>
              <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 32, height: 32, borderRadius: '8px' }} />
              <Typography variant="h5" sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: -0.5 }}>
                Resume<span style={{ color: '#7c3aed' }}>AI</span>
              </Typography>
            </Box>
            <Button component="a" href="/" variant="text" startIcon={<ArrowLeft />} sx={{ color: '#64748b', fontWeight: 'bold', textTransform: 'none' }}>
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>

      {/* === MAIN CONTENT (Styled like Refund Page) === */}
      <Box sx={{ flexGrow: 1, py: 6 }}>
        <Container maxWidth="md">
          <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <ShieldCheck size={40} color="#7c3aed" />
              </Box>
            <Typography variant="h3" fontWeight="900" mb={1} color="#0f172a">Terms & Conditions</Typography>
            <Typography variant="body2" color="text.secondary" mb={4} sx={{ borderBottom: '1px solid #e2e8f0', pb: 3 }}>
              Last Updated: December 6, 2025
            </Typography>

            <Stack spacing={4}>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#334155">1. Acceptance of Terms</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  By accessing and using ResumeAI ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this Service.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#334155">2. Use of Service</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  ResumeAI provides tools to build, format, and analyze professional resumes. You agree to use this information for personal job-seeking purposes only. You are solely responsible for the accuracy of the content you enter into your resume.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#334155">3. Payments & Pricing</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  Basic resume building is free. Downloading the final high-quality PDF requires a one-time payment (e.g., ₹30). Prices are subject to change without prior notice. All payments are processed securely via third-party gateways.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#334155">4. AI Disclaimer</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  Our services use Artificial Intelligence to suggest content and score resumes. While we strive for high accuracy, AI models can hallucinate or make errors. ResumeAI does not guarantee job interviews or placements based on these suggestions.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#334155">5. Limitation of Liability</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  In no event shall ResumeAI be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use our service.
                </Typography>
              </Box>
            </Stack>

          </Paper>
        </Container>
      </Box>

      {/* === FOOTER === */}
      <Box sx={{ py: 6, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
        <Container maxWidth="lg">
           <Stack direction="row" spacing={3} justifyContent="center" mb={3}>
              <a href="/privacy" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Privacy Policy</a>
              <a href="/terms" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Terms & Conditions</a>
              <a href="/refund" style={{ textDecoration: 'none', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>Refund Policy</a>
           </Stack>
           <Typography variant="caption" color="text.secondary">© 2025 ResumeAI Builder. All rights reserved.</Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default TermsConditions;