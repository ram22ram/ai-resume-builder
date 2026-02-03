import React from 'react';
import { ResumeData } from '../../types';

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  textTransform: 'uppercase',
  borderBottom: '1px solid #111827',
  marginTop: 18,
  marginBottom: 6,
  paddingBottom: 2,
};

const ClassicTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (type: string) =>
    data.sections.find(s => s.type === type)?.content;

  const personal = get('personal') as any;
  const summary = get('summary') as string;
  const experience = get('experience') as any[];
  const education = get('education') as any[];
  const skills = get('skills') as string[];

  return (
    <div>
      {/* HEADER */}
      <header style={{ textAlign: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, margin: 0 }}>{personal.fullName}</h1>
        <p style={{ margin: '4px 0', fontWeight: 600 }}>
          {personal.jobTitle}
        </p>
        <p style={{ fontSize: 11 }}>
          {personal.email} | {personal.phone} | {personal.address}
        </p>
      </header>

      {/* SUMMARY */}
      {summary && (
        <section>
          <div style={sectionTitleStyle}>Professional Summary</div>
          <p>{summary}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience?.length > 0 && (
        <section>
          <div style={sectionTitleStyle}>Experience</div>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong>{exp.position}</strong>, {exp.company}
              <div style={{ fontSize: 10, color: '#374151' }}>
                {exp.startDate} – {exp.endDate || 'Present'}
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {education?.length > 0 && (
        <section>
          <div style={sectionTitleStyle}>Education</div>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <strong>{edu.degree}</strong> — {edu.institution}
              <div style={{ fontSize: 10 }}>
                {edu.startDate} – {edu.endDate}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills?.length > 0 && (
        <section>
          <div style={sectionTitleStyle}>Skills</div>
          <p>{skills.join(', ')}</p>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
