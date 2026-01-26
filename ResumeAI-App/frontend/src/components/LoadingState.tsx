import { Box, CircularProgress, Typography } from '@mui/material';
import Layout from './Layout';

export const LoadingState = () => (
  <Layout>
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      flexDirection: 'column',
      gap: 2
    }}>
      <CircularProgress 
        size={60} 
        thickness={4}
        sx={{ 
          color: '#3b82f6',
          animationDuration: '1s'
        }} 
      />
      <Typography 
        variant="h6" 
        color="white"
        sx={{ 
          mt: 2,
          fontWeight: 500,
          letterSpacing: '0.5px'
        }}
      >
        Loading your resume...
      </Typography>
    </Box>
  </Layout>
);