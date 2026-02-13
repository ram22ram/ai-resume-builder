import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const StartupImpactGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const experience = get('experience');
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <header style={{ borderBottom: '3px solid #000', paddingBottom: 12, marginBottom: 20 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14 }}>{personal.jobTitle}</div>
      </header>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* LEFT COLUMN */}
        <div style={{ flex: 2 }}>
          <h3>Professional Experience</h3>
          {experience.map((e: any, i: number) => (
            <div key={i} style={{ marginBottom: 15 }}>
              <strong>{e.position}</strong> — {e.company}
              <div style={{ fontSize: 12, color: '#666' }}>{e.startDate} - {e.endDate}</div>
              <div style={{ fontSize: 12 }}>{e.description}</div>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ flex: 1 }}>
          <h3>Skills</h3>
          <ul style={{ paddingLeft: 16 }}>
            {skills.map((s: string, i: number) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StartupImpactGridTemplate;
