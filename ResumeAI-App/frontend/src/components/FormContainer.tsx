import { useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from '@mui/material';
import {
  ChevronDown,
  User,
  Briefcase,
  GraduationCap,
  Code,
  Lightbulb,
  Heart,
  PenSquare,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import PersonalInfoSection from './PersonalInfoSection';
import SummarySection from './SummarySection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import HobbiesSection from './HobbiesSection';

/* ================= TYPES ================= */

interface AccordionHeaderProps {
  icon: LucideIcon;
  title: string;
  count?: number;
  isExpanded: boolean;
  color: {
    main: string;
    light: string;
    dark: string;
  };
}

/* ---- DATA TYPES ---- */

interface ExperienceError {
  id: string;
  title?: string;
  company?: string;
}

interface EducationError {
  id: string;
  degree?: string;
  school?: string;
}

interface ProjectError {
  id: string;
  title?: string;
}

interface ResumeData {
  personalInfo: any;
  summary: string;
  experience: any[];
  education: any[];
  projects: any[];
  skills: any[];
  hobbies: string;
}

interface FormErrors {
  personalInfo?: any;
  summary?: string;
  experience?: ExperienceError[];
  education?: EducationError[];
  projects?: ProjectError[];
  skills?: string;
}

interface VisibleSections {
  [key: string]: boolean;
}

/* ---- HANDLERS ---- */

interface FormHandlers {
  handlePersonalInfoChange: (e: any) => void;
  handleSummaryChange: (e: any) => void;

  handleListChange: (
    sectionKey: string,
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  handleDateChange: (
    sectionKey: string,
    id: string,
    field: string,
    value: any
  ) => void;

  addListItem: (sectionKey: string, item: any) => void;
  deleteListItem: (sectionKey: string, id: string) => void;

  handleAiGenerate: (
    sectionKey: string,
    id: string,
    title?: string
  ) => void;

  handleAddSkill: (skill: string) => void;
  handleDeleteSkill: (skill: string) => void;
  handleHobbiesChange: (e: any) => void;
}

interface FormContainerProps {
  resumeData: ResumeData;
  handlers: FormHandlers;
  errors: FormErrors;
  visibleSections: VisibleSections;
  loadingAi: boolean;
}

/* ================= UI PART ================= */

const AccordionHeader = ({
  icon: Icon,
  color,
  title,
  count = 0,
  isExpanded,
}: AccordionHeaderProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: isExpanded ? 'rgba(255,255,255,0.2)' : color.light,
        }}
      >
        <Icon size={20} style={{ color: isExpanded ? '#fff' : color.main }} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {count > 0 && (
        <Chip
          label={`${count} item${count > 1 ? 's' : ''}`}
          size="small"
          sx={{
            bgcolor: isExpanded ? 'rgba(255,255,255,0.2)' : color.light,
            color: isExpanded ? '#fff' : color.dark,
            fontWeight: 600,
          }}
        />
      )}
      <ChevronDown
        style={{
          transform: isExpanded ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.3s',
        }}
      />
    </Box>
  </Box>
);

/* ================= MAIN COMPONENT ================= */

function FormContainer({
  resumeData,
  handlers,
  errors,
  visibleSections,
  loadingAi,
}: FormContainerProps) {
  const [expanded, setExpanded] = useState<string | false>('personal');

  const handleChange =
    (panelId: string) => (_: unknown, isExpanded: boolean) => {
      setExpanded(isExpanded ? panelId : false);
    };

  const sections = [
    { id: 'personal', title: 'Personal Information', icon: User, color: { main: '#3b82f6', light: '#dbeafe', dark: '#1e40af' } },
    { id: 'summary', title: 'Professional Summary', icon: PenSquare, color: { main: '#f97316', light: '#ffedd5', dark: '#9a3412' } },
    { id: 'experience', title: 'Work Experience', icon: Briefcase, color: { main: '#16a34a', light: '#dcfce7', dark: '#14532d' }, count: resumeData.experience.length },
    { id: 'education', title: 'Education', icon: GraduationCap, color: { main: '#a855f7', light: '#f3e8ff', dark: '#581c87' }, count: resumeData.education.length },
    { id: 'projects', title: 'Projects', icon: Code, color: { main: '#6366f1', light: '#e0e7ff', dark: '#3730a3' }, count: resumeData.projects.length },
    { id: 'skills', title: 'Skills', icon: Lightbulb, color: { main: '#ec4899', light: '#fce7f3', dark: '#831843' }, count: resumeData.skills.length },
    { id: 'hobbies', title: 'Hobbies', icon: Heart, color: { main: '#ef4444', light: '#fee2e2', dark: '#991b1b' } },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {sections.map(sec => {
        const isExpanded = expanded === sec.id;

        if (sec.id !== 'personal' && !visibleSections[sec.id]) return null;

        return (
          <Accordion
            key={sec.id}
            expanded={isExpanded}
            onChange={handleChange(sec.id)}
          >
            <AccordionSummary>
              <AccordionHeader
                icon={sec.icon}
                color={sec.color}
                title={sec.title}
                count={sec.count}
                isExpanded={isExpanded}
              />
            </AccordionSummary>

            <AccordionDetails sx={{ p: 0 }}>
              {sec.id === 'personal' && (
                <PersonalInfoSection
                  data={resumeData.personalInfo}
                  onChange={handlers.handlePersonalInfoChange}
                  errors={errors.personalInfo}
                />
              )}

              {sec.id === 'summary' && (
                <SummarySection
                  data={resumeData.summary}
                  onChange={handlers.handleSummaryChange}
                  error={errors.summary}
                  onAiGenerate={handlers.handleAiGenerate}
                  loadingAi={loadingAi}
                />
              )}

              {sec.id === 'experience' && (
                <ExperienceSection
                  data={resumeData.experience}
                  onChange={(id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    handlers.handleListChange('experience', id, e)
                  }
                  onDateChange={handlers.handleDateChange}
                  onAdd={() =>
                    handlers.addListItem('experience', {
                      title: '',
                      company: '',
                      startDate: null,
                      endDate: null,
                      description: '',
                    })
                  }
                  onDelete={(id: string) =>
                    handlers.deleteListItem('experience', id)
                  }
                  errors={errors.experience}
                  onAiGenerate={handlers.handleAiGenerate}
                  loadingAi={loadingAi}
                />
              )}

              {sec.id === 'education' && (
                <EducationSection
                  data={resumeData.education}
                  onChange={(id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    handlers.handleListChange('education', id, e)
                  }
                  onDateChange={handlers.handleDateChange}
                  onAdd={() =>
                    handlers.addListItem('education', {
                      degree: '',
                      school: '',
                      city: '',
                      year: null,
                    })
                  }
                  onDelete={(id: string) =>
                    handlers.deleteListItem('education', id)
                  }
                  errors={errors.education}
                />
              )}

              {sec.id === 'projects' && (
                <ProjectsSection
                  data={resumeData.projects}
                  onChange={(id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    handlers.handleListChange('projects', id, e)
                  }
                  onAdd={() =>
                    handlers.addListItem('projects', {
                      title: '',
                      link: '',
                      description: '',
                    })
                  }
                  onDelete={(id: string) =>
                    handlers.deleteListItem('projects', id)
                  }
                  errors={errors.projects}
                  onAiGenerate={handlers.handleAiGenerate}
                  loadingAi={loadingAi}
                />
              )}

              {sec.id === 'skills' && (
                <SkillsSection
                  data={resumeData.skills}
                  onAdd={handlers.handleAddSkill}
                  onDelete={handlers.handleDeleteSkill}
                  error={errors.skills}
                />
              )}

              {sec.id === 'hobbies' && (
                <HobbiesSection
                  data={resumeData.hobbies}
                  onChange={handlers.handleHobbiesChange}
                />
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}

export default FormContainer;
