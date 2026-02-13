import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const MonoGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const experience = get('experience');
  const projects = get('projects');
  const skills = get('skills').map((s: any) => s.name || s);
  const education = get('education');

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', color: '#111' }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: '28pt', marginBottom: 4 }}>{personal.fullName}</h1>
        <div style={{ fontSize: '12pt' }}>{personal.jobTitle}</div>
      </header>

      <section>
        <h4>Experience</h4>
        {experience.map((e: any, i: number) => (
          <div key={i}>
            <strong>{e.company}</strong> — {e.position}
          </div>
        ))}
      </section>

      <section>
        <h4>Projects</h4>
        {projects.map((p: any, i: number) => (
          <div key={i}>{p.title}</div>
        ))}
      </section>

      <section>
        <h4>Skills</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {skills.map((s: string, i: number) => (
            <div key={i}>{s}</div>
          ))}
        </div>
      </section>

      <section>
        <h4>Education</h4>
        {education.map((e: any, i: number) => (
          <div key={i}>{e.institution}</div>
        ))}
      </section>
    </div>
  );
};

export default MonoGridTemplate;
