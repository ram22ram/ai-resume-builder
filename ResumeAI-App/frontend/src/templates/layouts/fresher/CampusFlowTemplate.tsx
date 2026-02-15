import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, EducationItem, SkillItem, ProjectItem, ExperienceItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const CampusFlowTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const edu = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const exp = get('experience') as ExperienceItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <header style={{ marginBottom: 32 }}>
        <h1>{p.fullName}</h1>
        <strong>{p.jobTitle || 'Graduate / Student'}</strong>
      </header>

      <section>
        <h2>Education</h2>
        {edu.map((e, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <strong>{e.degree}</strong> — {e.institution}
            <div style={{ fontSize: 12 }}>{e.date}</div>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skills.map((s, i) => (
            <span key={i} style={{ fontSize: 12 }}>{s}</span>
          ))}
        </div>
      </section>

      <section>
        <h2>Projects</h2>
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

      {exp.length > 0 && (
        <section>
          <h2>Experience</h2>
          {exp.map((e, i) => (
            <div key={i}>
              <strong>{e.position}</strong> — {e.company}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default CampusFlowTemplate;
