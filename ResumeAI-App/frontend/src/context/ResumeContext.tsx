import React, { createContext, useContext, useState } from 'react';
import { ResumeData } from '../types';
import { initialData } from '../constants/initialData';

type ResumeContextType = {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
};

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeContext = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResumeContext must be used inside ResumeProvider');
  return ctx;
};
