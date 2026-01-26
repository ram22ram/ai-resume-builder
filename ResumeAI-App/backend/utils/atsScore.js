// backend/utils/atsScore.js
const calculateATS = (resumeData) => {
  let score = 0;

  if (resumeData.sections.find(s => s.type === 'summary' && s.content)) score += 20;
  if (resumeData.sections.find(s => s.type === 'experience' && s.content.length)) score += 30;
  if (resumeData.sections.find(s => s.type === 'skills' && s.content.length)) score += 20;
  if (resumeData.sections.length >= 5) score += 15;
  if (resumeData.theme?.fontFamily) score += 15;

  return Math.min(score, 100);
};

module.exports = calculateATS;
