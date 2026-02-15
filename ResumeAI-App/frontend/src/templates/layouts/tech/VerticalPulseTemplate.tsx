import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const VerticalPulseTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', padding: 40 }}>

      <header style={{ marginBottom: 35 }}>
        <h1 style={{ fontSize: 30, margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 13 }}>{personal.jobTitle}</div>
        <div style={{ fontSize: 12 }}>{personal.email} • {personal.phone}</div>
      </header>

      <section style={{ position: 'relative', paddingLeft: 30 }}>
        
        {/* Timeline Line */}
        <div style={{
          position: 'absolute',
          left: 8,
          top: 0,
          bottom: 0,
          width: 2,
          backgroundColor: '#e5e7eb'
        }} />

        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 25, position: 'relative' }}>
            
            {/* Dot */}
            <div style={{
              position: 'absolute',
              left: -2,
              top: 5,
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#111827'
            }} />

            <div style={{ marginLeft: 20 }}>
              <strong>{exp.position}</strong>
              <div style={{ fontSize: 11 }}>
                {exp.company} • {exp.date}
              </div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                  ))}
              </ul>
            </div>

          </div>
        ))}

      </section>

      <section style={{ marginTop: 30 }}>
        <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Skills</h3>
        <div style={{ fontSize: 12 }}>
          {skills.join(' • ')}
        </div>
      </section>

    </div>
  );
};

export default VerticalPulseTemplate;
