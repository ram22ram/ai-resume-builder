import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem, ProjectItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const VerticalTimelineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const exp = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const edu = get('education') as EducationItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      <header style={{ marginBottom: 30 }}>
        <h1>{p.fullName}</h1>
        <strong>{p.jobTitle}</strong>
      </header>

      <section>
        <h2>Experience</h2>
        <div style={{ borderLeft: '2px solid #111', paddingLeft: 20 }}>
          {exp.map((e, i) => (
            <div key={i} style={{ marginBottom: 24, position: 'relative' }}>
              <div style={{
                width: 10,
                height: 10,
                background: '#111',
                borderRadius: '50%',
                position: 'absolute',
                left: -26,
                top: 6
              }} />
              <strong>{e.position}</strong> — {e.company}
              <div style={{ fontSize: 12 }}>{e.date}</div>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Projects</h2>
        {projects.map((proj, i) => (
          <div key={i}>
            <strong>{proj.title}</strong>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {proj.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div style={{ columns: 2 }}>
          {skills.map((s, i) => (
            <div key={i}>{s}</div>
          ))}
        </div>
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

export default VerticalTimelineTemplate;
