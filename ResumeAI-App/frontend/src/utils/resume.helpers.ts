import { ResumeData } from '../resume.types';

export const convertToLegacyFormat = (resumeData: ResumeData | null) => {
  if (!resumeData || !resumeData.sections || !Array.isArray(resumeData.sections)) {
    return {
      personalInfo: {},
      summary: '',
      experience: [],
      education: [],
      projects: [],
      skills: [],
      theme: { 
        accentColor: '#3b82f6', 
        fontFamily: 'inter', 
        density: 'compact', 
        photoMode: 'visible' 
      }
    };
  }

  const getSectionContent = (type: string) => {
    const section = resumeData.sections.find(s => s.type === type);
    return section?.content || getDefaultContent(type);
  };

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'personal': return {};
      case 'summary': return '';
      case 'experience': return [];
      case 'education': return [];
      case 'projects': return [];
      case 'skills': return [];
      default: return null;
    }
  };

  return {
    personalInfo: getSectionContent('personal'),
    summary: getSectionContent('summary'),
    experience: getSectionContent('experience'),
    education: getSectionContent('education'),
    projects: getSectionContent('projects'),
    skills: getSectionContent('skills'),
    theme: resumeData.theme || { 
      accentColor: '#3b82f6', 
      fontFamily: 'inter', 
      density: 'compact', 
      photoMode: 'visible' 
    }
  };
};

export const validateResumeData = (data: any): boolean => {
  if (!data) return false;
  if (!data.sections || !Array.isArray(data.sections)) return false;
  if (!data.theme || typeof data.theme !== 'object') return false;
  return true;
};

export const getActiveSection = (resumeData: ResumeData, activeStep: number) => {
  if (!resumeData || !resumeData.sections) return null;
  return resumeData.sections[activeStep] || null;
};

export const calculateResumeScore = (resumeData: any) => {
  let score = 0;
  const tips = [];

  // 1. Content Depth (40 Points)
  if (resumeData.personalInfo?.fullName) score += 5;
  if (resumeData.personalInfo?.email && resumeData.personalInfo?.linkedin) score += 10;
  
  if (resumeData.summary?.length > 150) score += 15;
  else if (resumeData.summary?.length > 50) score += 10;
  else tips.push("Summary ko thoda aur detail mein likhein (Target: 150+ chars).");

  // 2. ATS Keyword & Action Verbs Analysis (40 Points)
  const actionVerbs = ['developed', 'managed', 'optimized', 'led', 'designed', 'implemented', 'increased', 'solved'];
  const expString = JSON.stringify(resumeData.experience || "").toLowerCase();
  
  let verbMatch = 0;
  actionVerbs.forEach(verb => { if (expString.includes(verb)) verbMatch++; });
  
  if (verbMatch >= 5) score += 30;
  else {
    score += (verbMatch * 5);
    tips.push("Experience mein 'Optimized', 'Managed' jaise action verbs ka use badhayein.");
  }

  // 3. Section Strength (20 Points)
  if (resumeData.skills?.length >= 8) score += 10;
  else tips.push("Kam se kam 8 technical skills add karein.");
  
  if (resumeData.projects?.length >= 2) score += 10;
  else tips.push("2 strong projects add karne se score improve hoga.");

  return { 
    score: Math.min(score, 100), 
    tips: tips.slice(0, 3) // Top 3 tips only
  };
};