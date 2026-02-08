import React from 'react';
import { ResumeData, ResumeSection } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

interface Props {
  data: ResumeData;
}

// "The DevOps" - Dark accents, Code typography, Terminal feel
const TechPro: React.FC<Props> = ({ data }) => {
  const getSectionItems = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type && s.isVisible)?.items || [];

  const personal = getSectionItems('personal')[0] || {} as any;
  const experience = getSectionItems('experience');
  const education = getSectionItems('education');
  
  const rawSkills = getSectionItems('skills');
  const skills = rawSkills.map((s: any) => s.name || s);
  
  const projects = getSectionItems('projects');

  const { fontFamily, accentColor } = data.metadata;
  // Default to teal/green if not provided, or use accentColor for highlights
  const terminalHighlight = accentColor || '#4fd1c5';

  return (
    <div
      style={{
        ...standardStyles.page,
        fontFamily: fontFamily || standardStyles.fonts.mono,
        color: '#2d3748',
        padding: 0, 
      }}
    >
      {/* Header - Terminal Style */}
      <header style={{ 
        backgroundColor: '#1a202c', 
        color: terminalHighlight, 
        padding: '25mm 20mm 15mm 20mm',
        fontFamily: fontFamily || standardStyles.fonts.mono,
        borderBottom: `4px solid ${accentColor || '#48bb78'}`
      }}>
        <div style={{ opacity: 0.7, fontSize: '9pt', marginBottom: '5px' }}>// START_SESSION: {personal.jobTitle || 'DEVELOPER'}</div>
        <h1 style={{ margin: 0, fontSize: '26pt', color: '#fff', letterSpacing: '-0.5px' }}>
          {`> ${personal.fullName || 'User_Name'}`} <span style={{ animation: 'blink 1s step-end infinite' }}>_</span>
        </h1>
        
        <div style={{ marginTop: '15px', color: '#cbd5e0', fontSize: '9pt', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
             {personal.email && <span>const email = '{personal.email}';</span>}
             {personal.phone && <span>const phone = '{personal.phone}';</span>}
             {personal.github && <span>const github = '{personal.github}';</span>}
             {personal.linkedin && <span>const linkedIn = 'profile';</span>}
        </div>
      </header>

      <div style={{ padding: '20mm' }}>
        
        {/* Skills - Array Style */}
        {skills.length > 0 && (
          <section style={{ marginBottom: '25px', backgroundColor: '#f7fafc', padding: '15px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
            <div style={{ color: '#805ad5', fontWeight: 700, marginBottom: '8px' }}>const techStack = [</div>
            <div style={{ paddingLeft: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                {(Array.isArray(skills) ? skills : []).map((skill: string, i: number) => (
                    <span key={i} style={{ color: '#d53f8c' }}>
                        '{skill}'{i < skills.length - 1 ? ',' : ''}
                    </span>
                ))}
            </div>
            <div style={{ color: '#805ad5', fontWeight: 700 }}>];</div>
          </section>
        )}

        {/* Experience - Git Log Style */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '30px' }}>
             <h2 style={{ fontSize: '14pt', borderBottom: '2px solid #cbd5e0', paddingBottom: '5px', marginBottom: '15px' }}>
                 git log --experience
             </h2>
             {experience.map((exp: any, i: number) => (
                 <div key={i} style={{ marginBottom: '20px', borderLeft: '2px dashed #cbd5e0', paddingLeft: '15px' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <div style={{ fontWeight: 700, fontSize: '11pt', color: '#2b6cb0' }}>commit: {exp.position}</div>
                        <div style={{ fontSize: '9pt', color: '#718096' }}>{exp.startDate} - {exp.endDate}</div>
                     </div>
                     <div style={{ fontSize: '10pt', fontWeight: 600, color: '#4a5568', marginBottom: '5px' }}>
                         Author: @{exp.company}
                     </div>
                     {exp.description && (
                         <div style={{ fontSize: '9.5pt', lineHeight: 1.5, color: '#2d3748' }}>
                             {exp.description}
                         </div>
                     )}
                 </div>
             ))}
          </section>
        )}

        {/* Projects - Function Style */}
        {projects.length > 0 && (
           <section style={{ marginBottom: '30px' }}>
               <h2 style={{ fontSize: '14pt', borderBottom: '2px solid #cbd5e0', paddingBottom: '5px', marginBottom: '15px' }}>
                   function buildProjects() &#123;
               </h2>
               {projects.map((proj: any, i: number) => (
                   <div key={i} style={{ marginBottom: '15px', paddingLeft: '15px' }}>
                       <div style={{ fontWeight: 700, fontSize: '11pt' }}>
                           return <span style={{ color: '#3182ce' }}>{proj.title}</span>();
                       </div>
                       <p style={{ margin: '4px 0 6px 0', fontSize: '9.5pt' }}>{proj.description}</p>
                       {proj.technologies && (
                           <div style={{ fontSize: '8.5pt', color: '#718096' }}>
                               // Stack: {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                           </div>
                       )}
                   </div>
               ))}
               <div style={{ fontSize: '14pt', color: '#cbd5e0' }}>&#125;</div>
           </section>
        )}

        {/* Education - Bottom */}
        {education.length > 0 && (
           <section>
              <h2 style={{ fontSize: '14pt', borderBottom: '2px solid #cbd5e0', paddingBottom: '5px', marginBottom: '15px' }}>
                  Education
              </h2>
              {education.map((edu: any, i: number) => (
                  <div key={i} style={{ marginBottom: '10px' }}>
                      <div style={{ fontWeight: 700 }}>{edu.institution}</div>
                      <div style={{ fontSize: '9.5pt' }}>{edu.degree}</div>
                      <div style={{ fontSize: '9pt', color: '#718096' }}>{edu.startDate} - {edu.endDate}</div>
                  </div>
              ))}
           </section>
        )}

      </div>
    </div>
  );
};

export default TechPro;
