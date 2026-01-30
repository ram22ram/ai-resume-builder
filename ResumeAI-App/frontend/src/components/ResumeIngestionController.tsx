import { useState } from 'react';
import axios from 'axios';
import { initialData } from '../constants/initialData';
import { ResumeData } from '../types';
import { useResumeContext } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
// ✅ Importing your working AI service
import { generateContent } from '../utils/aiService';

const API_URL = import.meta.env.VITE_API_URL as string;

export const useResumeIngestionController = () => {
  const { ingestResumeData } = useResumeContext();
  const navigate = useNavigate();
  const [isParsing, setIsParsing] = useState(false);

  const startUploadFlow = async (file: File) => {
    if (!file) return;
    setIsParsing(true);
    
    // Clean API Path
    const finalPath = `${API_URL}/api/resume/parse`.replace(/\/api\/api/g, '/api');

    try {
      // STEP 1: Backend se sirf Raw Text uthao
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(finalPath, formData);
      const rawText = response.data?.data?.summary || "";
      const lines = rawText.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);

      // STEP 2: Frontend AI Call (Like ColdEmail logic)
      // We ask for JSON format specifically
      const aiPrompt = `
        Extract professional resume data from this text into a JSON object.
        Structure: { "fullName": "", "email": "", "phone": "", "jobTitle": "", "summary": "", "skills": [], "experience": [] }
        Text: ${rawText.substring(0, 4000)}
      `;

      const aiResult = await generateContent(aiPrompt, "You are an expert Resume Parser. Respond ONLY with valid JSON.");
      
      // JSON Cleanup
      const cleanJson = aiResult.replace(/```json/g, '').replace(/```/g, '').trim();
      let parsedAi: any = {};
      try {
        parsedAi = JSON.parse(cleanJson);
      } catch (e) {
        console.warn("AI JSON parse failed, using heuristics");
      }

      // STEP 3: Plan B - Heuristics (Just in case AI misses something)
      const detectedName = lines.find((l: string) => {
        const words = l.split(/\s+/).length;
        return words >= 2 && words <= 4 && !/[0-9]/.test(l) && !/resume|email|phone/i.test(l);
      }) || "";

      const jobKeywords = ['Developer', 'Engineer', 'Manager', 'Analyst', 'Lead', 'Designer'];
      const detectedJob = lines.find((l: string) => 
        jobKeywords.some(key => l.toLowerCase().includes(key.toLowerCase()))
      ) || "";

      const extractedEmail = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i)?.[0] || "";
      const extractedPhone = rawText.match(/(\+?\d{1,4}[.\s-]?)?(\(?\d{3}\)?[.\s-]?)?\d{3}[.\s-]?\d{4}/)?.[0] || "";

      // STEP 4: Final Mapping to Sections
      const updatedSections = initialData.sections.map((section) => {
        switch (section.type) {
          case 'personal':
            return {
              ...section,
              content: {
                fullName: parsedAi.fullName || detectedName || 'Your Name',
                email: parsedAi.email || extractedEmail || '',
                phone: (parsedAi.phone || extractedPhone || '').replace(/[^\d+() -.]/g, '').trim(),
                jobTitle: parsedAi.jobTitle || detectedJob || '',
                address: '', portfolio: '', linkedin: ''
              },
              isVisible: true
            };
          case 'summary':
            return { 
              ...section, 
              content: parsedAi.summary || rawText.substring(0, 500), 
              isVisible: true 
            };
          case 'experience':
            return {
              ...section,
              content: Array.isArray(parsedAi.experience) ? parsedAi.experience : [],
              isVisible: true
            };
          case 'skills':
            return {
              ...section,
              content: Array.isArray(parsedAi.skills) ? parsedAi.skills : [],
              isVisible: true
            };
          default:
            return { ...section, isVisible: true };
        }
      });

      const parsedResume: ResumeData = {
        ...initialData,
        sections: updatedSections
      };

      // Push to Context
      ingestResumeData(parsedResume as any, 'upload');
      setIsParsing(false);
      return true;

    } catch (error) {
      console.error("Critical Parse Error:", error);
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