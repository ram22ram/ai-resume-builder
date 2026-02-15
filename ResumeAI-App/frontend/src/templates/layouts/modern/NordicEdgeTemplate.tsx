import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const NordicEdgeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];

  const accent = data.metadata.accentColor || '#0ea5e9';

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', display: 'flex', padding: 0 }}>
      
      {/* Left Accent Bar */}
      <div style={{ width: 12, backgroundColor: accent }} />

      {/* Main Content */}
      <div style={{ padding: 30, flex: 1 }}>
        
        <header style={{ marginBottom: 35 }}>
          <h1 style={{ fontSize: 32, margin: 0, fontWeight: 800 }}>
            {personal.fullName}
          </h1>
          <div style={{ fontSize: 14, marginTop: 6 }}>
            {personal.jobTitle}
          </div>
          <div style={{ fontSize: 12, marginTop: 4 }}>
            {personal.email} • {personal.phone}
          </div>
        </header>

        <section style={{ marginBottom: 30 }}>
          <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
            Experience
          </h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <strong>{exp.position}</strong> — {exp.company}
              <div style={{ fontSize: 11 }}>
                {exp.date}
              </div>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>
            Education
          </h2>
          {education.map((edu, i) => (
            <div key={i}>
              <strong>{edu.institution}</strong>
              <div style={{ fontSize: 12 }}>{edu.degree}</div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
};

export default NordicEdgeTemplate;
