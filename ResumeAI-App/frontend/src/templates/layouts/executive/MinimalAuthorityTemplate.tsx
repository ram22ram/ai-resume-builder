import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const MinimalAuthorityTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = get('personal')[0] || {};
  const exp = get('experience');
  const projects = get('projects');
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);
  const edu = get('education');

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Georgia, serif' }}>
      <h1>{p.fullName}</h1>
      <div style={{ fontStyle: 'italic', marginBottom: 20 }}>{p.jobTitle}</div>

      <section>
        <h2>Experience</h2>
        {exp.map((e: any, i: number) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <strong>{e.position}</strong>, {e.company}
            <div style={{ fontSize: 12 }}>{e.startDate} – {e.endDate}</div>
            <p>{e.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Projects</h2>
        {projects.map((p: any, i: number) => (
          <div key={i}>{p.title}</div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div>{skills.join(', ')}</div>
      </section>

      <section>
        <h2>Education</h2>
        {edu.map((e: any, i: number) => (
          <div key={i}>{e.degree} — {e.institution}</div>
        ))}
      </section>
    </div>
  );
};

export default MinimalAuthorityTemplate;
