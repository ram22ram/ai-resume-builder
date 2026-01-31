import { useState } from 'react';
import axios from 'axios';
import { initialData } from '../constants/initialData';
import { ResumeData } from '../types';
import { useResumeContext } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { generateContent } from '../utils/aiService';

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
      const response = await axios.post(finalPath, formData);
      const rawText = response.data?.data?.summary || "";

      const aiPrompt = `
        Extract resume data from this text into a VALID JSON OBJECT. 
        Structure: { "fullName": "", "email": "", "phone": "", "jobTitle": "", "summary": "", "skills": [], "experience": [] }
        Text: ${rawText.substring(0, 4000)}
        Return ONLY JSON.
      `;

      const aiResult = await generateContent(aiPrompt, "You are an expert Resume Parser.");
      const cleanJson = aiResult.replace(/```json/g, '').replace(/```/g, '').trim();
      
      let parsedAi: any = {};
      try { parsedAi = JSON.parse(cleanJson); } catch (e) { console.warn("AI Parse Error"); }

      const updatedSections = JSON.parse(JSON.stringify(initialData.sections)).map((section: any) => {
        switch (section.type) {
          case 'personal':
            return {
              ...section,
              content: {
                fullName: parsedAi.fullName || rawText.split('\n')[0].substring(0, 30),
                email: parsedAi.email || rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i)?.[0] || '',
                phone: (parsedAi.phone || rawText.match(/(\+?\d{1,4}[.\s-]?)?\d{10}/)?.[0] || '').replace(/[^\d+() -.]/g, '').trim(),
                jobTitle: parsedAi.jobTitle || '',
                address: '', portfolio: '', linkedin: ''
              },
              isVisible: true
            };
          case 'summary':
            return { ...section, content: parsedAi.summary || rawText.substring(0, 500), isVisible: true };
          case 'experience':
            return { ...section, content: Array.isArray(parsedAi.experience) ? parsedAi.experience : [], isVisible: true };
          case 'skills':
            return { ...section, content: Array.isArray(parsedAi.skills) ? parsedAi.skills : [], isVisible: true };
          default:
            return { ...section, isVisible: true };
        }
      });

      const parsedResume: ResumeData = { ...initialData, sections: updatedSections };
      ingestResumeData(parsedResume as any, 'upload');
      setIsParsing(false);
      return true;
    } catch (error) {
      console.error("Parse Error:", error);
      setIsParsing(false);
      return false;
    }
  };

  return { startUploadFlow, startAI: () => { ingestResumeData(initialData, 'ai'); navigate('/builder'); }, isParsing };
};