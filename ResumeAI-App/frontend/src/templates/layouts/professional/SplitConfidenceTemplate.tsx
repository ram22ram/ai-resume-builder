import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, ProjectItem, EducationItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SplitConfidenceTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);

  return (
    <div
      style={{
        ...standardStyles.page,
        display: 'grid',
        gridTemplateColumns: '60% 40%',
        gap: 24,
        fontFamily: 'Source Sans Pro, sans-serif'
      }}
    >
      {/* LEFT */}
      <div>
        <h1>{personal.fullName}</h1>
        <div style={{ fontWeight: 600 }}>{personal.jobTitle}</div>

        {summary && <p>{summary}</p>}

        <section>
          <h2>Skills</h2>
          {skills.map((s, i) => (
            <span key={i} style={{ marginRight: 8 }}>{s}</span>
          ))}
        </section>

        <section>
          <h2>Education</h2>
          {education.map((e, i) => (
            <div key={i}>{e.degree} — {e.institution}</div>
          ))}
        </section>
      </div>

      {/* RIGHT */}
      <div>
        <section>
          <h2>Experience</h2>
          {experience.map((e, i) => (
            <div key={i} style={{ borderLeft: '2px solid #ddd', paddingLeft: 10, marginBottom: 12 }}>
              <strong>{e.position}</strong>
              <div>{e.company}</div>
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
          <h2>Projects</h2>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <strong>{p.title}</strong>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: '9pt' }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SplitConfidenceTemplate;
