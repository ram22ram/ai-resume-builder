import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

interface Props {
  data: ResumeData;
}

// "The Executive" - Center aligned, serif, elegant, high hierarchy
const PremCorp2: React.FC<Props> = ({ data }) => {
  const getSectionItems = (type: ResumeSection['type']) =>
    data.sections.find((s: any) => s.type === type && s.isVisible)?.items || [];

  const personal = getSectionItems('personal')[0] || {} as any;
  const summary = getSectionItems('summary')[0]?.description || '';
  const experience = getSectionItems('experience');
  const education = getSectionItems('education');
  
  const rawSkills = getSectionItems('skills');
  const skills = rawSkills.map((s: any) => s.name || s);


  const { fontFamily, accentColor } = data.metadata;
  const themeColor = accentColor || '#b49b57'; // Gold/Bronze default

  const styles = {
    header: {
        textAlign: 'center' as const,
        marginBottom: '30px',
        borderBottom: `double 4px ${themeColor}`,
        paddingBottom: '20px',
    },
    name: {
        fontSize: '28pt',
        fontFamily: fontFamily || standardStyles.fonts.serif,
        textTransform: 'uppercase' as const,
        letterSpacing: '3px',
        fontWeight: 'normal' as const,
        marginBottom: '10px',
        margin: 0
    },
    title: {
        fontSize: '11pt',
        textTransform: 'uppercase' as const,
        letterSpacing: '2px',
        marginBottom: '10px',
        fontWeight: 600,
        color: themeColor
    },
    sectionTitle: {
        textAlign: 'center' as const,
        fontSize: '12pt',
        textTransform: 'uppercase' as const,
        letterSpacing: '2px',
        fontWeight: 600,
        marginBottom: '15px',
        marginTop: '25px',
        color: '#222'
    },
    separator: {
        width: '40px',
        height: '2px',
        backgroundColor: themeColor,
        margin: '5px auto 20px auto'
    }
  };

  return (
    <div style={{ ...standardStyles.page, fontFamily: fontFamily || 'Georgia, serif' }}>
      
      {/* Header */}
      <header style={styles.header}>
         <h1 style={styles.name}>{personal.fullName || 'YOUR NAME'}</h1>
         <div style={styles.title}>{personal.jobTitle}</div>
         <div style={{ fontSize: '9pt', display: 'flex', justifyContent: 'center', gap: '20px', fontStyle: 'italic' }}>
             {[personal.email, personal.phone, personal.location].filter(Boolean).map((c, i) => (
                 <span key={i}>{c}</span>
             ))}
         </div>
         {personal.linkedin && <div style={{ fontSize: '9pt', marginTop: '5px' }}>{personal.linkedin}</div>}
      </header>

      {/* Summary */}
      {summary && (
        <section>
             <div style={styles.sectionTitle}>Executive Profile</div>
             <div style={styles.separator}></div>
             <p style={{ textAlign: 'center', margin: '0 20px', lineHeight: 1.6, fontStyle: 'italic' }}>{summary}</p>
        </section>
      )}

      {/* Experience - Center-ish or Classic */}
      {experience.length > 0 && (
          <section>
              <div style={styles.sectionTitle}>Professional Experience</div>
              <div style={styles.separator}></div>
              {experience.map((exp: any, i: number) => (
                  <div key={i} style={{ marginBottom: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid #eee', paddingBottom: '4px', marginBottom: '8px' }}>
                          <span style={{ fontWeight: 'bold', fontSize: '11pt' }}>{exp.position}</span>
                          <span style={{ fontSize: '10pt', fontStyle: 'italic' }}>{exp.startDate} – {exp.endDate}</span>
                      </div>
                      <div style={{ fontWeight: 600, fontSize: '10pt', marginBottom: '6px' }}>{exp.company} | {exp.location}</div>
                      {exp.description && (
                          <div style={{ textAlign: 'justify', lineHeight: 1.5 }}>{exp.description}</div>
                      )}
                  </div>
              ))}
          </section>
      )}

      {/* Education & Skills - Split */}
      <div style={{ display: 'flex', gap: '40px', marginTop: '30px' }}>
          <div style={{ flex: 1 }}>
              {education.length > 0 && (
                  <section>
                      <div style={{ ...styles.sectionTitle, textAlign: 'left' }}>Education</div>
                      <div style={{ ...styles.separator, margin: '5px 0 15px 0' }}></div>
                      {education.map((edu: any, i: number) => (
                          <div key={i} style={{ marginBottom: '10px' }}>
                              <div style={{ fontWeight: 'bold' }}>{edu.institution}</div>
                              <div>{edu.degree}</div>
                              <div style={{ fontSize: '9pt', fontStyle: 'italic' }}>{edu.startDate} - {edu.endDate}</div>
                          </div>
                      ))}
                  </section>
              )}
          </div>
          <div style={{ flex: 1 }}>
              {skills.length > 0 && (
                  <section>
                      <div style={{ ...styles.sectionTitle, textAlign: 'left' }}>Core Competencies</div>
                      <div style={{ ...styles.separator, margin: '5px 0 15px 0' }}></div>
                      <div style={{ lineHeight: 1.6 }}>
                          {Array.isArray(skills) ? skills.join(', ') : skills}
                      </div>
                  </section>
              )}
          </div>
      </div>

    </div>
  );
};

export default PremCorp2;
