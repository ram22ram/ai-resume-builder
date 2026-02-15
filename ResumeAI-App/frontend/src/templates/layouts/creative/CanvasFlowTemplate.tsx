import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const CanvasFlowTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Poppins, sans-serif', padding: 60 }}>

      <header style={{ marginBottom: 50 }}>
        <h1 style={{ fontSize: 34, margin: 0, fontWeight: 600 }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 14, marginTop: 6 }}>{personal.jobTitle}</div>
        <div style={{ fontSize: 12, marginTop: 4 }}>
          {personal.email} • {personal.phone}
        </div>
      </header>

      {summary && (
        <div style={{
          padding: 25,
          marginBottom: 40,
          backgroundColor: '#f8fafc',
          borderRadius: 8,
        }}>
          <p style={{ fontSize: 14 }}>{summary}</p>
        </div>
      )}

      <section>
        {experience.map((exp, i) => (
          <div key={i} style={{
            marginBottom: 35,
            padding: 25,
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            borderRadius: 10
          }}>
            <strong style={{ fontSize: 15 }}>{exp.position}</strong>
            <div style={{ fontSize: 12 }}>
              {exp.company} • {exp.date}
            </div>
            <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                {exp.description.map((desc, idx) => (
                  <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                ))}
            </ul>
          </div>
        ))}
      </section>

    </div>
  );
};

export default CanvasFlowTemplate;
