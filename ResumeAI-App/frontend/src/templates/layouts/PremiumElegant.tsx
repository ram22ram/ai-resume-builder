import { ResumeData, ResumeSection } from '../../context/ResumeContext';

interface Props {
  data: ResumeData;
}

const PremiumElegant = ({ data }: Props) => {
  const get = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type)?.content;

  const personal = (get('personal') || {}) as {
    fullName?: string;
    jobTitle?: string;
  };

  const summary = (get('summary') || '') as string;
  const experience = (get('experience') || []) as {
    position: string;
    company: string;
    description?: string;
  }[];

  const skills = (get('skills') || []) as string[];

  return (
    <div style={{ padding: 30, fontFamily: 'Georgia', fontSize: 12 }}>
      <h1 style={{ fontSize: 26, letterSpacing: 1 }}>
        {personal.fullName || 'Your Name'}
      </h1>
      <p><em>{personal.jobTitle || ''}</em></p>

      {summary && (
        <>
          <h3>Profile</h3>
          <p>{summary}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <h3>Professional Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <strong>{exp.position}</strong> – {exp.company}
              {exp.description && <p>{exp.description}</p>}
            </div>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <h3>Core Skills</h3>
          <p>{skills.join(' • ')}</p>
        </>
      )}
    </div>
  );
};

export default PremiumElegant;
