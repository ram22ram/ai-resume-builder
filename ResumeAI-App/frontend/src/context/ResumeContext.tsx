import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';

/* ===================== TYPES ===================== */

export interface ResumeSection {
  id: string;
  type:
    | 'personal'
    | 'summary'
    | 'experience'
    | 'education'
    | 'projects'
    | 'skills';
  title: string;
  isVisible: boolean;
  content: any;
}

export interface ResumeData {
  personalInfo: any;
  summary: unknown;
  skills: any;
  template: string;
  sections: ResumeSection[];
}

/* ===================== CONTEXT TYPE ===================== */

interface ResumeContextType {
  resume: ResumeData;
  setResume: React.Dispatch<React.SetStateAction<ResumeData>>;

  selectedTemplate: string;
  setSelectedTemplate: (id: string) => void;

  updateSection: (id: string, content: any) => void;
  loadFromATS: (resumeText: string) => void;
}

/* ===================== INITIAL DATA ===================== */

const initialResume: ResumeData = {
    template: 'simple_clean',
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
            id: 'projects',
            type: 'projects',
            title: 'Projects',
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
    personalInfo: undefined,
    summary: undefined,
    skills: undefined
};

/* ===================== CONTEXT ===================== */

const ResumeContext = createContext<ResumeContextType | null>(null);

/* ===================== PROVIDER ===================== */

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(() => {
    const saved = localStorage.getItem('resume_draft');
    return saved ? JSON.parse(saved) : initialResume;
  });

  const [selectedTemplate, setSelectedTemplate] = useState(
    resume.template || 'simple_clean'
  );

  /* ---------- Update section ---------- */
  const updateSection = useCallback(
    (id: string, content: any) => {
      setResume((prev) => ({
        ...prev,
        sections: prev.sections.map((sec) =>
          sec.id === id ? { ...sec, content } : sec
        ),
      }));
    },
    []
  );

  /* ---------- ATS → Builder Loader ---------- */
  const loadFromATS = useCallback((resumeText: string) => {
    setResume((prev) => ({
      ...prev,
      sections: prev.sections.map((sec) => {
        if (sec.type === 'summary') {
          return {
            ...sec,
            content: resumeText.slice(0, 600),
          };
        }
        return sec;
      }),
    }));
  }, []);

  /* ---------- Template Change ---------- */
  const handleTemplateChange = (id: string) => {
    setSelectedTemplate(id);
    setResume((prev) => ({
      ...prev,
      template: id,
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        setResume,
        selectedTemplate,
        setSelectedTemplate: handleTemplateChange,
        updateSection,
        loadFromATS,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

/* ===================== HOOK ===================== */

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) {
    throw new Error('useResume must be used inside ResumeProvider');
  }
  return ctx;
};
