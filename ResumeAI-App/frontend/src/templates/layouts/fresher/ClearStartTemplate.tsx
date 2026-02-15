import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, EducationItem, SkillItem, ProjectItem, ExperienceItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const ClearStartTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const experience = get('experience') as ExperienceItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Times New Roman, serif' }}>
      <header style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1>{personal.fullName}</h1>
        <div>{personal.jobTitle}</div>
        <div style={{ fontSize: '9pt' }}>
          {[personal.email, personal.phone].filter(Boolean).join(' | ')}
        </div>
      </header>

      <section>
        <h2>Education</h2>
        {education.map((e, i) => (
          <div key={i}>
            <strong>{e.degree}</strong> — {e.institution}
          </div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div>{skills.join(', ')}</div>
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
        <h2>Internships / Experience</h2>
        {experience.map((e, i) => (
          <div key={i}>{e.position} — {e.company}</div>
        ))}
      </section>
    </div>
  );
};

export default ClearStartTemplate;
