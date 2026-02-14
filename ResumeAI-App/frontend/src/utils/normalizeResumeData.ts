import { ResumeData } from '../types/resume';

export const normalizeResumeData = (data: ResumeData): ResumeData => {
    return {
        ...data,
        sections: data.sections.map(section => {
            const normalizedItems = section.items.map((item: any) => {

                return {
                    id: item.id,

                    // PERSONAL
                    fullName:
                        item.fullName ||
                        `${item.firstName || ''} ${item.lastName || ''}`.trim(),

                    firstName: item.firstName || '',
                    lastName: item.lastName || '',

                    // UNIVERSAL FIELDS
                    title: item.title || item.position || '',
                    subtitle: item.subtitle || item.company || '',
                    position: item.position || item.title || '',
                    company: item.company || item.subtitle || '',
                    description: item.description || '',
                    location: item.location || '',
                    date: item.date || '',
                    name: item.name || item.title || '',
                    level: item.level || item.subtitle || ''
                };
            });

            return {
                ...section,
                items: normalizedItems
            };
        })
    };
};
