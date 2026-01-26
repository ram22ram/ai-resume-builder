// src/data/dummyResume.ts

export const DUMMY_RESUME_DATA = {
  sections: [
    // ===================== PERSONAL =====================
    {
      type: 'personal',
      content: {
        fullName: 'John Smith',
        jobTitle: 'Senior Full Stack Engineer | M.Tech (CS)',
        email: 'john.smith@resume-ai.co.in',
        phone: '+91 70000 12345',
        address: 'New York, USA',
        linkedin: 'linkedin.com/in/john-smith-ai',
        portfolio: 'resume-ai.co.in',
        photo: null
      }
    },

    // ===================== SUMMARY =====================
    {
      type: 'summary',
      content:
        'Visionary Full Stack Developer with an M.Tech in Computer Science and 5+ years of experience building high-performance SaaS platforms. Specialized in React, Node.js, and Generative AI integrations. Passionate about creating ATS-optimized career tools and scalable systems.'
    },

    // ===================== EXPERIENCE =====================
    {
      type: 'experience',
      content: [
        {
          id: 1,
          title: 'Lead Product Engineer',
          company: 'ResumeAI Systems',
          location: 'Remote / Jabalpur',
          startDate: '2022-06-01',
          endDate: '',
          isPresent: true,
          description:
            'Engineered an AI-powered resume parsing engine with 95% accuracy. Optimized frontend performance by 40% using React memoization and code-splitting. Scaled the platform to 10k+ active users.'
        },
        {
          id: 2,
          title: 'Senior Software Developer',
          company: 'FinTech Innovations',
          location: 'Bangalore, India',
          startDate: '2019-05-01',
          endDate: '2022-05-15',
          isPresent: false,
          description:
            'Built real-time banking dashboards using micro-frontend architecture. Implemented CI/CD pipelines reducing deployment time by 50%. Mentored junior developers.'
        }
      ]
    },

    // ===================== EDUCATION =====================
    {
      type: 'education',
      content: [
        {
          id: 1,
          school: 'Indian Institute of Technology (IIT)',
          degree: 'M.Tech in Computer Science & Engineering',
          location: 'Mumbai, India',
          startDate: '2017-07-01',
          endDate: '2019-05-01',
          grade: '9.8 CGPA / Gold Medalist'
        },
        {
          id: 2,
          school: 'Government Engineering College',
          degree: 'B.Tech in Information Technology',
          location: 'Jabalpur, MP',
          startDate: '2013-08-01',
          endDate: '2017-06-01',
          grade: '8.5 CGPA'
        }
      ]
    },

    // ===================== PROJECTS =====================
    {
      type: 'projects',
      content: [
        {
          id: 1,
          title: 'AI Interview Simulator',
          description:
            'Voice-based AI interview coach providing real-time feedback on confidence, tone, and content.',
          techStack: 'React, Web Speech API, Express, OpenAI'
        },
        {
          id: 2,
          title: 'GitHub to Impact CV',
          description:
            'Automated tool that converts GitHub repositories into professional resume bullet points.',
          techStack: 'GitHub API, NLP, React'
        }
      ]
    },

    // ===================== SKILLS =====================
    {
      type: 'skills',
      content: [
        'React.js',
        'Next.js',
        'TypeScript',
        'Node.js',
        'Python',
        'OpenAI API',
        'AWS (EC2, S3)',
        'Docker',
        'PostgreSQL',
        'Redis',
        'System Design'
      ]
    }
  ]
};
