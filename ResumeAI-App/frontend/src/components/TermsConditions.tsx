import React from 'react';
import { Box, Container, Typography, Paper, Stack } from '@mui/material';
import { ShieldCheck } from 'lucide-react';
import Layout from './Layout';

interface TermsConditionsProps {
  onNavigate?: (page: string) => void;
}

const TermsConditions: React.FC<TermsConditionsProps> = () => {
  return (
  <Layout>
    <Box sx={{ flexGrow: 1, py: 6 }}>
        <Container maxWidth="md">
          <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
             <Box display="flex" alignItems="center" gap={2} mb={4}>
                          <ShieldCheck size={40} color="#7c3aed" />
                          <Box>
                            <Typography variant="h4" fontWeight="900" color="#e2e8f0">
                              Terms & Conditions
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Last Updated: December 6, 2025
                            </Typography>
                          </Box>
                        </Box>

            <Stack spacing={4}>
              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#e2e8f0">1. Acceptance of Terms</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  By accessing and using ResumeAI ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this Service.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#e2e8f0">2. Use of Service</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  ResumeAI provides tools to build, format, and analyze professional resumes. You agree to use this information for personal job-seeking purposes only. You are solely responsible for the accuracy of the content you enter into your resume.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#e2e8f0">3. Payments & Pricing</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  Basic resume building is free. Downloading the final high-quality PDF requires a one-time payment (e.g., ₹30). Prices are subject to change without prior notice. All payments are processed securely via third-party gateways.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#e2e8f0">4. AI Disclaimer</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  Our services use Artificial Intelligence to suggest content and score resumes. While we strive for high accuracy, AI models can hallucinate or make errors. ResumeAI does not guarantee job interviews or placements based on these suggestions.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold" gutterBottom color="#e2e8f0">5. Limitation of Liability</Typography>
                <Typography variant="body1" color="text.secondary" lineHeight={1.7}>
                  In no event shall ResumeAI be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use our service.
                </Typography>
              </Box>
            </Stack>

          </Paper>
        </Container>
      </Box>
  </Layout>
  );
};

export default TermsConditions;