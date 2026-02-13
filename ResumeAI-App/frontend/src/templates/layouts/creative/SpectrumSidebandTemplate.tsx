import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SpectrumSidebandTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);
  const experience = get('experience');

  const accent = data.metadata.accentColor || '#7c3aed';

  return (
    <div style={{ ...standardStyles.page, display: 'flex', padding: 0, fontFamily: 'Inter, sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: 120, backgroundColor: accent, color: '#fff', padding: 20 }}>
        <div style={{ fontSize: 12, marginBottom: 15 }}>CONTACT</div>
        <div style={{ fontSize: 11 }}>
          {personal.email}
          <br />
          {personal.phone}
        </div>

        <div style={{ fontSize: 12, marginTop: 25, marginBottom: 10 }}>SKILLS</div>
        <div style={{ fontSize: 11 }}>
          {skills.map((s: string, i: number) => (
            <div key={i}>• {s}</div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 40 }}>
        <header style={{ marginBottom: 40 }}>
          <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
          <div style={{ fontSize: 14 }}>{personal.jobTitle}</div>
        </header>

        <section>
          <h3 style={{ fontSize: 13, textTransform: 'uppercase' }}>Experience</h3>
          {experience.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <strong>{exp.position}</strong>
              <div style={{ fontSize: 11 }}>
                {exp.company} • {exp.startDate} - {exp.endDate}
              </div>
              <p style={{ fontSize: 12 }}>{exp.description}</p>
            </div>
          ))}
        </section>
      </div>

    </div>
  );
};

export default SpectrumSidebandTemplate;
