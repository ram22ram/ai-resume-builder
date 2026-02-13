import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const StrataProTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const summary = get('summary')[0]?.description;
  const experience = get('experience');
  const education = get('education');
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);

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
        {experience.map((e: any, i: number) => (
          <div key={i}>
            <strong>{e.position}</strong> — {e.company}
            <div style={{ fontSize: '9pt' }}>{e.startDate} – {e.endDate}</div>
            <p>{e.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {education.map((e: any, i: number) => (
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
