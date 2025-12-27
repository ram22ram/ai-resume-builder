import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faRotateLeft,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';


const features = [
  'All AI tools FREE',
  'Unlimited edits forever',
  '92% average ATS score',
  'PDF & Word download',
  'Industry-standard templates',
];


const Pricing: React.FC = () => {
  return (
    <Box
      component="section"
      id="pricing"
      sx={{ py: { xs: 10, md: 14 }, backgroundColor: '#020617' }}
    >
      <Container maxWidth="sm">
        {/* HEADER */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            fontWeight={700}
            mb={2}
            sx={{
              background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Transparent Pricing
          </Typography>
          <Typography color="#94A3B8">
            No subscriptions. Pay only when you download.
          </Typography>
        </Box>

        {/* CARD */}
        <Card
          sx={{
            bgcolor: '#020617',
            borderRadius: '22px',
            border: '1px solid #334155',
            p: { xs: 4, md: 6 },
            textAlign: 'center',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: '#7C3AED',
              boxShadow: '0 25px 80px rgba(124,58,237,0.35)',
            },
          }}
        >
          {/* PRICE */}
          <Typography
            sx={{
              fontSize: '3.5rem',
              fontWeight: 800,
              color: '#10B981',
            }}
          >
            ₹30
          </Typography>
          <Typography sx={{ color: '#94A3B8', mb: 3 }}>
            per resume download
          </Typography>

          {/* FEATURES */}
          <List sx={{ my: 4 }}>
            {features.map((f) => (
              <ListItem key={f} sx={{ py: 0.8 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckIcon sx={{ color: '#10B981' }} />
                </ListItemIcon>
                <Typography color="#CBD5E1">{f}</Typography>
              </ListItem>
            ))}
          </List>

          {/* CTA */}
          <Button
            component={RouterLink}
            to="/builder" // Appropriate link: seedha tool par bhejo
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#10B981',
              py: 2,
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'none', // Text normal dikhega (Director's Choice)
              '&:hover': {
                bgcolor: '#0DA271',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)', // Green glow on hover
              },
              transition: 'all 0.3s ease',
            }}
          >
            First Download FREE
          </Button>

          {/* TRUST ICONS – REAL IMAGES */}
         <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    mt: 5,
    color: '#94A3B8',
  }}
>
  <FontAwesomeIcon
    icon={faShieldHalved}
    size="2x"
    title="Secure Payment"
  />

  <FontAwesomeIcon
    icon={faRotateLeft}
    size="2x"
    title="Money Back Guarantee"
  />

  <FontAwesomeIcon
    icon={faCreditCard}
    size="2x"
    title="Secure Checkout"
  />
</Box>

        </Card>
      </Container>
    </Box>
  );
};

export default Pricing;
