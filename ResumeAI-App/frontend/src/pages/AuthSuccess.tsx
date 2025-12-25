import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const userData = JSON.parse(decodeURIComponent(searchParams.get('user') || '{}'));

    if (token && userData) {
      login(userData, token);
      navigate('/dashboard');
    }
  }, []);

  return <div>Logging you in... Please wait.</div>;
};