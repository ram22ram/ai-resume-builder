import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const BoardroomGridTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const p = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const exp = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);

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
        {exp.map((e, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 3fr',
            marginBottom: 20
          }}>
            <div>{e.date}</div>
            <div>
              <strong>{e.position}</strong> — {e.company}
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {e.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: '10pt' }}>{desc}</li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <section>
        <h2>Strategic Skills</h2>
        <div style={{ columns: 2 }}>
          {skills.map((s, i) => (
            <div key={i}>{s}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BoardroomGridTemplate;
