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
                    linkedin: 'linkedin.com/in/alexmorgan',
                    github: 'github.com/alexmorgan',
                    portfolio: 'alexmorgan.dev',

                    // Indian Standard Fields
                    fatherName: 'Robert Morgan',
                    dateOfBirth: '1994-08-15',
                    nationality: 'American',
                    maritalStatus: 'Single',
                    gender: 'Male',
                    languages: ['English', 'Spanish', 'French'],
                    address: '123 Tech Park, Innovation Way, Silicon Valley, CA - 94025',
                    pincode: '94025'
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
                    description: 'Specialized in Human-Computer Interaction and Artificial Intelligence.',
                    cgpa: '3.8/4.0',
                    yearOfPassing: '2018',
                    standard: 'PG'
                },
                {
                    id: 'edu2',
                    degree: 'Bachelor of Science in Software Engineering',
                    institution: 'University of Texas at Austin',
                    date: '2012 - 2016',
                    description: 'Graduated Magna Cum Laude.',
                    cgpa: '3.9/4.0',
                    yearOfPassing: '2016',
                    standard: 'UG'
                },
                {
                    id: 'edu3',
                    degree: 'Class XII (Senior Secondary)',
                    institution: 'Austin High School',
                    schoolName: 'Austin High School',
                    board: 'State Board',
                    date: '2012',
                    percentage: '92%',
                    yearOfPassing: '2012',
                    standard: '12th'
                },
                {
                    id: 'edu4',
                    degree: 'Class X (Secondary)',
                    institution: 'Austin High School',
                    schoolName: 'Austin High School',
                    board: 'State Board',
                    date: '2010',
                    percentage: '94%',
                    yearOfPassing: '2010',
                    standard: '10th'
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
                    githubLink: 'github.com/alexmorgan/analytics',
                    liveLink: 'analytics-dashboard.demo',
                    startDate: 'Jan 2020',
                    endDate: 'Jun 2020',
                    description: [
                        'Built a real-time analytics dashboard processing over 1M events per day.',
                        'Utilized D3.js for complex data visualization and reporting.'
                    ]
                },
                {
                    id: 'proj2',
                    title: 'Task Management App',
                    link: 'taskmaster.io',
                    githubLink: 'github.com/alexmorgan/taskmaster',
                    liveLink: 'taskmaster.io',
                    startDate: 'Jul 2019',
                    endDate: 'Dec 2019',
                    description: [
                        'Launched a productivity app with 10k+ active monthly users.',
                        'Implemented offline support and real-time synchronization using Firebase.'
                    ]
                }
            ]
        },
        {
            id: 'certifications',
            type: 'certifications',
            title: 'Certifications',
            isVisible: true,
            items: [
                {
                    id: 'cert1',
                    title: 'AWS Certified Solutions Architect',
                    issuer: 'Amazon Web Services',
                    date: '2021',
                    credentialId: 'AWS-123456'
                },
                {
                    id: 'cert2',
                    title: 'Google Professional Cloud Architect',
                    issuer: 'Google Cloud',
                    date: '2020'
                }
            ]
        },
        {
            id: 'achievements',
            type: 'achievements',
            title: 'Achievements',
            isVisible: true,
            items: [
                {
                    id: 'ach1',
                    title: 'Hackathon Winner',
                    description: 'Won 1st place in the Global AI Hackathon 2021 out of 500+ teams.',
                    date: '2021'
                },
                {
                    id: 'ach2',
                    title: 'Open Source Contributor',
                    description: 'Core contributor to major React UI libraries with over 1k stars on GitHub.',
                    date: '2019 - Present'
                }
            ]
        }
    ]
};
