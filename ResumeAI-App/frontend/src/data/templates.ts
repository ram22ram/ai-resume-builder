import { TemplateConfig } from '../types/resume';

export const TEMPLATES: TemplateConfig[] = [
    // --- FRESHER / STUDENT ---
    {
        id: 'fresher_basic',
        name: 'Fresher Basic',
        thumbnail: 'classic',
        isPremium: false,
        category: 'fresher',
        layout: 'single',
        defaultFont: 'Roboto',
        defaultColor: '#000000',
        structure: ['personal', 'education', 'skills', 'experience', 'projects']
    },
    {
        id: 'fresher_modern',
        name: 'Smart Intern',
        thumbnail: 'modern',
        isPremium: false,
        category: 'fresher',
        layout: 'single',
        defaultFont: 'Inter',
        defaultColor: '#3b82f6',
        structure: ['personal', 'education', 'skills', 'projects', 'summary']
    },

    // --- PROFESSIONAL ---
    {
        id: 'pro_classic',
        name: 'The Professional',
        thumbnail: 'classic',
        isPremium: false,
        category: 'professional',
        layout: 'single',
        defaultFont: 'Georgia',
        defaultColor: '#1e3a8a',
        structure: ['personal', 'summary', 'experience', 'education', 'skills']
    },
    {
        id: 'pro_sidebar',
        name: 'Corporate Sidebar',
        thumbnail: 'sidebar',
        isPremium: true,
        category: 'professional',
        layout: 'sidebar-left',
        defaultFont: 'Merriweather',
        defaultColor: '#334155',
        structure: ['personal', 'summary', 'experience', 'skills', 'education']
    },

    // --- TECH ---
    {
        id: 'tech_minimal',
        name: 'Minimal Dev',
        thumbnail: 'classic',
        isPremium: false,
        category: 'modern',
        layout: 'single',
        defaultFont: 'Inter',
        defaultColor: '#10b981',
        structure: ['personal', 'skills', 'experience', 'projects', 'education']
    },
    {
        id: 'tech_bold',
        name: 'Full Stack Bold',
        thumbnail: 'modern',
        isPremium: true,
        category: 'modern',
        layout: 'sidebar-right',
        defaultFont: 'Space Grotesk',
        defaultColor: '#000000',
        structure: ['personal', 'experience', 'projects', 'skills', 'education']
    }

    // Note: We can expand this list to 50 items by permuting colors/fonts/layouts
];

export const getTemplate = (id: string) => TEMPLATES.find(t => t.id === id) || TEMPLATES[0];
