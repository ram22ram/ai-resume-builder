import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SplitConfidenceTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
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

  return (
    <div
      style={{
        ...standardStyles.page,
        display: 'grid',
        gridTemplateColumns: '60% 40%',
        gap: 24,
        fontFamily: 'Source Sans Pro, sans-serif'
      }}
    >
      {/* LEFT */}
      <div>
        <h1>{personal.fullName}</h1>
        <div style={{ fontWeight: 600 }}>{personal.jobTitle}</div>

        {summary && <p>{summary}</p>}

        <section>
          <h2>Skills</h2>
          {skills.map((s: string, i: number) => (
            <span key={i} style={{ marginRight: 8 }}>{s}</span>
          ))}
        </section>

        <section>
          <h2>Education</h2>
          {education.map((e: any, i: number) => (
            <div key={i}>{e.degree} — {e.institution}</div>
          ))}
        </section>
      </div>

      {/* RIGHT */}
      <div>
        <section>
          <h2>Experience</h2>
          {experience.map((e: any, i: number) => (
            <div key={i} style={{ borderLeft: '2px solid #ddd', paddingLeft: 10, marginBottom: 12 }}>
              <strong>{e.position}</strong>
              <div>{e.company}</div>
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
      </div>
    </div>
  );
};

export default SplitConfidenceTemplate;
