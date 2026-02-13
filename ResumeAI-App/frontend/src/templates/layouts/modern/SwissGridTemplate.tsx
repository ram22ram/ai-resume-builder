import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SwissGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const experience = get('experience');

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Helvetica, Arial, sans-serif',
      padding: 70
    }}>

      <div style={{ marginBottom: 60 }}>
        <h1 style={{
          fontSize: 42,
          margin: 0,
          letterSpacing: -1
        }}>
          {personal.fullName}
        </h1>
        <div style={{
          fontSize: 16,
          fontWeight: 500,
          marginTop: 10
        }}>
          {personal.jobTitle}
        </div>
      </div>

      {summary && (
        <div style={{
          fontSize: 14,
          lineHeight: 1.8,
          marginBottom: 60,
          maxWidth: 500
        }}>
          {summary}
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: '180px 1fr',
        gap: 40
      }}>
        
        <div style={{ fontWeight: 700 }}>
          EXPERIENCE
        </div>

        <div>
          {experience.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: 40 }}>
              <div style={{ fontWeight: 600 }}>
                {exp.position}
              </div>
              <div style={{ fontSize: 13, color: '#666', marginBottom: 6 }}>
                {exp.company} — {exp.startDate} - {exp.endDate}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.7 }}>
                {exp.description}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};

export default SwissGridTemplate;
