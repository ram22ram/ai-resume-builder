// Regex for simple passive voice check
const passiveVoiceRegex = /(\bwas\b|\bresponsible for\b|\bhandled by\b)/i;

/* =======================
   Interfaces
======================= */

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface ExperienceItem {
  title?: string;
  company?: string;
  description: string;
  startDate?: string;
  endDate?: string;
}

export interface EducationItem {
  degree?: string;
  school?: string;
  startDate?: string;
  endDate?: string;
}

export interface ProjectItem {
  title?: string;
  link?: string;
  description?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  skills: string[];
  hobbies?: string;
}

export interface Tip {
  id: string;
  message: string;
}

/* =======================
   ATS Score & Tips
======================= */

export const calculateScoreAndTips = (
  resumeData: ResumeData
): { score: number; tips: Tip[] } => {
  let score = 100;
  const tips: Tip[] = [];

  // Rule 1: Summary
  if (resumeData.summary.trim() === '') {
    score -= 20;
    tips.push({ id: 'summary_empty', message: 'Add a professional summary.' });
  } else if (resumeData.summary.trim().split(/\s+/).length < 20) {
    score -= 10;
    tips.push({
      id: 'summary_short',
      message: 'Your summary is too short. Try to elaborate.',
    });
  }

  // Rule 2: Experience
  if (
    resumeData.experience.length === 0 ||
    (resumeData.experience.length === 1 &&
      !resumeData.experience[0].title)
  ) {
    score -= 20;
    tips.push({
      id: 'no_experience',
      message: 'Add at least one work experience entry.',
    });
  }

  // Rule 3: Skills
  if (resumeData.skills.length < 3) {
    score -= 10;
    tips.push({
      id: 'skills_few',
      message: 'Add 3–5 key skills.',
    });
  }

  // Rule 4: Passive Voice
  const passiveFound = resumeData.experience.some(
    (item: ExperienceItem) => passiveVoiceRegex.test(item.description)
  );

  if (passiveFound) {
    score -= 10;
    tips.push({
      id: 'passive_voice',
      message:
        'Use action verbs (e.g., "Developed", "Managed") instead of passive phrases.',
    });
  }

  return {
    score: Math.max(40, score),
    tips,
  };
};

/* =======================
   Step Validation
======================= */

export const validateStep = (
  stepIndex: number,
  resumeData: ResumeData
): { isValid: boolean; error: string | null } => {
  switch (stepIndex) {
    case 0: // Personal Info
      if (!resumeData.personalInfo.fullName.trim()) {
        return { isValid: false, error: 'Full Name is required.' };
      }
      if (
        !resumeData.personalInfo.email.trim() ||
        !/\S+@\S+\.\S+/.test(resumeData.personalInfo.email)
      ) {
        return { isValid: false, error: 'A valid Email is required.' };
      }
      return { isValid: true, error: null };

    case 4: // Skills
      if (resumeData.skills.length === 0) {
        return { isValid: false, error: 'Please add at least one skill.' };
      }
      return { isValid: true, error: null };

    default:
      return { isValid: true, error: null };
  }
};

/* =======================
   TXT Resume Export
======================= */

export const generateTxt = (resumeData: ResumeData): void => {
  let text = '';

  const { personalInfo } = resumeData;

  text += `${personalInfo.fullName}\n`;
  text += `${personalInfo.email} | ${personalInfo.phone ?? ''}\n`;
  text += `${personalInfo.address ?? ''}\n`;
  text += `LinkedIn: ${personalInfo.linkedin ?? ''} | Portfolio: ${
    personalInfo.portfolio ?? ''
  }\n`;

  text += `\n--- SUMMARY ---\n${resumeData.summary}\n`;

  text += `\n--- EXPERIENCE ---\n`;
  resumeData.experience.forEach((item: ExperienceItem) => {
    text += `\n${item.title ?? ''} at ${item.company ?? ''}\n`;
    text += `${item.description}\n`;
  });

  text += `\n--- EDUCATION ---\n`;
  resumeData.education.forEach((item: EducationItem) => {
    text += `\n${item.degree ?? ''} at ${item.school ?? ''}\n`;
  });

  text += `\n--- PROJECTS ---\n`;
  resumeData.projects.forEach((item: ProjectItem) => {
    text += `\n${item.title ?? ''} (${item.link ?? ''})\n`;
    text += `${item.description ?? ''}\n`;
  });

  text += `\n--- SKILLS ---\n${resumeData.skills.join(', ')}\n`;

  if (resumeData.hobbies) {
    text += `\n--- HOBBIES ---\n${resumeData.hobbies}\n`;
  }

  const blob = new Blob([text], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${personalInfo.fullName || 'resume'}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
};
