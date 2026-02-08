import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

interface Props {
  data: ResumeData;
}

// "The Space Saver" - High density, Inter font, Grid-like
const ProGray: React.FC<Props> = ({ data }) => {
  const getSectionItems = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.items || [];

  const personal = getSectionItems('personal')[0] || {} as any;
  const summary = getSectionItems('summary')[0]?.description || '';
  const experience = getSectionItems('experience');
  const education = getSectionItems('education');
  
  const rawSkills = getSectionItems('skills');
  const skills = rawSkills.map((s: any) => s.name || s);

  const { fontFamily, accentColor } = data.metadata;
  const themeColor = accentColor || '#000';

  const styles = {
    headerOneLine: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottom: `2px solid ${themeColor}`,
      paddingBottom: '10px',
      marginBottom: '15px',
    },
    name: {
      fontSize: '20pt',
      fontWeight: 800,
      margin: 0,
      letterSpacing: '-0.5px',
      color: themeColor,
    },
    contactSmall: {
      fontSize: '9pt',
      textAlign: 'right' as const,
    },
    sectionTitle: {
      fontSize: '10pt',
      fontWeight: 700,
      textTransform: 'uppercase' as const,
      width: '120px', // Fixed width for sidebar effect
      flexShrink: 0,
    },
    row: {
      display: 'flex',
      marginBottom: '15px',
    },
    content: {
      flex: 1,
    }
  };

  return (
    <div style={{ ...standardStyles.page, fontFamily: fontFamily || standardStyles.fonts.modern, padding: '15mm' }}>
      {/* 1. Header - Ultra Compact */}
      <header style={styles.headerOneLine}>
        <div>
          <h1 style={styles.name}>{personal.fullName}</h1>
          <div style={{ fontSize: '11pt', fontWeight: 500 }}>{personal.jobTitle}</div>
        </div>
        <div style={styles.contactSmall}>
          <div>{personal.email}</div>
          <div>{personal.phone}</div>
          <div>{personal.linkedin}</div>
        </div>
      </header>

      {/* 2. Skills - Top Priority (Chips Style) */}
      {skills.length > 0 && (
        <div style={styles.row}>
          <div style={styles.sectionTitle}>Key Skills</div>
          <div style={{ flex: 1, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(Array.isArray(skills) ? skills : []).map((skill: string, i: number) => (
              <span key={i} style={{ 
                fontSize: '9pt', 
                border: '1px solid #ddd', 
                padding: '2px 8px', 
                borderRadius: '4px',
                fontWeight: 500 
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 3. Education - Compact */}
      {education.length > 0 && (
        <div style={styles.row}>
          <div style={styles.sectionTitle}>Education</div>
          <div style={styles.content}>
            {education.map((edu: any, i: number) => (
              <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>{edu.institution}</div>
                  <div style={{ fontSize: '9pt' }}>{edu.degree}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '9pt', fontWeight: 600 }}>{edu.startDate} - {edu.endDate}</div>
                  {edu.score && <div style={{ fontSize: '9pt' }}>Score: {edu.score}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Experience - Dense */}
      {experience.length > 0 && (
        <div style={styles.row}>
          <div style={styles.sectionTitle}>Experience</div>
          <div style={styles.content}>
            {experience.map((exp: any, i: number) => (
              <div key={i} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ fontWeight: 700 }}>{exp.position} <span style={{ fontWeight: 400 }}>at {exp.company}</span></div>
                    <div style={{ fontSize: '9pt', color: '#555' }}>{exp.startDate} - {exp.endDate}</div>
                </div>
                {exp.description && (
                  <div style={{ fontSize: '9.5pt', color: '#333' }}>
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* 5. Summary - Bottom Filler if needed */}
      {summary && (
        <div style={{ ...styles.row, borderTop: '1px solid #eee', paddingTop: '15px' }}>
           <div style={styles.sectionTitle}>About</div>
           <div style={{ flex: 1, fontSize: '9pt', color: '#555' }}>{summary}</div>
        </div>
      )}

    </div>
  );
};

export default ProGray;
