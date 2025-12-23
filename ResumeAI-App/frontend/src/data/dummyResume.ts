export const DUMMY_RESUME_DATA = {
  personalInfo: {
    fullName: 'Ramendra Singh',
    jobTitle: 'Senior Full Stack Engineer | M.Tech (CS)',
    email: 'ramendra.singh@resume-ai.co.in',
    phone: '+91 70000 12345',
    address: 'Jabalpur, Madhya Pradesh',
    linkedin: 'linkedin.com/in/ramendra-ai',
    portfolio: 'resume-ai.co.in',
    photo: null
  },
  summary: 'Visionary Full Stack Developer with an M.Tech in Computer Science and 5+ years of expertise in architecting high-performance SaaS platforms. Specializing in React, Node.js, and Generative AI integration. Passionate about automating career workflows and building ATS-optimized systems that bridge the gap between talent and top-tier recruiters.',
  experience: [
    {
      id: 1,
      title: 'Lead Product Engineer',
      company: 'ResumeAI Systems',
      location: 'Remote / Jabalpur',
      startDate: '2022-06-01',
      endDate: '',
      isPresent: true,
      description: '• Engineered an AI-driven resume parsing engine using OpenAI GPT-4, achieving a 95% accuracy rate in skill extraction.\n• Optimized frontend performance by 40% using React code-splitting and memoization techniques.\n• Scaled the platform to support 10k+ active users with a 92% successful hiring rate at FAANG companies.\n• Integrated secure payment gateways (Razorpay/Stripe) for premium feature monetization.'
    },
    {
      id: 2,
      title: 'Senior Software Developer',
      company: 'FinTech Innovations',
      location: 'Bangalore, KA',
      startDate: '2019-05-01',
      endDate: '2022-05-15',
      isPresent: false,
      description: '• Developed a real-time banking dashboard using Micro-frontend architecture and Redux Toolkit.\n• Implemented automated CI/CD pipelines, reducing deployment time by 50%.\n• Mentored a team of 15+ junior developers and conducted 100+ technical interviews.'
    }
  ],
  education: [
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
  ],
  projects: [
    { 
      id: 1, 
      title: 'AI Interview Simulator', 
      link: 'https://resume-ai.co.in/interview', 
      description: 'A voice-interactive AI coach that simulates real-world interview scenarios with real-time feedback on confidence and sentiment.', 
      techStack: 'React, Web Speech API, Express, OpenAI' 
    },
    { 
      id: 2, 
      title: 'GitHub to Impact CV', 
      link: 'https://resume-ai.co.in/github', 
      description: 'Automated tool that parses public GitHub repositories into professional impact statements for software engineering resumes.', 
      techStack: 'GitHub API, NLP, React' 
    }
  ],
  skills: [
    'React.js', 'Next.js', 'TypeScript', 'Node.js', 
    'Python', 'OpenAI API', 'AWS (EC2, S3)', 'Docker', 
    'PostgreSQL', 'System Design', 'Redis', 'Tailwind CSS'
  ],
  hobbies: 'Technical Blogging, Open Source Contribution, Chess, AI Research'
};