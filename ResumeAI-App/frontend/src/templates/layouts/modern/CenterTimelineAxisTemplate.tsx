import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const CenterTimelineAxisTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];

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
        {experience.map((exp, i) => {
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
                  {exp.company} • {exp.date}
                </div>
                <ul style={{ 
                    paddingLeft: isLeft ? 0 : 16, 
                    paddingRight: isLeft ? 16 : 0,
                    margin: '8px 0', 
                    listStylePosition: isLeft ? 'inside' : 'outside',
                    textAlign: isLeft ? 'right' : 'left'
                }}>
                    {exp.description.map((desc, idx) => (
                        <li key={idx} style={{ marginTop: 4, fontSize: 13 }}>{desc}</li>
                    ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default CenterTimelineAxisTemplate;
