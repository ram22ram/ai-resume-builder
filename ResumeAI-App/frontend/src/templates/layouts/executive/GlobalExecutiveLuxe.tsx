import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const GlobalExecutiveLuxe: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const experience = get('experience');
  const education = get('education');

  const accent = data.metadata.accentColor || '#b45309';

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Georgia, serif',
      textAlign: 'center'
    }}>

      {/* Header */}
      <header style={{ marginBottom: 30 }}>
        <h1 style={{
          fontSize: 30,
          margin: 0,
          letterSpacing: 2
        }}>
          {personal.fullName}
        </h1>

        <div style={{
          marginTop: 6,
          fontSize: 14,
          fontWeight: 600
        }}>
          {personal.jobTitle}
        </div>

        <div style={{
          width: 80,
          height: 2,
          backgroundColor: accent,
          margin: '15px auto'
        }} />
      </header>

      {summary && (
        <section style={{
          maxWidth: 600,
          margin: '0 auto 30px auto',
          lineHeight: 1.8,
          fontStyle: 'italic'
        }}>
          {summary}
        </section>
      )}

      <section style={{ marginBottom: 30 }}>
        <h3 style={{ letterSpacing: 2 }}>PROFESSIONAL EXPERIENCE</h3>
        <div style={{
          width: 60,
          height: 1,
          backgroundColor: accent,
          margin: '10px auto 20px'
        }} />

        {experience.map((exp: any, i: number) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 'bold' }}>
              {exp.position}
            </div>
            <div style={{ fontSize: 13 }}>
              {exp.company} | {exp.startDate} - {exp.endDate}
            </div>
            <div style={{ marginTop: 6, lineHeight: 1.6 }}>
              {exp.description}
            </div>
          </div>
        ))}
      </section>

      <section>
        <h3 style={{ letterSpacing: 2 }}>EDUCATION</h3>
        <div style={{
          width: 60,
          height: 1,
          backgroundColor: accent,
          margin: '10px auto 20px'
        }} />

        {education.map((edu: any, i: number) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 'bold' }}>{edu.institution}</div>
            <div>{edu.degree}</div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default GlobalExecutiveLuxe;
