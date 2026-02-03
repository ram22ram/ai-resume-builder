import React from 'react';

const SimpleTemplate = ({ data }: any) => {
  const { personalInfo, summary, experience, skills } = data;

  return (
    <div style={{ fontFamily: 'Times New Roman', fontSize: 12 }}>
      <h2>{personalInfo.fullName}</h2>
      <p>{personalInfo.email} | {personalInfo.phone}</p>

      <h3>Summary</h3>
      <p>{summary}</p>

      <h3>Experience</h3>
      {experience.map((exp: any) => (
        <p key={exp.id}>
          <strong>{exp.position}</strong> – {exp.company}
        </p>
      ))}

      <h3>Skills</h3>
      <ul>
        {skills.map((s: string) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
};

export default SimpleTemplate;
