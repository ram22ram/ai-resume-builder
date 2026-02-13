import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const AuthoritySerifTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const exp = get('experience');
  const edu = get('education');

  return (
    <div style={{
      ...standardStyles.page,
      fontFamily: 'Georgia, serif',
      lineHeight: 1.7,
      color: '#111'
    }}>
      <header style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: '30pt', letterSpacing: 2 }}>{p.fullName}</h1>
        <div style={{ fontSize: '12pt', textTransform: 'uppercase' }}>{p.jobTitle}</div>
      </header>

      {summary && (
        <section>
          <h2>Executive Profile</h2>
          <p>{summary}</p>
        </section>
      )}

      <section>
        <h2>Professional Experience</h2>
        {exp.map((e: any, i: number) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <strong>{e.position}</strong> — {e.company}
            <div style={{ fontSize: 12 }}>{e.startDate} – {e.endDate}</div>
            <p>{e.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {edu.map((e: any, i: number) => (
          <div key={i}>{e.degree} — {e.institution}</div>
        ))}
      </section>
    </div>
  );
};

export default AuthoritySerifTemplate;
