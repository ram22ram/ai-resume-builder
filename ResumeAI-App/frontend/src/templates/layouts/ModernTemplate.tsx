import React from 'react';
import { ResumeData, ResumeSection } from '../../types';

interface Props {
  data: ResumeData;
}

const ModernTemplate: React.FC<Props> = ({ data }) => {
  const getSection = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.content;

  const personal = getSection('personal') || {};
  const summary = getSection('summary') || '';
  const experience = getSection('experience') || [];
  const education = getSection('education') || [];
  const skills = getSection('skills') || [];
  const projects = getSection('projects') || [];

  const accentColor = data.theme?.accentColor || '#10b981'; // Modern Emerald

  return (
    <div
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        backgroundColor: '#fafafa',
        color: '#1f2937',
        fontFamily: '"Inter", "Segoe UI", sans-serif',
        fontSize: '10pt',
        lineHeight: 1.5,
      }}
    >
      {/* Header */}
      <header style={{ borderLeft: `5px solid ${accentColor}`, paddingLeft: '20px', marginBottom: '25px' }}>
        <h1 style={{ margin: 0, fontSize: '28pt', fontWeight: 800, color: '#111' }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '12pt', fontWeight: 500, color: accentColor, marginBottom: '10px' }}>
          {personal.jobTitle}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', fontSize: '9pt', color: '#555' }}>
          {personal.email && <span>✉️ {personal.email}</span>}
          {personal.phone && <span>📞 {personal.phone}</span>}
          {personal.linkedin && <span>🔗 LinkedIn</span>}
          {personal.location && <span>📍 {personal.location}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: '20px' }}>
          <p style={{ margin: 0 }}>{summary}</p>
        </section>
      )}

      {/* Main Grid Two Column */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
        
        {/* Main Content (Left) */}
        <div>
           {experience.length > 0 && (
            <section style={{ marginBottom: '20px' }}>
              <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#111', marginBottom: '15px' }}>Experience</h2>
              {experience.map((exp: any, index: number) => (
                <div key={index} style={{ marginBottom: '20px', position: 'relative', paddingLeft: '15px', borderLeft: '2px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <div style={{ fontWeight: 700, fontSize: '11pt' }}>{exp.position}</div>
                    <div style={{ fontSize: '8.5pt', color: '#666', fontWeight: 500 }}>
                      {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  <div style={{ color: accentColor, fontWeight: 600, fontSize: '9.5pt', marginBottom: '5px' }}>{exp.company}</div>
                   {exp.description && (
                     <p style={{ margin: 0, fontSize: '9.5pt', color: '#4b5563' }}>{exp.description}</p>
                   )}
                </div>
              ))}
            </section>
           )}

           {projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: '14pt', fontWeight: 700, color: '#111', marginBottom: '15px' }}>Projects</h2>
               {projects.map((proj: any, index: number) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 700 }}>{proj.name}</div>
                  <p style={{ margin: 0, fontSize: '9.5pt', color: '#4b5563' }}>{proj.description}</p>
                  {proj.technologies && (
                    <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
                      {proj.technologies.map((t: string, i: number) => (
                        <span key={i} style={{ fontSize: '8pt', background: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </section>
           )}
        </div>

        {/* Sidebar (Right) */}
        <div>
          {skills.length > 0 && (
            <section style={{ marginBottom: '25px' }}>
              <h2 style={{ fontSize: '12pt', fontWeight: 700, color: '#111', marginBottom: '10px' }}>Skills</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skills.map((skill: string, index: number) => (
                  <span 
                    key={index}
                    style={{
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      padding: '5px 10px',
                      borderRadius: '20px',
                      fontSize: '9pt',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {education.length > 0 && (
            <section>
              <h2 style={{ fontSize: '12pt', fontWeight: 700, color: '#111', marginBottom: '10px' }}>Education</h2>
               {education.map((edu: any, index: number) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 600 }}>{edu.institution}</div>
                  <div style={{ fontSize: '9.5pt' }}>{edu.degree}</div>
                  <div style={{ fontSize: '9pt', color: '#666' }}>{edu.startDate} – {edu.endDate}</div>
                </div>
              ))}
            </section>
          )}
        </div>

      </div>
    </div>
  );
};

export default ModernTemplate;
