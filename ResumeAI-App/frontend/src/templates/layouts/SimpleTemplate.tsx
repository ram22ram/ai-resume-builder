import React from 'react';
import { ResumeData, ResumeSection } from '../../types';

interface Props {
  data: ResumeData;
}

const SimpleTemplate: React.FC<Props> = ({ data }) => {
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
        color: '#000',
        fontFamily: '"Georgia", "Times New Roman", serif',
        fontSize: '11pt',
        lineHeight: 1.5,
        boxSizing: 'border-box',
      }}
    >
      <header style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h1 style={{ margin: 0, fontSize: '22pt', fontWeight: 'normal' }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ marginTop: '5px' }}>
          {personal.email} • {personal.phone} {personal.location ? `• ${personal.location}` : ''}
        </div>
      </header>

      {summary && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px', fontSize: '12pt', textTransform: 'uppercase' }}>Summary</h3>
          <p style={{ margin: 0 }}>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px', fontSize: '12pt', textTransform: 'uppercase' }}>Experience</h3>
          {experience.map((exp: any, index: number) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{exp.company}</span>
                <span>{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</span>
              </div>
              <div style={{ fontStyle: 'italic', marginBottom: '5px' }}>{exp.position}</div>
              {exp.description && <p style={{ margin: 0 }}>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {education.length > 0 && (
        <section style={{ marginBottom: '20px' }}>
          <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px', fontSize: '12pt', textTransform: 'uppercase' }}>Education</h3>
          {education.map((edu: any, index: number) => (
            <div key={index}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{edu.institution}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div style={{ fontStyle: 'italic' }}>
                {edu.degree}{edu.gpa ? `, GPA: ${edu.gpa}` : ''}
              </div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
          <h3 style={{ borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px', fontSize: '12pt', textTransform: 'uppercase' }}>Skills</h3>
          <p style={{ margin: 0 }}>{skills.join(' • ')}</p>
        </section>
      )}
    </div>
  );
};

export default SimpleTemplate;
