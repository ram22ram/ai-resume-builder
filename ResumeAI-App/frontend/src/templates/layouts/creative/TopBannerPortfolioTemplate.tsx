import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const TopBannerPortfolioTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = get('personal')[0] || {};
  const projects = get('projects');
  const experience = get('experience');
  const skills = get('skills').map((s: any) => s.name || s);

  const accent = data.metadata.accentColor || '#0f172a';

  return (
    <div style={{ ...standardStyles.page, padding: 0, fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Hero Banner */}
      <div style={{
        backgroundColor: accent,
        color: '#fff',
        padding: '60px 80px'
      }}>
        <h1 style={{ margin: 0, fontSize: 36 }}>{personal.fullName}</h1>
        <div style={{ fontSize: 16, marginTop: 6 }}>{personal.jobTitle}</div>
      </div>

      <div style={{ padding: 60 }}>
        <div style={{ display: 'flex', gap: 50 }}>
          
          {/* Left Column */}
          <div style={{ flex: 2 }}>
            <h3 style={{ marginBottom: 20 }}>PROJECTS</h3>
            {projects.map((proj: any, i: number) => (
              <div key={i} style={{ marginBottom: 25 }}>
                <div style={{ fontWeight: 600 }}>{proj.title}</div>
                <div style={{ fontSize: 13 }}>{proj.description}</div>
              </div>
            ))}

            <h3 style={{ marginTop: 40 }}>EXPERIENCE</h3>
            {experience.map((exp: any, i: number) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ fontWeight: 600 }}>{exp.position}</div>
                <div style={{ fontSize: 12 }}>
                  {exp.company} • {exp.startDate} - {exp.endDate}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div style={{ flex: 1 }}>
            <h3>SKILLS</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {skills.map((skill: string, i: number) => (
                <div key={i} style={{
                  padding: 6,
                  borderBottom: `2px solid ${accent}`
                }}>
                  {skill}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TopBannerPortfolioTemplate;
