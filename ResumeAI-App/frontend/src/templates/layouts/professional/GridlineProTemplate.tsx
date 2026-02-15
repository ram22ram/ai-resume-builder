import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, EducationItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const GridlineProTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif', padding: 40 }}>

      <header style={{ marginBottom: 30 }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 13 }}>{personal.jobTitle}</div>
        <div style={{ fontSize: 12 }}>
          {personal.email} • {personal.phone}
        </div>
      </header>

      <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: 25 }} />

      <section style={{ marginBottom: 25 }}>
        <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Experience</h3>
        {experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>{exp.position}</strong>
              <span style={{ fontSize: 11 }}>{exp.date}</span>
            </div>
            <div style={{ fontSize: 12 }}>{exp.company}</div>
            <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                {exp.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 12 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: 25 }} />

      <section style={{ marginBottom: 25 }}>
        <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Education</h3>
        {education.map((edu, i) => (
          <div key={i}>
            <strong>{edu.institution}</strong>
            <div style={{ fontSize: 12 }}>{edu.degree}</div>
          </div>
        ))}
      </section>

      <div style={{ borderTop: '1px solid #e5e7eb', marginBottom: 25 }} />

      <section>
        <h3 style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Skills</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {skills.map((s, i) => (
            <span key={i} style={{ fontSize: 11 }}>
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GridlineProTemplate;
