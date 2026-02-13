import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const AxisLedgerTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const experience = get('experience');
  const skills = get('skills').map((s: any) => s.name || s);
  const education = get('education');

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Arial, sans-serif' }}>
      {/* TOP BAR */}
      <div style={{ borderBottom: '4px solid #111', paddingBottom: 12, marginBottom: 20 }}>
        <h1>{personal.fullName}</h1>
        <div>{personal.jobTitle}</div>
      </div>

      <section>
        <h2>Experience</h2>
        {experience.map((e: any, i: number) => (
          <div key={i}>
            <strong>{e.position}</strong> | {e.company}
            <div style={{ fontSize: '9pt' }}>{e.startDate} – {e.endDate}</div>
            <p>{e.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Core Skills</h2>
        <div style={{ columnCount: 2 }}>
          {skills.map((s: string, i: number) => (
            <div key={i}>• {s}</div>
          ))}
        </div>
      </section>

      <section>
        <h2>Education</h2>
        {education.map((e: any, i: number) => (
          <div key={i}>{e.institution} — {e.degree}</div>
        ))}
      </section>
    </div>
  );
};

export default AxisLedgerTemplate;
