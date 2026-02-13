import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const FloatingCardsTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const experience = get('experience');
  const skills = get('skills');

  const accent = data.metadata.accentColor || '#2563eb';

  const cardStyle: React.CSSProperties = {
    background: '#ffffff',
    padding: 25,
    borderRadius: 12,
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    marginBottom: 25
  };

  return (
    <div style={{ ...standardStyles.page, background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      
      <div style={cardStyle}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ color: accent, fontWeight: 600 }}>{personal.jobTitle}</div>
        <div style={{ fontSize: 12 }}>
          {personal.email} • {personal.phone}
        </div>
      </div>

      {summary && (
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>PROFILE</h3>
          <p style={{ lineHeight: 1.6 }}>{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>EXPERIENCE</h3>
          {experience.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 600 }}>{exp.position}</div>
              <div style={{ fontSize: 12 }}>
                {exp.company} • {exp.startDate} - {exp.endDate}
              </div>
              <div>{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>SKILLS</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {skills.map((s: any, i: number) => (
              <span key={i} style={{
                background: accent,
                color: '#fff',
                padding: '6px 12px',
                borderRadius: 20,
                fontSize: 12
              }}>
                {s.name || s}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default FloatingCardsTemplate;
