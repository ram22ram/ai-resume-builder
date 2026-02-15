import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const VerticalTimelinePro: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];

  const accent = data.metadata.accentColor || '#7c3aed';

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ color: accent, fontWeight: 600 }}>{personal.jobTitle}</div>
      </header>

      <section>
        <div style={{ 
          borderLeft: `3px solid ${accent}`, 
          paddingLeft: 30 
        }}>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 35, position: 'relative' }}>
              
              {/* Dot */}
              <div style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: accent,
                position: 'absolute',
                left: -37,
                top: 5
              }} />

              <div style={{ fontSize: 13, color: '#666' }}>
                {exp.date}
              </div>

              <div style={{ fontWeight: 700, fontSize: 16 }}>
                {exp.position}
              </div>

              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                {exp.company}
              </div>

              <ul style={{ paddingLeft: 16, margin: '4px 0', lineHeight: 1.6 }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
              </ul>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default VerticalTimelinePro;
