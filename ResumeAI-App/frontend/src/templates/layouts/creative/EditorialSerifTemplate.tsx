import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const EditorialSerifTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];

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
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 30 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>
              {exp.position}
            </div>
            <div style={{ fontSize: 12, marginBottom: 6 }}>
              {exp.company} | {exp.date}
            </div>
            <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                {exp.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 13, lineHeight: 1.6 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section>
        <h2 style={{ fontSize: 14, letterSpacing: 2, marginBottom: 20 }}>
          EDUCATION
        </h2>
        {education.map((edu, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600 }}>{edu.institution}</div>
            <div style={{ fontSize: 12 }}>
              {edu.degree} • {edu.date}
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default EditorialSerifTemplate;
