import { ResumeData, ResumeSection } from '../../context/ResumeContext';

interface Props {
  data: ResumeData;
}

const SimpleTemplate = ({ data }: Props) => {
  const get = (type: ResumeSection['type']) =>
    data.sections.find((s: ResumeSection) => s.type === type)?.content;

  const personal = (get('personal') || {}) as {
    fullName?: string;
    email?: string;
    phone?: string;
  };

  const summary = (get('summary') || '') as string;
  const experience = (get('experience') || []) as {
    position: string;
    company: string;
  }[];

  const skills = (get('skills') || []) as string[];

  return (
    <div style={{ fontFamily: 'Times New Roman', fontSize: 12 }}>
      <h2>{personal.fullName || 'Your Name'}</h2>
      <p>
        {personal.email || ''}
        {personal.phone ? ` | ${personal.phone}` : ''}
      </p>

      {summary && (
        <>
          <h3>Summary</h3>
          <p>{summary}</p>
        </>
      )}

      {experience.length > 0 && (
        <>
          <h3>Experience</h3>
          {experience.map((exp, i) => (
            <p key={i}>
              <strong>{exp.position}</strong> – {exp.company}
            </p>
          ))}
        </>
      )}

      {skills.length > 0 && (
        <>
          <h3>Skills</h3>
          <ul>
            {skills.map((skill: string, i: number) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default SimpleTemplate;
