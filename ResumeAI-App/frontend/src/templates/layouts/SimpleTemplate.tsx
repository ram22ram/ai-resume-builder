import React from 'react';
import { ResumeData } from '../../types';
import { standardStyles } from '../styles/standardStyles';

interface Props {
  data: ResumeData;
}

const SimpleTemplate: React.FC<Props> = ({ data }) => {
  const personal = data.sections.find(s => s.type === 'personal')?.content || {};
  const bodySections = data.sections.filter(s => s.type !== 'personal' && s.isVisible);

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

  const renderSection = (section: any) => {
      const items = Array.isArray(section.content) ? section.content : [];
      
      // SUMMARY
      if (section.type === 'summary') {
          if (!section.content) return null;
           return (
             <section key={section.id}>
               <div style={styles.sectionHeader}>{section.title}</div>
               <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.6 }}>{section.content}</p>
             </section>
           );
      }

      // EDUCATION
      if (section.type === 'education') {
          return (
             <section key={section.id}>
               <div style={styles.sectionHeader}>{section.title}</div>
               {items.map((edu: any, i: number) => (
                 <div key={i} style={{ marginBottom: '12px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <div style={styles.itemTitle}>{edu.institution}</div>
                     <div style={styles.date}>{edu.date || edu.year || `${edu.startDate || ''} - ${edu.endDate || ''}`}</div>
                   </div>
                   <div style={styles.itemSubtitle}>
                     {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                   </div>
                   {(edu.score || edu.grade) && <div style={{ fontSize: '10pt', fontWeight: 500 }}>Grade: {edu.score || edu.grade}</div>}
                 </div>
               ))}
             </section>
          );
      }

      // EXPERIENCE
      if (section.type === 'experience') {
          return (
             <section key={section.id}>
               <div style={styles.sectionHeader}>{section.title}</div>
               {items.map((exp: any, i: number) => (
                 <div key={i} style={{ marginBottom: '15px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <div style={styles.itemTitle}>{exp.role || exp.position}</div>
                     <div style={styles.date}>{exp.date || `${exp.startDate || ''} - ${exp.endDate || ''}`}</div>
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
          );
      }

      // PROJECTS
      if (section.type === 'projects') {
          return (
             <section key={section.id}>
               <div style={styles.sectionHeader}>{section.title}</div>
               {items.map((proj: any, i: number) => (
                 <div key={i} style={{ marginBottom: '12px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <div style={styles.itemTitle}>
                         {proj.title} {proj.link && <a href={proj.link} style={{ fontSize: '9pt', color: '#2563eb', fontWeight: 'normal' }}>(Link)</a>}
                     </div>
                   </div>
                   <div style={{ fontSize: '10pt', color: '#374151', fontStyle: 'italic', marginBottom: '4px' }}>{proj.tech}</div>
                   <p style={{ margin: 0, fontSize: '10pt', color: '#4b5563', lineHeight: 1.5 }}>{proj.description}</p>
                 </div>
               ))}
             </section>
          );
      }

      // SKILLS
      if (section.type === 'skills') {
          return (
             <section key={section.id}>
               <div style={styles.sectionHeader}>{section.title}</div>
               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                 {items.map((skill: any, i: number) => {
                     const name = typeof skill === 'string' ? skill : skill.name;
                     const level = skill.level ? ` (${skill.level})` : '';
                     return (
                         <span key={i} style={{ background: '#f3f4f6', padding: '4px 8px', borderRadius: '4px', fontSize: '10pt', color: '#374151' }}>
                             {name}{level}
                         </span>
                     );
                 })}
               </div>
             </section>
          );
      }

      // DEFAULT / CUSTOM
      return (
         <section key={section.id}>
           <div style={styles.sectionHeader}>{section.title}</div>
           {items.map((item: any, i: number) => (
             <div key={i} style={{ marginBottom: '12px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <div style={styles.itemTitle}>{item.title}</div>
                 <div style={styles.date}>{item.date}</div>
               </div>
               <div style={styles.itemSubtitle}>{item.subtitle}</div>
               <p style={{ margin: '4px 0 0 0', fontSize: '10pt', color: '#4b5563' }}>{item.description}</p>
             </div>
           ))}
         </section>
      );
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
          {[personal.email, personal.phone, personal.address].filter(Boolean).join('  •  ')}
        </div>
      </div>

      {/* DYNAMIC SECTIONS */}
      {bodySections.map((section) => renderSection(section))}
    </div>
  );
};

export default SimpleTemplate;
