import { useEffect } from 'react';
import axios from 'axios';

export const useAutoSave = (resumeData: any, user: any) => {
  useEffect(() => {
    if (!user || !resumeData) return;

    const token = localStorage.getItem('resume_token');
    if (!token) return;

    const timer = setTimeout(() => {
      axios.post(
        `${import.meta.env.VITE_API_URL}/api/resume`,
        { data: resumeData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }, 1500);

    return () => clearTimeout(timer);
  }, [resumeData, user]);
};
