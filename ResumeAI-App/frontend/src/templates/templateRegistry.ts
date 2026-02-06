import { TemplateCategory, TemplateLayout } from './templates.config';

export interface TemplateConfig {
    id: string;
    name: string;
    layout: TemplateLayout;
    category: TemplateCategory;
    isPremium: boolean;
    previewConfig: {
        fontFamily: string;
        accentColor: string;
        headlineWeight: number;
        sidebarSide?: 'left' | 'right';
    };
}

export const TEMPLATE_REGISTRY: Record<string, TemplateConfig> = {
    // --- FRESHER / SIMPLE ---
    simple_clean: {
        id: 'simple_clean',
        name: 'Simple Clean',
        layout: 'simple',
        category: 'fresher',
        isPremium: false,
        previewConfig: {
            fontFamily: '"Times New Roman", Serif',
            accentColor: '#000000',
            headlineWeight: 700,
        }
    },
    student_basic: {
        id: 'student_basic',
        name: 'Dense Fresher',
        layout: 'simple',
        category: 'fresher',
        isPremium: false,
        previewConfig: {
            fontFamily: 'Arial, sans-serif',
            accentColor: '#333333',
            headlineWeight: 600,
        }
    },

    // --- TECH / MODERN ---
    tech_starter: {
        id: 'tech_starter',
        name: 'Tech Starter',
        layout: 'modern',
        category: 'tech',
        isPremium: false,
        previewConfig: {
            fontFamily: '"Inter", sans-serif',
            accentColor: '#2563eb', // Blue
            headlineWeight: 700,
        }
    },
    tech_pro: {
        id: 'tech_pro',
        name: 'DevOps Terminal',
        layout: 'code', // Special Layout
        category: 'tech',
        isPremium: true,
        previewConfig: {
            fontFamily: '"Fira Code", monospace',
            accentColor: '#10b981', // Green
            headlineWeight: 500,
        }
    },

    // --- PROFESSIONAL / CORPORATE ---
    nontech_classic: {
        id: 'nontech_classic',
        name: 'Classic Professional',
        layout: 'simple',
        category: 'professional',
        isPremium: false,
        previewConfig: {
            fontFamily: '"Georgia", serif',
            accentColor: '#1e3a8a', // Navy
            headlineWeight: 700,
        }
    },
    basic_sidebar: {
        id: 'basic_sidebar',
        name: 'Corporate Sidebar',
        layout: 'sidebar',
        category: 'professional',
        isPremium: false,
        previewConfig: {
            fontFamily: 'Arial, sans-serif',
            accentColor: '#3b82f6',
            headlineWeight: 700,
            sidebarSide: 'left',
        }
    },
    exec_elite: {
        id: 'exec_elite',
        name: 'Executive Elite',
        layout: 'executive',
        category: 'professional',
        isPremium: true,
        previewConfig: {
            fontFamily: '"Merriweather", serif',
            accentColor: '#0f172a', // Dark Slate
            headlineWeight: 800,
        }
    },

    // --- CREATIVE ---
    uiux_designer: {
        id: 'uiux_designer',
        name: 'Creative Timeline',
        layout: 'modern',
        category: 'creative',
        isPremium: true,
        previewConfig: {
            fontFamily: '"Poppins", sans-serif',
            accentColor: '#ec4899', // Pink
            headlineWeight: 700,
        }
    }
};
