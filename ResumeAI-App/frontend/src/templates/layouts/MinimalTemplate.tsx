import React from 'react';
import { ResumeData } from '../../types';

const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    data.sections.find(s => s.type === type)?.content;

  const personal = get('personal') as any;
  const summary = get('summary') as string;
  const experience = get('experience') as any[];
  const skills = get('skills') as string[];

  return (
    <div>
      {/* HEADER */}
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 28, marginBottom: 4 }}>
          {personal.fullName}
        </h1>
        <p style={{ fontSize: 13, color: '#374151' }}>
          {personal.jobTitle}
        </p>
        <p style={{ fontSize: 11 }}>
          {personal.email} • {personal.phone}
        </p>
      </header>

      {/* SUMMARY */}
      {summary && (
        <section style={{ marginBottom: 16 }}>
          <p>{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience?.length > 0 && (
        <section style={{ marginBottom: 16 }}>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <strong>{exp.position}</strong>
              <div style={{ fontSize: 11, color: '#6b7280' }}>
                {exp.company} | {exp.startDate} – {exp.endDate || 'Present'}
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills?.length > 0 && (
        <section>
          <strong>Skills</strong>
          <p style={{ fontSize: 11 }}>
            {skills.join(' • ')}
          </p>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;
