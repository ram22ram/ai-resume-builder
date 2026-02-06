import React from 'react';
import { ResumeData, ResumeSection } from '../../types';
import { standardStyles } from '../styles/standardStyles';

interface Props {
  data: ResumeData;
}

const ClassicTemplate: React.FC<Props> = ({ data }) => {
  const getSection = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.content;

  const personal = getSection('personal') || {};

  const experience = getSection('experience') || [];
  const education = getSection('education') || [];
  const skills = getSection('skills') || [];
  const projects = getSection('projects') || [];

  // Helper styles
  const styles = {
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: 'bold',
      textTransform: 'uppercase' as const,
      borderBottom: '1px solid #000',
      marginBottom: '8px',
      paddingBottom: '2px',
      letterSpacing: '0.5px',
    },
    bold: { fontWeight: 'bold' },
    italic: { fontStyle: 'italic' },
    bulletList: {
      margin: '4px 0 8px 18px',
      padding: 0,
    },
    bulletItem: {
      marginBottom: '2px',
    }
  };

  return (
    <div
      style={{
        ...standardStyles.page,
        fontFamily: standardStyles.fonts.serif,
      }}
    >
      {/* 1. Header: Name & Contact - Centered */}
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ 
          fontSize: '22pt', 
          fontWeight: 'bold', 
          textTransform: 'uppercase', 
          marginBottom: '6px',
          letterSpacing: '1px',
          margin: '0 0 6px 0'
        }}>
          {personal.fullName || 'YOUR NAME'}
        </h1>
        
        {/* Contact Info Row */}
        <div style={{ fontSize: '10pt', display: 'flex', justifyContent: 'center',flexWrap: 'wrap', gap: '5px' }}>
          {[
            personal.email, 
            personal.phone, 
            personal.linkedin, 
            personal.address
          ].filter(Boolean).map((item, i, arr) => (
             <React.Fragment key={i}>
                <span>{item}</span>
                {i < arr.length - 1 && <span> | </span>}
             </React.Fragment>
          ))}
        </div>
      </header>

      {/* 2. Education - CRITICAL for Freshers - Table Style */}
      {education.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={styles.sectionTitle}>Education</h2>
          {education.map((edu: any, index: number) => (
            <div key={index} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <span style={styles.bold}>{edu.degree}</span>
                {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                <div style={styles.italic}>{edu.school}</div>
              </div>
              <div style={{ textAlign: 'right', minWidth: '100px' }}>
                <div style={styles.bold}>
                  {edu.startDate} - {edu.endDate}
                </div>
                {/* Visual Emphasis on Marks */}
                {edu.score && (
                  <div style={{ fontSize: '10pt',fontWeight: 'bold' }}>
                    CGPA/Percentage: {edu.score}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 3. Tech Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={styles.sectionTitle}>Technical Skills</h2>
          <div style={{ fontSize: '10.5pt', lineHeight: 1.6 }}>
             {/* Note: In a real "classic" resume, we might categorize. 
                 Since data is a flat list, we join them clearly. */}
             <strong>Core Competencies: </strong> 
             {Array.isArray(skills) ? skills.join(', ') : skills}
          </div>
        </section>
      )}

      {/* 4. Projects - Essential for Students */}
      {projects.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={styles.sectionTitle}>Academic Projects</h2>
          {projects.map((proj: any, index: number) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <span style={styles.bold}>{proj.title}</span>
                {proj.link && (
                  <a href={proj.link} style={{ color: 'black', textDecoration: 'none', fontSize: '9pt' }}>
                    [Link]
                  </a>
                )}
              </div>
              
              {/* Fallback description or bullets */}
              {proj.description && (
                <ul style={styles.bulletList}>
                   {proj.description.split('.').filter((s: string) => s.trim().length > 0).map((stmt: string, i: number) => (
                      <li key={i} style={styles.bulletItem}>{stmt.trim()}.</li>
                   ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      {/* 5. Experience / Internships */}
      {experience.length > 0 && (
        <section style={{ marginBottom: '16px' }}>
          <h2 style={styles.sectionTitle}>Internships & Experience</h2>
          {experience.map((exp: any, index: number) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={styles.bold}>{exp.position}</span>
                <span style={styles.bold}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div style={styles.italic}>{exp.company} | {exp.location}</div>
              
              {exp.description && (
                <ul style={styles.bulletList}>
                    {/* Basic sentence splitting for bullets if not already formatted */}
                    {exp.description.split('.').filter((s:string) => s.trim().length > 0).map((stmt:string, i:number) => (
                       <li key={i} style={styles.bulletItem}>{stmt.trim()}.</li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
