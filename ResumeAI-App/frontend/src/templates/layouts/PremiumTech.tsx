import React from 'react';

const PremiumTech = ({ data }: any) => {
  const { personalInfo, summary, experience, projects, skills } = data;

  return (
    <div style={{ fontFamily: 'Inter, monospace', fontSize: 12 }}>
      <h1>{personalInfo.fullName}</h1>
      <p>{personalInfo.jobTitle}</p>

      <h3>Technical Summary</h3>
      <p>{summary}</p>

      <h3>Experience</h3>
      {experience.map((exp: any) => (
        <div key={exp.id}>
          <strong>{exp.position}</strong>
          <p>{exp.description}</p>
        </div>
      ))}

      <h3>Projects</h3>
      {projects?.map((p: any) => (
        <p key={p.id}>
          <strong>{p.title}</strong> – {p.description}
        </p>
      ))}

      <h3>Tech Stack</h3>
      <ul>
        {skills.map((skill: string) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  );
};

export default PremiumTech;
