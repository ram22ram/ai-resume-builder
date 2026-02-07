import React from 'react';
import { Box, Typography } from '@mui/material';
import { SectionType } from '../types/resume';

import PersonalForm from './forms/PersonalForm';
import SummaryForm from './forms/SummaryForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';

import ProjectsForm from './forms/ProjectsForm';

interface Props {
    type: SectionType;
    sectionId: string; // To handle multiple custom sections in future
}

const SectionEditor: React.FC<Props> = ({ type, sectionId }) => {
    
    switch (type) {
        case 'personal':
            return <PersonalForm sectionId={sectionId} />;
        case 'summary':
            return <SummaryForm sectionId={sectionId} />;
        case 'experience':
            return <ExperienceForm sectionId={sectionId} />;
        case 'education':
            return <EducationForm sectionId={sectionId} />;
        case 'skills':
            return <SkillsForm sectionId={sectionId} />;
        case 'projects':
            return <ProjectsForm sectionId={sectionId} />;
        default:
            return (
                <Box sx={{ p: 4, textAlign: 'center', color: 'text.secondary' }}>
                    <Typography>Editor for {type} is not yet implemented.</Typography>
                </Box>
            );
    }
};

export default SectionEditor;
