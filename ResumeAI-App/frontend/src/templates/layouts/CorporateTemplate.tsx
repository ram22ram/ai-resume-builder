import React from 'react';

const sectionTitle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  marginTop: 16,
  marginBottom: 6,
  borderBottom: '1px solid #333',
  paddingBottom: 2
};

const CorporateTemplate = ({ data }: any) => {
  const { personalInfo, summary, experience, education, skills } = data;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', fontSize: 12, lineHeight: 1.5 }}>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>{personalInfo.fullName}</h1>
      <strong>{personalInfo.jobTitle}</strong>
      <p>{personalInfo.email} | {personalInfo.phone}</p>

      <div style={sectionTitle}>PROFESSIONAL SUMMARY</div>
      <p>{summary}</p>

      <div style={sectionTitle}>WORK EXPERIENCE</div>
      {experience.map((exp: any) => (
        <div key={exp.id} style={{ marginBottom: 6 }}>
          <strong>{exp.position}</strong> – {exp.company}
          <div>{exp.description}</div>
        </div>
      ))}

      <div style={sectionTitle}>EDUCATION</div>
      {education.map((edu: any) => (
        <div key={edu.id}>
          <strong>{edu.degree}</strong> – {edu.institution}
        </div>
      ))}

      <div style={sectionTitle}>SKILLS</div>
      <p>{skills.join(', ')}</p>
    </div>
  );
};

export default CorporateTemplate;
