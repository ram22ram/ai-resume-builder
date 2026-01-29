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

      if (response.data?.success && response.data.data) {
        const aiData = response.data.data;

        // Map AI response into the ResumeData shape (use 'personalInfo' as defined by ResumeData)
        const parsedResume = {
          ...initialData,
          personalInfo: {
            fullName: aiData?.full_name || aiData?.fullName || '',
            email: aiData?.email || '',
            phone: aiData?.phone || '',
            jobTitle: aiData?.job_title || aiData?.jobTitle || '',
            address: '',
            portfolio: '',
            linkedin: ''
          },
          sections: initialData.sections.map((s: any) => {
            if (s.type === 'summary') return { ...s, content: aiData?.summary || '', isVisible: true };
            if (s.type === 'experience') return { ...s, items: aiData?.experience || [], isVisible: true };
            if (s.type === 'skills') return { ...s, items: aiData?.skills || [], isVisible: true };
            return { ...s, isVisible: true };
          }),
        } as unknown as ResumeData;

        ingestResumeData(parsedResume, 'upload');
        setIsParsing(false);
        return true; 
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch (error: any) {
      console.error("Upload Error:", error);
      setIsParsing(false);
      alert("AI Processing Failed: " + (error.response?.data?.message || "Server Error"));
      return false;
    }
  };

  return { 
    startUploadFlow, 
    startAI: () => { ingestResumeData(initialData, 'ai'); navigate('/builder'); }, 
    isParsing 
  };
};