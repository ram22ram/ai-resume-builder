export type ResumeSectionType =
    | 'personal'
    | 'summary'
    | 'experience'
    | 'education'
    | 'projects'
    | 'skills'
    | 'custom';

export interface ResumeSection {
    id: string;
    type: ResumeSectionType;
    title: string;
    isVisible: boolean;
    content: any;
}

export interface ResumeData {
    template: string;
    sections: ResumeSection[];
}
