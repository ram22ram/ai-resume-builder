import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const VerticalAccentProTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const experience = get('experience');
  const projects = get('projects');
  const education = get('education');
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);

  const accent = data.metadata.accentColor || '#2563eb';

  return (
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Accent Bar */}
      <div style={{ width: 14, backgroundColor: accent }} />

      {/* Content */}
      <div style={{ padding: '20mm', flex: 1 }}>
        <h1 style={{ marginBottom: 4 }}>{personal.fullName}</h1>
        <div style={{ color: accent, fontWeight: 600 }}>{personal.jobTitle}</div>

        {summary && <p style={{ marginTop: 12 }}>{summary}</p>}

        <section>
          <h2>Experience</h2>
          {experience.map((e: any, i: number) => (
            <div key={i}>
              <strong>{e.position}</strong> — {e.company}
              <p>{e.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Projects</h2>
          {projects.map((p: any, i: number) => (
            <div key={i}>
              <strong>{p.title}</strong>
              <p>{p.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>Education</h2>
          {education.map((e: any, i: number) => (
            <div key={i}>{e.degree} — {e.institution}</div>
          ))}
        </section>

        <section>
          <h2>Skills</h2>
          <div>{skills.join(' • ')}</div>
        </section>
      </div>
    </div>
  );
};

export default VerticalAccentProTemplate;
