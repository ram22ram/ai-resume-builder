import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

interface Props {
  data: ResumeData;
}

const NeoSplitTemplate: React.FC<Props> = ({ data }) => {
  const getItems = (type: ResumeSection['type']) =>
    data.sections.find(s => s.type === type && s.isVisible)?.items || [];

  const personal = getItems('personal')[0] || {};
  const skills = getItems('skills').map((s: any) => s.name || s);
  const experience = getItems('experience');
  const projects = getItems('projects');
  const education = getItems('education');

  const accent = data.metadata.accentColor || '#0f172a';

  return (
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: standardStyles.fonts.sans }}>
      {/* SIDEBAR */}
      <aside style={{ width: '30%', paddingRight: 20, borderRight: `3px solid ${accent}` }}>
        <h1>{personal.fullName}</h1>
        <div style={{ fontSize: '10pt', color: accent }}>{personal.jobTitle}</div>

        <h3>Skills</h3>
        {skills.map((s: string, i: number) => (
          <div key={i}>• {s}</div>
        ))}

        <h3>Links</h3>
        {[personal.github, personal.linkedin].filter(Boolean).map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </aside>

      {/* MAIN */}
      <main style={{ width: '70%', paddingLeft: 24 }}>
        <section>
          <h2>Experience</h2>
          {experience.map((e: any, i: number) => (
            <div key={i}>
              <strong>{e.position}</strong> @ {e.company}
              <div style={{ fontSize: '9pt' }}>{e.startDate} – {e.endDate}</div>
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
      </main>
    </div>
  );
};

export default NeoSplitTemplate;
