// Regex for simple passive voice check
const passiveVoiceRegex = /(\bwas\b|\bresponsible for\b|\bhandled by\b)/i;

/**
 * Calculates a score and finds tips for improvement.
 * @param {object} resumeData - The main resume data state.
 * @returns {{score: number, tips: Array<{id: string, message: string}>}}
 */
// FIX: Galti se laga hua underscore '_' yahan se hata diya gaya hai.
export const calculateScoreAndTips = (resumeData) => {
  let score = 100;
  const tips = [];

  // Rule 1: Summary length
  if (resumeData.summary.trim() === '') {
    score -= 20;
    tips.push({ id: 'summary_empty', message: 'Add a professional summary.' });
  } else if (resumeData.summary.trim().split(/\s+/).length < 20) {
    score -= 10;
    tips.push({ id: 'summary_short', message: 'Your summary is too short. Try to elaborate.' });
  }

  // Rule 2: Experience
  if (resumeData.experience.length === 0 || (resumeData.experience.length === 1 && !resumeData.experience[0].title)) {
    score -= 20;
    tips.push({ id: 'no_experience', message: 'Add at least one work experience entry.' });
  }

  // Rule 3: Skills
  if (resumeData.skills.length < 3) {
    score -= 10;
    tips.push({ id: 'skills_few', message: 'Add 3-5 key skills.' });
  }

  // Rule 4: Passive Voice in Experience
  let passiveFound = false;
  resumeData.experience.forEach(item => {
    if (passiveVoiceRegex.test(item.description)) {
      passiveFound = true;
    }
  });
  if (passiveFound) {
    score -= 10;
    tips.push({ id: 'passive_voice', message: 'Use action verbs (e.g., "Developed", "Managed") instead of passive phrases.' });
  }

  return {
    score: Math.max(40, score), // Minimum score
    tips,
  };
};

/**
 * Validates a specific step of the wizard.
 * @param {number} stepIndex - The 0-based index of the step.
 * @param {object} resumeData - The main resume data state.
 * @returns {{isValid: boolean, error: string | null}}
 */
export const validateStep = (stepIndex, resumeData) => {
  switch (stepIndex) {
    case 0: // Personal Info
      if (!resumeData.personalInfo.fullName.trim()) {
        return { isValid: false, error: 'Full Name is required.' };
      }
      if (!resumeData.personalInfo.email.trim() || !/\S+@\S+\.\S+/.test(resumeData.personalInfo.email)) {
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

/**
 * Generates a plain text version of the resume and triggers download.
 * @param {object} resumeData 
 */
export const generateTxt = (resumeData) => {
  let text = '';
  
  text += `${resumeData.personalInfo.fullName}\n`;
  text += `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}\n`;
  text += `${resumeData.personalInfo.address}\n`;
  text += `LinkedIn: ${resumeData.personalInfo.linkedin} | Portfolio: ${resumeData.personalInfo.portfolio}\n`;
  text += `\n--- SUMMARY ---\n${resumeData.summary}\n`;

  text += `\n--- EXPERIENCE ---\n`;
  resumeData.experience.forEach(item => {
    text += `\n${item.title} at ${item.company}\n`;
    // Add dates
    text += `${item.description}\n`;
  });

  text += `\n--- EDUCATION ---\n`;
  resumeData.education.forEach(item => {
    text += `\n${item.degree} at ${item.school}\n`;
  });

  text += `\n--- PROJECTS ---\n`;
  resumeData.projects.forEach(item => {
    text += `\n${item.title} (${item.link})\n`;
    text += `${item.description}\n`;
  });

  text += `\n--- SKILLS ---\n`;
  text += resumeData.skills.join(', ') + '\n';
  
  text += `\n--- HOBBIES ---\n`;
  text += resumeData.hobbies + '\n';

  const blob = new Blob([text], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${resumeData.personalInfo.fullName || 'resume'}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};