import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const EditorialSerifTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const experience = get('experience');
  const education = get('education');

  return (
    <div
      style={{
        ...standardStyles.page,
        fontFamily: '"Playfair Display", serif',
        padding: 70,
        color: '#111'
      }}
    >
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 60 }}>
        <h1 style={{ fontSize: 40, fontWeight: 400, margin: 0 }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 16, marginTop: 8 }}>
          {personal.jobTitle}
        </div>
        <div style={{ fontSize: 12, marginTop: 6 }}>
          {personal.email} • {personal.phone}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: 50, textAlign: 'center' }}>
          <p style={{ fontSize: 14, maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            {summary}
          </p>
        </section>
      )}

      {/* Experience */}
      <section style={{ marginBottom: 50 }}>
        <h2 style={{ fontSize: 14, letterSpacing: 2, marginBottom: 20 }}>
          EXPERIENCE
        </h2>
        {experience.map((exp: any, i: number) => (
          <div key={i} style={{ marginBottom: 30 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>
              {exp.position}
            </div>
            <div style={{ fontSize: 12, marginBottom: 6 }}>
              {exp.company} | {exp.startDate} - {exp.endDate}
            </div>
            <div style={{ fontSize: 13, lineHeight: 1.6 }}>
              {exp.description}
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <h2 style={{ fontSize: 14, letterSpacing: 2, marginBottom: 20 }}>
          EDUCATION
        </h2>
        {education.map((edu: any, i: number) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600 }}>{edu.institution}</div>
            <div style={{ fontSize: 12 }}>
              {edu.degree} • {edu.startDate} - {edu.endDate}
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default EditorialSerifTemplate;
