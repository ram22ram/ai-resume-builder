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
      // Step 1: Backend se Raw Text nikalo
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(finalPath, formData);
      const rawText = response.data?.data?.summary || "";

      // Step 2: AI ko instruction do ki JSON schema mein hi data de
      const aiPrompt = `
        Parse this resume text into a STRICT JSON format.
        Schema:
        {
          "personal": { "fullName": "", "jobTitle": "", "email": "", "phone": "", "address": "" },
          "summary": "Professional summary here",
          "experience": [{ "company": "", "position": "", "startDate": "", "endDate": "", "description": "" }],
          "education": [{ "institution": "", "degree": "", "year": "" }],
          "skills": ["Skill 1", "Skill 2"]
        }
        TEXT: ${rawText.substring(0, 4000)}
        Return ONLY valid JSON.
      `;

      const aiResult = await generateContent(aiPrompt, "You are a specialized JSON resume parser.");
      const jsonMatch = aiResult.match(/\{[\s\S]*\}/);
      const parsedAi = JSON.parse(jsonMatch ? jsonMatch[0] : "{}");

      // Step 3: Har section ko individual map karo
      const updatedSections = JSON.parse(JSON.stringify(initialData.sections)).map((section: any) => {
        switch (section.type) {
          case 'personal':
            return {
              ...section,
              content: { ...section.content, ...parsedAi.personal },
              isVisible: true
            };
          case 'summary':
            return { ...section, content: parsedAi.summary || '', isVisible: true };
          case 'experience':
            // AI se aaye multiple experience ko map karo
            return { 
              ...section, 
              content: Array.isArray(parsedAi.experience) ? parsedAi.experience.map((exp: any, i: number) => ({
                id: `exp_${Date.now()}_${i}`,
                ...exp
              })) : [], 
              isVisible: true 
            };
          case 'education':
            return { 
              ...section, 
              content: Array.isArray(parsedAi.education) ? parsedAi.education.map((edu: any, i: number) => ({
                id: `edu_${Date.now()}_${i}`,
                ...edu
              })) : [], 
              isVisible: true 
            };
          case 'skills':
            return { ...section, content: Array.isArray(parsedAi.skills) ? parsedAi.skills : [], isVisible: true };
          default:
            return section;
        }
      });

      const finalResume: ResumeData = { ...initialData, sections: updatedSections };
      ingestResumeData(finalResume as any, 'upload');
      setIsParsing(false);
      navigate('/builder'); // Direct navigate after parse
      return true;
    } catch (error) {
      console.error("Critical AI Parse Error:", error);
      setIsParsing(false);
      return false;
    }
  };

  return { startUploadFlow, isParsing };
};