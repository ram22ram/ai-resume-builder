import React from 'react';
import { TemplateConfig } from '../types/resume';

// LAYOUT IMPORTS
import ClassicTemplate from './layouts/ClassicTemplate';
import CorporateTemplate from './layouts/CorporateTemplate';
import MinimalTemplate from './layouts/MinimalTemplate';
import ModernTemplate from './layouts/ModernTemplate';
import PremiumElegant from './layouts/PremiumElegant';
import PremiumExecutive from './layouts/PremiumExecutive';
import PremiumTech from './layouts/PremiumTech';
import SimpleTemplate from './layouts/SimpleTemplate';

// 1. TEMPLATE CONFIGURATION (Single Source of Truth)
export const TEMPLATES: TemplateConfig[] = [
    // --- FRESHER / STUDENT (Free) ---
    { id: 'fresher_basic', name: 'Standard Fresher', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Roboto', defaultColor: '#000000', structure: ['personal', 'education', 'skills', 'experience', 'projects'] },
    { id: 'fresher_clean', name: 'Clean Slate', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Open Sans', defaultColor: '#2563eb', structure: ['personal', 'education', 'projects', 'skills', 'summary'] },
    { id: 'fresher_minimal', name: 'Minimal Start', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Lato', defaultColor: '#475569', structure: ['personal', 'summary', 'education', 'skills', 'experience'] },
    { id: 'fresher_academic', name: 'Academic Focus', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Merriweather', defaultColor: '#0f172a', structure: ['personal', 'education', 'projects', 'skills', 'summary'] },
    { id: 'fresher_tech', name: 'Tech Intern', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Source Code Pro', defaultColor: '#059669', structure: ['personal', 'skills', 'projects', 'education', 'experience'] },
    { id: 'fresher_creative', name: 'Creative Junior', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Poppins', defaultColor: '#db2777', structure: ['personal', 'summary', 'skills', 'projects', 'education'] },
    { id: 'fresher_bold', name: 'Bold Entry', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Oswald', defaultColor: '#000000', structure: ['personal', 'education', 'experience', 'skills', 'summary'] },
    { id: 'fresher_soft', name: 'Soft Starter', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Nunito', defaultColor: '#7c3aed', structure: ['personal', 'summary', 'education', 'skills', 'experience'] },
    { id: 'fresher_elegant', name: 'Elegant Grad', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Playfair Display', defaultColor: '#9333ea', structure: ['personal', 'education', 'skills', 'projects', 'summary'] },
    { id: 'fresher_compact', name: 'Compact CV', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Roboto Condensed', defaultColor: '#1e293b', structure: ['personal', 'skills', 'education', 'projects', 'experience'] },

    // --- PROFESSIONAL (Free) ---
    { id: 'pro_classic_1', name: 'The Classic', thumbnail: 'classic', isPremium: false, category: 'professional', layout: 'single', defaultFont: 'Georgia', defaultColor: '#1e3a8a', structure: ['personal', 'summary', 'experience', 'education', 'skills'] },
    { id: 'pro_modern_1', name: 'Modern Pro', thumbnail: 'classic', isPremium: false, category: 'professional', layout: 'single', defaultFont: 'Inter', defaultColor: '#0f766e', structure: ['personal', 'experience', 'skills', 'summary', 'education'] },
    { id: 'pro_simple', name: 'Simply Business', thumbnail: 'classic', isPremium: false, category: 'professional', layout: 'single', defaultFont: 'Arial', defaultColor: '#333333', structure: ['personal', 'summary', 'experience', 'education', 'skills'] },
    { id: 'pro_executive', name: 'Executive Plain', thumbnail: 'classic', isPremium: false, category: 'professional', layout: 'single', defaultFont: 'Garamond', defaultColor: '#000000', structure: ['personal', 'experience', 'summary', 'education', 'skills'] },
    { id: 'pro_gray', name: 'Grayscale Pro', thumbnail: 'classic', isPremium: false, category: 'professional', layout: 'single', defaultFont: 'Verdana', defaultColor: '#4b5563', structure: ['personal', 'experience', 'skills', 'education', 'summary'] },

    // --- MODERN / CREATIVE (Free) ---
    { id: 'modern_teal', name: 'Teal Accent', thumbnail: 'classic', isPremium: false, category: 'modern', layout: 'single', defaultFont: 'Montserrat', defaultColor: '#0d9488', structure: ['personal', 'skills', 'experience', 'education', 'summary'] },
    { id: 'modern_ruby', name: 'Ruby Highlight', thumbnail: 'classic', isPremium: false, category: 'modern', layout: 'single', defaultFont: 'Raleway', defaultColor: '#e11d48', structure: ['personal', 'summary', 'experience', 'skills', 'education'] },
    { id: 'modern_dark', name: 'Dark Mode Print', thumbnail: 'classic', isPremium: false, category: 'modern', layout: 'single', defaultFont: 'Inter', defaultColor: '#111827', structure: ['personal', 'experience', 'projects', 'skills', 'education'] },
    { id: 'creative_orange', name: 'Orange Splash', thumbnail: 'classic', isPremium: false, category: 'creative', layout: 'single', defaultFont: 'Work Sans', defaultColor: '#ea580c', structure: ['personal', 'skills', 'summary', 'experience', 'education'] },
    { id: 'creative_violet', name: 'Violet Vibes', thumbnail: 'classic', isPremium: false, category: 'creative', layout: 'single', defaultFont: 'Quicksand', defaultColor: '#8b5cf6', structure: ['personal', 'summary', 'experience', 'education', 'skills'] },

    // --- MORE FREE ---
    { id: 'free_1', name: 'Basic Blue', thumbnail: 'classic', isPremium: false, category: 'professional', layout: 'single', defaultFont: 'Helvetica', defaultColor: '#2563eb', structure: ['personal', 'experience', 'education', 'skills', 'summary'] },
    { id: 'free_2', name: 'Simple Serif', thumbnail: 'classic', isPremium: false, category: 'professional', layout: 'single', defaultFont: 'Times New Roman', defaultColor: '#000000', structure: ['personal', 'summary', 'experience', 'education', 'skills'] },
    { id: 'free_3', name: 'Clean Sans', thumbnail: 'classic', isPremium: false, category: 'modern', layout: 'single', defaultFont: 'Open Sans', defaultColor: '#059669', structure: ['personal', 'skills', 'experience', 'summary', 'education'] },
    { id: 'free_4', name: 'Entry Level', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Arial', defaultColor: '#dc2626', structure: ['personal', 'education', 'skills', 'projects', 'summary'] },
    { id: 'free_5', name: 'Standard CV', thumbnail: 'classic', isPremium: false, category: 'professional', layout: 'single', defaultFont: 'Calibri', defaultColor: '#1e293b', structure: ['personal', 'experience', 'education', 'skills', 'summary'] },

    // ================= PREMIUM TEMPLATES =================

    // --- PROFESSIONAL (Premium) ---
    { id: 'prem_corp_1', name: 'Corporate Elite', thumbnail: 'sidebar', isPremium: true, category: 'professional', layout: 'sidebar-left', defaultFont: 'Merriweather', defaultColor: '#1e3a8a', structure: ['personal', 'summary', 'experience', 'skills', 'education'] },
    { id: 'prem_corp_2', name: 'Executive Gold', thumbnail: 'sidebar', isPremium: true, category: 'professional', layout: 'sidebar-right', defaultFont: 'Playfair Display', defaultColor: '#854d0e', structure: ['personal', 'experience', 'skills', 'education', 'summary'] },
    { id: 'prem_corp_3', name: 'Managerial', thumbnail: 'classic', isPremium: true, category: 'professional', layout: 'single', defaultFont: 'Lora', defaultColor: '#15803d', structure: ['personal', 'summary', 'experience', 'education', 'skills'] },
    { id: 'prem_corp_4', name: 'Director Suite', thumbnail: 'classic', isPremium: true, category: 'professional', layout: 'single', defaultFont: 'Bodoni Moda', defaultColor: '#0f172a', structure: ['personal', 'experience', 'summary', 'skills', 'education'] },
    { id: 'prem_corp_5', name: 'Consultant', thumbnail: 'sidebar', isPremium: true, category: 'professional', layout: 'sidebar-left', defaultFont: 'Roboto Slab', defaultColor: '#3730a3', structure: ['personal', 'skills', 'experience', 'summary', 'education'] },

    // --- MODERN (Premium) ---
    { id: 'prem_mod_1', name: 'Modern Minimal', thumbnail: 'classic', isPremium: true, category: 'modern', layout: 'single', defaultFont: 'Josefin Sans', defaultColor: '#000000', structure: ['personal', 'skills', 'experience', 'projects', 'education'] },
    { id: 'prem_mod_2', name: 'Tech Lead', thumbnail: 'sidebar', isPremium: true, category: 'modern', layout: 'sidebar-right', defaultFont: 'Share Tech Mono', defaultColor: '#0f766e', structure: ['personal', 'experience', 'skills', 'projects', 'education'] },
    { id: 'prem_mod_3', name: 'Product Owner', thumbnail: 'classic', isPremium: true, category: 'modern', layout: 'single', defaultFont: 'DM Sans', defaultColor: '#be185d', structure: ['personal', 'summary', 'experience', 'skills', 'education'] },
    { id: 'prem_mod_4', name: 'UX Designer', thumbnail: 'sidebar', isPremium: true, category: 'modern', layout: 'sidebar-left', defaultFont: 'Poppins', defaultColor: '#6366f1', structure: ['personal', 'skills', 'projects', 'experience', 'education'] },
    { id: 'prem_mod_5', name: 'DevOps Engineer', thumbnail: 'classic', isPremium: true, category: 'modern', layout: 'single', defaultFont: 'Ubuntu', defaultColor: '#b91c1c', structure: ['personal', 'skills', 'experience', 'projects', 'education'] },

    // --- CREATIVE (Premium) ---
    { id: 'prem_creat_1', name: 'Graphic Artist', thumbnail: 'modern', isPremium: true, category: 'creative', layout: 'single', defaultFont: 'Montserrat', defaultColor: '#ec4899', structure: ['personal', 'skills', 'projects', 'experience', 'education'] },
    { id: 'prem_creat_2', name: 'Marketing Pro', thumbnail: 'sidebar', isPremium: true, category: 'creative', layout: 'sidebar-left', defaultFont: 'Oswald', defaultColor: '#f97316', structure: ['personal', 'summary', 'experience', 'skills', 'education'] },
    { id: 'prem_creat_3', name: 'Art Director', thumbnail: 'classic', isPremium: true, category: 'creative', layout: 'single', defaultFont: 'Abril Fatface', defaultColor: '#4c1d95', structure: ['personal', 'projects', 'experience', 'skills', 'education'] },
    { id: 'prem_creat_4', name: 'Fashion Brand', thumbnail: 'modern', isPremium: true, category: 'creative', layout: 'single', defaultFont: 'Didot', defaultColor: '#000000', structure: ['personal', 'experience', 'skills', 'education', 'summary'] },
    { id: 'prem_creat_5', name: 'Digital Nomad', thumbnail: 'sidebar', isPremium: true, category: 'creative', layout: 'sidebar-right', defaultFont: 'Comfortaa', defaultColor: '#0d9488', structure: ['personal', 'skills', 'experience', 'projects', 'education'] },

    // --- MORE PREMIUM (Filling to 25) ---
    { id: 'prem_misc_1', name: 'Senior Dev', thumbnail: 'classic', isPremium: true, category: 'modern', layout: 'single', defaultFont: 'Fira Code', defaultColor: '#334155', structure: ['personal', 'skills', 'experience', 'projects', 'education'] },
    { id: 'prem_misc_2', name: 'Legal Counsel', thumbnail: 'classic', isPremium: true, category: 'professional', layout: 'single', defaultFont: 'Baskerville', defaultColor: '#1e3a8a', structure: ['personal', 'summary', 'experience', 'education', 'skills'] },
    { id: 'prem_misc_3', name: 'Medical Pro', thumbnail: 'classic', isPremium: true, category: 'professional', layout: 'single', defaultFont: 'Open Sans', defaultColor: '#0e7490', structure: ['personal', 'summary', 'experience', 'education', 'skills'] },
    { id: 'prem_misc_4', name: 'Academic CV', thumbnail: 'classic', isPremium: true, category: 'professional', layout: 'single', defaultFont: 'Times New Roman', defaultColor: '#000000', structure: ['personal', 'education', 'experience', 'skills', 'summary'] },
    { id: 'prem_misc_5', name: 'Startup Founder', thumbnail: 'sidebar', isPremium: true, category: 'modern', layout: 'sidebar-right', defaultFont: 'Montserrat', defaultColor: '#4f46e5', structure: ['personal', 'summary', 'experience', 'projects', 'skills'] },
    { id: 'prem_misc_6', name: 'Sales Manager', thumbnail: 'classic', isPremium: true, category: 'professional', layout: 'single', defaultFont: 'Lato', defaultColor: '#166534', structure: ['personal', 'experience', 'summary', 'skills', 'education'] },
    { id: 'prem_misc_7', name: 'Real Estate', thumbnail: 'modern', isPremium: true, category: 'professional', layout: 'single', defaultFont: 'Raleway', defaultColor: '#ca8a04', structure: ['personal', 'summary', 'experience', 'skills', 'education'] },
    { id: 'prem_misc_8', name: 'Journalist', thumbnail: 'classic', isPremium: true, category: 'creative', layout: 'single', defaultFont: 'Georgia', defaultColor: '#1f2937', structure: ['personal', 'summary', 'experience', 'projects', 'education'] },
    { id: 'prem_misc_9', name: 'Chef de Cuisine', thumbnail: 'classic', isPremium: true, category: 'creative', layout: 'single', defaultFont: 'Cormorant Garamond', defaultColor: '#9f1239', structure: ['personal', 'summary', 'experience', 'skills', 'education'] },
    { id: 'prem_misc_10', name: 'International', thumbnail: 'sidebar', isPremium: true, category: 'professional', layout: 'sidebar-left', defaultFont: 'Arial', defaultColor: '#000000', structure: ['personal', 'experience', 'education', 'skills', 'summary'] },

    // Legacy Fallbacks
    { id: 'simple_clean', name: 'Simple Clean', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Roboto', defaultColor: '#000', structure: [] },
    { id: 'modern_1', name: 'Modern Legacy', thumbnail: 'classic', isPremium: false, category: 'modern', layout: 'single', defaultFont: 'Inter', defaultColor: '#000', structure: [] },
    { id: 'student_basic', name: 'Student Legacy', thumbnail: 'classic', isPremium: false, category: 'fresher', layout: 'single', defaultFont: 'Roboto', defaultColor: '#000', structure: [] },
    { id: 'tech_starter', name: 'Tech Legacy', thumbnail: 'classic', isPremium: false, category: 'modern', layout: 'single', defaultFont: 'Inter', defaultColor: '#000', structure: [] },
    { id: 'basic_sidebar', name: 'Sidebar Legacy', thumbnail: 'sidebar', isPremium: false, category: 'professional', layout: 'sidebar-left', defaultFont: 'Roboto', defaultColor: '#000', structure: [] },
    { id: 'tech_pro', name: 'Tech Pro Legacy', thumbnail: 'classic', isPremium: true, category: 'modern', layout: 'single', defaultFont: 'Roboto', defaultColor: '#000', structure: [] },
    { id: 'exec_elite', name: 'Exec Legacy', thumbnail: 'classic', isPremium: true, category: 'professional', layout: 'single', defaultFont: 'Roboto', defaultColor: '#000', structure: [] },
    { id: 'uiux_designer', name: 'UIUX Legacy', thumbnail: 'classic', isPremium: true, category: 'creative', layout: 'single', defaultFont: 'Roboto', defaultColor: '#000', structure: [] },
    { id: 'nontech_classic', name: 'Classic Legacy', thumbnail: 'classic', isPremium: false, category: 'professional', layout: 'single', defaultFont: 'Roboto', defaultColor: '#000', structure: [] }
];

// 2. COMPONENT REGISTRY (The 1:1 Mapping)
const REGISTRY: Record<string, React.FC<any>> = {
    // FRESHER
    'fresher_basic': SimpleTemplate,
    'fresher_clean': SimpleTemplate,
    'fresher_minimal': SimpleTemplate,
    'fresher_academic': PremiumElegant,
    'fresher_tech': ModernTemplate,
    'fresher_creative': PremiumElegant,
    'fresher_bold': PremiumTech,
    'fresher_soft': PremiumElegant,
    'fresher_elegant': PremiumElegant,
    'fresher_compact': MinimalTemplate,

    // PROFESSIONAL
    'pro_classic_1': ClassicTemplate,
    'pro_modern_1': ModernTemplate,
    'pro_simple': SimpleTemplate,
    'pro_executive': PremiumExecutive,
    'pro_gray': MinimalTemplate,

    // MODERN
    'modern_teal': ModernTemplate,
    'modern_ruby': ModernTemplate,
    'modern_dark': ModernTemplate,
    'creative_orange': PremiumElegant,
    'creative_violet': ModernTemplate,

    // FREE EXTRAS
    'free_1': ClassicTemplate,
    'free_2': ClassicTemplate,
    'free_3': ModernTemplate,
    'free_4': SimpleTemplate,
    'free_5': ClassicTemplate,

    // PREMIUM CORPORATE
    'prem_corp_1': CorporateTemplate,
    'prem_corp_2': PremiumExecutive,
    'prem_corp_3': PremiumExecutive,
    'prem_corp_4': PremiumExecutive,
    'prem_corp_5': CorporateTemplate,

    // PREMIUM MODERN
    'prem_mod_1': MinimalTemplate,
    'prem_mod_2': PremiumTech,
    'prem_mod_3': ModernTemplate,
    'prem_mod_4': ModernTemplate, // Check layout? Mapping to Modern for now
    'prem_mod_5': ModernTemplate,

    // PREMIUM CREATIVE
    'prem_creat_1': PremiumElegant,
    'prem_creat_2': PremiumElegant,
    'prem_creat_3': PremiumElegant,
    'prem_creat_4': PremiumElegant,
    'prem_creat_5': PremiumElegant,

    // PREMIUM MISC
    'prem_misc_1': ModernTemplate,
    'prem_misc_2': ClassicTemplate,
    'prem_misc_3': ClassicTemplate,
    'prem_misc_4': ClassicTemplate,
    'prem_misc_5': CorporateTemplate,
    'prem_misc_6': ClassicTemplate,
    'prem_misc_7': ModernTemplate,
    'prem_misc_8': ClassicTemplate,
    'prem_misc_9': PremiumElegant,
    'prem_misc_10': CorporateTemplate,

    // LEGACY MAPPING
    'simple_clean': SimpleTemplate,
    'modern_1': ModernTemplate,
    'student_basic': MinimalTemplate,
    'tech_starter': ModernTemplate,
    'basic_sidebar': CorporateTemplate,
    'tech_pro': PremiumTech,
    'exec_elite': PremiumExecutive,
    'uiux_designer': PremiumElegant,
    'nontech_classic': ClassicTemplate
};

// 3. GETTERS
export const getTemplateComponent = (id: string): React.FC<any> => {
    const Component = REGISTRY[id];
    if (!Component) {
        throw new Error(`CRITICAL: Template ID "${id}" is missing in TemplateRegistry. No fallback allowed.`);
    }
    return Component;
};

export const getTemplateConfig = (id: string) => {
    return TEMPLATES.find(t => t.id === id);
};
