import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const MatrixMinimalGrid: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const skills = get('skills') as SkillItem[];

  const accent = data.metadata.accentColor || '#111827';

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Inter, sans-serif'
    }}>

      {/* Header */}
      <header style={{ marginBottom: 30 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ color: accent }}>{personal.jobTitle}</div>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 25
      }}>

        {/* Experience Block */}
        <div style={{
          borderTop: `3px solid ${accent}`,
          paddingTop: 15
        }}>
          <h3>Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <strong>{exp.position}</strong>
              <div style={{ fontSize: 13 }}>
                {exp.company}
              </div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills Block */}
        <div style={{
          borderTop: `3px solid ${accent}`,
          paddingTop: 15
        }}>
          <h3>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                border: '1px solid #ddd',
                padding: '4px 8px',
                fontSize: 12
              }}>
                {s.name}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default MatrixMinimalGrid;
