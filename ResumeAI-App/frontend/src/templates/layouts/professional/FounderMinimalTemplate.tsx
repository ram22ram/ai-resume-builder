import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ProjectItem, ExperienceItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const FounderMinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const projects = get('projects') as ProjectItem[];
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', color: '#111' }}>
      <header style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 36, margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 16, color: '#555', marginTop: 4 }}>
          {personal.jobTitle || 'Product Builder | Startup Operator'}
        </div>
        <div style={{ marginTop: 8, fontSize: 12 }}>
          {personal.email} • {personal.phone} • {personal.linkedin}
        </div>
      </header>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Selected Projects</h2>
        {projects.map((p, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{p.title}</strong>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {p.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 12, color: '#444' }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Experience</h2>
        {experience.map((e, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{e.position}</strong> — {e.company}
            <div style={{ fontSize: 12, color: '#555' }}>{e.date}</div>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {e.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 12, color: '#444' }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 style={{ fontSize: 18, marginBottom: 10 }}>Core Skills</h2>
        <div>{skills.join(' • ')}</div>
      </section>
    </div>
  );
};

export default FounderMinimalTemplate;
