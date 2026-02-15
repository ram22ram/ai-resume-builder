import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const AxisLedgerTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const education = get('education') as EducationItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Arial, sans-serif' }}>
      {/* TOP BAR */}
      <div style={{ borderBottom: '4px solid #111', paddingBottom: 12, marginBottom: 20 }}>
        <h1>{personal.fullName}</h1>
        <div>{personal.jobTitle}</div>
      </div>

      <section>
        <h2>Experience</h2>
        {experience.map((e, i) => (
          <div key={i}>
            <strong>{e.position}</strong> | {e.company}
            <div style={{ fontSize: '9pt' }}>{e.date}</div>
            <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                {e.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: '10pt' }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Core Skills</h2>
        <div style={{ columnCount: 2 }}>
          {skills.map((s, i) => (
            <div key={i}>• {s}</div>
          ))}
        </div>
      </section>

      <section>
        <h2>Education</h2>
        {education.map((e, i) => (
          <div key={i}>{e.institution} — {e.degree}</div>
        ))}
      </section>
    </div>
  );
};

export default AxisLedgerTemplate;
