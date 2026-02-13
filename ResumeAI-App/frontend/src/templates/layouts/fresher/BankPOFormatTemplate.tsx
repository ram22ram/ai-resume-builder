import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const BankPOFormatTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const education = get('education');
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);
  const experience = get('experience');

  const sectionTitle = {
    borderBottom: '1px solid #000',
    marginBottom: 8,
    paddingBottom: 4,
    fontWeight: 700
  };

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Arial, sans-serif', fontSize: 12 }}>
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div>{personal.phone} | {personal.email}</div>
      </header>

      <section>
        <div style={sectionTitle}>Objective</div>
        <p>{personal.objective || "Seeking opportunity in banking sector to utilize analytical and communication skills."}</p>
      </section>

      <section>
        <div style={sectionTitle}>Education</div>
        {education.map((e: any, i: number) => (
          <div key={i} style={{ marginBottom: 6 }}>
            {e.degree} — {e.institution} ({e.year})
          </div>
        ))}
      </section>

      <section>
        <div style={sectionTitle}>Professional Experience</div>
        {experience.map((e: any, i: number) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <strong>{e.position}</strong> - {e.company}
          </div>
        ))}
      </section>

      <section>
        <div style={sectionTitle}>Key Skills</div>
        <ul>
          {skills.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BankPOFormatTemplate;
