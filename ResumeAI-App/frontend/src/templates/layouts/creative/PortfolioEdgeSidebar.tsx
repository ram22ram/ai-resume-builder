import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const PortfolioEdgeSidebar: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);

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
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <strong>{exp.position}</strong>
              <div style={{ fontSize: 13 }}>
                {exp.company} | {exp.date}
              </div>
              <ul style={{ paddingLeft: 16, margin: '4px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ marginTop: 4 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h3>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                borderBottom: `2px solid ${accent}`,
                paddingBottom: 2,
                fontSize: 13
              }}>
                {s}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default PortfolioEdgeSidebar;
