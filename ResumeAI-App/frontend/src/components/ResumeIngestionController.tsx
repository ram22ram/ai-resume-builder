// src/components/ResumeIngestionController.tsx
import axios from 'axios';
import { initialData } from '../constants/initialData';
import { ResumeData } from '../types';
import { useResumeContext } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL as string;

export const useResumeIngestionController = () => {
  const { ingestResumeData } = useResumeContext();
  const navigate = useNavigate();

  const startUploadFlow = async (file: File) => {
    if (!file) throw new Error('No file selected');

    if (file.size > 3 * 1024 * 1024) throw new Error('File size exceeds 3MB');
    if (file.type !== 'application/pdf') throw new Error('Only PDF supported');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // ✅ FIX 3: Longer timeout + explicit headers
      // const response = await axios.post(`${API_URL}/api/resume/parse`, formData, {
      const response = await axios.post(`${API_URL}/resume/parse`, formData, {
        timeout: 120000, // 1 minute (Render cold start protection)
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (!response.data?.success) throw new Error('Failed to parse resume');

      const extractedText: string = response.data.rawText || '';

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

      ingestResumeData(parsedResume, 'upload');

      // ✅ FIX 4: Correct navigation path
      navigate('/builder'); 

    } catch (error: any) {
      console.error("Upload Error:", error);
      alert(error.code === 'ECONNABORTED' ? "Server taking too long to wake up. Please try again." : "Upload failed!");
    }
  };

  const startLinkedInImport = async () => {
    ingestResumeData(initialData, 'linkedin');
    navigate('/builder');
  };

  const startAI = () => {
    ingestResumeData(initialData, 'ai');
    navigate('/builder');
  };

  return { startUploadFlow, startLinkedInImport, startAI };
};