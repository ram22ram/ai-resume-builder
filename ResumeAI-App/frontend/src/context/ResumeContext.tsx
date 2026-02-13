import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { resumeReducer, initialResumeState, Action } from '../stores/resumeReducer';
import { ResumeData } from '../types/resume';
import { getTemplateComponent } from '../templates/TemplateRegistry';

interface ResumeContextType {
  resume: ResumeData;
  dispatch: React.Dispatch<Action>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {

  const [resume, dispatch] = useReducer(
    resumeReducer,
    initialResumeState,
    (initial) => {
      const saved = localStorage.getItem('resume_draft_v3');

      if (!saved) return initial;

      try {
        const parsed: ResumeData = JSON.parse(saved);

        // ✅ Validate templateId exists in registry
        try {
          getTemplateComponent(parsed.templateId);
        } catch {
          console.warn('Invalid templateId found in localStorage. Resetting to default.');
          parsed.templateId = initial.templateId;
        }

        return parsed;
      } catch (error) {
        console.warn('Corrupted resume_draft_v3 found. Resetting to default.');
        return initial;
      }
    }
  );

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
