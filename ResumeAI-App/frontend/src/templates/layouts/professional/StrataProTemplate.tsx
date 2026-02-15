import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const StrataProTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description;
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Georgia, serif' }}>
      <header style={{ textAlign: 'center', marginBottom: 24 }}>
        <h1 style={{ letterSpacing: 2 }}>{personal.fullName}</h1>
        <div>{personal.jobTitle}</div>
        <div style={{ fontSize: '9pt' }}>
          {[personal.email, personal.phone].filter(Boolean).join(' | ')}
        </div>
      </header>

      {summary && (
        <section>
          <h2>Executive Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      <section>
        <h2>Professional Experience</h2>
        {experience.map((e, i) => (
          <div key={i}>
            <strong>{e.position}</strong> — {e.company}
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
        <h2>Education</h2>
        {education.map((e, i) => (
          <div key={i}>{e.degree} — {e.institution}</div>
        ))}
      </section>

      <section>
        <h2>Skills</h2>
        <div>{skills.join(', ')}</div>
      </section>
    </div>
  );
};

export default StrataProTemplate;
