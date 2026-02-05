import { ResumeData, ResumeSection } from '../../context/ResumeContext';

interface Props {
  data: ResumeData;
}

const MinimalTemplate = ({ data }: Props) => {
  const get = (type: ResumeSection['type']) =>
    data.sections.find((s: ResumeSection) => s.type === type)?.content;

  const personal = (get('personal') || {}) as any;
  const summary = (get('summary') || '') as string;
  const experience = (get('experience') || []) as any[];
  const skills = (get('skills') || []) as string[];

  return (
    <div>
      <h1>{personal.fullName || 'Your Name'}</h1>
      <p>{personal.email}</p>

      {summary && <p>{summary}</p>}

      {experience.map((exp, i) => (
        <div key={i}>
          <strong>{exp.position}</strong>
        </div>
      ))}

      {skills.length > 0 && <p>{skills.join(' • ')}</p>}
    </div>
  );
};

export default MinimalTemplate;
