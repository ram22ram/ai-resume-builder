import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, ProjectItem, SkillItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const MinimalAuthorityTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const exp = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const edu = get('education') as EducationItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Georgia, serif' }}>
      <h1>{p.fullName}</h1>
      <div style={{ fontStyle: 'italic', marginBottom: 20 }}>{p.jobTitle}</div>

      <section>
        <h2>Experience</h2>
        {exp.map((e, i) => (
          <div key={i} style={{ marginBottom: 16 }}>
            <strong>{e.position}</strong>, {e.company}
            <div style={{ fontSize: 12 }}>{e.date}</div>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {e.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Projects</h2>
        {projects.map((p, i) => (
          <div key={i}>{p.title}</div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div>{skills.join(', ')}</div>
      </section>

      <section>
        <h2>Education</h2>
        {edu.map((e, i) => (
          <div key={i}>{e.degree} — {e.institution}</div>
        ))}
      </section>
    </div>
  );
};

export default MinimalAuthorityTemplate;
