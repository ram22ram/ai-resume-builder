import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const VerticalTimelinePro: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const experience = get('experience');

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
          {experience.map((exp: any, i: number) => (
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
                {exp.startDate} - {exp.endDate}
              </div>

              <div style={{ fontWeight: 700, fontSize: 16 }}>
                {exp.position}
              </div>

              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                {exp.company}
              </div>

              <div style={{ lineHeight: 1.6 }}>
                {exp.description}
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default VerticalTimelinePro;
