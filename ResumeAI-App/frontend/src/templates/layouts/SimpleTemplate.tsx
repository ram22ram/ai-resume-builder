import React from 'react';
import { ResumeData, ResumeSection } from '../../types';
import { standardStyles } from '../styles/standardStyles';

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

  const styles = {
    headerBorder: {
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '20px',
      marginBottom: '20px',
    },
    name: {
      fontSize: '24pt',
      fontFamily: standardStyles.fonts.sans,
      fontWeight: 'bold' as const,
      color: '#111827',
      marginBottom: '8px',
    },
    contact: {
      fontSize: '10pt',
      color: '#4b5563',
      display: 'flex' as const,
        flexWrap: 'wrap' as const,
      gap: '12px',
    },
    sectionHeader: {
      fontSize: '12pt',
      textTransform: 'uppercase' as const,
      color: '#6b7280',
      letterSpacing: '1.5px',
      fontWeight: 'bold' as const,
      marginBottom: '10px',
      marginTop: '20px',
    },
    itemTitle: {
      fontWeight: 'bold' as const,
      fontSize: '11pt',
      color: '#1f2937',
    },
    itemSubtitle: {
      fontSize: '10pt',
      color: '#374151',
    },
    date: {
      fontSize: '10pt',
      color: '#6b7280',
      textAlign: 'right' as const,
    }
  };

  return (
    <div style={{ ...standardStyles.page, fontFamily: standardStyles.fonts.sans }}>
      {/* HEADER */}
      <div style={styles.headerBorder}>
        <h1 style={{ ...styles.name, margin: 0 }}>{personal.fullName || 'Your Name'}</h1>
        <div style={{ fontSize: '11pt', color: '#4b5563', marginBottom: '8px' }}>
          {personal.jobTitle}
        </div>
        <div style={styles.contact}>
          {[personal.email, personal.phone, personal.location, personal.linkedin].filter(Boolean).join('  •  ')}
        </div>
      </div>

      {/* SUMMARY */}
      {summary && (
        <section>
          <div style={styles.sectionHeader}>Profile</div>
          <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>{summary}</p>
        </section>
      )}

      {/* EDUCATION - Clean List */}
      {education.length > 0 && (
        <section>
          <div style={styles.sectionHeader}>Education</div>
          {education.map((edu: any, i: number) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={styles.itemTitle}>{edu.institution}</div>
                <div style={styles.date}>{edu.startDate} – {edu.endDate}</div>
              </div>
              <div style={styles.itemSubtitle}>
                {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
              </div>
              {edu.score && <div style={{ fontSize: '10pt', fontWeight: 500 }}>Grade: {edu.score}</div>}
            </div>
          ))}
        </section>
      )}

      {/* EXPERIENCE - Clean Blocks */}
      {experience.length > 0 && (
        <section>
          <div style={styles.sectionHeader}>Experience</div>
          {experience.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={styles.itemTitle}>{exp.position}</div>
                <div style={styles.date}>{exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}</div>
              </div>
              <div style={{ ...styles.itemSubtitle, fontWeight: 500 }}>{exp.company}</div>
              {exp.description && (
                <p style={{ margin: '4px 0 0 0', fontSize: '10pt', color: '#4b5563', lineHeight: 1.5 }}>
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* SKILLS - Simple Clean Text */}
      {skills.length > 0 && (
        <section>
          <div style={styles.sectionHeader}>Skills</div>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            {Array.isArray(skills) ? skills.join('  •  ') : skills}
          </p>
        </section>
      )}
    </div>
  );
};

export default SimpleTemplate;
