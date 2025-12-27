/**
 * NO IMAGES HERE
 * UX Rule: Numbers > visuals
 */

import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const stats = [
  { label: 'ATS Match Rate', value: '92%', suffix: '+' },
  { label: 'Mock Interviews', value: '5k', suffix: '+' },
  { label: 'Cost Effective', value: '₹30', sub: 'per resume' },
  { label: 'Data Privacy', value: '100%', sub: 'Secured' },
];

const Results: React.FC = () => {
  return (
<Box sx={{ py: 8, bgcolor: 'transparent' }}>
  <Container>
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid size={{ xs: 6, md:3 }} key={stat.label}>
          <Box sx={{
            textAlign: 'center',
            p: 3,
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #0f172a 0%, #020617 100%)',
            border: '1px solid #1e293b',
            transition: '0.3s',
            '&:hover': {
              borderColor: '#7C3AED',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)',
              transform: 'translateY(-5px)'
            }
          }}>
            <Typography variant="h3" sx={{ color: '#7C3AED', fontWeight: 'bold', mb: 1 }}>
              {stat.value}
              <Box component="span" sx={{ fontSize: '1.5rem', color: '#A855F7' }}>{stat.suffix}</Box>
            </Typography>
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>{stat.label}</Typography>
            {stat.sub && (
              <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block' }}>{stat.sub}</Typography>
            )}
          </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>
  );
};

export default Results;
