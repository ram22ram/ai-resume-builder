import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

interface Props {
  data: ResumeData;
}

const AtlasDevTemplate: React.FC<Props> = ({ data }) => {
  const getItems = (type: ResumeSection['type']) =>
    data.sections.find(s => s.type === type && s.isVisible)?.items || [];

  const personal = getItems('personal')[0] || {};
  const projects = getItems('projects');
  const experience = getItems('experience');
  const skills = getItems('skills').map((s: any) => s.name || s);
  const education = getItems('education');

  const accent = data.metadata.accentColor || '#2563eb';

  return (
    <div style={{ ...standardStyles.page, fontFamily: standardStyles.fonts.modern }}>
      {/* HEADER */}
      <header style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '26pt', margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: '12pt', color: accent }}>{personal.jobTitle}</div>
        <div style={{ fontSize: '9pt', marginTop: 6 }}>
          {[personal.email, personal.github, personal.linkedin].filter(Boolean).join(' • ')}
        </div>
      </header>

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section>
          <h2 style={{ borderBottom: `2px solid ${accent}` }}>Projects</h2>
          {projects.map((p: any, i: number) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <strong>{p.title}</strong>
              <div style={{ fontSize: '9pt', color: '#555' }}>{p.technologies}</div>
              <p style={{ margin: 0 }}>{p.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section>
          <h2>Experience</h2>
          {experience.map((e: any, i: number) => (
            <div key={i}>
              <strong>{e.position}</strong> — {e.company}
              <div style={{ fontSize: '9pt', color: '#666' }}>{e.startDate} – {e.endDate}</div>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section>
          <h2>Skills</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {skills.map((s: string, i: number) => (
              <span key={i} style={{ border: '1px solid #ddd', padding: '4px 8px', borderRadius: 6 }}>
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section>
          <h2>Education</h2>
          {education.map((e: any, i: number) => (
            <div key={i}>
              <strong>{e.institution}</strong> — {e.degree}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default AtlasDevTemplate;
