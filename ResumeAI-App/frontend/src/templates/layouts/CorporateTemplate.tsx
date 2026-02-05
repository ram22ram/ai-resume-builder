
import React from 'react';
import { ResumeData, ResumeSection } from '../../types';

interface Props {
  data: ResumeData;
}

const CorporateTemplate: React.FC<Props> = ({ data }) => {
  const getSection = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.content;

  const personal = getSection('personal') || {};
  const summary = getSection('summary') || '';
  const experience = getSection('experience') || [];
  const education = getSection('education') || [];
  const skills = getSection('skills') || [];
  const projects = getSection('projects') || [];

  const accentColor = data.theme?.accentColor || '#1e3a8a'; // Corporate Blue

  return (
    <div
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '0',
        backgroundColor: 'white',
        color: '#333',
        fontFamily: '"Arial", "Helvetica", sans-serif',
        fontSize: '10.5pt',
        lineHeight: 1.5,
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: accentColor,
          color: 'white',
          padding: '25mm 20mm 15mm 20mm',
        }}
      >
        <h1
          style={{
            margin: '0 0 5px 0',
            fontSize: '28pt',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
          }}
        >
          {personal.fullName || 'Your Name'}
        </h1>
        <div 
          style={{ 
            fontSize: '14pt', 
            fontWeight: 500, 
            marginBottom: '10px', 
            opacity: 0.9 
          }}
        >
          {personal.jobTitle}
        </div>
        <div 
          style={{ 
            fontSize: '10pt', 
            opacity: 0.9,
            display: 'flex',
            flexWrap: 'wrap',
            gap: '15px'
          }}
        >
          {personal.email && <span>📧 {personal.email}</span>}
          {personal.phone && <span>📱 {personal.phone}</span>}
          {personal.address && <span>📍 {personal.address}</span>}
          {personal.linkedin && <span>🔗 LinkedIn</span>}
        </div>
      </header>

      <div style={{ padding: '20mm' }}>
        {/* Summary */}
        {summary && (
          <section style={{ marginBottom: '20px' }}>
            <h2
              style={{
                fontSize: '13pt',
                fontWeight: 'bold',
                color: accentColor,
                textTransform: 'uppercase',
                borderBottom: `2px solid ${accentColor}`,
                marginBottom: '10px',
                paddingBottom: '5px',
              }}
            >
              Professional Profile
            </h2>
            <p style={{ margin: 0, textAlign: 'justify' }}>{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <h2
              style={{
                fontSize: '13pt',
                fontWeight: 'bold',
                color: accentColor,
                textTransform: 'uppercase',
                borderBottom: `2px solid ${accentColor}`,
                marginBottom: '10px',
                paddingBottom: '5px',
              }}
            >
              Professional Experience
            </h2>
            {experience.map((exp: any, index: number) => (
              <div key={index} style={{ marginBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h3 style={{ margin: 0, fontSize: '12pt', fontWeight: 'bold' }}>{exp.position}</h3>
                  <span style={{ fontSize: '10pt', fontWeight: 'bold' }}>
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ fontSize: '11pt', fontStyle: 'italic', marginBottom: '5px', color: '#555' }}>
                  {exp.company}
                </div>
                {exp.description && (
                  <div style={{ whiteSpace: 'pre-line', fontSize: '10pt' }}>
                    {exp.description.split('\n').map((line: string, i: number) => {
                       const trimmed = line.trim();
                       if (!trimmed) return null;
                       const isBullet = trimmed.startsWith('-') || trimmed.startsWith('•');
                       const content = isBullet ? trimmed.substring(1).trim() : trimmed;
                       return (
                         <div key={i} style={{ display: 'flex', marginBottom: '2px' }}>
                           <span style={{ marginRight: '8px', color: accentColor }}>•</span>
                           <span style={{ flex: 1 }}>{content}</span>
                         </div>
                       );
                    })}
                  </div>
                )}
              </div>
            ))}
          </section>
        )}

         {/* Projects */}
         {projects.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <h2
              style={{
                fontSize: '13pt',
                fontWeight: 'bold',
                color: accentColor,
                textTransform: 'uppercase',
                borderBottom: `2px solid ${accentColor}`,
                marginBottom: '10px',
                paddingBottom: '5px',
              }}
            >
              Key Projects
            </h2>
            {projects.map((proj: any, index: number) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '11pt' }}>{proj.name}</strong>
                </div>
                <div style={{ fontSize: '9pt', color: '#666', marginBottom: '3px' }}>
                  {proj.technologies && proj.technologies.join(' | ')}
                </div>
                <p style={{ margin: 0, textAlign: 'justify' }}>{proj.description}</p>
              </div>
            ))}
          </section>
        )}

        <div style={{ display: 'flex', gap: '20px' }}>
            {/* Education */}
            {education.length > 0 && (
              <section style={{ flex: 1 }}>
                <h2
                  style={{
                    fontSize: '13pt',
                    fontWeight: 'bold',
                    color: accentColor,
                    textTransform: 'uppercase',
                    borderBottom: `2px solid ${accentColor}`,
                    marginBottom: '10px',
                    paddingBottom: '5px',
                  }}
                >
                  Education
                </h2>
                {education.map((edu: any, index: number) => (
                  <div key={index} style={{ marginBottom: '10px' }}>
                    <div style={{ fontWeight: 'bold' }}>{edu.institution}</div>
                    <div>{edu.degree}</div>
                    <div style={{ fontSize: '9pt', color: '#666' }}>
                      {edu.startDate} – {edu.endDate}
                    </div>
                    {edu.gpa && <div style={{ fontSize: '9pt', fontWeight: 500 }}>GPA: {edu.gpa}</div>}
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <section style={{ flex: 1 }}>
                <h2
                  style={{
                    fontSize: '13pt',
                    fontWeight: 'bold',
                    color: accentColor,
                    textTransform: 'uppercase',
                    borderBottom: `2px solid ${accentColor}`,
                    marginBottom: '10px',
                    paddingBottom: '5px',
                  }}
                >
                  Expertise
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {skills.map((skill: string, index: number) => (
                    <span 
                      key={index}
                      style={{
                        backgroundColor: '#f1f5f9',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '9pt',
                        fontWeight: 500
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}
        </div>
      </div>
    </div>
  );
};

export default CorporateTemplate;

