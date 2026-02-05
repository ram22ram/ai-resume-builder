import { Box, Button, Typography } from '@mui/material';
import { Lock } from 'lucide-react';
import { usePremium } from '../hooks/usePremium';
import Layout from './Layout';

const PremiumGate = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, isPremium, isLoading } = usePremium();

  if (isLoading) return null;

  if (!isLoggedIn || !isPremium) {
    return (
      <Layout>
        <Box sx={{ p: 6, textAlign: 'center' }}>
          <Lock size={40} />
          <Typography variant="h5" mt={2}>
            Premium Feature
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Upgrade to unlock this feature
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.href = '/pricing'}
          >
            Upgrade @ ₹199/month
          </Button>
        </Box>
      </Layout>
    );
  }

  return children;
};

export default PremiumGate;
