// src/types.ts

export interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
  description: string;
  [key: string]: any;
}

export interface EducationItem {
  id: number;
  degree: string;
  school: string;
  city: string;
  year: string;
  [key: string]: any;
}

export interface ProjectItem {
  id: number;
  title: string;
  link: string;
  description: string;
  [key: string]: any;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  portfolio: string;
  photo: string | null;
  [key: string]: any;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: string[];
  hobbies: string;
  [key: string]: any;
}