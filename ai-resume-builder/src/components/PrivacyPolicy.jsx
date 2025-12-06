import React from 'react';
import { Box, Container, Typography, Button, Paper, Stack } from '@mui/material';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
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
            <Typography variant="h3" fontWeight="900" mb={1} color="#0f172a">Privacy Policy</Typography>
            <Typography variant="body2" color="text.secondary" mb={4} sx={{ borderBottom: '1px solid #e2e8f0', pb: 3 }}>
              Last Updated: December 6, 2025
            </Typography>

            <Stack spacing={4}>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#334155">1. Information We Collect</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  We collect information you voluntarily provide to us when you use our Resume Builder. This includes your <strong>name, contact details, education history, and work experience</strong>. When you use our ATS Checker, we temporarily process the PDF document you upload to extract text.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#334155">2. How We Use Your Data</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  Your data is used solely for the purpose of generating your resume PDF and providing AI-powered analysis. We <strong style={{color:'#ef4444'}}>do not sell</strong> your personal data to third-party advertisers. Most of the resume data is stored locally on your device (LocalStorage) for your convenience.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#334155">3. Payment Information</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  We use <strong>Razorpay</strong>, a secure payment gateway, to process payments for premium downloads. We do not store or have access to your credit card numbers, UPI PINs, or net banking passwords on our servers.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#334155">4. AI & Third-Party Services</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  To provide features like "AI Summary Generator" and "ATS Score", we send snippets of text to Google's Gemini API. This data is transient and is not used by Google to train their public models. We also use Google Analytics to understand website traffic patterns.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#334155">5. Contact Us</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  If you have questions about this policy, please contact us at <strong>support@resumeai.in</strong>.
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

export default PrivacyPolicy;