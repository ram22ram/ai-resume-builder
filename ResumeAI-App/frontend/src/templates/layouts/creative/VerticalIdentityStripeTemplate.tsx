import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, ExperienceItem, SummaryItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const VerticalIdentityStripeTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const experience = get('experience') as ExperienceItem[];
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';

  const accent = data.metadata.accentColor || '#1e3a8a';

  return (
    <div
      style={{
        ...standardStyles.page,
        display: 'flex',
        padding: 0,
        fontFamily: 'Inter, sans-serif'
      }}
    >
      {/* Vertical Stripe */}
      <div style={{
        width: 120,
        backgroundColor: accent,
        color: '#fff',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: 3
      }}>
        {personal.fullName}
      </div>

      {/* Content */}
      <div style={{ padding: 60, flex: 1 }}>
        <h2 style={{ marginTop: 0 }}>{personal.jobTitle}</h2>

        {summary && (
          <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 40 }}>
            {summary}
          </p>
        )}

        <section>
          <h3 style={{ fontSize: 13, marginBottom: 20 }}>EXPERIENCE</h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 25 }}>
              <div style={{ fontWeight: 600 }}>{exp.position}</div>
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
    </div>
  );
};

export default VerticalIdentityStripeTemplate;
