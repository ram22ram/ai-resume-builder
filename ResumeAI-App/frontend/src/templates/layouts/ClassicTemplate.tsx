import { ResumeData, ResumeSection } from '../../context/ResumeContext';

interface Props {
  data: ResumeData;
}

const ClassicTemplate = ({ data }: Props) => {
  const get = (type: ResumeSection['type']) =>
    data.sections.find((s) => s.type === type)?.content;

  const personal = (get('personal') || {}) as {
    fullName?: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
    address?: string;
  };

  const summary = (get('summary') || '') as string;
  const experience = (get('experience') || []) as any[];
  const education = (get('education') || []) as any[];
  const skills = (get('skills') || []) as string[];

  return (
    <div>
      <header style={{ textAlign: 'center', marginBottom: 16 }}>
        <h1>{personal.fullName || 'Your Name'}</h1>
        <p>{personal.jobTitle}</p>
        <p>
          {personal.email} | {personal.phone} | {personal.address}
        </p>
      </header>

      {summary && <p>{summary}</p>}

      {experience.map((exp, i) => (
        <div key={i}>
          <strong>{exp.position}</strong> – {exp.company}
        </div>
      ))}

      {education.map((edu, i) => (
        <div key={i}>
          {edu.degree} – {edu.institution}
        </div>
      ))}

      {skills.length > 0 && <p>{skills.join(', ')}</p>}
    </div>
  );
};

export default ClassicTemplate;
