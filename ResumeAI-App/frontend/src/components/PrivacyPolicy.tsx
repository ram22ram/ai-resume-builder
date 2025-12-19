import React from 'react';
import { Box, Container, Typography, Paper, Stack } from '@mui/material';
import { ShieldCheck } from 'lucide-react';
import Layout from './Layout';

interface PrivacyPolicyProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = () => {
  return (
   
     <Layout> 
      <Box sx={{ flexGrow: 1, py: 6 }}>
        <Container maxWidth="md">
          <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
           <Box display="flex" alignItems="center" gap={2} mb={4}>
              <ShieldCheck size={40} color="#7c3aed" />
              <Box>
                <Typography variant="h4" fontWeight="900" color="#e2e8f0">
                  Privacy Policy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last Updated: December 6, 2025
                </Typography>
              </Box>
            </Box>

            <Stack spacing={4}>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#e2e8f0">1. Information We Collect</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  We collect information you voluntarily provide to us when you use our Resume Builder. This includes your <strong>name, contact details, education history, and work experience</strong>. When you use our ATS Checker, we temporarily process the PDF document you upload to extract text.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#e2e8f0">2. How We Use Your Data</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  Your data is used solely for the purpose of generating your resume PDF and providing AI-powered analysis. We <strong style={{color:'#ef4444'}}>do not sell</strong> your personal data to third-party advertisers. Most of the resume data is stored locally on your device (LocalStorage) for your convenience.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#e2e8f0">3. Payment Information</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  We use <strong>Razorpay</strong>, a secure payment gateway, to process payments for premium downloads. We do not store or have access to your credit card numbers, UPI PINs, or net banking passwords on our servers.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#e2e8f0">4. AI & Third-Party Services</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  To provide features like "AI Summary Generator" and "ATS Score", we send snippets of text to Google's Gemini API. This data is transient and is not used by Google to train their public models. We also use Google Analytics to understand website traffic patterns.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#e2e8f0">5. Contact Us</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  If you have questions about this policy, please contact us at <strong>support@resumeai.in</strong>.
                </Typography>
              </Box>
            </Stack>

          </Paper>
        </Container>
      </Box>
     </Layout>
      

  );
};

export default PrivacyPolicy;