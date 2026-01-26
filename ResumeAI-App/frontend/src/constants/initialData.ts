import { ResumeData } from "../types";

export const initialData: ResumeData = {
  template: 'modern',
  sections: [
    { 
      id: 'sec_personal', 
      type: 'personal', 
      title: 'Personal Info', 
      isVisible: true, 
      content: { 
        fullName: '', 
        email: '', 
        phone: '', 
        address: '', 
        linkedin: '', 
        portfolio: '', 
        jobTitle: '', 
        photo: null 
      } 
    },
    { 
      id: 'sec_summary', 
      type: 'summary', 
      title: 'Summary', 
      isVisible: true, 
      content: '' 
    },
    { 
      id: 'sec_experience', 
      type: 'experience', 
      title: 'Experience', 
      isVisible: true, 
      content: [] 
    },
    { 
      id: 'sec_education', 
      type: 'education', 
      title: 'Education', 
      isVisible: true, 
      content: [] 
    },
    { 
      id: 'sec_projects', 
      type: 'projects', 
      title: 'Projects', 
      isVisible: true, 
      content: [] 
    },
    { 
      id: 'sec_skills', 
      type: 'skills', 
      title: 'Skills', 
      isVisible: true, 
      content: [] 
    }
  ],
  theme: { 
    accentColor: '#3b82f6', 
    textColor: '#111827',
    fontFamily: 'inter', 
    density: 'compact', 
    photoMode: 'visible' 
  }
};