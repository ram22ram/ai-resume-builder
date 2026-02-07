import React from 'react';
import { ResumeData, ResumeSection } from '../../types/resume';
import { standardStyles } from '../styles/standardStyles';

interface Props {
  data: ResumeData;
}

// "The Corporate" - MBA/Management focused, 2-column feel using flex
const CorporateTemplate: React.FC<Props> = ({ data }) => {
  const getSectionItems = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.items || [];

  const personal = getSectionItems('personal')[0] || {} as any;
  const summary = getSectionItems('summary')[0]?.description || '';
  const experience = getSectionItems('experience');
  const education = getSectionItems('education');
  
  const rawSkills = getSectionItems('skills');
  const skills = rawSkills.map((s: any) => s.name || s);
  
  const projects = getSectionItems('projects');

  const { fontFamily } = data.metadata;
  const accentColor = data.metadata.accentColor || standardStyles.colors.accent.navy;

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

  // Check if section exists and is visible (even if empty)
  const isVisible = (type: string) => data.sections.some(s => s.type === type && s.isVisible);

  const EmptyState = ({ name }: { name: string }) => (
     <div style={{ padding: '8px', border: '1px dashed #ccc', color: '#999', fontSize: '9pt', fontStyle: 'italic', marginBottom: '15px' }}>
       Empty {name}. Add details in the editor.
     </div>
  );

  return (
    <div style={{ ...standardStyles.page, padding: 0, fontFamily: fontFamily || standardStyles.fonts.sans }}>
      
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
            {isVisible('summary') && (
                <section style={{ marginBottom: '25px' }}>
                    <h2 style={styles.sectionTitle}>Executive Summary</h2>
                    {summary ? (
                       <p style={{ margin: 0, textAlign: 'justify', lineHeight: 1.6 }}>{summary}</p>
                    ) : <EmptyState name="Summary" />}
                </section>
            )}

            {isVisible('experience') && (
                <section style={{ marginBottom: '25px' }}>
                    <h2 style={styles.sectionTitle}>Professional Experience</h2>
                    {experience.length > 0 ? experience.map((exp: any, i: number) => (
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
                    )) : <EmptyState name="Experience" />}
                </section>
            )}

             {isVisible('projects') && (
                <section>
                    <h2 style={styles.sectionTitle}>Key Projects</h2>
                    {projects.length > 0 ? projects.map((proj: any, i: number) => (
                        <div key={i} style={{ marginBottom: '12px' }}>
                            <div style={{ fontWeight: 'bold' }}>{proj.title}</div>
                            <p style={{ margin: '2px 0', fontSize: '10pt' }}>{proj.description}</p>
                        </div>
                    )) : <EmptyState name="Projects" />}
                </section>
            )}
        </div>

        {/* RIGHT COLUMN (Education, Skills) */}
        <div style={styles.sideColumn}>
            {isVisible('education') && (
                <section style={{ marginBottom: '30px' }}>
                    <h2 style={styles.sectionTitle}>Education</h2>
                    {education.length > 0 ? education.map((edu: any, i: number) => (
                        <div key={i} style={{ marginBottom: '15px' }}>
                            <div style={{ fontWeight: 'bold' }}>{edu.institution}</div>
                            <div style={{ fontSize: '9pt', marginBottom: '2px' }}>{edu.degree}</div>
                            <div style={{ fontSize: '9pt', color: '#666' }}>{edu.startDate} – {edu.endDate}</div>
                            {edu.score && <div style={{ fontSize: '9pt', fontWeight: 600 }}>GPA: {edu.score}</div>}
                        </div>
                    )) : <EmptyState name="Education" />}
                </section>
            )}

            {isVisible('skills') && (
                <section style={{ marginBottom: '30px' }}>
                    <h2 style={styles.sectionTitle}>Core Competencies</h2>
                    {skills.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                         {(Array.isArray(skills) ? skills : []).map((skill: any, i: number) => {
                             const name = typeof skill === 'string' ? skill : skill.name;
                             return (
                                 <div key={i} style={{ borderLeft: `3px solid ${accentColor}`, paddingLeft: '8px' }}>
                                     {name}
                                 </div>
                             );
                         })}
                      </div>
                    ) : <EmptyState name="Skills" />}
                </section>
            )}
        </div>

      </div>
    </div>
  );
};

export default CorporateTemplate;
