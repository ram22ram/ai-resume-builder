const normalize = (text = '') =>
    text.toLowerCase().replace(/[^a-z0-9 ]/g, ' ');

const keywordScore = (resumeText, jdText) => {
    if (!jdText) return { score: 20, missing: [] };

    const resume = normalize(resumeText);
    const jdWords = [...new Set(normalize(jdText).split(' ').filter(w => w.length > 3))];

    let matched = 0;
    const missing = [];

    jdWords.forEach(word => {
        if (resume.includes(word)) matched++;
        else missing.push(word);
    });

    const ratio = matched / jdWords.length;
    return {
        score: Math.round(ratio * 35),
        missing: missing.slice(0, 15)
    };
};

const experienceScore = (text) => {
    const years = text.match(/(\d+)\+?\s+years?/i);
    if (!years) return 10;
    const y = parseInt(years[1]);
    return Math.min(25, y * 4);
};

const skillsScore = (text) => {
    const skillWords = ['react', 'node', 'sql', 'python', 'java', 'aws', 'docker', 'git'];
    let count = 0;
    skillWords.forEach(s => {
        if (text.toLowerCase().includes(s)) count++;
    });
    return Math.min(20, count * 3);
};

const formattingScore = (text) => {
    if (text.length < 1200) return 4;
    if (text.length < 2500) return 7;
    return 10;
};

const contactScore = (text) => {
    let score = 0;
    if (text.match(/\S+@\S+\.\S+/)) score += 5;
    if (text.match(/\+?\d{10,13}/)) score += 5;
    return score;
};

module.exports = (resumeText, jdText = '') => {
    const keyword = keywordScore(resumeText, jdText);

    const exp = experienceScore(resumeText);
    const skills = skillsScore(resumeText);
    const format = formattingScore(resumeText);
    const contact = contactScore(resumeText);

    return {
        total:
            keyword.score + exp + skills + format + contact,
        breakdown: {
            keywords: keyword.score,
            experience: exp,
            skills,
            formatting: format,
            contact
        },
        missingKeywords: keyword.missing
    };
};
