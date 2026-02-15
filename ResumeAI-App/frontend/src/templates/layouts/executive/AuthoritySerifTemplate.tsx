import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const AuthoritySerifTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const exp = get('experience') as ExperienceItem[];
  const edu = get('education') as EducationItem[];

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
        {exp.map((e, i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <strong>{e.position}</strong> — {e.company}
            <div style={{ fontSize: 12 }}>{e.date}</div>
            <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                {e.description.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2>Education</h2>
        {edu.map((e, i) => (
          <div key={i}>{e.degree} — {e.institution}</div>
        ))}
      </section>
    </div>
  );
};

export default AuthoritySerifTemplate;
