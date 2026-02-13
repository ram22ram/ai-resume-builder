import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SplitVerticalIdentityTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const experience = get('experience');
  const education = get('education');

  const accent = data.metadata.accentColor || '#1e293b';

  return (
    <div style={{ ...standardStyles.page, padding: 0, display: 'flex', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* Vertical Identity Strip */}
      <div style={{
        width: 120,
        backgroundColor: accent,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          transform: 'rotate(-90deg)',
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 2
        }}>
          {personal.fullName}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 60 }}>
        <h2 style={{ marginTop: 0 }}>{personal.jobTitle}</h2>

        <section style={{ marginTop: 40 }}>
          <h3>EXPERIENCE</h3>
          {experience.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: 25 }}>
              <div style={{ fontWeight: 600 }}>{exp.position}</div>
              <div style={{ fontSize: 12 }}>
                {exp.company} • {exp.startDate} - {exp.endDate}
              </div>
              <div>{exp.description}</div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: 40 }}>
          <h3>EDUCATION</h3>
          {education.map((edu: any, i: number) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 600 }}>{edu.degree}</div>
              <div style={{ fontSize: 12 }}>
                {edu.institution} • {edu.startDate} - {edu.endDate}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SplitVerticalIdentityTemplate;
