import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const AsymmetricFocusTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const exp = get('experience');
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);
  const projects = get('projects');
  const edu = get('education');

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <div style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 30 }}>{p.fullName}</h1>
        <div style={{ fontWeight: 600 }}>{p.jobTitle}</div>
      </div>

      {summary && <p style={{ maxWidth: '75%' }}>{summary}</p>}

      <section>
        <h2>Experience</h2>
        {exp.map((e: any, i: number) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <strong>{e.position}</strong> — {e.company}
            <p>{e.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skills.map((s: string, i: number) => (
            <span key={i} style={{ border: '1px solid #ddd', padding: '4px 8px' }}>{s}</span>
          ))}
        </div>
      </section>

      <section>
        <h2>Projects</h2>
        {projects.map((p: any, i: number) => (
          <div key={i}>{p.title}</div>
        ))}
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

export default AsymmetricFocusTemplate;
