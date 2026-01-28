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

    // 1. Loader ON karo
    setIsParsing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // 2. ✅ FIXED URL: BaseURL + /api + /resume/parse
      const response = await axios.post(`${API_URL}/resume/parse`, formData, {
        timeout: 120000, // 2 minutes (Render cold start protection)
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data?.success) {
        const extractedText = response.data.rawText || '';

        const parsedResume: ResumeData = {
          ...initialData,
          sections: initialData.sections.map((section) => {
            if (section.type === 'summary') {
              return {
                ...section,
                content: extractedText,
                isVisible: true,
              };
            }
            return { ...section, isVisible: true };
          }),
        };

        // 3. Data Context mein bharo
        ingestResumeData(parsedResume, 'upload');
        
        // 4. Loader OFF karke redirect karo
        setIsParsing(false);
        navigate('/builder');
      } else {
        throw new Error('Server response was not successful');
      }
    } catch (error: any) {
      console.error("Upload Error:", error);
      setIsParsing(false); // Error aane par loader band
      
      // Axios error handle karein
      const msg = error.code === 'ECONNABORTED' 
        ? "Server is taking too long to wake up. Please wait 10 seconds and try again." 
        : "Upload failed! Please check your connection or server status.";
      
      alert(msg);
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