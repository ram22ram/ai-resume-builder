import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');

    // ❌ Missing params → go home
    if (!token || !userParam) {
      navigate('/', { replace: true });
      return;
    }

    try {
      const decodedUser = JSON.parse(decodeURIComponent(userParam));

      // ❌ Basic validation
      if (!decodedUser?._id || !decodedUser?.email) {
        throw new Error('Invalid user payload');
      }

      // ✅ Save session
      login(decodedUser, token);

      // ✅ Redirect after state settles
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 0);

    } catch (err) {
      console.error('AuthSuccess failed:', err);
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate, login]);

  // 🔄 Minimal loader UI
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#020617',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}
    >
      <CircularProgress color="primary" />
      <Typography mt={2} fontWeight={600}>
        Logging you in…
      </Typography>
      <Typography variant="caption" color="grey.400">
        Please wait a moment
      </Typography>
    </Box>
  );
};

export default AuthSuccess;
