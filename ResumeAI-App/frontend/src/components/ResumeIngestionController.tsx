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
    
    // API Path normalization
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

        // ✅ THE BRIDGE: Mapping AI data to your Sections-based UI structure
        const updatedSections = initialData.sections.map((section) => {
          switch (section.type) {
            case 'personal':
              return {
                ...section,
                content: {
                  fullName: aiData.full_name || aiData.fullName || '',
                  email: aiData.email || (rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || ''),
                  phone: aiData.phone || (rawText.match(/(\+?\d{1,3}[- ]?)?\d{10}/)?.[0] || ''),
                  jobTitle: aiData.job_title || aiData.jobTitle || '',
                  address: '',
                  portfolio: '',
                  linkedin: ''
                },
                isVisible: true
              };
            
            case 'summary':
              return {
                ...section,
                content: rawText,
                isVisible: true
              };

            case 'experience':
              // AI se agar array aaye toh map karo, nahi toh empty rakho
              return {
                ...section,
                content: Array.isArray(aiData.experience) ? aiData.experience : [],
                isVisible: true
              };

            case 'skills':
              return {
                ...section,
                content: Array.isArray(aiData.skills) ? aiData.skills : [],
                isVisible: true
              };

            default:
              return { ...section, isVisible: true };
          }
        });

        // Final Normalized Resume Object
        const parsedResume: ResumeData = {
          ...initialData,
          sections: updatedSections
        };

        // Global State Update
        ingestResumeData(parsedResume, 'upload');
        setIsParsing(false);
        return true; 
      }
    } catch (error) {
      console.error("Critical Mapping Error:", error);
      setIsParsing(false);
      return false;
    }
  };

  return { 
    startUploadFlow, 
    startAI: () => { ingestResumeData(initialData, 'ai'); navigate('/builder'); }, 
    isParsing 
  };
};