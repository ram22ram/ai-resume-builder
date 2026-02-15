import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SplitHeaderEdge: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];

  const accent = data.metadata.accentColor || '#0f172a';

  return (
    <div style={{
      ...standardStyles.page,
      display: 'flex',
      fontFamily: 'Inter, sans-serif',
      padding: 0
    }}>

      {/* LEFT PANEL */}
      <div style={{
        width: '35%',
        background: accent,
        color: 'white',
        padding: 40
      }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>
          {personal.fullName}
        </h1>
        <div style={{ opacity: 0.8, marginBottom: 40 }}>
          {personal.jobTitle}
        </div>

        <div style={{ fontSize: 13, lineHeight: 1.8 }}>
          {personal.email}<br/>
          {personal.phone}<br/>
          {personal.linkedin}
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ width: '65%', padding: 50 }}>

        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 14, letterSpacing: 1 }}>EXPERIENCE</h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 25 }}>
              <div style={{ fontWeight: 700 }}>
                {exp.position}
              </div>
              <div style={{ fontSize: 13, color: '#555' }}>
                {exp.company} • {exp.date}
              </div>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ marginTop: 4, fontSize: 13 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ fontSize: 14, letterSpacing: 1 }}>EDUCATION</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 600 }}>
                {edu.institution}
              </div>
              <div style={{ fontSize: 13 }}>
                {edu.degree}
              </div>
            </div>
          ))}
        </section>

      </div>

    </div>
  );
};

export default SplitHeaderEdge;
