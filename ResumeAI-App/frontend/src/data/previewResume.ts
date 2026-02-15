import { ResumeData } from '../types/resume';

export const PREVIEW_RESUME: ResumeData = {
    id: 'preview_v1',
    templateId: 'modern_1',
    isPremium: false,
    metadata: {
        fontFamily: 'Inter',
        accentColor: '#2563EB',
        lineHeight: 1.5,
        jobTitle: 'Senior Software Engineer'
    },
    sections: [
        {
            id: 'personal',
            type: 'personal',
            title: 'Personal Details',
            isVisible: true,
            items: [
                {
                    id: 'p1',
                    firstName: 'Alex',
                    lastName: 'Morgan',
                    fullName: 'Alex Morgan',
                    jobTitle: 'Senior Software Engineer',
                    email: 'alex.morgan@example.com',
                    phone: '+1 (555) 012-3456',
                    city: 'San Francisco',
                    country: 'CA',
                    linkedin: 'linkedin.com/in/alexmorgan'
                }
            ]
        },
        {
            id: 'summary',
            type: 'summary',
            title: 'Professional Summary',
            isVisible: true,
            items: [
                {
                    id: 'sum1',
                    description: 'Innovative Senior Software Engineer with 6+ years of experience in full-stack development. specialized in building scalable web applications and optimizing system performance. Proven track record of leading cross-functional teams and delivering high-impact projects on time.'
                }
            ]
        },
        {
            id: 'experience',
            type: 'experience',
            title: 'Experience',
            isVisible: true,
            items: [
                {
                    id: 'exp1',
                    position: 'Senior Frontend Engineer',
                    company: 'TechFlow Solutions',
                    location: 'San Francisco, CA',
                    date: '2021 - Present',
                    description: [
                        'Architected and implemented a new component library, reducing development time by 40%.',
                        'Led the migration of a legacy monolith to a micro-frontend architecture, improving scalability.',
                        'Mentored 5 junior developers, conducting code reviews and facilitating technical workshops.',
                        'Optimized application performance, achieving a 98/100 Lighthouse score.'
                    ]
                },
                {
                    id: 'exp2',
                    position: 'Software Developer',
                    company: 'Creative Digital Agency',
                    location: 'Austin, TX',
                    date: '2018 - 2021',
                    description: [
                        'Developed responsive e-commerce websites for high-profile clients using React and Node.js.',
                        'Collaborated with designers to implement pixel-perfect UIs with complex animations.',
                        'Integrated third-party payment gateways and reduced transaction latency by 15%.'
                    ]
                }
            ]
        },
        {
            id: 'education',
            type: 'education',
            title: 'Education',
            isVisible: true,
            items: [
                {
                    id: 'edu1',
                    degree: 'Master of Science in Computer Science',
                    institution: 'Stanford University',
                    date: '2016 - 2018',
                    description: 'specialized in Human-Computer Interaction and Artificial Intelligence.'
                },
                {
                    id: 'edu2',
                    degree: 'Bachelor of Science in Software Engineering',
                    institution: 'University of Texas at Austin',
                    date: '2012 - 2016',
                    description: 'Graduated Magna Cum Laude.'
                }
            ]
        },
        {
            id: 'skills',
            type: 'skills',
            title: 'Skills',
            isVisible: true,
            columns: 3,
            items: [
                { id: 's1', name: 'React.js', level: 'Expert' },
                { id: 's2', name: 'TypeScript', level: 'Expert' },
                { id: 's3', name: 'Node.js', level: 'Advanced' },
                { id: 's4', name: 'GraphQL', level: 'Advanced' },
                { id: 's5', name: 'AWS', level: 'Intermediate' },
                { id: 's6', name: 'Docker', level: 'Intermediate' },
                { id: 's7', name: 'UI/UX Design', level: 'Advanced' },
                { id: 's8', name: 'Agile/Scrum', level: 'Expert' }
            ]
        },
        {
            id: 'projects',
            type: 'projects',
            title: 'Projects',
            isVisible: true,
            items: [
                {
                    id: 'proj1',
                    title: 'E-Commerce Analytics Dashboard',
                    link: 'github.com/alexmorgan/analytics',
                    description: [
                        'Built a real-time analytics dashboard processing over 1M events per day.',
                        'Utilized D3.js for complex data visualization and reporting.'
                    ]
                },
                {
                    id: 'proj2',
                    title: 'Task Management App',
                    link: 'taskmaster.io',
                    description: [
                        'Launched a productivity app with 10k+ active monthly users.',
                        'Implemented offline support and real-time synchronization using Firebase.'
                    ]
                }
            ]
        }
    ]
};
