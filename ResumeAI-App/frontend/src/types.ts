import React from 'react';

// 1. Personal Info ka dhaanchan
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  portfolio: string;
  jobTitle: string;
  photo: string | null;
  [key: string]: any;
}

// 2. Experience, Education aur Projects ke types
export interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent: boolean;
}

export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface ProjectItem {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  link: string;
}

// 3. Modular Section Logic (Yahi "initialData" ke error ko theek karega)
export interface ResumeSection {
  id: string;
  type: 'personal' | 'summary' | 'experience' | 'education' | 'projects' | 'skills' | 'custom';
  title: string;
  content: any;
  isVisible: boolean;
}

// 4. Main Data Structure
export interface ResumeData {
  template: string;
  sections: ResumeSection[];
  theme: {
    accentColor: string;
    fontFamily: string;
    textColor: string;
    density: string;
    photoMode: string;
  };
}

// 5. Handlers ka poora interface
export interface ResumeHandlers {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  handleBack: () => void;
  handleNext: () => void;
  updateSectionContent: (id: string, newContent: any) => void;
  addCustomSection: () => void;
  deleteSection: (id: string) => void;
  
  // ✅ PHASE 1: ADDED MISSING HANDLERS
  handleDateChange: (sectionType: string, itemId: number, field: string, value: string | null) => void;
  handleExperienceCheckboxChange: (itemId: number, isPresent: boolean) => void;
  handleListReorder: (sectionType: string, newItems: any[]) => void;
  handleSave: () => void;
  
  handlePersonalInfoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: (img: string | null) => void;
  handleSummaryChange: (value: string) => void;
  handleListChange: (type: string, id: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  addListItem: (type: string, defaultItem?: any) => void;
  deleteListItem: (type: string, id: number) => void;
  handleAddSkill: (skill: string) => void;
  handleDeleteSkill: (skill: string) => void;
  handleColorChange: (val: string) => void;
  handleFontChange: (val: string) => void;
  handleDensityChange: (val: string) => void;
  handlePhotoModeChange: (val: string) => void;
  handleSectionToggle: (id: string, isVisible: boolean) => void;
  loadingAi: boolean;
  handleAiAction: (actionType: 'roast' | 'improve' | 'suggest', sectionType?: string, itemId?: number) => Promise<string>;
  generatePDF: () => void;
  generateMagicLink: () => string | null;
  generateShareLink: () => string | null;
  updateCustomSectionTitle: (id: string, newTitle: string) => void;
  handleTemplateChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  legacyData: any;
}