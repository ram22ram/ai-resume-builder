// src/templates/templates.config.ts

export type TemplateCategory =
    | 'tech'
    | 'non-tech'
    | 'fresher'
    | 'management'
    | 'design'
    | 'finance'
    | 'general';

export type TemplateLayout =
    | 'minimal'
    | 'modern'
    | 'sidebar'
    | 'executive'
    | 'creative';

export interface ResumeTemplate {
    id: string;
    name: string;
    category: TemplateCategory;
    layout: TemplateLayout;
    isPremium: boolean;
    description: string;
    previewImage: string; // thumbnail path
    recommendedFor: string[];
}

/* ======================================================
   FREE TEMPLATES (10)
   ====================================================== */

export const FREE_TEMPLATES: ResumeTemplate[] = [
    {
        id: 'simple_clean',
        name: 'Simple Clean',
        category: 'general',
        layout: 'minimal',
        isPremium: false,
        description: 'Clean and ATS-friendly resume for all profiles.',
        previewImage: '/templates/simple_clean.png',
        recommendedFor: ['Students', 'Freshers', 'Any role'],
    },
    {
        id: 'student_basic',
        name: 'Student Basic',
        category: 'fresher',
        layout: 'modern',
        isPremium: false,
        description: 'Perfect for college students and first jobs.',
        previewImage: '/templates/student_basic.png',
        recommendedFor: ['Freshers', 'Internships'],
    },
    {
        id: 'tech_starter',
        name: 'Tech Starter',
        category: 'tech',
        layout: 'modern',
        isPremium: false,
        description: 'Entry-level tech resume with skill focus.',
        previewImage: '/templates/tech_starter.png',
        recommendedFor: ['Developers', 'IT Students'],
    },
    {
        id: 'nontech_classic',
        name: 'Classic Resume',
        category: 'non-tech',
        layout: 'minimal',
        isPremium: false,
        description: 'Traditional format for non-technical roles.',
        previewImage: '/templates/nontech_classic.png',
        recommendedFor: ['Sales', 'Admin', 'Office roles'],
    },
    {
        id: 'general_modern',
        name: 'Modern General',
        category: 'general',
        layout: 'modern',
        isPremium: false,
        description: 'Modern look with balanced sections.',
        previewImage: '/templates/general_modern.png',
        recommendedFor: ['Any professional'],
    },
    {
        id: 'basic_sidebar',
        name: 'Basic Sidebar',
        category: 'general',
        layout: 'sidebar',
        isPremium: false,
        description: 'Light sidebar layout with clear sections.',
        previewImage: '/templates/basic_sidebar.png',
        recommendedFor: ['Experienced professionals'],
    },
    {
        id: 'finance_simple',
        name: 'Finance Simple',
        category: 'finance',
        layout: 'minimal',
        isPremium: false,
        description: 'Clean resume for finance and accounting roles.',
        previewImage: '/templates/finance_simple.png',
        recommendedFor: ['Accountant', 'Finance Executive'],
    },
    {
        id: 'hr_profile',
        name: 'HR Profile',
        category: 'non-tech',
        layout: 'modern',
        isPremium: false,
        description: 'Optimized for HR and recruiter roles.',
        previewImage: '/templates/hr_profile.png',
        recommendedFor: ['HR', 'Recruiters'],
    },
    {
        id: 'teacher_basic',
        name: 'Teacher Basic',
        category: 'non-tech',
        layout: 'minimal',
        isPremium: false,
        description: 'Simple resume for teaching professionals.',
        previewImage: '/templates/teacher_basic.png',
        recommendedFor: ['Teachers', 'Professors'],
    },
    {
        id: 'operations_basic',
        name: 'Operations Basic',
        category: 'management',
        layout: 'modern',
        isPremium: false,
        description: 'Operations and coordinator focused resume.',
        previewImage: '/templates/operations_basic.png',
        recommendedFor: ['Operations', 'Coordinators'],
    },
];

/* ======================================================
   PREMIUM TEMPLATES (15)
   ====================================================== */

export const PREMIUM_TEMPLATES: ResumeTemplate[] = [
    {
        id: 'tech_pro',
        name: 'Tech Pro',
        category: 'tech',
        layout: 'sidebar',
        isPremium: true,
        description: 'Advanced tech resume with project emphasis.',
        previewImage: '/templates/tech_pro.png',
        recommendedFor: ['Senior Developers', 'Engineers'],
    },
    {
        id: 'faang_ready',
        name: 'FAANG Ready',
        category: 'tech',
        layout: 'executive',
        isPremium: true,
        description: 'Designed for top tech companies.',
        previewImage: '/templates/faang_ready.png',
        recommendedFor: ['FAANG aspirants'],
    },
    {
        id: 'exec_elite',
        name: 'Executive Elite',
        category: 'management',
        layout: 'executive',
        isPremium: true,
        description: 'Premium executive-level resume.',
        previewImage: '/templates/exec_elite.png',
        recommendedFor: ['Managers', 'Directors'],
    },
    {
        id: 'product_manager',
        name: 'Product Manager',
        category: 'management',
        layout: 'modern',
        isPremium: true,
        description: 'Metrics-driven PM resume.',
        previewImage: '/templates/product_manager.png',
        recommendedFor: ['Product Managers'],
    },
    {
        id: 'data_scientist',
        name: 'Data Scientist',
        category: 'tech',
        layout: 'sidebar',
        isPremium: true,
        description: 'Data-focused resume with research layout.',
        previewImage: '/templates/data_scientist.png',
        recommendedFor: ['Data Scientists'],
    },
    {
        id: 'uiux_designer',
        name: 'UI/UX Designer',
        category: 'design',
        layout: 'creative',
        isPremium: true,
        description: 'Creative resume for designers.',
        previewImage: '/templates/uiux_designer.png',
        recommendedFor: ['UI Designers', 'UX Designers'],
    },
    {
        id: 'marketing_growth',
        name: 'Marketing Growth',
        category: 'non-tech',
        layout: 'modern',
        isPremium: true,
        description: 'Growth and performance marketing resume.',
        previewImage: '/templates/marketing_growth.png',
        recommendedFor: ['Digital Marketers'],
    },
    {
        id: 'finance_exec',
        name: 'Finance Executive',
        category: 'finance',
        layout: 'executive',
        isPremium: true,
        description: 'Executive finance resume.',
        previewImage: '/templates/finance_exec.png',
        recommendedFor: ['CFO Track', 'Finance Heads'],
    },
    {
        id: 'consultant_pro',
        name: 'Consultant Pro',
        category: 'management',
        layout: 'executive',
        isPremium: true,
        description: 'Strategy and consulting focused resume.',
        previewImage: '/templates/consultant_pro.png',
        recommendedFor: ['Consultants'],
    },
    {
        id: 'startup_founder',
        name: 'Startup Founder',
        category: 'management',
        layout: 'creative',
        isPremium: true,
        description: 'Founder-style narrative resume.',
        previewImage: '/templates/startup_founder.png',
        recommendedFor: ['Founders', 'Entrepreneurs'],
    },
    {
        id: 'sales_closer',
        name: 'Sales Closer',
        category: 'non-tech',
        layout: 'modern',
        isPremium: true,
        description: 'Sales-focused with revenue metrics.',
        previewImage: '/templates/sales_closer.png',
        recommendedFor: ['Sales Professionals'],
    },
    {
        id: 'legal_professional',
        name: 'Legal Professional',
        category: 'non-tech',
        layout: 'minimal',
        isPremium: true,
        description: 'Formal resume for legal roles.',
        previewImage: '/templates/legal_professional.png',
        recommendedFor: ['Lawyers', 'Legal Advisors'],
    },
    {
        id: 'hr_leader',
        name: 'HR Leader',
        category: 'non-tech',
        layout: 'executive',
        isPremium: true,
        description: 'Senior HR leadership resume.',
        previewImage: '/templates/hr_leader.png',
        recommendedFor: ['HR Heads'],
    },
    {
        id: 'ai_ml_engineer',
        name: 'AI/ML Engineer',
        category: 'tech',
        layout: 'sidebar',
        isPremium: true,
        description: 'AI-centric resume with research highlights.',
        previewImage: '/templates/ai_ml_engineer.png',
        recommendedFor: ['ML Engineers'],
    },
    {
        id: 'international_cv',
        name: 'International CV',
        category: 'general',
        layout: 'executive',
        isPremium: true,
        description: 'Global CV format for overseas jobs.',
        previewImage: '/templates/international_cv.png',
        recommendedFor: ['Abroad Jobs'],
    },
];

/* ======================================================
   ALL TEMPLATES (EXPORT)
   ====================================================== */

export const ALL_TEMPLATES: ResumeTemplate[] = [
    ...FREE_TEMPLATES,
    ...PREMIUM_TEMPLATES,
];
