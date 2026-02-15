import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const TwoBandModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];

  const accent = data.metadata.accentColor || '#0f172a';

  return (
    <div style={{ ...standardStyles.page, padding: 0, fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Header */}
      <header style={{ padding: 40 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14 }}>{personal.jobTitle}</div>
        <div style={{ fontSize: 12 }}>
          {personal.email} • {personal.phone}
        </div>
      </header>

      {/* Accent Band */}
      <div style={{ height: 20, backgroundColor: accent }} />

      <div style={{ padding: 50 }}>
        
        {experience.length > 0 && (
          <section style={{ marginBottom: 40 }}>
            <h3 style={{ color: accent }}>WORK EXPERIENCE</h3>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 600 }}>{exp.position}</div>
                <div style={{ fontSize: 12 }}>
                  {exp.company} • {exp.date}
                </div>
                <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {education.length > 0 && (
          <section>
            <h3 style={{ color: accent }}>EDUCATION</h3>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 15 }}>
                <div style={{ fontWeight: 600 }}>{edu.degree}</div>
                <div style={{ fontSize: 12 }}>
                  {edu.institution} • {edu.date}
                </div>
              </div>
            ))}
          </section>
        )}

      </div>

    </div>
  );
};

export default TwoBandModernTemplate;
