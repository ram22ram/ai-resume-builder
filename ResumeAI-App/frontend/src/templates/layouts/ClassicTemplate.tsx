import React from 'react';
import { ResumeData, ResumeSection } from '../../types';

interface Props {
  data: ResumeData;
}

const ClassicTemplate: React.FC<Props> = ({ data }) => {
  const getSection = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.content;

  const personal = getSection('personal') || {};
  const summary = getSection('summary') || '';
  const experience = getSection('experience') || [];
  const education = getSection('education') || [];
  const skills = getSection('skills') || [];
  const projects = getSection('projects') || [];

  const theme = data.theme || {
    accentColor: '#000000',
    fontFamily: 'serif',
    textColor: '#000000',
  };

  return (
    <div
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '20mm',
        backgroundColor: 'white',
        color: '#000',
        fontFamily: '"Times New Roman", Times, serif',
        fontSize: '11pt',
        lineHeight: 1.4,
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header
        style={{
          borderBottom: '1px solid #000',
          paddingBottom: '10px',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            margin: '0 0 5px 0',
            fontSize: '24pt',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            letterSpacing: '1px',
          }}
        >
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '12pt', fontWeight: 'bold', marginBottom: '5px' }}>
          {personal.jobTitle}
        </div>
        <div style={{ fontSize: '10pt' }}>
          {[personal.email, personal.phone, personal.address, personal.linkedin]
            .filter(Boolean)
            .join(' | ')}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: '15px' }}>
          <h2
            style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #ccc',
              marginBottom: '8px',
              paddingBottom: '2px',
            }}
          >
            Professional Summary
          </h2>
          <p style={{ margin: 0, textAlign: 'justify' }}>{summary}</p>
        </section>
      )}

      {/* Education - Often prioritized in Indian formats for freshers, but standard placement here */}
      {education.length > 0 && (
        <section style={{ marginBottom: '15px' }}>
          <h2
            style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #ccc',
              marginBottom: '8px',
              paddingBottom: '2px',
            }}
          >
            Education
          </h2>
          {education.map((edu: any, index: number) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{edu.institution}</span>
                <span>
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontStyle: 'italic' }}>
                <span>{edu.degree} {edu.field ? `in ${edu.field}` : ''}</span>
                {edu.gpa && <span>GPA/Percentage: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '15px' }}>
          <h2
            style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #ccc',
              marginBottom: '8px',
              paddingBottom: '2px',
            }}
          >
            Work Experience
          </h2>
          {experience.map((exp: any, index: number) => (
            <div key={index} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{exp.position}</span>
                <span>
                  {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ fontStyle: 'italic', marginBottom: '4px' }}>{exp.company}</div>
              {exp.description && (
                <div style={{ whiteSpace: 'pre-line', textAlign: 'justify' }}>
                   {exp.description.split('\n').map((line: string, i: number) => {
                      const trimmed = line.trim();
                      if (!trimmed) return null;
                      // Check if line starts with a bullet indicator or just treat all lines as bullets for standard look
                      const isBullet = trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*');
                      const content = isBullet ? trimmed.substring(1).trim() : trimmed;
                      return (
                        <div key={i} style={{ display: 'flex', marginBottom: '2px' }}>
                          <span style={{ marginRight: '8px' }}>•</span>
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
        <section style={{ marginBottom: '15px' }}>
          <h2
            style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #ccc',
              marginBottom: '8px',
              paddingBottom: '2px',
            }}
          >
            Projects
          </h2>
          {projects.map((project: any, index: number) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{project.name}</span>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'underline', fontSize: '9pt' }}>
                    View Project
                  </a>
                )}
              </div>
              <div style={{ fontStyle: 'italic', fontSize: '10pt', marginBottom: '2px' }}>
                 {project.technologies && project.technologies.join(', ')}
              </div>
              <p style={{ margin: 0, textAlign: 'justify' }}>{project.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2
            style={{
              fontSize: '12pt',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #ccc',
              marginBottom: '8px',
              paddingBottom: '2px',
            }}
          >
            Technical Skills
          </h2>
          <div style={{ lineHeight: 1.5 }}>
            {/* If skills are simple strings, join them. If categories, handle them. Assuming string[] for now per types.ts */}
            {skills.join(' • ')}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
