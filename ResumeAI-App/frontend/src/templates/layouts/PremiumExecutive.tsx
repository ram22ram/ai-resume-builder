import React from 'react';

const PremiumExecutive = ({ data }: any) => {
  const { personalInfo, summary, experience } = data;

  return (
    <div style={{ fontFamily: 'Helvetica', fontSize: 12 }}>
      <header style={{ marginBottom: 12 }}>
        <h1>{personalInfo.fullName}</h1>
        <strong>{personalInfo.jobTitle}</strong>
      </header>

      <section>
        <h3>Executive Summary</h3>
        <p>{summary}</p>
      </section>

      <section>
        <h3>Leadership Experience</h3>
        {experience.map((exp: any) => (
          <div key={exp.id} style={{ marginBottom: 8 }}>
            <strong>{exp.position}</strong> – {exp.company}
            <div>{exp.description}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PremiumExecutive;
