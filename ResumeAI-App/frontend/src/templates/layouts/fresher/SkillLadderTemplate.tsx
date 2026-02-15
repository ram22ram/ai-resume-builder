import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SkillItem, ProjectItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SkillLadderTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const edu = get('education') as EducationItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <header style={{ marginBottom: 28 }}>
        <h1>{p.fullName}</h1>
        <strong>{p.jobTitle || 'Aspiring Professional'}</strong>
      </header>

      <section>
        <h2>Core Skills</h2>
        <ul>
          {skills.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Academic / Personal Projects</h2>
        {projects.map((p, i) => (
          <div key={i}>
            <strong>{p.title}</strong>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {p.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {edu.map((e, i) => (
          <div key={i}>
            <strong>{e.degree}</strong> — {e.institution}
          </div>
        ))}
      </section>
    </div>
  );
};

export default SkillLadderTemplate;
