import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const DynamicTimelineFlow: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];

  const accent = data.metadata.accentColor || '#2563eb';

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Inter, sans-serif'
    }}>

      {/* Header */}
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ margin: 0 }}>
          {personal.fullName}
        </h1>
        <div style={{ color: accent }}>
          {personal.jobTitle}
        </div>
      </header>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: 40 }}>

        {/* Vertical Line */}
        <div style={{
          position: 'absolute',
          left: 15,
          top: 0,
          bottom: 0,
          width: 2,
          background: accent
        }} />

        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 40, position: 'relative' }}>

            {/* Circle Node */}
            <div style={{
              position: 'absolute',
              left: -27,
              top: 4,
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: 'white',
              border: `3px solid ${accent}`
            }} />

            <div style={{ fontWeight: 700 }}>
              {exp.position}
            </div>
            <div style={{ fontSize: 13, color: '#555' }}>
              {exp.company} • {exp.date}
            </div>
            <div style={{ marginTop: 6 }}>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  ))}
              </ul>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default DynamicTimelineFlow;
