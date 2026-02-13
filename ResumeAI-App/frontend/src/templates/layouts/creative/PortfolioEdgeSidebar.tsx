import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const PortfolioEdgeSidebar: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const summary = get('summary')[0]?.description || '';
  const experience = get('experience');
  const skills = get('skills');

  const accent = data.metadata.accentColor || '#111';

  return (
    <div style={{
      ...standardStyles.page,
      display: 'flex',
      fontFamily: 'Inter, sans-serif',
      padding: 0
    }}>

      {/* Accent Sidebar */}
      <div style={{
        width: 25,
        backgroundColor: accent
      }} />

      <div style={{ padding: 40, flex: 1 }}>

        <header style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 36, margin: 0 }}>
            {personal.fullName}
          </h1>
          <div style={{ fontSize: 16, marginTop: 5 }}>
            {personal.jobTitle}
          </div>
          <div style={{ fontSize: 13, marginTop: 8 }}>
            {personal.email} • {personal.phone}
          </div>
        </header>

        {summary && (
          <section style={{ marginBottom: 35 }}>
            <p style={{ lineHeight: 1.7 }}>{summary}</p>
          </section>
        )}

        <section style={{ marginBottom: 35 }}>
          <h3>Experience</h3>
          {experience.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <strong>{exp.position}</strong>
              <div style={{ fontSize: 13 }}>
                {exp.company} | {exp.startDate} - {exp.endDate}
              </div>
              <div style={{ marginTop: 4 }}>{exp.description}</div>
            </div>
          ))}
        </section>

        <section>
          <h3>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {skills.map((s: any, i: number) => (
              <span key={i} style={{
                borderBottom: `2px solid ${accent}`,
                paddingBottom: 2,
                fontSize: 13
              }}>
                {s.name || s}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default PortfolioEdgeSidebar;
