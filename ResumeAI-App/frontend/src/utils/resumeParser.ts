export const parseResumeText = (text: string) => {
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

    // Basic Extraction
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const phoneRegex = /([\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6})/gi;

    const emailMatch = text.match(emailRegex);
    const phoneMatch = text.match(phoneRegex);

    const email = emailMatch ? emailMatch[0] : '';
    const phone = phoneMatch ? phoneMatch[0] : '';

    // Name assumption: First line that isn't email or phone
    const nameLine = lines.find(l => !l.includes('@') && l.length > 3 && l.length < 30) || '';
    const name = nameLine.replace(/[^a-zA-Z\s]/g, '');



    // Rough content splitting (simple heuristic)
    // This is a basic implementation. A real parser would be more complex.
    const sections: any = {
        education: [] as any[],
        experience: [] as any[],
        skills: [] as string[],
        summary: '',
    };

    // Simple summary extraction (first paragraph after contact)
    const summaryIndex = lines.findIndex(l => l.toLowerCase().includes('summary') || l.toLowerCase().includes('profile'));
    if (summaryIndex !== -1 && summaryIndex < 10) {
        sections.summary = lines[summaryIndex + 1];
    } else if (lines.length > 2) {
        // Fallback: 2nd or 3rd line might be summary if long
        if (lines[1].length > 50) sections.summary = lines[1];
    }

    return {
        personal: {
            fullName: name,
            email,
            phone,
            location: '', // Hard to extract reliably without NLP
            linkedin: '',
        },
        ...sections
    };
};
