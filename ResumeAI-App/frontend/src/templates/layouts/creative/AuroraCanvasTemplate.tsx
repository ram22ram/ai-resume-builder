import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ProjectItem, ExperienceItem, SkillItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const AuroraCanvasTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description;
  const projects = get('projects') as ProjectItem[];
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];

  return (
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: 'Poppins, sans-serif' }}>
      {/* LEFT RAIL */}
      <aside style={{ width: '28%', paddingRight: 20 }}>
        <h1 style={{ fontWeight: 600 }}>{personal.fullName}</h1>
        <div style={{ color: '#6366f1' }}>{personal.jobTitle}</div>
        <div style={{ fontSize: '9pt', marginTop: 12 }}>
          {[personal.email, personal.linkedin].filter(Boolean).join('\n')}
        </div>
      </aside>

      {/* MAIN FLOW */}
      <main style={{ width: '72%' }}>
        {summary && (
          <section>
            <h3>Profile</h3>
            <p>{summary}</p>
          </section>
        )}

        <section>
          <h3>Selected Projects</h3>
          {projects.map((p, i) => (
            <div key={i}>
              <strong>{p.title}</strong>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: '9pt' }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h3>Experience</h3>
          {experience.map((e, i) => (
            <div key={i}>
              <strong>{e.position}</strong> — {e.company}
              <div style={{ fontSize: '9pt', color: '#666' }}>{e.date}</div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: '9pt' }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h3>Skills</h3>
          <div>{skills.join(' · ')}</div>
        </section>

        <section>
          <h3>Education</h3>
          {education.map((e, i) => (
            <div key={i}>{e.degree} — {e.institution}</div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default AuroraCanvasTemplate;
