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
        timeout: 150000, // Increased for AI processing
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data?.success) {
        const aiData = response.data.data; // Grok se aaya structured data

        // Mapping AI data to your ResumeData structure
        const parsedResume = {
          ...initialData,
          personalInfo: {
            fullName: aiData.full_name || '',
            email: aiData.email || '',
            phone: aiData.phone || '',
            jobTitle: aiData.job_title || '',
            address: '',
            portfolio: '',
            linkedin: ''
          },
          sections: initialData.sections.map((s) => {
            if (s.type === 'summary') return { ...s, content: aiData.summary || '', isVisible: true };
            if (s.type === 'experience') return { ...s, items: aiData.experience || [], isVisible: true };
            if (s.type === 'skills') return { ...s, items: aiData.skills || [], isVisible: true };
            return { ...s, isVisible: true };
          }),
        } as ResumeData;

        ingestResumeData(parsedResume, 'upload');
        setIsParsing(false);
        return true; // Success signal to close modal
      }
    } catch (error: any) {
      console.error("Upload Error:", error);
      setIsParsing(false);
      alert("Upload failed! Server is busy or file is invalid.");
      return false;
    }
  };

  return { 
    startUploadFlow, 
    startAI: () => { ingestResumeData(initialData, 'ai'); navigate('/builder'); }, 
    isParsing 
  };
};