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

    // 🔍 Auto-Fix for potential double /api
    const finalPath = `${API_URL}/api/resume/parse`.replace(/\/api\/api/g, '/api');
    console.log("🚀 Requesting to:", finalPath);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(finalPath, formData, {
        timeout: 120000, // 2 minutes for Render cold start
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data?.success) {
        const extractedText = response.data.rawText || '';
        const parsedResume: ResumeData = {
          ...initialData,
          sections: initialData.sections.map((s) => 
            s.type === 'summary' ? { ...s, content: extractedText, isVisible: true } : { ...s, isVisible: true }
          ),
        };
        ingestResumeData(parsedResume, 'upload');
        setIsParsing(false);
        navigate('/builder'); 
      }
    } catch (error: any) {
      console.error("❌ Upload Error:", error);
      setIsParsing(false);
      alert("Network Error: Backend may be starting up. Please wait 10 seconds and try again.");
    }
  };

  return { startUploadFlow, startAI: () => { ingestResumeData(initialData, 'ai'); navigate('/builder'); }, isParsing };
};