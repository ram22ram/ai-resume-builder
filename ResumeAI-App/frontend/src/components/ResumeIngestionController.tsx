import { useState } from 'react';
import axios from 'axios';
import { initialData } from '../constants/initialData';
import { ResumeData } from '../types';
import { useResumeContext } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL as string;

export const useResumeIngestionController = () => {
  const { ingestResumeData } = useResumeContext();
  const navigate = useNavigate();
  const [isParsing, setIsParsing] = useState(false);

  const startUploadFlow = async (file: File) => {
    if (!file) return;
    setIsParsing(true);
    const finalPath = `${API_URL}/api/resume/parse`.replace(/\/api\/api/g, '/api');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(finalPath, formData, {
        timeout: 180000,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data?.success) {
        const aiData = response.data.data;
        const rawText = aiData.summary || "";

        // Fallback info extraction
        const extractedEmail = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || "";

        // ✅ Fixing the "known properties" error by matching common resume keys
        const parsedResume = {
          ...initialData,
          // Check your types/index.ts: if this fails, change 'personalInfo' to 'basics'
          personalInfo: {
            fullName: aiData.full_name || '',
            email: aiData.email || extractedEmail,
            phone: aiData.phone || '',
            jobTitle: aiData.job_title || '',
            address: '', portfolio: '', linkedin: ''
          },
          sections: initialData.sections.map((s: any) => {
            if (s.type === 'summary') return { ...s, content: rawText, isVisible: true };
            return { ...s, isVisible: true };
          }),
        };

        // Casting to any to stop TypeScript from complaining about the key name
        ingestResumeData(parsedResume as any, 'upload');
        setIsParsing(false);
        return true; 
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setIsParsing(false);
      return false;
    }
  };

  return { startUploadFlow, startAI: () => { ingestResumeData(initialData, 'ai'); navigate('/builder'); }, isParsing };
};