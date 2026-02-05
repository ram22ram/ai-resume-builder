import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { ResumeData, ResumeSection } from '../types';

interface ResumeContextType {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: string;
  setSelectedTemplate: (id: string) => void;
  loadFromATS: (text: string) => void;
}

const initialResume: ResumeData = {
  template: 'simple',
  theme: {
    accentColor: '#3b82f6',
    fontFamily: 'Outfit',
    textColor: '#1e293b',
    density: 'comfortable',
    photoMode: 'round',
  },
  sections: [
    {
      id: 'personal',
      type: 'personal',
      title: 'Personal Info',
      isVisible: true,
      content: {
        fullName: '',
        email: '',
        phone: '',
        jobTitle: '',
        address: '',
      },
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Summary',
      isVisible: true,
      content: '',
    },
    {
      id: 'experience',
      type: 'experience',
      title: 'Experience',
      isVisible: true,
      content: [],
    },
    {
      id: 'education',
      type: 'education',
      title: 'Education',
      isVisible: true,
      content: [],
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Skills',
      isVisible: true,
      content: [],
    },
  ],
};

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resume_draft');
    return saved ? JSON.parse(saved) : initialResume;
  });

  const [selectedTemplate, setSelectedTemplate] = useState(resume.template);

  const handleTemplateChange = useCallback((id: string) => {
    setSelectedTemplate(id);
    setResume((prev) => ({ ...prev, template: id }));
  }, []);

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        selectedTemplate,
        setSelectedTemplate: handleTemplateChange,
        loadFromATS: (text: string) => {
          console.log('Loading from ATS:', text);
          // TODO: Implement parsing logic or integrated ingestion controller
        },
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) {
    throw new Error('useResume must be used inside ResumeProvider');
  }
  return ctx;
};
