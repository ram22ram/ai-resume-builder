import { ResumeData, ResumeSection } from '../../context/ResumeContext';

interface Props {
  data: ResumeData;
}

const PremiumExecutive = ({ data }: Props) => {
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

  return (
    <div style={{ fontFamily: 'Helvetica', fontSize: 12 }}>
      <header style={{ marginBottom: 12 }}>
        <h1>{personal.fullName || 'Your Name'}</h1>
        <strong>{personal.jobTitle || ''}</strong>
      </header>

      {summary && (
        <section>
          <h3>Executive Summary</h3>
          <p>{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section>
          <h3>Leadership Experience</h3>
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <strong>{exp.position}</strong> – {exp.company}
              {exp.description && <div>{exp.description}</div>}
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default PremiumExecutive;
