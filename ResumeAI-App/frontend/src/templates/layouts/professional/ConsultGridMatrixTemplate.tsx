import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const ConsultGridMatrixTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const experience = get('experience');
  const skills = get('skills').map((s: any) => s.name || s);

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>
      
      <header style={{ marginBottom: 25 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 13 }}>{personal.jobTitle}</div>
        <div style={{ fontSize: 12, marginTop: 5 }}>
          {personal.email} • {personal.phone}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>
        
        <div>
          <h3 style={{ borderBottom: '2px solid #000', paddingBottom: 4 }}>Experience</h3>
          {experience.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: 15 }}>
              <strong>{exp.position}</strong> | {exp.company}
              <div style={{ fontSize: 11 }}>{exp.startDate} - {exp.endDate}</div>
              <p style={{ fontSize: 12 }}>{exp.description}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ borderBottom: '2px solid #000', paddingBottom: 4 }}>Skills</h3>
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

export default ConsultGridMatrixTemplate;
