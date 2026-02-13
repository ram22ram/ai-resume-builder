import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const SarkariStandardTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const education = get('education');
  const experience = get('experience');
  const skills = get('skills').map((s: any) =>
  typeof s === "string" ? s : s.title || s.name || ""
);

  const labelStyle = { fontWeight: 600, width: 140 };

  return (
    <div style={{ ...standardStyles.page, fontFamily: 'Times New Roman, serif', fontSize: 12 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Curriculum Vitae</h2>

      <section>
        <div style={{ display: 'flex' }}>
          <div style={labelStyle}>Name:</div>
          <div>{personal.fullName}</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={labelStyle}>Phone:</div>
          <div>{personal.phone}</div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={labelStyle}>Email:</div>
          <div>{personal.email}</div>
        </div>
      </section>

      <section>
        <h3>Educational Qualifications</h3>
        {education.map((e: any, i: number) => (
          <div key={i} style={{ marginBottom: 6 }}>
            {e.degree} - {e.institution} ({e.year})
          </div>
        ))}
      </section>

      {experience.length > 0 && (
        <section>
          <h3>Work Experience</h3>
          {experience.map((e: any, i: number) => (
            <div key={i}>
              {e.position} at {e.company} ({e.startDate} - {e.endDate})
            </div>
          ))}
        </section>
      )}

      <section>
        <h3>Skills</h3>
        <div>{skills.join(', ')}</div>
      </section>
    </div>
  );
};

export default SarkariStandardTemplate;
