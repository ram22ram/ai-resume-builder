import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const MinimalFrameBorderTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];

  const accent = data.metadata.accentColor || '#111';

  return (
    <div style={{
      ...standardStyles.page,
      padding: 70,
      fontFamily: 'Georgia, serif',
      border: `3px solid ${accent}`
    }}>
      
      <header style={{ textAlign: 'center', marginBottom: 50 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14 }}>{personal.jobTitle}</div>
      </header>

      {summary && (
        <section style={{ marginBottom: 40, textAlign: 'center' }}>
          <p style={{ maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            {summary}
          </p>
        </section>
      )}

      <section>
        <h3 style={{ marginBottom: 20 }}>EXPERIENCE</h3>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 30 }}>
            <div style={{ fontWeight: 600 }}>{exp.position}</div>
            <div style={{ fontSize: 12 }}>
              {exp.company} • {exp.date}
            </div>
            <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                {exp.description.map((desc, idx) => (
                  <li key={idx} style={{ marginTop: 6 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MinimalFrameBorderTemplate;
