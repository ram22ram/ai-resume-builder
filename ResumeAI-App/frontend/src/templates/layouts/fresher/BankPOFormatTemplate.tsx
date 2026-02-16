import React from 'react';
import { ResumeData, ResumeSection, PersonalItem, EducationItem, SkillItem, ExperienceItem, ProjectItem, CertificationItem, AchievementItem } from '../../../types/resume';
import { standardStyles } from '../../styles/standardStyles';

const BankPOFormatTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const get = (t: ResumeSection['type']) =>
    data.sections.find(s => s.type === t && s.isVisible)?.items || [];

  const personal = (get('personal')[0] || {}) as PersonalItem;
  const education = get('education') as EducationItem[];
  const skills = (get('skills') as SkillItem[]).map(s => s.name);
  const experience = get('experience') as ExperienceItem[];
  const projects = get('projects') as ProjectItem[];
  const certifications = get('certifications') as CertificationItem[];
  const achievements = get('achievements') as AchievementItem[];

  const styles = {
    page: { ...standardStyles.page, fontFamily: 'Times New Roman, serif', fontSize: 12, lineHeight: 1.4 },
    header: { textAlign: 'center' as const, marginBottom: 15, borderBottom: '2px solid #000', paddingBottom: 10 },
    name: { margin: 0, textTransform: 'uppercase' as const, fontSize: 18, fontWeight: 'bold' },
    contact: { fontSize: 11, marginTop: 4 },
    sectionTitle: {
      background: '#eee',
      borderBottom: '1px solid #000',
      padding: '2px 5px',
      marginTop: 15,
      marginBottom: 8,
      fontWeight: 'bold',
      fontSize: 13,
      textTransform: 'uppercase' as const
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse' as const,
        fontSize: 11,
        marginBottom: 10
    },
    th: { border: '1px solid #000', padding: 4, textAlign: 'left' as const, background: '#f5f5f5', fontWeight: 'bold' },
    td: { border: '1px solid #000', padding: 4 },
    // Personal Details Grid
    pdRow: { display: 'flex', marginBottom: 2 },
    pdLabel: { width: 120, fontWeight: 'bold' },
    pdValue: { flex: 1 },
    listItem: { marginBottom: 3 }
  };

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.name}>{personal.fullName}</h1>
        <div style={styles.contact}>
            {personal.address && <span>{personal.address} | </span>}
            {personal.email} | {personal.phone}
            {personal.linkedin && <span> | {personal.linkedin}</span>}
        </div>
      </header>

      {personal.objective && (
        <section>
          <div style={styles.sectionTitle}>Career Objective</div>
          <p style={{ margin: 0, textAlign: 'justify' as const }}>{personal.objective}</p>
        </section>
      )}

      {education.length > 0 && (
        <section>
          <div style={styles.sectionTitle}>Academic Qualification</div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Course / Standard</th>
                <th style={styles.th}>School / College</th>
                <th style={styles.th}>Board / University</th>
                <th style={styles.th}>Year</th>
                <th style={styles.th}>% / CGPA</th>
              </tr>
            </thead>
            <tbody>
              {education.map((e, i) => (
                <tr key={i}>
                  <td style={styles.td}>{e.standard || e.degree}</td>
                  <td style={styles.td}>{e.institution}</td>
                  <td style={styles.td}>{e.board || '-'}</td>
                  <td style={styles.td}>{e.yearOfPassing || e.date}</td>
                  <td style={styles.td}>{e.percentage || e.cgpa || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <div style={styles.sectionTitle}>Work Experience</div>
          {experience.map((e, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{e.position}</span>
                <span>{e.date}</span>
              </div>
              <div style={{ fontStyle: 'italic' }}>{e.company}</div>
              <ul style={{ margin: '4px 0', paddingLeft: 20 }}>
                 {/* Assuming description is string or array. Handling minimal case here */}
                 {Array.isArray(e.description) 
                    ? e.description.map((d, idx) => <li key={idx} style={styles.listItem}>{d}</li>)
                    : <li style={styles.listItem}>{e.description}</li>
                 }
              </ul>
            </div>
          ))}
        </section>
      )}

      {projects.length > 0 && (
        <section>
          <div style={styles.sectionTitle}>Projects</div>
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 'bold' }}>{p.title}</div>
              {p.technologies && <div style={{ fontSize: 11, fontStyle: 'italic' }}>Tech: {p.technologies}</div>}
              <div>
                {Array.isArray(p.description) 
                   ? (p.description as string[]).map((d, idx) => <span key={idx}>• {d} </span>)
                   : p.description
                }
              </div>
            </div>
          ))}
        </section>
      )}

      {skills.length > 0 && (
        <section>
            <div style={styles.sectionTitle}>Technical Skills</div>
            <div>{skills.join(', ')}</div>
        </section>
      )}

      {achievements.length > 0 && (
          <section>
              <div style={styles.sectionTitle}>Achievements</div>
              <ul style={{ margin: '5px 0', paddingLeft: 20 }}>
                  {achievements.map((a, i) => (
                      <li key={i} style={styles.listItem}>
                          <strong>{a.title}</strong>: {a.description} ({a.date})
                      </li>
                  ))}
              </ul>
          </section>
      )}

      {certifications.length > 0 && (
          <section>
              <div style={styles.sectionTitle}>Certifications</div>
              <ul style={{ margin: '5px 0', paddingLeft: 20 }}>
                  {certifications.map((c, i) => (
                      <li key={i} style={styles.listItem}>
                          {c.title} - {c.issuer} ({c.date})
                      </li>
                  ))}
              </ul>
          </section>
      )}

      <section>
        <div style={styles.sectionTitle}>Personal Profile</div>
        <div style={{ fontSize: 11 }}>
            {personal.fatherName && (
                <div style={styles.pdRow}>
                    <div style={styles.pdLabel}>Father's Name</div>
                    <div style={styles.pdValue}>: {personal.fatherName}</div>
                </div>
            )}
            {personal.dateOfBirth && (
                <div style={styles.pdRow}>
                    <div style={styles.pdLabel}>Date of Birth</div>
                    <div style={styles.pdValue}>: {personal.dateOfBirth}</div>
                </div>
            )}
            {personal.gender && (
                 <div style={styles.pdRow}>
                    <div style={styles.pdLabel}>Gender</div>
                    <div style={styles.pdValue}>: {personal.gender}</div>
                </div>
            )}
            {personal.maritalStatus && (
                 <div style={styles.pdRow}>
                    <div style={styles.pdLabel}>Marital Status</div>
                    <div style={styles.pdValue}>: {personal.maritalStatus}</div>
                </div>
            )}
            {personal.nationality && (
                 <div style={styles.pdRow}>
                    <div style={styles.pdLabel}>Nationality</div>
                    <div style={styles.pdValue}>: {personal.nationality}</div>
                </div>
            )}
            {personal.languages && personal.languages.length > 0 && (
                 <div style={styles.pdRow}>
                    <div style={styles.pdLabel}>Languages Known</div>
                    <div style={styles.pdValue}>: {personal.languages.join(', ')}</div>
                </div>
            )}
            {personal.address && (
                 <div style={styles.pdRow}>
                    <div style={styles.pdLabel}>Permanent Address</div>
                    <div style={styles.pdValue}>: {personal.address} {personal.pincode && `- ${personal.pincode}`}</div>
                </div>
            )}
        </div>
      </section>
      
      <section>
          <div style={styles.sectionTitle}>Declaration</div>
          <p style={{ textAlign: 'justify' as const, marginTop: 5 }}>
              I hereby declare that the above-mentioned information is true to the best of my knowledge and belief.
          </p>
          <div style={{ marginTop: 25, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                  <div>Date: _________________</div>
                  <div style={{ marginTop: 5 }}>Place: _________________</div>
              </div>
              <div style={{ textAlign: 'right' as const }}>
                  <div>_______________________</div>
                  <div>({personal.fullName})</div>
              </div>
          </div>
      </section>

    </div>
  );
};

export default BankPOFormatTemplate;
