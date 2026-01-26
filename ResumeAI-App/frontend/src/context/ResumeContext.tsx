import React, { createContext, useContext, useState } from 'react';
import { ResumeData } from '../types';

export type ResumeOrigin = 'upload' | 'linkedin' | 'ai';

interface ResumeContextType {
  resumeData: ResumeData | null;
  origin: ResumeOrigin | null;
  ingestResumeData: (data: ResumeData, origin: ResumeOrigin) => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [origin, setOrigin] = useState<ResumeOrigin | null>(null);

  const ingestResumeData = (data: ResumeData, o: ResumeOrigin) => {
    setResumeData(data);
    setOrigin(o);
    localStorage.setItem('resume_origin', o);
  };

  const resetResume = () => {
    setResumeData(null);
    setOrigin(null);
  };

  return (
    <ResumeContext.Provider value={{ resumeData, origin, ingestResumeData, resetResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) {
    throw new Error('useResumeContext must be used inside ResumeProvider');
  }
  return ctx;
};
