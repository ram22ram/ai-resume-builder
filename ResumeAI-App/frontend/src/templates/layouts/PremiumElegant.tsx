import React from 'react';

const PremiumElegant = ({ data }: any) => {
  const { personalInfo, summary, experience, skills } = data;

  return (
    <div style={{ padding: 30, fontFamily: 'Georgia', fontSize: 12 }}>
      <h1 style={{ fontSize: 26, letterSpacing: 1 }}>
        {personalInfo.fullName}
      </h1>
      <p><em>{personalInfo.jobTitle}</em></p>

      <h3>Profile</h3>
      <p>{summary}</p>

      <h3>Professional Experience</h3>
      {experience.map((exp: any) => (
        <div key={exp.id} style={{ marginBottom: 8 }}>
          <strong>{exp.position}</strong> – {exp.company}
          <p>{exp.description}</p>
        </div>
      ))}

      <h3>Core Skills</h3>
      <p>{skills.join(' • ')}</p>
    </div>
  );
};

export default PremiumElegant;
