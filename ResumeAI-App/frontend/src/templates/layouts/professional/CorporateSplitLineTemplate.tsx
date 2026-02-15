import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SkillItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const CorporateSplitLineTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);

  const accent = data.metadata.accentColor || '#0f172a';

  return (
    <div
      style={{
        ...standardStyles.page,
        fontFamily: 'Helvetica, Arial, sans-serif',
        padding: 0
      }}
    >
      {/* Bold Header Bar */}
      <div style={{
        backgroundColor: accent,
        color: '#fff',
        padding: 40
      }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>
          {personal.fullName}
        </h1>
        <div style={{ fontSize: 14, marginTop: 6 }}>
          {personal.jobTitle}
        </div>
      </div>

      <div style={{ padding: 50 }}>
        {/* Experience */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 15 }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 600 }}>
                {exp.position}
              </div>
              <div style={{ fontSize: 12 }}>
                {exp.company} • {exp.date}
              </div>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13, marginTop: 5 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Skills Horizontal Layout */}
        <section>
          <h2 style={{ fontSize: 13, fontWeight: 700, marginBottom: 15 }}>
            CORE SKILLS
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 15
          }}>
            {skills.map((s, i) => (
              <div
                key={i}
                style={{
                  padding: '6px 14px',
                  border: `1px solid ${accent}`,
                  fontSize: 12
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
};

export default CorporateSplitLineTemplate;
