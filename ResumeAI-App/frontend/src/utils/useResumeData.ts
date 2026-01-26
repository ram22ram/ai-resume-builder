import { useState, useEffect } from 'react';
import axios from 'axios';
import { initialData } from '../constants/initialData';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

export const useResumeData = (user: any) => {
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.sections && Array.isArray(parsed.sections) && parsed.theme) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading from localStorage:', e);
    }
    return initialData;
  });
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        if (user) {
          const token = localStorage.getItem('resume_token');
          if (token) {
            const res = await axios.get(`${API_URL}/resume`, { 
              headers: { Authorization: `Bearer ${token}` } 
            });
            if (res.data.success && res.data.data) {
              setResumeData(res.data.data);
            }
          }
        }
      } catch (err) { 
        console.error("DB Load Error", err); 
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      loadData();
    }
  }, [user]);

  return { resumeData, setResumeData, isLoading };
};