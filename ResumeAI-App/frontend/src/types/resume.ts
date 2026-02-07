export type SectionType =
    | 'personal'
    | 'summary'
    | 'experience'
    | 'education'
    | 'skills'
    | 'projects'
    | 'certifications'
    | 'awards'
    | 'custom';

export interface SectionItem {
    id: string;
    title?: string;
    subtitle?: string; // Company / School
    date?: string;
    description?: string; // Bullet points or text
    [key: string]: any;
}

export interface ResumeSection {
    id: string;
    type: SectionType;
    title: string; // Display Title (e.g. "Work Experience")
    isVisible: boolean;
    items: SectionItem[]; // For lists like Exp/Edu. Personal/Summary use first item or special fields.
    columns?: number; // For skills (1, 2, 3)
}

export interface ResumeData {
    id: string;
    templateId: string;
    isPremium: boolean;

    // Core Data
    sections: ResumeSection[];

    // Global Styles overrides
    metadata: {
        fontFamily: string;
        accentColor: string;
        lineHeight: number;
        jobTitle: string; // For auto-suggestions
    };
}

export interface TemplateConfig {
    id: string;
    name: string;
    thumbnail: string; // Path or Component
    isPremium: boolean;
    category: 'fresher' | 'professional' | 'modern' | 'creative';

    // Visuals
    layout: 'single' | 'sidebar-left' | 'sidebar-right' | 'double';
    defaultFont: string;
    defaultColor: string;
    structure: SectionType[]; // Default order
    previewConfig?: {
        fontFamily: string;
        accentColor: string;
        headlineWeight: number;
        sidebarSide?: 'left' | 'right';
    };
}
