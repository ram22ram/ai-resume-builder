import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SkillItem, ExperienceItem, ProjectItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

interface Props {
  data: ResumeData;
}

const NeoSplitTemplate: React.FC<Props> = ({ data }) => {
  const getItems = (type: ResumeSection['type']) =>
    data.sections.find(s => s.type === type && s.isVisible)?.items || [];

  const personal = (getItems('personal')[0] || {}) as PersonalItem;
  const skills = (getItems('skills') as SkillItem[]).map(s => s.name);
  const experience = getItems('experience') as ExperienceItem[];
  const projects = getItems('projects') as ProjectItem[];
  const education = getItems('education') as EducationItem[];

  const accent = data.metadata.accentColor || '#0f172a';

  return (
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: standardStyles.fonts.sans }}>
      {/* SIDEBAR */}
      <aside style={{ width: '30%', paddingRight: 20, borderRight: `3px solid ${accent}` }}>
        <h1 style={{ fontSize: 32, lineHeight: 1.2 }}>{personal.fullName}</h1>
        <div style={{ fontSize: '10pt', color: accent }}>{personal.jobTitle}</div>

        <h3>Skills</h3>
        {skills.map((s, i) => (
          <div key={i}>• {s}</div>
        ))}

        <h3>Links</h3>
        {[personal.linkedin].filter(Boolean).map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </aside>

      {/* MAIN */}
      <main style={{ width: '70%', paddingLeft: 24 }}>
        <section>
          <h2>Experience</h2>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <strong>{e.position}</strong> @ {e.company}
              <div style={{ fontSize: '9pt' }}>{e.date}</div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: '10pt' }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Projects</h2>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 15 }}>
              <strong>{p.title}</strong>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: '10pt' }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Education</h2>
          {education.map((e, i) => (
            <div key={i}>{e.degree} — {e.institution}</div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default NeoSplitTemplate;
