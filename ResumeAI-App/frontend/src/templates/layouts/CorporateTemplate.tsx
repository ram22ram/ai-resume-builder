import { ResumeData, ResumeSection } from '../../context/ResumeContext';

interface Props {
  data: ResumeData;
}

const CorporateTemplate = ({ data }: Props) => {
  const get = (type: ResumeSection['type']) =>
    data.sections.find((s: ResumeSection) => s.type === type)?.content;

  const personal = (get('personal') || {}) as {
    fullName?: string;
    email?: string;
    phone?: string;
    jobTitle?: string;
  };

  const summary = (get('summary') || '') as string;
  const experience = (get('experience') || []) as {
    position: string;
    company: string;
  }[];

  const education = (get('education') || []) as {
    degree: string;
    institution: string;
  }[];

  const skills = (get('skills') || []) as string[];

  return (
    <div style={{ fontFamily: 'Arial', fontSize: 12 }}>
      <h1>{personal.fullName || 'Your Name'}</h1>
      <strong>{personal.jobTitle || ''}</strong>
      <p>
        {personal.email || ''} | {personal.phone || ''}
      </p>

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

export default CorporateTemplate;
