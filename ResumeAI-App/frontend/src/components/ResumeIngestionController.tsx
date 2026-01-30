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

      // Backend returns raw text even if AI fails
      const rawText = response.data?.data?.summary || "";
      const lines = rawText.split('\n').map((l: string) => l.trim()).filter((l: string) => l.length > 0);

      // --- 🕵️ PLAN B: ENHANCED HEURISTIC EXTRACTION ---
      
      // 1. Name Detection: Looks for the first non-header line that looks like a name
      // Name usually: 2-4 words, no numbers, common header keywords excluded
      const detectedName = lines.find((l: string) => {
        const lower = l.toLowerCase();
        const words = l.split(/\s+/).length;
        return (
          words >= 2 && words <= 4 &&
          !lower.includes('resume') && 
          !lower.includes('curriculum') &&
          !lower.includes('vitae') &&
          !lower.includes('email') &&
          !lower.includes('phone') &&
          !lower.includes('address') &&
          !/[0-9]/.test(l) // Names typically don't have numbers
        );
      }) || "";

      // 2. Job Title Detection: Expanded keywords
      const jobKeywords = ['Developer', 'Engineer', 'Manager', 'Analyst', 'Designer', 'Executive', 'Lead', 'Consultant', 'Specialist', 'Administrator', 'Architect'];
      const detectedJob = lines.find((l: string) => 
        jobKeywords.some(key => l.toLowerCase().includes(key.toLowerCase())) && l.length < 50
      ) || "";

      // 3. Email Detection (Case insensitive)
      const extractedEmail = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/i)?.[0] || "";

      // 4. Phone Detection (More robust regex for various formats)
      // Matches: +1-555-555-5555, (555) 555-5555, 555 555 5555, 555.555.5555
      const extractedPhone = rawText.match(/(\+?\d{1,4}[.\s-]?)?(\(?\d{3}\)?[.\s-]?)?\d{3}[.\s-]?\d{4}/)?.[0] || "";

      // --- 🛠️ MAPPING TO SECTIONS STRUCTURE ---
      
      // Prioritize AI data, fall back to Heuristics
      const finalName = response.data.data.full_name || detectedName;
      const finalEmail = response.data.data.email || extractedEmail;
      // Simple clean up for phone if it captures too much noise
      const finalPhone = (response.data.data.phone || extractedPhone).replace(/[^\d+() -.]/g, '').trim(); 
      const finalJobTitle = response.data.data.job_title || detectedJob;

      const updatedSections = initialData.sections.map((section) => {
        switch (section.type) {
          case 'personal':
            return {
              ...section,
              content: {
                fullName: finalName,
                email: finalEmail,
                phone: finalPhone,
                jobTitle: finalJobTitle,
                address: '', // Address usually hard to regex reliably without AI
                portfolio: '', 
                linkedin: ''
              },
              isVisible: true
            };
          case 'summary':
             // If AI gave a structured summary, use it, else raw text
            return { ...section, content: response.data.data.summary && response.data.data.summary !== rawText ? response.data.data.summary : rawText.substring(0, 500), isVisible: true };
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