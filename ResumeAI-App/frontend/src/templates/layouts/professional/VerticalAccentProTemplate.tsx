import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, ProjectItem, EducationItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const VerticalAccentProTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);

  const accent = data.metadata.accentColor || '#2563eb';

  return (
    <div style={{ ...standardStyles.page, display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Accent Bar */}
      <div style={{ width: 14, backgroundColor: accent }} />

      {/* Content */}
      <div style={{ padding: '20mm', flex: 1 }}>
        <h1 style={{ marginBottom: 4 }}>{personal.fullName}</h1>
        <div style={{ color: accent, fontWeight: 600 }}>{personal.jobTitle}</div>

        {summary && <p style={{ marginTop: 12 }}>{summary}</p>}

        <section>
          <h2>Experience</h2>
          {experience.map((e, i) => (
            <div key={i}>
              <strong>{e.position}</strong> — {e.company}
              <div style={{ fontSize: '9pt', color: '#666' }}>{e.date}</div>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
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
            <div key={i}>
              <strong>{p.title}</strong>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
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

        <section>
          <h2>Skills</h2>
          <div>{skills.join(' • ')}</div>
        </section>
      </div>
    </div>
  );
};

export default VerticalAccentProTemplate;
