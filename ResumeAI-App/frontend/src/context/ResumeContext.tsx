import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { resumeReducer, initialResumeState, Action } from '../stores/resumeReducer';
import { ResumeData } from '../types/resume';

interface ResumeContextType {
  resume: ResumeData;
  dispatch: React.Dispatch<Action>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage if available
  const [resume, dispatch] = useReducer(resumeReducer, initialResumeState, (initial) => {
    const saved = localStorage.getItem('resume_draft_v3');
    return saved ? JSON.parse(saved) : initial;
  });

  // Auto-save
  useEffect(() => {
    localStorage.setItem('resume_draft_v3', JSON.stringify(resume));
  }, [resume]);

  return (
    <ResumeContext.Provider value={{ resume, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
