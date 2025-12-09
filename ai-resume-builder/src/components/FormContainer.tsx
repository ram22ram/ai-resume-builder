import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { ChevronDown, User, Briefcase, GraduationCap, Code, Lightbulb, Heart, PenSquare } from 'lucide-react';

import PersonalInfoSection from './PersonalInfoSection';
import SummarySection from './SummarySection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';
import HobbiesSection from './HobbiesSection';

const AccordionHeader = ({ icon: Icon, color, title, count, isExpanded }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{
        width: 40, height: 40, borderRadius: '50%', display: 'flex', 
        alignItems: 'center', justifyContent: 'center',
        bgcolor: isExpanded ? 'rgba(255,255,255,0.2)' : `${color.light}`,
      }}>
        <Icon style={{ color: isExpanded ? '#fff' : `${color.main}` }} size={20} />
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 'semibold' }}>
        {title}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      {count > 0 && (
        <Chip 
          label={`${count} item${count > 1 ? 's' : ''}`} 
          size="small"
          sx={{
            bgcolor: isExpanded ? 'rgba(255,255,255,0.2)' : `${color.light}`,
            color: isExpanded ? '#fff' : `${color.dark}`,
            fontWeight: 'semibold'
          }}
        />
      )}
      <ChevronDown style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
    </Box>
  </Box>
);


function FormContainer({ resumeData, handlers, errors, visibleSections, loadingAi }) {
  const [expanded, setExpanded] = useState('personal'); 

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const sections = [
    { id: 'personal', title: 'Personal Information', icon: User, color: { main: '#3b82f6', light: '#dbeafe', dark: '#1e40af' }, gradient: 'linear-gradient(to right, #3b82f6, #2563eb)' },
    { id: 'summary', title: 'Professional Summary', icon: PenSquare, color: { main: '#f97316', light: '#ffedd5', dark: '#9a3412' }, gradient: 'linear-gradient(to right, #f97316, #ea580c)' },
    { id: 'experience', title: 'Work Experience', icon: Briefcase, color: { main: '#16a34a', light: '#dcfce7', dark: '#14532d' }, gradient: 'linear-gradient(to right, #16a34a, #15803d)', count: resumeData.experience.length },
    { id: 'education', title: 'Education', icon: GraduationCap, color: { main: '#a855f7', light: '#f3e8ff', dark: '#581c87' }, gradient: 'linear-gradient(to right, #a855f7, #9333ea)', count: resumeData.education.length },
    { id: 'projects', title: 'Projects', icon: Code, color: { main: '#6366f1', light: '#e0e7ff', dark: '#3730a3' }, gradient: 'linear-gradient(to right, #6366f1, #4f46e5)', count: resumeData.projects.length },
    { id: 'skills', title: 'Skills', icon: Lightbulb, color: { main: '#ec4899', light: '#fce7f3', dark: '#831843' }, gradient: 'linear-gradient(to right, #ec4899, #db2777)', count: resumeData.skills.length },
    { id: 'hobbies', title: 'Hobbies', icon: Heart, color: { main: '#ef4444', light: '#fee2e2', dark: '#991b1b' }, gradient: 'linear-gradient(to right, #ef4444, #dc2626)' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box sx={{
        mb: 4, textAlign: 'center', 
        backgroundImage: 'linear-gradient(to right, #4f46e5, #a855f7)',
        borderRadius: 3, p: 4, boxShadow: 6, color: 'white'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          Build Your Resume
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.95 }}>
          Fill in your details. Watch your resume update in real-time! →
        </Typography>
      </Box>

      {/* Accordion Sections */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {sections.map((section) => {
          const isExpanded = expanded === section.id;
          
          if (section.id !== 'personal' && !visibleSections[section.id]) {
            return null;
          }

          return (
            <Accordion
              key={section.id}
              expanded={isExpanded}
              onChange={handleChange(section.id)}
              sx={{
                borderRadius: '12px !important',
                overflow: 'hidden',
                boxShadow: isExpanded ? 6 : 1,
                transition: 'all 0.3s',
                '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' }
              }}
            >
              <AccordionSummary
                sx={{
                  py: 1.5, px: 2.5,
                  backgroundImage: isExpanded ? section.gradient : '#ffffff',
                  color: isExpanded ? 'white' : 'grey.800',
                  transition: 'all 0.3s',
                  '& .MuiAccordionSummary-content': { margin: 0 }
                }}
              >
                <AccordionHeader 
                  icon={section.icon} 
                  color={section.color} 
                  title={section.title} 
                  count={section.count} 
                  isExpanded={isExpanded} 
                />
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0, bgcolor: '#f8fafc' }}>
                
                {section.id === 'personal' && (
                  <PersonalInfoSection 
                    data={resumeData.personalInfo} 
                    onChange={handlers.handlePersonalInfoChange} 
                    errors={errors.personalInfo} 
                  />
                )}
                {section.id === 'summary' && (
                  <SummarySection
                    data={resumeData.summary}
                    onChange={handlers.handleSummaryChange}
                    error={errors.summary} 
                    onAiGenerate={handlers.handleAiGenerate}
                    loadingAi={loadingAi}
                  />
                )}
                {section.id === 'experience' && (
                  <ExperienceSection
                    data={resumeData.experience}
                    onChange={(id, e) => handlers.handleListChange('experience', id, e)}
                    onDateChange={handlers.handleDateChange}
                    onAdd={() => handlers.addListItem('experience', { title: '', company: '', startDate: null, endDate: null, description: '' })}
                    onDelete={(id) => handlers.deleteListItem('experience', id)}
                    errors={errors.experience} 
                    onAiGenerate={handlers.handleAiGenerate}
                    loadingAi={loadingAi}
                  />
                )}
                {section.id === 'education' && (
                  <EducationSection
                    data={resumeData.education}
                    onChange={(id, e) => handlers.handleListChange('education', id, e)}
                    onDateChange={handlers.handleDateChange}
                    onAdd={() => handlers.addListItem('education', { degree: '', school: '', city: '', year: null })}
                    onDelete={(id) => handlers.deleteListItem('education', id)}
                    errors={errors.education} 
                  />
                )}
                {section.id === 'projects' && (
                  <ProjectsSection
                    data={resumeData.projects}
                    onChange={(id, e) => handlers.handleListChange('projects', id, e)}
                    onAdd={() => handlers.addListItem('projects', { title: '', link: '', description: '' })}
                    onDelete={(id) => handlers.deleteListItem('projects', id)}
                    errors={errors.projects}
                    onAiGenerate={handlers.handleAiGenerate}
                    loadingAi={loadingAi}
                  />
                )}
                {section.id === 'skills' && (
                  <SkillsSection
                    data={resumeData.skills}
                    onAdd={handlers.handleAddSkill}
                    onDelete={handlers.handleDeleteSkill}
                    error={errors.skills} 
                  />
                )}
                {section.id === 'hobbies' && (
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
    </Box>
  );
}

export default FormContainer;