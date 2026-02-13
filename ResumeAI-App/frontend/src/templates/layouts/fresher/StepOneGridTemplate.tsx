import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const StepOneGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const skills = get('skills').map((s: any) => s.name || s);
  const education = get('education');
  const projects = get('projects');
  const experience = get('experience');

  return (
    <div style={{ ...standardStyles.page, display: 'grid', gridTemplateColumns: '30% 70%', gap: 20 }}>
      {/* LEFT */}
      <aside>
        <h1>{personal.fullName}</h1>
        <div style={{ fontSize: '10pt' }}>{personal.jobTitle}</div>

        <h3>Skills</h3>
        {skills.map((s: string, i: number) => (
          <div key={i}>• {s}</div>
        ))}
      </aside>

      {/* RIGHT */}
      <main>
        <section>
          <h2>Education</h2>
          {education.map((e: any, i: number) => (
            <div key={i}>{e.degree} — {e.institution}</div>
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
          <h2>Experience</h2>
          {experience.map((e: any, i: number) => (
            <div key={i}>{e.position} — {e.company}</div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default StepOneGridTemplate;
