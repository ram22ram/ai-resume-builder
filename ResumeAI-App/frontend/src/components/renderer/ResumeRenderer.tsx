import React from 'react';
import { ResumeData } from '../../types/resume';

// NOTE: This component is PURE HTML/CSS. No Material UI. No abstractions.
// Just raw, semantic, printable HTML.

interface Props {
    data: ResumeData;
}

const ResumeRenderer: React.FC<Props> = ({ data }) => {
    // Extract sections for easier access
    const personal = data.sections.find(s => s.id === 'personal')?.items[0];
    const summary = data.sections.find(s => s.id === 'summary')?.items[0];
    const experience = data.sections.find(s => s.id === 'experience');
    const education = data.sections.find(s => s.id === 'education');
    const skills = data.sections.find(s => s.id === 'skills');
    
    // Dynamic Styling from Metadata
    const fontFamily = data.metadata.fontFamily || 'Arial, sans-serif';
    const accentColor = data.metadata.accentColor || '#000000';
    
    const styles = {
        container: {
            width: '100%',
            height: '100%',
            fontFamily: fontFamily,
            color: '#333',
            fontSize: '10.5pt',
            lineHeight: 1.5,
            padding: '40px 50px',
            boxSizing: 'border-box' as const,
        },
        header: {
            borderBottom: `1px solid ${accentColor}`,
            paddingBottom: '16px',
            marginBottom: '20px',
        },
        name: {
            fontSize: '24pt',
            fontWeight: 'bold' as const,
            margin: '0 0 4px 0',
            color: accentColor,
            textTransform: 'uppercase' as const,
        },
        contact: {
            fontSize: '9pt',
            color: '#555',
            margin: 0,
        },
        sectionTitle: {
            fontSize: '12pt',
            fontWeight: 'bold' as const,
            textTransform: 'uppercase' as const,
            borderBottom: '1px solid #ddd',
            paddingBottom: '4px',
            marginTop: '24px',
            marginBottom: '12px',
            color: accentColor,
            letterSpacing: '1px',
        },
        itemTitle: {
            fontWeight: 'bold' as const,
            fontSize: '11pt',
            margin: 0,
        },
        itemSubtitle: {
            fontStyle: 'italic' as const,
            margin: 0,
        },
        date: {
            float: 'right' as const,
            fontWeight: 'normal' as const,
        },
        list: {
            margin: '8px 0',
            paddingLeft: '18px',
        },
        listItem: {
            marginBottom: '4px',
        }
    };

    if (!personal) return <div>Loading...</div>;

    return (
        <div style={styles.container}>
            {/* HEADER */}
            <div style={styles.header}>
                <h1 style={styles.name}>{personal.firstName} {personal.lastName}</h1>
                <p style={styles.contact}>
                    {personal.email} | {personal.phone} <br/>
                    {personal.city}, {personal.country}
                </p>
            </div>

            {/* SUMMARY */}
            {summary && summary.description && (
                <div>
                     <div style={styles.sectionTitle}>Professional Summary</div>
                     <p style={{ margin: 0 }}>{summary.description}</p>
                </div>
            )}

            {/* EXPERIENCE */}
            {experience && experience.items.length > 0 && (
                <div>
                    <div style={styles.sectionTitle}>Experience</div>
                    {experience.items.map((job) => (
                        <div key={job.id} style={{ marginBottom: '16px' }}>
                             <div style={{...styles.itemTitle, overflow: 'hidden'}}>
                                 <span style={styles.date}>{job.date}</span>
                                 {job.title}
                             </div>
                             <div style={styles.itemSubtitle}>{job.company}</div>
                             <ul style={styles.list}>
                                 {job.description && job.description.split('\n').map((line: string, i: number) => (
                                     line.trim() && <li key={i} style={styles.listItem}>{line}</li>
                                 ))}
                             </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* EDUCATION */}
            {education && education.items.length > 0 && (
                 <div>
                    <div style={styles.sectionTitle}>Education</div>
                    {education.items.map((edu) => (
                        <div key={edu.id} style={{ marginBottom: '12px' }}>
                             <div style={{...styles.itemTitle, overflow: 'hidden'}}>
                                 <span style={styles.date}>{edu.date}</span>
                                 {edu.degree}
                             </div>
                             <div style={styles.itemSubtitle}>{edu.school}</div>
                        </div>
                    ))}
                 </div>
            )}

            {/* SKILLS */}
             {skills && skills.items.length > 0 && (
                 <div>
                    <div style={styles.sectionTitle}>Skills</div>
                    <p style={{ margin: 0 }}>
                        {skills.items.map(s => s.name).join(', ')}
                    </p>
                 </div>
            )}

        </div>
    );
};

export default ResumeRenderer;
