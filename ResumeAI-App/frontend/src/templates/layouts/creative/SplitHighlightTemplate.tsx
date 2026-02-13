import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SplitHighlightTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
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
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      
      {/* LEFT RAIL */}
      <aside style={{ width: '28%', paddingRight: 20, borderRight: '3px solid #000' }}>
        <h1>{p.fullName}</h1>
        <strong>{p.jobTitle}</strong>

        <h3 style={{ marginTop: 20 }}>Skills</h3>
        {skills.map((s: string, i: number) => (
          <div key={i}>{s}</div>
        ))}
      </aside>

      {/* MAIN */}
      <main style={{ paddingLeft: 24, width: '72%' }}>
        {summary && (
          <section>
            <h2>Profile</h2>
            <p>{summary}</p>
          </section>
        )}

        <section>
          <h2>Experience</h2>
          {exp.map((e: any, i: number) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <strong>{e.position}</strong> — {e.company}
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
          <h2>Education</h2>
          {edu.map((e: any, i: number) => (
            <div key={i}>{e.degree} — {e.institution}</div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default SplitHighlightTemplate;
