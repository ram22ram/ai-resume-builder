import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const FounderMinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const projects = get('projects');
  const experience = get('experience');
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', color: '#111' }}>
      <header style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 36, margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 16, color: '#555', marginTop: 4 }}>
          {personal.jobTitle || 'Product Builder | Startup Operator'}
        </div>
        <div style={{ marginTop: 8, fontSize: 12 }}>
          {personal.email} • {personal.phone} • {personal.linkedin}
        </div>
      </header>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Selected Projects</h2>
        {projects.map((p: any, i: number) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{p.title}</strong>
            <div style={{ fontSize: 12, color: '#444' }}>{p.description}</div>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Experience</h2>
        {experience.map((e: any, i: number) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{e.position}</strong> — {e.company}
            <div style={{ fontSize: 12, color: '#555' }}>{e.startDate} - {e.endDate}</div>
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Core Skills</h2>
        <div>{skills.join(' • ')}</div>
      </section>
    </div>
  );
};

export default FounderMinimalTemplate;
