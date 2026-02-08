import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

interface Props {
  data: ResumeData;
}

// "The Creative" - Asymmetric, Timeline, Lato font
const PremCreat4: React.FC<Props> = ({ data }) => {
  const getSectionItems = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.items || [];

  const personal = getSectionItems('personal')[0] || {} as any;
  const summary = getSectionItems('summary')[0]?.description || '';
  const experience = getSectionItems('experience');
  const education = getSectionItems('education');
  
  const rawSkills = getSectionItems('skills');
  const skills = rawSkills.map((s: any) => s.name || s);

  const { fontFamily, accentColor } = data.metadata;
  const themeColor = accentColor || '#4a4a4a';

  return (
    <div
      style={{
        ...standardStyles.page,
        fontFamily: fontFamily || '"Lato", "Verdana", sans-serif',
        color: '#4a4a4a',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header - Left aligned with massive whitespace */}
      <header style={{ marginBottom: '40px', paddingRight: '20%' }}>
        <h1 style={{ fontSize: '36pt', fontWeight: 300, margin: '0 0 10px 0', letterSpacing: '-1px', color: '#000' }}>
          {personal.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '12pt', textTransform: 'uppercase', letterSpacing: '2px', color: '#888', marginBottom: '20px' }}>
          {personal.jobTitle || 'Creative Professional'}
        </div>
        <div style={{ fontSize: '9pt', color: '#999', display: 'flex', gap: '20px' }}>
             {[personal.email, personal.phone, personal.linkedin].filter(Boolean).map((c, i) => (
                 <span key={i}>{c}</span>
             ))}
        </div>
      </header>

      <div style={{ display: 'flex', gap: '40px' }}>
          
          {/* Timeline Column (Left) */}
          <div style={{ flex: 2 }}>
             {experience.length > 0 && (
                 <section style={{ marginBottom: '40px' }}>
                     <h2 style={{ fontSize: '10pt', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px', color: '#000' }}>
                         Experience
                     </h2>
                     <div style={{ borderLeft: '1px solid #ddd', paddingLeft: '20px' }}>
                         {experience.map((exp: any, i: number) => (
                             <div key={i} style={{ marginBottom: '25px', position: 'relative' }}>
                                 {/* Dot */}
                                 <div style={{ 
                                     position: 'absolute', 
                                     left: '-25px', 
                                     top: '5px', 
                                     width: '9px', 
                                     height: '9px', 
                                     borderRadius: '50%', 
                                     backgroundColor: '#fff', 
                                     border: `2px solid ${themeColor}` 
                                 }}></div>
                                 
                                 <div style={{ fontSize: '12pt', fontWeight: 700, color: '#222' }}>{exp.position}</div>
                                 <div style={{ fontSize: '9pt', color: '#888', marginBottom: '8px', textTransform: 'uppercase' }}>
                                     {exp.company} • {exp.startDate} - {exp.endDate}
                                 </div>
                                 <p style={{ margin: 0, fontSize: '10pt', lineHeight: 1.6 }}>{exp.description}</p>
                             </div>
                         ))}
                     </div>
                 </section>
             )}
          </div>

          {/* Details Column (Right) */}
          <div style={{ flex: 1 }}>
               {summary && (
                   <section style={{ marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '10pt', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', color: '#000' }}>
                            Profile
                        </h2>
                        <p style={{ fontSize: '10pt', lineHeight: 1.7 }}>{summary}</p>
                   </section>
               )}

               {education.length > 0 && (
                   <section style={{ marginBottom: '30px' }}>
                        <h2 style={{ fontSize: '10pt', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', color: '#000' }}>
                            Education
                        </h2>
                        {education.map((edu: any, i: number) => (
                            <div key={i} style={{ marginBottom: '15px' }}>
                                <div style={{ fontWeight: 700 }}>{edu.institution}</div>
                                <div style={{ fontSize: '9pt', fontStyle: 'italic' }}>{edu.degree}</div>
                                <div style={{ fontSize: '8pt', color: '#999' }}>{edu.startDate} - {edu.endDate}</div>
                            </div>
                        ))}
                   </section>
               )}

               {skills.length > 0 && (
                  <section>
                      <h2 style={{ fontSize: '10pt', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px', color: '#000' }}>
                          Expertise
                      </h2>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {(Array.isArray(skills) ? skills : []).map((skill: string, i: number) => (
                              <span key={i} style={{ fontSize: '10pt', borderBottom: '1px solid #eee', paddingBottom: '4px' }}>
                                  {skill}
                              </span>
                          ))}
                      </div>
                  </section>
               )}
          </div>
      </div>
    </div>
  );
};

export default PremCreat4;
