import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const ConsultGridMatrixTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', color: '#1a1a1a' }}>
      
      <header style={{ marginBottom: 25 }}>
        <h1 style={{ margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 13 }}>{personal.jobTitle}</div>
        <div style={{ fontSize: 12, marginTop: 5 }}>
          {personal.email} • {personal.phone}
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 30 }}>
        
        <div>
          <h3 style={{ borderBottom: '2px solid #000', paddingBottom: 4 }}>Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 15 }}>
              <strong>{exp.position}</strong> | {exp.company}
              <div style={{ fontSize: 11 }}>{exp.date}</div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 style={{ borderBottom: '2px solid #000', paddingBottom: 4 }}>Skills</h3>
          <ul style={{ paddingLeft: 16 }}>
            {skills.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default ConsultGridMatrixTemplate;
