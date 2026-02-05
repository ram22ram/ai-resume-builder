import { ResumeData, ResumeSection } from '../../context/ResumeContext';

interface Props {
  data: ResumeData;
}

const PremiumTech = ({ data }: Props) => {
  const get = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type)?.content;

  const personal = (get('personal') || {}) as {
    fullName?: string;
    jobTitle?: string;
  };

  const summary = (get('summary') || '') as string;
  const experience = (get('experience') || []) as {
    position: string;
    description?: string;
  }[];

  const projects = (get('projects') || []) as {
    title: string;
    description?: string;
  }[];

  const skills = (get('skills') || []) as string[];

  return (
    <div style={{ fontFamily: 'Inter, monospace', fontSize: 12 }}>
      <h1>{personal.fullName || 'Your Name'}</h1>
      <p>{personal.jobTitle || ''}</p>

      {summary && (
        <>
          <h3>Technical Summary</h3>
          <p>{summary}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <h3>Experience</h3>
          {experience.map((exp, i) => (
            <div key={i}>
              <strong>{exp.position}</strong>
              {exp.description && <p>{exp.description}</p>}
            </div>
          ))}
        </>
      )}

      {projects.length > 0 && (
        <>
          <h3>Projects</h3>
          {projects.map((p, i) => (
            <p key={i}>
              <strong>{p.title}</strong>
              {p.description && ` – ${p.description}`}
            </p>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <h3>Tech Stack</h3>
          <ul>
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PremiumTech;
