
import React from 'react';
import { ResumeData, ResumeSection } from '../../types';

interface Props {
  data: ResumeData;
}

const MinimalTemplate: React.FC<Props> = ({ data }) => {
  const getSection = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.content;

  const personal = getSection('personal') || {};
  const summary = getSection('summary') || '';
  const experience = getSection('experience') || [];
  const education = getSection('education') || [];
  const skills = getSection('skills') || [];

  return (
    <div
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        backgroundColor: 'white',
        color: '#222',
        fontFamily: '"Roboto", "Segoe UI", sans-serif',
        fontSize: '10pt',
        lineHeight: 1.6,
        boxSizing: 'border-box',
      }}
    >
      {/* Header - Left Aligned, Very Large Name */}
      <header style={{ marginBottom: '30px' }}>
        <h1
          style={{
            margin: '0 0 10px 0',
            fontSize: '32pt',
            fontWeight: 300,
            letterSpacing: '-1px',
            color: '#000',
          }}
        >
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '12pt', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px' }}>
          {personal.jobTitle}
        </div>
        <div style={{ fontSize: '9pt', color: '#666', display: 'flex', gap: '15px' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: '30px' }}>
          <p style={{ margin: 0, maxWidth: '85%' }}>{summary}</p>
        </section>
      )}

      {/* Layout Grid: Experience (Left) | Education & Skills (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        
        {/* Left Column */}
        <div>
          {experience.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '10pt', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '15px' }}>
                Experience
              </h2>
              {experience.map((exp: any, index: number) => (
                <div key={index} style={{ marginBottom: '20px' }}>
                  <div style={{ fontWeight: 600, fontSize: '11pt' }}>{exp.position}</div>
                  <div style={{ fontSize: '10pt', color: '#555', marginBottom: '5px' }}>
                    {exp.company} | {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </div>
                  {exp.description && (
                    <p style={{ margin: 0, fontSize: '9.5pt', color: '#444' }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
           {education.length > 0 && (
            <section style={{ marginBottom: '30px' }}>
              <h2 style={{ fontSize: '10pt', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '15px' }}>
                Education
              </h2>
              {education.map((edu: any, index: number) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 600 }}>{edu.institution}</div>
                  <div style={{ fontSize: '9pt' }}>{edu.degree}</div>
                  <div style={{ fontSize: '9pt', color: '#666' }}>{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </section>
           )}

           {skills.length > 0 && (
            <section>
              <h2 style={{ fontSize: '10pt', textTransform: 'uppercase', letterSpacing: '2px', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '15px' }}>
                Skills
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {skills.map((skill: string, index: number) => (
                  <span key={index} style={{ fontSize: '9.5pt' }}>{skill}</span>
                ))}
              </div>
            </section>
           )}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;

