import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, SkillItem, ProjectItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SplitHighlightTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const exp = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const projects = get('projects') as ProjectItem[];
  const edu = get('education') as EducationItem[];

  return (
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      
      {/* LEFT RAIL */}
      <aside style={{ width: '28%', paddingRight: 20, borderRight: '3px solid #000' }}>
        <h1>{p.fullName}</h1>
        <strong>{p.jobTitle}</strong>

        <h3 style={{ marginTop: 20 }}>Skills</h3>
        {skills.map((s, i) => (
          <div key={i}>{s}</div>
        ))}
      </aside>

      {/* MAIN */}
      <main style={{ paddingLeft: 24, width: '72%' }}>
        {summary && (
          <section>
            <h2>Profile</h2>
            <p>{summary}</p>
          </section>
        )}

        <section>
          <h2>Experience</h2>
          {exp.map((e, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <strong>{e.position}</strong> — {e.company}
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
            <div key={i}>{e.degree} — {e.institution}</div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default SplitHighlightTemplate;
