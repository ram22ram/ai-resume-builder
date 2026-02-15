import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, SummaryItem, ExperienceItem, EducationItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SplitBannerImpact: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const summary = ((get('summary')[0] || {}) as SummaryItem).description || '';
  const experience = get('experience') as ExperienceItem[];
  const education = get('education') as EducationItem[];

  const accent = data.metadata.accentColor || '#0f172a';

  return (
    <div style={{ ...standardStyles.page, padding: 0, fontFamily: 'Inter, sans-serif' }}>

      {/* Banner */}
      <div style={{
        background: accent,
        color: 'white',
        padding: '40px 30px'
      }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>{personal.fullName}</h1>
        <div style={{ marginTop: 6 }}>{personal.jobTitle}</div>
        <div style={{ marginTop: 10, fontSize: 13 }}>
          {personal.email} • {personal.phone}
        </div>
      </div>

      <div style={{ padding: 30 }}>

        {/* Summary Card */}
        {summary && (
          <div style={{
            background: '#f8fafc',
            padding: 20,
            borderRadius: 8,
            marginBottom: 30
          }}>
            <p style={{ margin: 0, lineHeight: 1.6 }}>{summary}</p>
          </div>
        )}

        {/* Experience */}
        <section style={{ marginBottom: 30 }}>
          <h2 style={{ marginBottom: 15 }}>Experience</h2>
          {experience.map((exp, i) => (
            <div key={i} style={{
              padding: 15,
              marginBottom: 15,
              border: '1px solid #e5e7eb',
              borderRadius: 6
            }}>
              <strong>{exp.position}</strong>
              <div style={{ fontSize: 13, color: '#555' }}>
                {exp.company} | {exp.date}
              </div>
              <ul style={{ paddingLeft: 16, margin: '6px 0' }}>
                  {exp.description.map((desc, idx) => (
                    <li key={idx} style={{ fontSize: 13 }}>{desc}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section>
          <h2 style={{ marginBottom: 15 }}>Education</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <strong>{edu.institution}</strong>
              <div style={{ fontSize: 13 }}>{edu.degree}</div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
};

export default SplitBannerImpact;
