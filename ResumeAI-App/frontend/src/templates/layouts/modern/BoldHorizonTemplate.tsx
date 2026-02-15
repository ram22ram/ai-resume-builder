import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const BoldHorizonTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);

  const accent = data.metadata.accentColor || '#111827';

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Helvetica, sans-serif', padding: 0 }}>
      
      {/* Dark Header */}
      <div style={{ backgroundColor: accent, color: '#fff', padding: 35 }}>
        <h1 style={{ margin: 0, fontSize: 30 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 14, marginTop: 6 }}>
          {personal.jobTitle}
        </div>
        <div style={{ fontSize: 12, marginTop: 8 }}>
          {personal.email} | {personal.phone}
        </div>
      </div>

      <div style={{ padding: 30 }}>

        {summary && (
          <section style={{ marginBottom: 25 }}>
            <p style={{ fontSize: 13 }}>{summary}</p>
          </section>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>
          
          <div>
            <h3 style={{ borderBottom: '1px solid #ddd' }}>Experience</h3>
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: 15 }}>
                <strong>{exp.position}</strong>
                <div style={{ fontSize: 11 }}>{exp.company}</div>
                <div style={{ fontSize: 11 }}>
                  {exp.date}
                </div>
                <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 style={{ borderBottom: '1px solid #ddd' }}>Skills</h3>
            <ul style={{ paddingLeft: 16 }}>
              {skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BoldHorizonTemplate;
