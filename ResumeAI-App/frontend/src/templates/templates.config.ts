// src/templates/templates.config.ts

export type TemplateCategory =
    | 'fresher'   // Students, Interns
    | 'tech'      // Developers
    | 'professional' // Management, HR, Finance
    | 'creative'; // Designers, Marketing

export type TemplateLayout =
    | 'simple'    // Single column, standard
    | 'modern'    // Accent colors, clean
    | 'sidebar'   // Two column
    | 'executive' // Serif, formal
    | 'code';     // For Premium Tech

export interface ResumeTemplate {
    id: string;
    name: string;
    category: TemplateCategory;
    layout: TemplateLayout;
    isPremium: boolean;
    description: string;
    recommendedFor: string[];
}

/* ======================================================
   FREE TEMPLATES (Solid foundation for Students)
   ====================================================== */

export const FREE_TEMPLATES: ResumeTemplate[] = [
    {
        id: 'simple_clean',
        name: 'Simple Clean',
        category: 'fresher',
        layout: 'simple',
        isPremium: false,
        description: 'Standard academic format. Best for ATS parsing.',
        recommendedFor: ['College Students', 'Off-Campus Drives'],
    },
    {
        id: 'student_basic',
        name: 'Dense Fresher',
        category: 'fresher',
        layout: 'simple',
        isPremium: false,
        description: 'Fitting more content on one page. Good for high achievers.',
        recommendedFor: ['Final Year Students', 'High CGPA'],
    },
    {
        id: 'tech_starter',
        name: 'Tech Starter',
        category: 'tech',
        layout: 'modern',
        isPremium: false,
        description: 'Clean modern look highlighting skills.',
        recommendedFor: ['Junior Developers', 'BCA/MCA'],
    },
    {
        id: 'nontech_classic',
        name: 'Classic Professional',
        category: 'professional',
        layout: 'simple',
        isPremium: false,
        description: 'Traditional Times New Roman format.',
        recommendedFor: ['Govt Jobs', 'Bank PO', 'Admin'],
    },
    {
        id: 'basic_sidebar',
        name: 'Corporate Sidebar',
        category: 'professional',
        layout: 'sidebar',
        isPremium: false,
        description: 'Professional two-column layout.',
        recommendedFor: ['MBA Freshers', 'Analysts'],
    },
];

/* ======================================================
   PREMIUM TEMPLATES (High Impact)
   ====================================================== */

export const PREMIUM_TEMPLATES: ResumeTemplate[] = [
    {
        id: 'tech_pro',
        name: 'DevOps Terminal',
        category: 'tech',
        layout: 'code',
        isPremium: true,
        description: 'Dark-themed, code-style resume for serious devs.',
        recommendedFor: ['Backend Devs', 'Full Stack', 'Geeks'],
    },
    {
        id: 'exec_elite',
        name: 'Executive Elite',
        category: 'professional',
        layout: 'executive',
        isPremium: true,
        description: 'High-authority serif design for leadership roles.',
        recommendedFor: ['Management', 'Senior Roles'],
    },
    {
        id: 'uiux_designer',
        name: 'Creative Timeline',
        category: 'creative',
        layout: 'modern',
        isPremium: true,
        description: 'Visual timeline layout for creative professionals.',
        recommendedFor: ['Designers', 'Architects'],
    },
];

/* ======================================================
   ALL TEMPLATES (EXPORT)
   ====================================================== */

export const ALL_TEMPLATES: ResumeTemplate[] = [
    ...FREE_TEMPLATES,
    ...PREMIUM_TEMPLATES,
];

