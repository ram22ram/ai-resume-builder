import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SkillItem, EducationItem, ProjectItem, ExperienceItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const StepOneGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];
  const projects = get('projects') as ProjectItem[];
  const experience = get('experience') as ExperienceItem[];

  return (
    <div style={{ ...standardStyles.page, display: 'grid', gridTemplateColumns: '30% 70%', gap: 20 }}>
      {/* LEFT */}
      <aside>
        <h1>{personal.fullName}</h1>
        <div style={{ fontSize: '10pt' }}>{personal.jobTitle}</div>

        <h3>Skills</h3>
        {skills.map((s, i) => (
          <div key={i}>• {s}</div>
        ))}
      </aside>

      {/* RIGHT */}
      <main>
        <section>
          <h2>Education</h2>
          {education.map((e, i) => (
            <div key={i}>{e.degree} — {e.institution}</div>
          ))}
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

        <section>
          <h2>Experience</h2>
          {experience.map((e, i) => (
            <div key={i}>{e.position} — {e.company}</div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default StepOneGridTemplate;
