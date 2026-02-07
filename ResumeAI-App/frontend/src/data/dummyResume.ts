import { ResumeData } from '../types/resume';

export const DUMMY_RESUME: ResumeData = {
  id: 'dummy',
  templateId: 'classic',
  isPremium: false,
  metadata: {
    fontFamily: 'Roboto',
    accentColor: '#000000',
    lineHeight: 1.5,
    jobTitle: 'Software Engineer'
  },
  sections: [
    {
      id: 'personal',
      type: 'personal',
      title: 'Personal Details',
      isVisible: true,
      items: [{
        id: '1',
        firstName: 'Alex',
        lastName: 'Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        city: 'San Francisco',
        country: 'CA',
        title: 'Senior Product Designer'
      }]
    },
    {
      id: 'summary',
      type: 'summary',
      title: 'Summary',
      isVisible: true,
      items: [{
        id: '1',
        description: 'Creative and detail-oriented Product Designer with 5+ years of experience building user-centric digital products. Proven track record of improving user engagement and streamlining complex workflows.'
      }]
    },
    {
      id: 'experience',
      type: 'experience',
      title: 'Experience',
      isVisible: true,
      items: [
        {
          id: 'exp1',
          title: 'Senior UX Designer',
          subtitle: 'TechFlow Inc.',
          date: '2021 - Present',
          description: 'Led the redesign of the core mobile app, resulting in a 25% increase in user retention. Mentored junior designers and established a comprehensive design system.',
          location: 'San Francisco, CA'
        },
        {
          id: 'exp2',
          title: 'Product Designer',
          subtitle: 'Creative Solutions',
          date: '2018 - 2021',
          description: 'Collaborated with cross-functional teams to launch 3 successful SaaS products. Conducted user research and usability testing to inform design decisions.',
          location: 'Austin, TX'
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
          title: 'BFA in Interaction Design',
          subtitle: 'California College of the Arts',
          date: '2014 - 2018',
          description: 'Graduated with Honors. specialized in Human-Computer Interaction.'
        }
      ]
    },
    {
      id: 'skills',
      type: 'skills',
      title: 'Skills',
      isVisible: true,
      items: [
        { id: 's1', title: 'Figma', subtitle: 'Expert' },
        { id: 's2', title: 'Prototyping', subtitle: 'Expert' },
        { id: 's3', title: 'HTML/CSS', subtitle: 'Intermediate' },
        { id: 's4', title: 'User Research', subtitle: 'Advanced' }
      ]
    }
  ]
};
