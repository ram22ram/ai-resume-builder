import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ProjectItem, ExperienceItem, SkillItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

interface Props {
  data: ResumeData;
}

const AtlasDevTemplate: React.FC<Props> = ({ data }) => {
  const getItems = (type: ResumeSection['type']) =>
    data.sections.find(s => s.type === type && s.isVisible)?.items || [];

  const personal = (getItems('personal')[0] || {}) as PersonalItem;
  const projects = getItems('projects') as ProjectItem[];
  const experience = getItems('experience') as ExperienceItem[];
  const skills = (getItems('skills') as SkillItem[]).map(s => s.name);
  const education = getItems('education') as EducationItem[];

  const accent = data.metadata.accentColor || '#2563eb';

  return (
    <div style={{ ...standardStyles.page, fontFamily: standardStyles.fonts.modern }}>
      {/* HEADER */}
      <header style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '26pt', margin: 0 }}>{personal.fullName}</h1>
        <div style={{ fontSize: '12pt', color: accent }}>{personal.jobTitle}</div>
        <div style={{ fontSize: '9pt', marginTop: 6 }}>
          {[personal.email, personal.github, personal.linkedin].filter(Boolean).join(' • ')}
        </div>
      </header>

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section>
          <h2 style={{ borderBottom: `2px solid ${accent}` }}>Projects</h2>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <strong>{p.title}</strong>
              <div style={{ fontSize: '9pt', color: '#555' }}>{p.technologies}</div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {p.description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section>
          <h2>Experience</h2>
          {experience.map((e, i) => (
            <div key={i}>
              <strong>{e.position}</strong> — {e.company}
              <div style={{ fontSize: '9pt', color: '#666' }}>{e.date}</div>
            </div>
          ))}
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section>
          <h2>Skills</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {skills.map((s, i) => (
              <span key={i} style={{ border: '1px solid #ddd', padding: '4px 8px', borderRadius: 6 }}>
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section>
          <h2>Education</h2>
          {education.map((e, i) => (
            <div key={i}>
              <strong>{e.institution}</strong> — {e.degree}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default AtlasDevTemplate;
