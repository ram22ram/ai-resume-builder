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

      // Backend se extracted raw text hamesha milta hai
      const rawText = response.data?.data?.summary || "";
      const lines = rawText.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);

      // --- 🕵️ PLAN B: HEURISTIC EXTRACTION (BINA AI KE) ---
      
      // 1. Name Detection: Pehli aisi line jo resume/email keyword na ho
      const detectedName = lines.find((l: string) => 
        !l.toLowerCase().includes('resume') && 
        !l.toLowerCase().includes('curriculum') &&
        l.split(' ').length <= 4 // Naam aksar 2-4 words ka hota hai
      ) || "";

      // 2. Job Title Detection: Common keywords se search karna
      const jobKeywords = ['Developer', 'Engineer', 'Manager', 'Analyst', 'Designer', 'Executive', 'Lead'];
      const detectedJob = lines.find((l: string) => 
        jobKeywords.some(key => l.toLowerCase().includes(key.toLowerCase()))
      ) || "";

      // 3. Email & Phone (Vahi logic jisne pehle kaam kiya)
      const extractedEmail = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0] || "";
      const extractedPhone = rawText.match(/(\+?\d{1,3}[- ]?)?\d{10}/)?.[0] || "";

      // --- 🛠️ MAPPING TO SECTIONS STRUCTURE ---
      const updatedSections = initialData.sections.map((section) => {
        switch (section.type) {
          case 'personal':
            return {
              ...section,
              content: {
                fullName: response.data.data.full_name || detectedName, // AI first, then Plan B
                email: response.data.data.email || extractedEmail,
                phone: response.data.data.phone || extractedPhone,
                jobTitle: response.data.data.job_title || detectedJob,
                address: '', portfolio: '', linkedin: ''
              },
              isVisible: true
            };
          case 'summary':
            return { ...section, content: rawText, isVisible: true };
          default:
            return { ...section, isVisible: true };
        }
      });

      const parsedResume: ResumeData = {
        ...initialData,
        sections: updatedSections
      };

      ingestResumeData(parsedResume as any, 'upload');
      setIsParsing(false);
      return true;

    } catch (error) {
      console.error("Critical Parse Error:", error);
      setIsParsing(false);
      return false;
    }
  };

  return { startUploadFlow, startAI: () => { ingestResumeData(initialData, 'ai'); navigate('/builder'); }, isParsing };
};