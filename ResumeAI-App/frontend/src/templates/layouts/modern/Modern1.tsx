import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

interface Props {
  data: ResumeData;
}

// "The Modern Tech" - Projects First, Skill Tags, Clean Sans
const Modern1: React.FC<Props> = ({ data }) => {
  const getSectionItems = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.items || [];

  const personal = getSectionItems('personal')[0] || {} as any;
  const experience = getSectionItems('experience');
  const education = getSectionItems('education');
  
  // Flatten skills if needed
  const rawSkills = getSectionItems('skills');
  const skills = rawSkills.map((s: any) => s.name || s);
  
  const projects = getSectionItems('projects');

  const accentColor = data.metadata.accentColor || standardStyles.colors.accent.teal;
  const fontFamily = data.metadata.fontFamily || standardStyles.fonts.modern;

  return (
    <div style={{ ...standardStyles.page, fontFamily, color: '#1f2937' }}>
      
      {/* Header */}
      <header style={{ borderLeft: `6px solid ${accentColor}`, paddingLeft: '18px', marginBottom: '30px' }}>
        <h1 style={{ fontSize: '26pt', fontWeight: 800, margin: 0, textTransform: 'uppercase', lineHeight: 1 }}>
            {personal.fullName || 'YOUR NAME'}
        </h1>
        <div style={{ fontSize: '12pt', color: accentColor, fontWeight: 600, marginTop: '4px', letterSpacing: '1px' }}>
            {personal.jobTitle || 'FULL STACK DEVELOPER'}
        </div>
        <div style={{ marginTop: '10px', fontSize: '9pt', color: '#4b5563', display: 'flex', gap: '15px' }}>
             {[personal.email, personal.phone, personal.linkedin, personal.github].filter(Boolean).map((c, i) => (
                 <span key={i}>{c}</span>
             ))}
        </div>
      </header>

      {/* Skills - Tags Style (Crucial for Tech) */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '25px' }}>
            <div style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', color: '#111' }}>
                Technical Stack
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(Array.isArray(skills) ? skills : []).map((skill: string, i: number) => (
                    <span key={i} style={{ 
                        fontSize: '9pt', 
                        backgroundColor: '#f3f4f6', 
                        padding: '3px 10px', 
                        borderRadius: '4px', 
                        fontWeight: 500,
                        border: '1px solid #e5e7eb'
                    }}>
                        {skill}
                    </span>
                ))}
            </div>
        </section>
      )}

      {/* Projects - Higher Priority for Tech */}
      {projects.length > 0 && (
         <section style={{ marginBottom: '25px' }}>
             <h2 style={{ fontSize: '14pt', fontWeight: 700, borderBottom: '2px solid #e5e7eb', paddingBottom: '5px', marginBottom: '15px' }}>
                 Projects
             </h2>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                 {projects.map((proj: any, i: number) => (
                     <div key={i} style={{ padding: '12px', border: '1px solid #eee', borderRadius: '6px' }}>
                         <div style={{ fontWeight: 700, fontSize: '11pt', display: 'flex', justifyContent: 'space-between' }}>
                             {proj.title}
                             {/* Optional Link icon/text */}
                             {proj.link && <span style={{ fontSize: '8pt', color: accentColor }}>↗ Link</span>}
                         </div>
                         <p style={{ fontSize: '9pt', color: '#555', margin: '6px 0 8px 0', lineHeight: 1.4 }}>
                             {proj.description}
                         </p>
                         {proj.technologies && (
                             <div style={{ fontSize: '8pt', color: '#888', fontStyle: 'italic' }}>
                                 Using: {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                             </div>
                         )}
                     </div>
                 ))}
             </div>
         </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
         <section style={{ marginBottom: '25px' }}>
             <h2 style={{ fontSize: '14pt', fontWeight: 700, borderBottom: '2px solid #e5e7eb', paddingBottom: '5px', marginBottom: '15px' }}>
                 Experience
             </h2>
             {experience.map((exp: any, i: number) => (
                 <div key={i} style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div style={{ fontWeight: 700, fontSize: '11pt' }}>{exp.position}</div>
                        <div style={{ fontSize: '9pt', color: '#666' }}>{exp.startDate} - {exp.endDate}</div>
                    </div>
                    <div style={{ color: accentColor, fontWeight: 500, fontSize: '10pt', marginBottom: '4px' }}>
                        {exp.company}
                    </div>
                    <div style={{ fontSize: '10pt', lineHeight: 1.6 }}> {exp.description} </div>
                 </div>
             ))}
         </section>
      )}

      {/* Education */}
      {education.length > 0 && (
          <section>
              <h2 style={{ fontSize: '14pt', fontWeight: 700, borderBottom: '2px solid #e5e7eb', paddingBottom: '5px', marginBottom: '15px' }}>
                  Education
              </h2>
              {education.map((edu: any, i: number) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div>
                          <div style={{ fontWeight: 600 }}>{edu.institution}</div>
                          <div style={{ fontSize: '9pt' }}>{edu.degree}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '9pt', color: '#666' }}>{edu.startDate} - {edu.endDate}</div>
                          {edu.score && <div style={{ fontSize: '9pt', fontWeight: 600 }}>Grade: {edu.score}</div>}
                      </div>
                  </div>
              ))}
          </section>
      )}

    </div>
  );
};

export default Modern1;
