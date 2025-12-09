import React from 'react';
import { Box, Container, Typography, Paper, Button, Divider, List, ListItem, ListItemIcon, ListItemText, Stack } from '@mui/material';
import { ArrowLeft, ShieldCheck, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface RefundPolicyProps {
  onBack?: () => void;
  onNavigate?: (page: string) => void;
}

const RefundPolicy: React.FC<RefundPolicyProps> = ({ onBack }) => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      <Helmet>
        <title>Refund & Cancellation Policy | ResumeAI</title>
        <meta name="description" content="Read our Refund and Cancellation policy regarding digital resume downloads and payment failures." />
      </Helmet>

      {/* ================= 1. HEADER (NAVBAR) ================= */}
      <Box sx={{ py: 2, position: 'sticky', top: 0, zIndex: 100, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Logo Click -> Home */}
            <Box component="a" href="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', cursor: 'pointer' }}>
              <Box component="img" src="/favicon.svg" alt="Logo" sx={{ width: 32, height: 32, borderRadius: '8px' }} />
              <Typography variant="h5" sx={{ fontWeight: '800', color: '#1e293b', letterSpacing: -0.5 }}>
                Resume<span style={{ color: '#7c3aed' }}>AI</span>
              </Typography>
            </Box>
            
            <Button 
              component="a" href="/" variant="text" startIcon={<ArrowLeft />} sx={{ color: '#64748b', fontWeight: 'bold', textTransform: 'none' }}
            >
              Back to Home
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ================= 2. MAIN CONTENT ================= */}
      <Box sx={{ flexGrow: 1, py: 8 }}>
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '16px', border: '1px solid #e2e8f0' }}>
            
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <ShieldCheck size={40} color="#7c3aed" />
              <Box>
                <Typography variant="h4" fontWeight="900" color="#0f172a">
                  Refund & Cancellation Policy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last Updated: December 2025
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* POLICY CONTENT STARTS */}
            
            <Box mb={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom color="#1e293b">
                1. Failed Transactions (Auto-Refund)
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph lineHeight={1.7}>
                If money is deducted from your account but the Resume PDF was not generated due to a technical error, network failure, or gateway timeout, the amount is usually <strong>automatically refunded</strong> by the payment gateway (Razorpay) to your original payment source within <strong>5-7 business days</strong>.
              </Typography>
              <Box sx={{ bgcolor: '#f0fdf4', p: 2, borderRadius: '8px', border: '1px solid #bbf7d0', display: 'flex', gap: 1.5 }}>
                 <CheckCircle2 size={20} color="#16a34a" style={{ minWidth: 20 }} />
                 <Typography variant="body2" color="#166534" fontWeight="500">
                   You do not need to raise a separate request for failed transactions. The bank reverses these automatically.
                 </Typography>
              </Box>
            </Box>

            <Box mb={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom color="#1e293b">
                2. Successful Downloads (No Refund Policy)
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph lineHeight={1.7}>
                Since our product is a downloadable digital file (PDF), we follow a strict <strong>No Refund Policy</strong> once the resume has been successfully generated or downloaded.
              </Typography>
              <List>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}><AlertCircle size={18} color="#f59e0b" /></ListItemIcon>
                  <ListItemText primary="We cannot revoke access to the file once delivered." primaryTypographyProps={{ fontSize: '0.95rem', color: '#475569' }} />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon sx={{ minWidth: 30 }}><AlertCircle size={18} color="#f59e0b" /></ListItemIcon>
                  <ListItemText primary="Refunds are not offered for 'change of mind' or 'style preference' after purchase." primaryTypographyProps={{ fontSize: '0.95rem', color: '#475569' }} />
                </ListItem>
              </List>
            </Box>

            <Box mb={4}>
              <Typography variant="h6" fontWeight="bold" gutterBottom color="#1e293b">
                3. Duplicate Payments
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph lineHeight={1.7}>
                In the rare case of a double payment (paid twice for the same document), we will process a full refund for the duplicate transaction.
              </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom color="#1e293b">
                Contact Us
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={1}>
                If an auto-refund does not reflect within 7 days, please contact us with your <strong>Transaction ID</strong>.
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" color="#7c3aed">
                📧 support@resumeai.in
              </Typography>
            </Box>

          </Paper>
        </Container>
      </Box>

      {/* ================= 3. FOOTER ================= */}
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

export default RefundPolicy;