import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const ClearStartTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const education = get('education');
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);
  const projects = get('projects');
  const experience = get('experience');

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Times New Roman, serif' }}>
      <header style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1>{personal.fullName}</h1>
        <div>{personal.jobTitle}</div>
        <div style={{ fontSize: '9pt' }}>
          {[personal.email, personal.phone].filter(Boolean).join(' | ')}
        </div>
      </header>

      <section>
        <h2>Education</h2>
        {education.map((e: any, i: number) => (
          <div key={i}>
            <strong>{e.degree}</strong> — {e.institution}
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div>{skills.join(', ')}</div>
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
        <h2>Internships / Experience</h2>
        {experience.map((e: any, i: number) => (
          <div key={i}>{e.position} — {e.company}</div>
        ))}
      </section>
    </div>
  );
};

export default ClearStartTemplate;
