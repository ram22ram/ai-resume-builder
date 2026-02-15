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

// ----------------------------------------------------------------------
// Strict Item Interfaces
// ----------------------------------------------------------------------

export interface PersonalItem {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    city?: string; // Optional
    country?: string; // Optional
    linkedin?: string; // Optional
    github?: string; // Optional
    photo?: string; // Optional (if needed in future)
    objective?: string; // Optional
}

export interface SummaryItem {
    id: string;
    description: string; // The summary text
}

export interface ExperienceItem {
    id: string;
    position: string;
    company: string;
    location?: string;
    date: string; // "Jan 2020 - Present"
    description: string[]; // Bullet points
}

export interface EducationItem {
    id: string;
    degree: string;
    institution: string;
    date: string;
    description?: string; // Optional additional info
}

export interface SkillItem {
    id: string;
    name: string;
    level?: string; // "Expert", "Beginner", etc.
}

export interface ProjectItem {
    id: string;
    title: string;
    link?: string;
    technologies?: string; // Optional
    description: string[]; // Bullet points
}

export interface CertificationItem {
    id: string;
    title: string;
    issuer: string;
    date: string;
    url?: string; // Optional
}

export interface AwardItem {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description?: string;
}

// ----------------------------------------------------------------------
// Standard Section Interface
// ----------------------------------------------------------------------

// Generic wrapper to keep the `items` array typed correctly
export interface BaseSection {
    id: string;
    title: string;
    isVisible: boolean;
    columns?: number; // Mostly for skills
}

export interface PersonalSection extends BaseSection {
    type: 'personal';
    items: PersonalItem[];
}

export interface SummarySection extends BaseSection {
    type: 'summary';
    items: SummaryItem[];
}

export interface ExperienceSection extends BaseSection {
    type: 'experience';
    items: ExperienceItem[];
}

export interface EducationSection extends BaseSection {
    type: 'education';
    items: EducationItem[];
}

export interface SkillsSection extends BaseSection {
    type: 'skills';
    items: SkillItem[];
}

export interface ProjectsSection extends BaseSection {
    type: 'projects';
    items: ProjectItem[];
}

export interface CertificationsSection extends BaseSection {
    type: 'certifications';
    items: CertificationItem[];
}

export interface AwardsSection extends BaseSection {
    type: 'awards';
    items: AwardItem[];
}

export interface CustomItem {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    description: string;
}

export interface CustomSection extends BaseSection {
    type: 'custom';
    items: CustomItem[];
}

// Union type for any section
export type ResumeSection =
    | PersonalSection
    | SummarySection
    | ExperienceSection
    | EducationSection
    | SkillsSection
    | ProjectsSection
    | CertificationsSection
    | AwardsSection
    | CustomSection;

// ----------------------------------------------------------------------
// Root Resume Data
// ----------------------------------------------------------------------

export interface ResumeData {
    id: string;
    templateId: string;
    isPremium: boolean;

    // Global Metadata
    metadata: {
        fontFamily: string;
        accentColor: string;
        lineHeight: number;
        jobTitle: string; // Used for auto-suggestions / metadata
    };

    // List of all sections
    sections: ResumeSection[];
}

// ----------------------------------------------------------------------
// Helper Type for Items (Union)
// ----------------------------------------------------------------------
export type SectionItem =
    | PersonalItem
    | SummaryItem
    | ExperienceItem
    | EducationItem
    | SkillItem
    | ProjectItem
    | CertificationItem
    | AwardItem
    | CustomItem;
