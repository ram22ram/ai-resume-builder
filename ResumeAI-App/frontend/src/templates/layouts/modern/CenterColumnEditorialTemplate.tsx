import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const CenterColumnEditorialTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];

  return (
    <div style={{
      ...standardStyles.page,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'Georgia, serif'
    }}>
      
      <div style={{ width: '60%', padding: '80px 0' }}>
        
        <header style={{ textAlign: 'center', marginBottom: 60 }}>
          <h1 style={{ margin: 0, fontSize: 30 }}>{personal.fullName}</h1>
          <div style={{ fontSize: 16, marginTop: 6 }}>{personal.jobTitle}</div>
        </header>

        {summary && (
          <section style={{ marginBottom: 40 }}>
            <p style={{ lineHeight: 1.9, fontSize: 14 }}>{summary}</p>
          </section>
        )}

        <section>
          <h3 style={{ borderBottom: '1px solid #000', paddingBottom: 5 }}>
            PROFESSIONAL EXPERIENCE
          </h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginTop: 25 }}>
              <div style={{ fontWeight: 600 }}>{exp.position}</div>
              <div style={{ fontSize: 12 }}>
                {exp.company} • {exp.date}
              </div>
              <ul style={{ paddingLeft: 16, margin: '8px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ marginTop: 4, fontSize: 14 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
};

export default CenterColumnEditorialTemplate;
