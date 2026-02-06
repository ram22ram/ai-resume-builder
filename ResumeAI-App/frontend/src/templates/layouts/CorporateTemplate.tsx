import React from 'react';
import { ResumeData, ResumeSection } from '../../types';
import { standardStyles } from '../styles/standardStyles';

interface Props {
  data: ResumeData;
}

// "The Corporate" - MBA/Management focused, 2-column feel using flex
const CorporateTemplate: React.FC<Props> = ({ data }) => {
  const getSection = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.content;

  const personal = getSection('personal') || {};
  const summary = getSection('summary') || '';
  const experience = getSection('experience') || [];
  const education = getSection('education') || [];
  const skills = getSection('skills') || [];
  const projects = getSection('projects') || [];

  const accentColor = standardStyles.colors.accent.navy;

  const styles = {
    header: {
      backgroundColor: accentColor,
      color: 'white',
      padding: '25mm 20mm 15mm 20mm',
    },
    name: {
      fontSize: '28pt',
      fontWeight: 'bold' as const,
      margin: '0 0 5px 0',
      letterSpacing: '0.5px',
      fontFamily: standardStyles.fonts.serif,
    },
    title: {
      fontSize: '14pt',
      marginBottom: '10px',
      opacity: 0.9,
    },
    contact: {
      fontSize: '10pt',
      display: 'flex' as const,
      gap: '20px',
      opacity: 0.9,
    },
    sectionTitle: {
      fontSize: '12pt',
      fontWeight: 'bold' as const,
      color: accentColor,
      textTransform: 'uppercase' as const,
      borderBottom: `2px solid ${accentColor}`,
      marginBottom: '10px',
      paddingBottom: '4px',
    },
    mainColumn: {
      width: '65%',
      paddingRight: '20px',
    },
    sideColumn: {
      width: '35%',
      paddingLeft: '20px',
      borderLeft: '1px solid #e5e7eb',
    }
  };

  return (
    <div style={{ ...standardStyles.page, padding: 0, fontFamily: standardStyles.fonts.sans }}>
      
      {/* HEADER */}
      <header style={styles.header}>
        <h1 style={styles.name}>{personal.fullName || 'YOUR NAME'}</h1>
        <div style={styles.title}>{personal.jobTitle || 'Business Analyst'}</div>
        <div style={styles.contact}>
            {[personal.email, personal.phone, personal.location].filter(Boolean).map((c, i) => (
                <span key={i}>{c}</span>
            ))}
        </div>
        {personal.linkedin && <div style={{ fontSize: '9pt', marginTop: '5px', opacity: 0.8 }}>{personal.linkedin}</div>}
      </header>
      
      {/* 2-COLUMN BODY */}
      <div style={{ display: 'flex', padding: '15mm 20mm' }}>
        
        {/* LEFT COLUMN (Experience, Summary) */}
        <div style={styles.mainColumn}>
            {summary && (
                <section style={{ marginBottom: '25px' }}>
                    <h2 style={styles.sectionTitle}>Executive Summary</h2>
                    <p style={{ margin: 0, textAlign: 'justify', lineHeight: 1.6 }}>{summary}</p>
                </section>
            )}

            {experience.length > 0 && (
                <section style={{ marginBottom: '25px' }}>
                    <h2 style={styles.sectionTitle}>Professional Experience</h2>
                    {experience.map((exp: any, i: number) => (
                        <div key={i} style={{ marginBottom: '15px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '11pt' }}>{exp.position}</div>
                            <div style={{ color: accentColor, fontWeight: 600, fontSize: '10pt', marginBottom: '4px' }}>
                                {exp.company}
                            </div>
                            <div style={{ fontSize: '9pt', color: '#666', marginBottom: '6px' }}>
                                {exp.startDate} – {exp.endDate} | {exp.location}
                            </div>
                            {exp.description && (
                                <ul style={{ margin: '0 0 0 15px', padding: 0, lineHeight: 1.5 }}>
                                    {exp.description.split('.').filter((s:string) => s.trim().length > 0).map((line: string, idx: number) => (
                                        <li key={idx} style={{ marginBottom: '3px' }}>{line.trim()}.</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </section>
            )}

             {projects.length > 0 && (
                <section>
                    <h2 style={styles.sectionTitle}>Key Projects</h2>
                    {projects.map((proj: any, i: number) => (
                        <div key={i} style={{ marginBottom: '12px' }}>
                            <div style={{ fontWeight: 'bold' }}>{proj.title}</div>
                            <p style={{ margin: '2px 0', fontSize: '10pt' }}>{proj.description}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>

        {/* RIGHT COLUMN (Education, Skills) */}
        <div style={styles.sideColumn}>
            {education.length > 0 && (
                <section style={{ marginBottom: '30px' }}>
                    <h2 style={styles.sectionTitle}>Education</h2>
                    {education.map((edu: any, i: number) => (
                        <div key={i} style={{ marginBottom: '15px' }}>
                            <div style={{ fontWeight: 'bold' }}>{edu.institution}</div>
                            <div style={{ fontSize: '9pt', marginBottom: '2px' }}>{edu.degree}</div>
                            <div style={{ fontSize: '9pt', color: '#666' }}>{edu.startDate} – {edu.endDate}</div>
                            {edu.score && <div style={{ fontSize: '9pt', fontWeight: 600 }}>GPA: {edu.score}</div>}
                        </div>
                    ))}
                </section>
            )}

            {skills.length > 0 && (
                <section style={{ marginBottom: '30px' }}>
                    <h2 style={styles.sectionTitle}>Core Competencies</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                         {/* Assuming skills is string[] */}
                         {(Array.isArray(skills) ? skills : []).map((skill: string, i: number) => (
                             <div key={i} style={{ borderLeft: `3px solid ${accentColor}`, paddingLeft: '8px' }}>
                                 {skill}
                             </div>
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
