// resume.types.ts
// ✅ Humne src/types se sabkuch import kiya
import { 
  ResumeSection as ISection, 
  ResumeData as IData, 
  ResumeHandlers as IHandlers,
  PersonalInfo as IPersonal,
  ExperienceItem as IExperience,
  EducationItem as IEducation,
  ProjectItem as IProject
} from './types';

// ✅ Aur unhe hi same naam se bahar bhej (export) diya
export type ResumeSection = ISection;
export type ResumeData = IData;
export type ResumeHandlers = IHandlers;
export type PersonalInfo = IPersonal;
export type ExperienceItem = IExperience;
export type EducationItem = IEducation;
export type ProjectItem = IProject;
// resume.types.ts में ये interface add करें:
export interface LegacyResumeData {
  template: string;
  personalInfo: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    portfolio?: string;
    jobTitle?: string;
    photo?: string | null;
  };
  summary: string;
  experience: Array<{
    id: number;
    company?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
    isCurrent?: boolean;
  }>;
  education: Array<{
    id: number;
    institution?: string;
    degree?: string;
    field?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
  }>;
  projects: Array<{
    id: number;
    name?: string;
    description?: string;
    technologies?: string[];
    link?: string;
  }>;
  skills: string[];
  theme: {
    accentColor: string;
    fontFamily: string;
    density: string;
    photoMode: string;
  };
}