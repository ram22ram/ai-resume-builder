import { useState } from 'react';
import axios from 'axios';
import { initialData } from '../constants/initialData';
import { ResumeData } from '../types';
import { useResumeContext } from '../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { generateContent } from '../utils/aiService';

const API_URL = import.meta.env.VITE_API_URL as string;

export const useResumeIngestionController = () => {
  const { setResumeData } = useResumeContext();
  const navigate = useNavigate();
  const [isParsing, setIsParsing] = useState(false);

  const startUploadFlow = async (file: File) => {
    if (!file) return false;

    setIsParsing(true);
    const finalPath = `${API_URL}/api/resume/parse`.replace(/\/api\/api/g, '/api');

    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(finalPath, formData);

      const rawText = response.data?.data?.summary || '';

      const aiPrompt = `
Parse this resume text into STRICT JSON.
{
  "personal": { "fullName": "", "jobTitle": "", "email": "", "phone": "", "address": "" },
  "summary": "",
  "experience": [{ "company": "", "position": "", "startDate": "", "endDate": "", "description": "" }],
  "education": [{ "institution": "", "degree": "", "year": "" }],
  "skills": []
}
TEXT: ${rawText.substring(0, 4000)}
ONLY JSON.
`;

      const aiResult = await generateContent(aiPrompt, 'JSON resume parser');
      const jsonMatch = aiResult.match(/\{[\s\S]*\}/);
      const parsedAi = JSON.parse(jsonMatch?.[0] || '{}');

      const updatedSections = initialData.sections.map(section => {
        switch (section.type) {
          case 'personal':
            return { ...section, content: parsedAi.personal || {}, isVisible: true };
          case 'summary':
            return { ...section, content: parsedAi.summary || '', isVisible: true };
          case 'experience':
            return {
              ...section,
              content: (parsedAi.experience || []).map((e: any, i: number) => ({
                id: `exp_${Date.now()}_${i}`,
                ...e
              })),
              isVisible: true
            };
          case 'education':
            return {
              ...section,
              content: (parsedAi.education || []).map((e: any, i: number) => ({
                id: `edu_${Date.now()}_${i}`,
                ...e
              })),
              isVisible: true
            };
          case 'skills':
            return { ...section, content: parsedAi.skills || [], isVisible: true };
          default:
            return section;
        }
      });

      setResumeData({ ...initialData, sections: updatedSections });
      navigate('/builder');
      setIsParsing(false);
      return true;

    } catch (err) {
      console.error(err);
      setIsParsing(false);
      return false;
    }
  };

  return { startUploadFlow, isParsing };
};
