import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const CenterTimelineAxisTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const experience = get('experience');

  const accent = data.metadata.accentColor || '#111';

  return (
    <div
      style={{
        ...standardStyles.page,
        fontFamily: 'Poppins, sans-serif',
        padding: 80,
        position: 'relative'
      }}
    >
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 60 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14 }}>{personal.jobTitle}</div>
      </header>

      {/* Vertical Line */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 180,
        bottom: 80,
        width: 2,
        backgroundColor: accent
      }} />

      {/* Experience Blocks */}
      <section>
        {experience.map((exp: any, i: number) => {
          const isLeft = i % 2 === 0;

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: isLeft ? 'flex-start' : 'flex-end',
                marginBottom: 60
              }}
            >
              <div style={{
                width: '40%',
                textAlign: isLeft ? 'right' : 'left'
              }}>
                <div style={{ fontWeight: 600 }}>{exp.position}</div>
                <div style={{ fontSize: 12 }}>
                  {exp.company} • {exp.startDate} - {exp.endDate}
                </div>
                <div style={{ fontSize: 13, marginTop: 6 }}>
                  {exp.description}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default CenterTimelineAxisTemplate;
