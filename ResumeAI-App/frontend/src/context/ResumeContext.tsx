import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { ResumeData, ResumeSection } from '../types';

interface ResumeContextType {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;
  selectedTemplate: string;
  setSelectedTemplate: (id: string) => void;
  loadFromATS: (text: string) => void;
  
  // Dynamic Section Actions
  addSection: (type: string, title: string) => void;
  removeSection: (id: string) => void;
  reorderSection: (startIndex: number, endIndex: number) => void;
  updateSection: (id: string, content: any) => void;
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
    {
      id: 'projects',
      type: 'projects',
      title: 'Projects',
      isVisible: true,
      content: [],
    },
    {
      id: 'experience',
      type: 'experience',
      title: 'Experience',
      isVisible: true,
      content: [],
    },
  ],
};

const ResumeContext = createContext<ResumeContextType | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resume_draft_v2'); // New key for breaking change
    return saved ? JSON.parse(saved) : initialResume;
  });

  const [selectedTemplate, setSelectedTemplate] = useState(resume.template);

  useEffect(() => {
     localStorage.setItem('resume_draft_v2', JSON.stringify(resume));
  }, [resume]);

  const handleTemplateChange = useCallback((id: string) => {
    setSelectedTemplate(id);
    setResume((prev) => ({ ...prev, template: id }));
  }, []);

  // --- Dynamic Section Handlers ---

  const addSection = useCallback((type: string, title: string) => {
      setResume((prev) => ({
          ...prev,
          sections: [
              ...prev.sections,
              {
                  id: `${type}-${Date.now()}`,
                  type: type as ResumeSection['type'],
                  title,
                  isVisible: true,
                  content: type === 'summary' ? '' : [], // Default content based on type
              }
          ]
      }));
  }, []);

  const removeSection = useCallback((id: string) => {
      setResume((prev) => ({
          ...prev,
          sections: prev.sections.filter(s => s.id !== id)
      }));
  }, []);

  const reorderSection = useCallback((startIndex: number, endIndex: number) => {
      setResume((prev) => {
          const result = Array.from(prev.sections);
          const [removed] = result.splice(startIndex, 1);
          result.splice(endIndex, 0, removed);
          return { ...prev, sections: result };
      });
  }, []);

  const updateSection = useCallback((id: string, content: any) => {
      setResume((prev) => ({
          ...prev,
          sections: prev.sections.map((s) => 
              s.id === id ? { ...s, content } : s
          )
      }));
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
          // TODO: Improve ATS ingestion with regex parsing
        },
        addSection,
        removeSection,
        reorderSection,
        updateSection
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
