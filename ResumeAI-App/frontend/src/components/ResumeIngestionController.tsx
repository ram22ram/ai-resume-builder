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

    // 🔍 DEBUGGER BLOCK: URL ki bashad pakadne ke liye
    const rawPath = `${API_URL}/api/resume/parse`; 
    const finalPath = rawPath.replace(/\/api\/api/g, '/api'); // Double /api ko single karega
    
    console.log("🛠️ DEBUGGER START 🛠️");
    console.log("1. Base API_URL from .env:", API_URL);
    console.log("2. Raw Path generated:", rawPath);
    console.log("3. Final Fixed Path sending to Axios:", finalPath);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(finalPath, formData, {
        timeout: 120000, 
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log("4. ✅ SERVER RESPONSE:", response.data);

      if (response.data?.success) {
        const extractedText = response.data.rawText || '';

        const parsedResume: ResumeData = {
          ...initialData,
          sections: initialData.sections.map((section) => {
            if (section.type === 'summary') {
              return { ...section, content: extractedText, isVisible: true };
            }
            return { ...section, isVisible: true };
          }),
        };

        ingestResumeData(parsedResume, 'upload');
        setIsParsing(false);
        navigate('/builder');
      } else {
        throw new Error('Server response success: false');
      }
    } catch (error: any) {
      console.error("❌ DEBUGGER ERROR ❌");
      console.error("Status Code:", error.response?.status);
      console.error("Error Data:", error.response?.data);
      console.error("Full Error Object:", error);
      
      setIsParsing(false);
      
      const msg = error.code === 'ECONNABORTED' 
        ? "Server is taking too long to wake up. Please wait 10 seconds and try again." 
        : `Upload failed! Status: ${error.response?.status || 'Network Error'}. Check Console.`;
      
      alert(msg);
    } finally {
      console.log("🛠️ DEBUGGER END 🛠️");
    }
  };

  const startAI = () => {
    ingestResumeData(initialData, 'ai');
    navigate('/builder');
  };

  const startLinkedInImport = async () => {
    ingestResumeData(initialData, 'linkedin');
    navigate('/builder');
  };

  return { startUploadFlow, startLinkedInImport, startAI, isParsing };
};