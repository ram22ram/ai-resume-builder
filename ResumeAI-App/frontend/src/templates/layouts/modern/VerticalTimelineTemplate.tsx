import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const VerticalTimelineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = get('personal')[0] || {};
  const exp = get('experience');
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);
  const projects = get('projects');
  const edu = get('education');

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <header style={{ marginBottom: 30 }}>
        <h1>{p.fullName}</h1>
        <strong>{p.jobTitle}</strong>
      </header>

      <section>
        <h2>Experience</h2>
        <div style={{ borderLeft: '2px solid #111', paddingLeft: 20 }}>
          {exp.map((e: any, i: number) => (
            <div key={i} style={{ marginBottom: 24, position: 'relative' }}>
              <div style={{
                width: 10,
                height: 10,
                background: '#111',
                borderRadius: '50%',
                position: 'absolute',
                left: -26,
                top: 6
              }} />
              <strong>{e.position}</strong> — {e.company}
              <div style={{ fontSize: 12 }}>{e.startDate} – {e.endDate}</div>
              <p>{e.description}</p>
            </div>
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
        <h2>Skills</h2>
        <div style={{ columns: 2 }}>
          {skills.map((s: string, i: number) => (
            <div key={i}>{s}</div>
          ))}
        </div>
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

export default VerticalTimelineTemplate;
