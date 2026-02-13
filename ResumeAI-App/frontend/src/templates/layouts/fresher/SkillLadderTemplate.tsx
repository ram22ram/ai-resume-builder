import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SkillLadderTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = get('personal')[0] || {};
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);
  const projects = get('projects');
  const edu = get('education');

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <header style={{ marginBottom: 28 }}>
        <h1>{p.fullName}</h1>
        <strong>{p.jobTitle || 'Aspiring Professional'}</strong>
      </header>

      <section>
        <h2>Core Skills</h2>
        <ul>
          {skills.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Academic / Personal Projects</h2>
        {projects.map((p: any, i: number) => (
          <div key={i}>
            <strong>{p.title}</strong>
            <p>{p.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {edu.map((e: any, i: number) => (
          <div key={i}>
            <strong>{e.degree}</strong> — {e.institution}
          </div>
        ))}
      </section>
    </div>
  );
};

export default SkillLadderTemplate;
