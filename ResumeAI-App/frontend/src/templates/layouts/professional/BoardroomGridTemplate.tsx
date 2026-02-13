import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const BoardroomGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const exp = get('experience');
  const skills = get('skills').map((s: any) => s.name || s);

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Inter, sans-serif' }}>
      
      <header style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        borderBottom: '2px solid #000',
        paddingBottom: 20,
        marginBottom: 30
      }}>
        <div>
          <h1>{p.fullName}</h1>
          <strong>{p.jobTitle}</strong>
        </div>
        <div style={{ textAlign: 'right', fontSize: 12 }}>
          {p.email}<br />{p.phone}
        </div>
      </header>

      {summary && (
        <section>
          <h2>Leadership Summary</h2>
          <p>{summary}</p>
        </section>
      )}

      <section>
        <h2>Experience</h2>
        {exp.map((e: any, i: number) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            marginBottom: 20
          }}>
            <div>{e.startDate} – {e.endDate}</div>
            <div>
              <strong>{e.position}</strong> — {e.company}
              <p>{e.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2>Strategic Skills</h2>
        <div style={{ columns: 2 }}>
          {skills.map((s: string, i: number) => (
            <div key={i}>{s}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BoardroomGridTemplate;
