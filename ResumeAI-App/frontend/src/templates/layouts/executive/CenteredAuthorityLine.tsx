import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const CenteredAuthorityLine: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const experience = get('experience');
  const education = get('education');

  const accent = data.metadata.accentColor || '#1e293b';

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: '"Georgia", serif',
      textAlign: 'center'
    }}>

      {/* Header */}
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ margin: 0, fontSize: 30, letterSpacing: 2 }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 14, color: accent, marginTop: 6 }}>
          {personal.jobTitle}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: '#666' }}>
          {personal.email} • {personal.phone}
        </div>
      </header>

      {/* Divider */}
      <div style={{
        width: 2,
        height: 40,
        background: accent,
        margin: '0 auto 40px auto'
      }} />

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: 40 }}>
          <p style={{
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.7,
            fontFamily: 'Inter, sans-serif'
          }}>
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ letterSpacing: 1, marginBottom: 20 }}>
          EXPERIENCE
        </h2>
        {experience.map((exp: any, i: number) => (
          <div key={i} style={{ marginBottom: 25 }}>
            <div style={{ fontWeight: 700 }}>
              {exp.position}
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>
              {exp.company} | {exp.startDate} - {exp.endDate}
            </div>
            <div style={{ marginTop: 6 }}>
              {exp.description}
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <h2 style={{ letterSpacing: 1, marginBottom: 20 }}>
          EDUCATION
        </h2>
        {education.map((edu: any, i: number) => (
          <div key={i} style={{ marginBottom: 15 }}>
            <div style={{ fontWeight: 600 }}>
              {edu.institution}
            </div>
            <div style={{ fontSize: 13 }}>
              {edu.degree}
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default CenteredAuthorityLine;
