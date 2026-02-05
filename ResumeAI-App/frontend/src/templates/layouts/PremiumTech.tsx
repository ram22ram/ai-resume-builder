import React from 'react';
import { ResumeData, ResumeSection } from '../../types';

interface Props {
  data: ResumeData;
}

const PremiumTech: React.FC<Props> = ({ data }) => {
  const getSection = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.content;

  const personal = getSection('personal') || {};
  const summary = getSection('summary') || '';
  const experience = getSection('experience') || [];
  const education = getSection('education') || [];
  const skills = getSection('skills') || [];
  const projects = getSection('projects') || [];

  return (
    <div
      style={{
        width: '210mm',
        minHeight: '297mm',
        backgroundColor: '#fff',
        color: '#1a202c',
        fontFamily: '"Fira Code", "Roboto Mono", "Consolas", monospace',
        fontSize: '9.5pt',
        lineHeight: 1.5,
        position: 'relative',
        boxSizing: 'border-box',
        padding: '0'
      }}
    >
      {/* Header Bar */}
      <header style={{ 
        backgroundColor: '#2d3748', 
        color: '#e2e8f0', 
        padding: '30px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24pt', fontWeight: 700, color: '#63b3ed' }}>
            {`> ${personal.fullName || 'User_Name'}`}
          </h1>
          <div style={{ marginTop: '5px', fontSize: '11pt', color: '#a0aec0' }}>
            {`// ${personal.jobTitle || 'Developer'}`}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '9pt', lineHeight: '1.6' }}>
          {personal.email && <div>{`const email = '${personal.email}';`}</div>}
          {personal.phone && <div>{`const phone = '${personal.phone}';`}</div>}
          {personal.github && <div>{`const github = '${personal.github}';`}</div>}
          {personal.linkedin && <div>{`const linkedin = '${personal.linkedin}';`}</div>}
        </div>
      </header>

      <div style={{ padding: '30px 40px' }}>
        
        {/* Summary */}
        {summary && (
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '12pt', color: '#2b6cb0', borderBottom: '2px solid #edf2f7', paddingBottom: '5px', marginBottom: '10px' }}>
              /** READ_ME */
            </h2>
            <p style={{ margin: 0, textAlign: 'justify', fontFamily: '"Inter", sans-serif' }}>{summary}</p>
          </section>
        )}

        {/* Skills - Top for functionality in Tech resumes often */}
        {skills.length > 0 && (
          <section style={{ marginBottom: '25px' }}>
             <h2 style={{ fontSize: '12pt', color: '#2b6cb0', borderBottom: '2px solid #edf2f7', paddingBottom: '5px', marginBottom: '10px' }}>
              import &#123; Skills &#125; from 'Expertise'
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {skills.map((skill: string, index: number) => (
                <span key={index} style={{ 
                  backgroundColor: '#ebf8ff', 
                  color: '#2c5282',
                  padding: '3px 8px', 
                  borderRadius: '4px',
                  fontSize: '9pt',
                  fontWeight: 600,
                  fontFamily: '"Inter", sans-serif'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '12pt', color: '#2b6cb0', borderBottom: '2px solid #edf2f7', paddingBottom: '5px', marginBottom: '10px' }}>
              git log --projects
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {projects.map((proj: any, index: number) => (
                <div key={index} style={{ border: '1px solid #e2e8f0', borderRadius: '4px', padding: '15px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '11pt', color: '#2d3748', marginBottom: '5px' }}>
                    {proj.name}
                  </div>
                  <p style={{ margin: '0 0 10px 0', fontSize: '9pt', color: '#4a5568', fontFamily: '"Inter", sans-serif' }}>
                    {proj.description}
                  </p>
                  {proj.technologies && (
                    <div style={{ fontSize: '8.5pt', color: '#718096' }}>
                      Stack: [{proj.technologies.join(', ')}]
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '25px' }}>
            <h2 style={{ fontSize: '12pt', color: '#2b6cb0', borderBottom: '2px solid #edf2f7', paddingBottom: '5px', marginBottom: '10px' }}>
              class WorkExperience extends Career
            </h2>
            {experience.map((exp: any, index: number) => (
              <div key={index} style={{ marginBottom: '20px', paddingLeft: '15px', borderLeft: '2px solid #cbd5e0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '11pt', color: '#2d3748' }}>{exp.position}</strong>
                  <span style={{ fontSize: '9pt', color: '#718096' }}>
                    {exp.startDate} - {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ color: '#4a5568', marginBottom: '5px', fontWeight: 600 }}>@{exp.company}</div>
                {exp.description && (
                  <p style={{ margin: 0, fontSize: '9.5pt', fontFamily: '"Inter", sans-serif' }}>{exp.description}</p>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '12pt', color: '#2b6cb0', borderBottom: '2px solid #edf2f7', paddingBottom: '5px', marginBottom: '10px' }}>
              Education.init()
            </h2>
            {education.map((edu: any, index: number) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '10.5pt' }}>{edu.institution}</strong>
                  <span style={{ fontSize: '9pt' }}>{edu.startDate} - {edu.endDate}</span>
                </div>
                <div style={{ fontFamily: '"Inter", sans-serif' }}>{edu.degree}</div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default PremiumTech;
