import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');

    if (!token || !userParam) {
      navigate('/', { replace: true });
      return;
    }

    try {
      const userData = JSON.parse(decodeURIComponent(userParam));

      if (!userData || !userData._id || !userData.email) {
        throw new Error('Invalid user data');
      }

      login(userData, token);

      // 🔑 allow state update before redirect
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 0);

    } catch (error) {
      console.error('AuthSuccess error', error);
      navigate('/', { replace: true });
    }
  }, [searchParams, navigate, login]);

  return <div>Logging you in… Please wait.</div>;
};

export default AuthSuccess;
