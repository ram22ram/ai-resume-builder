import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const StrategyClassicEliteTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const experience = get('experience');
  const education = get('education');

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Georgia, serif', color: '#111' }}>
      
      <header style={{ textAlign: 'center', marginBottom: 25 }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 12, marginTop: 6 }}>
          {personal.email} | {personal.phone} | {personal.linkedin}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ borderBottom: '1px solid #000', fontSize: 14 }}>PROFILE</h2>
          <p style={{ fontSize: 12 }}>{summary}</p>
        </section>
      )}

      <section style={{ marginBottom: 20 }}>
        <h2 style={{ borderBottom: '1px solid #000', fontSize: 14 }}>EXPERIENCE</h2>
        {experience.map((exp: any, i: number) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{exp.position}</strong> — {exp.company}
            <div style={{ fontSize: 11 }}>{exp.startDate} - {exp.endDate}</div>
            <ul style={{ fontSize: 12 }}>
              {exp.description?.split('.').map((d: string, idx: number) =>
                d.trim() ? <li key={idx}>{d.trim()}.</li> : null
              )}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ borderBottom: '1px solid #000', fontSize: 14 }}>EDUCATION</h2>
        {education.map((edu: any, i: number) => (
          <div key={i}>
            <strong>{edu.institution}</strong> — {edu.degree}
            <div style={{ fontSize: 11 }}>{edu.startDate} - {edu.endDate}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default StrategyClassicEliteTemplate;
