import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const CanvasFlowTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const experience = get('experience');

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
        {experience.map((exp: any, i: number) => (
          <div key={i} style={{
            marginBottom: 35,
            padding: 25,
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            borderRadius: 10
          }}>
            <strong style={{ fontSize: 15 }}>{exp.position}</strong>
            <div style={{ fontSize: 12 }}>
              {exp.company} • {exp.startDate} - {exp.endDate}
            </div>
            <p style={{ fontSize: 13 }}>{exp.description}</p>
          </div>
        ))}
      </section>

    </div>
  );
};

export default CanvasFlowTemplate;
