import { ResumeData, ResumeSection, SectionItem, PersonalSection, SummarySection, ExperienceSection, EducationSection, SkillsSection } from '../types/resume';

// Action Types
export type Action =
    | { type: 'SET_TEMPLATE'; payload: string }
    | { type: 'UPDATE_METADATA'; payload: Partial<ResumeData['metadata']> }
    | { type: 'ADD_SECTION'; payload: { type: string; title: string } }
    | { type: 'REMOVE_SECTION'; payload: string } // sectionId
    | { type: 'REORDER_SECTIONS'; payload: ResumeSection[] }
    | { type: 'UPDATE_SECTION_TITLE'; payload: { id: string; title: string } }
    | { type: 'ADD_ITEM'; payload: { sectionId: string; item: SectionItem } }
    | { type: 'UPDATE_ITEM'; payload: { sectionId: string; itemId: string; data: Partial<SectionItem> } }
    | { type: 'REMOVE_ITEM'; payload: { sectionId: string; itemId: string } }
    | { type: 'TOGGLE_SECTION_VISIBILITY'; payload: string } // sectionId
    | { type: 'LOAD_DATA'; payload: ResumeData }
    | { type: 'RESET' };

export const initialResumeState: ResumeData = {
    id: 'draft',
    templateId: 'BoardroomGridTemplate',
    isPremium: false,
    metadata: {
        fontFamily: 'Inter',
        accentColor: '#000000',
        lineHeight: 1.5,
        jobTitle: ''
    },
    sections: [
        {
            id: 'personal',
            type: 'personal',
            title: 'Personal Details',
            isVisible: true,
            items: [{
                id: '1',
                firstName: '',
                lastName: '',
                fullName: '',
                jobTitle: '',
                email: '',
                phone: ''
            }]
        } as PersonalSection,
        {
            id: 'summary',
            type: 'summary',
            title: 'Professional Summary',
            isVisible: true,
            items: [{ id: '1', description: '' }]
        } as SummarySection,
        {
            id: 'experience',
            type: 'experience',
            title: 'Employment History',
            isVisible: true,
            items: []
        } as ExperienceSection,
        {
            id: 'education',
            type: 'education',
            title: 'Education',
            isVisible: true,
            items: []
        } as EducationSection,
        {
            id: 'skills',
            type: 'skills',
            title: 'Skills',
            isVisible: true,
            items: []
        } as SkillsSection
    ]
};

export function resumeReducer(state: ResumeData, action: Action): ResumeData {
    switch (action.type) {
        case 'SET_TEMPLATE':
            return { ...state, templateId: action.payload };

        case 'UPDATE_METADATA':
            return { ...state, metadata: { ...state.metadata, ...action.payload } };

        case 'ADD_SECTION':
            const newSection: ResumeSection = {
                id: `${action.payload.type}_${Date.now()}`,
                type: action.payload.type as any, // Cast to generic ResumeSection['type'] or specific
                title: action.payload.title,
                isVisible: true,
                items: []
            } as ResumeSection; // Explicit cast for safety
            return { ...state, sections: [...state.sections, newSection] };

        case 'REMOVE_SECTION':
            return { ...state, sections: state.sections.filter(s => s.id !== action.payload) };

        case 'REORDER_SECTIONS':
            return { ...state, sections: action.payload };

        case 'TOGGLE_SECTION_VISIBILITY':
            return {
                ...state,
                sections: state.sections.map(s =>
                    s.id === action.payload ? { ...s, isVisible: !s.isVisible } : s
                )
            };

        case 'ADD_ITEM':
            return {
                ...state,
                sections: state.sections.map(section =>
                    section.id === action.payload.sectionId
                        ? { ...section, items: [...section.items, action.payload.item] as any[] }
                        : section
                )
            };

        case 'UPDATE_ITEM':
            return {
                ...state,
                sections: state.sections.map(section =>
                    section.id === action.payload.sectionId
                        ? {
                            ...section,
                            items: section.items.map(item =>
                                item.id === action.payload.itemId ? { ...item, ...action.payload.data } : item
                            ) as any[]
                        }
                        : section
                )
            };

        case 'REMOVE_ITEM':
            return {
                ...state,
                sections: state.sections.map(section =>
                    section.id === action.payload.sectionId
                        ? { ...section, items: section.items.filter(i => i.id !== action.payload.itemId) as any[] }
                        : section
                )
            };

        case 'LOAD_DATA':
            return action.payload;

        case 'RESET':
            return initialResumeState;

        default:
            return state;
    }
}
