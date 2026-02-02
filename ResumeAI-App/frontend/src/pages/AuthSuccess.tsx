import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = params.get('token');
    const userParam = params.get('user');

    console.log('AUTH SUCCESS PAGE HIT');
    console.log('Token:', token);
    console.log('User Param:', userParam);

    if (!token || !userParam) {
      console.error('Missing token or user');
      navigate('/', { replace: true });
      return;
    }

    try {
      const user = JSON.parse(decodeURIComponent(userParam));

      if (!user.email) throw new Error('Invalid user object');

      login(user, token);

      // allow state update
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 100);

    } catch (err) {
      console.error('Auth parsing failed', err);
      navigate('/', { replace: true });
    }
  }, [login, navigate, params]);

  return <div style={{ color: 'white', padding: 40 }}>Logging you in…</div>;
};

export default AuthSuccess;
