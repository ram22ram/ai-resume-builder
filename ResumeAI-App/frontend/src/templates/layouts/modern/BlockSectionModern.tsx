import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const BlockSectionModern: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];

  const accent = data.metadata.accentColor || '#111827';

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Poppins, sans-serif',
      background: '#f8fafc',
      padding: 50
    }}>

      {/* Header */}
      <div style={{ marginBottom: 50 }}>
        <h1 style={{ margin: 0 }}>
          {personal.fullName}
        </h1>
        <div style={{ color: accent }}>
          {personal.jobTitle}
        </div>
      </div>

      {/* Summary Block */}
      {summary && (
        <div style={{
          background: 'white',
          padding: 25,
          marginBottom: 30,
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
        }}>
          <div style={{ fontSize: 13, letterSpacing: 1, marginBottom: 10 }}>
            SUMMARY
          </div>
          <div style={{ lineHeight: 1.7 }}>
            {summary}
          </div>
        </div>
      )}

      {/* Experience Block */}
      <div style={{
        background: 'white',
        padding: 25,
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}>
        <div style={{ fontSize: 13, letterSpacing: 1, marginBottom: 20 }}>
          EXPERIENCE
        </div>

        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 25 }}>
            <div style={{ fontWeight: 600 }}>
              {exp.position}
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>
              {exp.company}
            </div>
            <ul style={{ paddingLeft: 16, margin: '8px 0' }}>
                {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ marginTop: 6 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  );
};

export default BlockSectionModern;
