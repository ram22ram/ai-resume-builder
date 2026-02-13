import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const CampusFlowTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = get('personal')[0] || {};
  const edu = get('education');
  const skills = get('skills').map((s: any) => s.name || s);
  const projects = get('projects');
  const exp = get('experience');

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <header style={{ marginBottom: 32 }}>
        <h1>{p.fullName}</h1>
        <strong>{p.jobTitle || 'Graduate / Student'}</strong>
      </header>

      <section>
        <h2>Education</h2>
        {edu.map((e: any, i: number) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{e.degree}</strong> — {e.institution}
            <div style={{ fontSize: 12 }}>{e.year}</div>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skills.map((s: string, i: number) => (
            <span key={i} style={{ fontSize: 12 }}>{s}</span>
          ))}
        </div>
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

      {exp.length > 0 && (
        <section>
          <h2>Experience</h2>
          {exp.map((e: any, i: number) => (
            <div key={i}>
              <strong>{e.position}</strong> — {e.company}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default CampusFlowTemplate;
