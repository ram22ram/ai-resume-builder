import { Box, Button, Container, Typography } from '@mui/material';
import { startSubscription } from '../../utils/razorpayCheckout';
import { useAuth } from '../../context/AuthContext';

const Pricing = () => {
  const { isAuthenticated } = useAuth();

  const handleUpgrade = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }

    const token = localStorage.getItem('resume_token');
    if (!token) {
      alert('Session expired. Please login again.');
      return;
    }

    startSubscription(token);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 12 }}>
      <Box textAlign="center">
        <Typography variant="h3" fontWeight={800}>
          ResumeAI Pro
        </Typography>

        <Typography mt={2} color="text.secondary">
          ₹199 / month · Cancel anytime
        </Typography>

        <Button
          sx={{ mt: 4, py: 2 }}
          fullWidth
          variant="contained"
          onClick={handleUpgrade}
        >
          Upgrade to Pro
        </Button>
      </Box>
    </Container>
  );
};

export default Pricing;
