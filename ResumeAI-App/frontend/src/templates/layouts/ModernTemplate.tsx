import React from 'react';
import { ResumeData } from '../../types';

const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const personal = data.sections.find(s => s.type === 'personal')?.content as any;
  const summary = data.sections.find(s => s.type === 'summary')?.content as string;
  const experience = data.sections.find(s => s.type === 'experience')?.content as any[];
  const skills = data.sections.find(s => s.type === 'skills')?.content as string[];

  return (
    <div>
      {/* HEADER */}
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ fontSize: 26, margin: 0 }}>{personal.fullName}</h1>
        <p style={{ margin: '4px 0', fontWeight: 600 }}>{personal.jobTitle}</p>
        <p style={{ fontSize: 11 }}>
          {personal.email} • {personal.phone}
        </p>
      </header>

      {/* SUMMARY */}
      {summary && (
        <section>
          <h2>Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience?.length > 0 && (
        <section>
          <h2>Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong>{exp.position}</strong> — {exp.company}
              <div style={{ fontSize: 10, color: '#475569' }}>
                {exp.startDate} – {exp.endDate || 'Present'}
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills?.length > 0 && (
        <section>
          <h2>Skills</h2>
          <p>{skills.join(' • ')}</p>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
