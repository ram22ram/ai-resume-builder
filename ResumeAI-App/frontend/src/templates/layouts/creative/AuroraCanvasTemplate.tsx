import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const AuroraCanvasTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const summary = get('summary')[0]?.description;
  const projects = get('projects');
  const experience = get('experience');
  const skills = get('skills').map((s: any) => s.name || s);
  const education = get('education');

  return (
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: 'Poppins, sans-serif' }}>
      {/* LEFT RAIL */}
      <aside style={{ width: '28%', paddingRight: 20 }}>
        <h1 style={{ fontWeight: 600 }}>{personal.fullName}</h1>
        <div style={{ color: '#6366f1' }}>{personal.jobTitle}</div>
        <div style={{ fontSize: '9pt', marginTop: 12 }}>
          {[personal.email, personal.linkedin].filter(Boolean).join('\n')}
        </div>
      </aside>

      {/* MAIN FLOW */}
      <main style={{ width: '72%' }}>
        {summary && (
          <section>
            <h3>Profile</h3>
            <p>{summary}</p>
          </section>
        )}

        <section>
          <h3>Selected Projects</h3>
          {projects.map((p: any, i: number) => (
            <div key={i}>
              <strong>{p.title}</strong>
              <p>{p.description}</p>
            </div>
          ))}
        </section>

        <section>
          <h3>Experience</h3>
          {experience.map((e: any, i: number) => (
            <div key={i}>
              <strong>{e.position}</strong> — {e.company}
            </div>
          ))}
        </section>

        <section>
          <h3>Skills</h3>
          <div>{skills.join(' · ')}</div>
        </section>

        <section>
          <h3>Education</h3>
          {education.map((e: any, i: number) => (
            <div key={i}>{e.degree}</div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default AuroraCanvasTemplate;
