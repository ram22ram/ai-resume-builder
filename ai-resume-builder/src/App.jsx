import React, { useState, useRef, Suspense, useMemo } from 'react';
import { 
  Box, Paper, CircularProgress, 
  CssBaseline, Container 
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// FIX 1: 'html2pdf' library ko import karein
import html2pdf from 'html2pdf.js';

// कॉम्पोनेंट्स
import { PREDEFINED_SKILL_LIST } from './utils/constants'; 
import { validateStep } from './utils/resumeUtils';
import StepPersonalInfo from './components/steps/StepPersonalInfo';
import StepSummary from './components/steps/StepSummary';
import StepExperience from './components/steps/StepExperience';
import StepProjects from './components/steps/StepProjects';
import StepSkills from './components/steps/StepSkills';
import StepSettingsDownload from './components/steps/StepSettingsDownload';
import WizardHeader from './components/WizardHeader';
import WizardFooter from './components/WizardFooter';
import ResumeScore from './components/common/ResumeScore';

// Lazy load templates
const TemplateModern = React.lazy(() => import('./components/templates/TemplateModern'));
const TemplateClassic = React.lazy(() => import('./components/templates/TemplateClassic'));
const TemplateSwiss = React.lazy(() => import('./components/templates/TemplateSwiss'));
const TemplateCorporate = React.lazy(() => import('./components/templates/TemplateCorporate'));

// Initial data and utility functions
const loadInitialData = () => {
  try {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      const fixDates = (data) => ({
        ...data,
        experience: data.experience.map(item => ({
          ...item,
          startDate: item.startDate ? new Date(item.startDate) : null,
          endDate: item.endDate ? new Date(item.endDate) : null,
        })),
        education: data.education.map(item => ({
          ...item,
          year: item.year ? new Date(item.year) : null,
        }))
      });
      return fixDates(parsed);
    }
  } catch (error) {
    console.error("Failed to load data from localStorage", error);
  }
  return {
    personalInfo: { fullName: '', email: '', phone: '', address: '', linkedin: '', portfolio: '' },
    summary: '',
    experience: [{ id: 1, 
      title: '', 
      company: '', 
      location: '', 
      startDate: '', 
      endDate: '',   
      isPresent: false, 
      description: '' }],
    education: [{ id: 1, degree: '', school: '', city: '', year: '' }],
    projects: [{ id: 1, title: '', link: '', description: '' }],
    skills: ['React', 'JavaScript', 'MUI'],
    hobbies: '',
  };
};

const initialErrors = { 
  personalInfo: {}, 
  summary: null, 
  experience: [], 
  education: [], 
  projects: [], 
  skills: null 
};

const steps = ['Personal Info', 'Summary', 'Experience', 'Projects', 'Skills', 'Settings & Download'];

const createAppTheme = (fontFamily) => {
  return createTheme({
    typography: { fontFamily: fontFamily || '"Roboto", "Helvetica", "Arial", sans-serif' },
    palette: { primary: { main: '#6d28d9' } },
  });
};

function App() {
  const [resumeData, setResumeData] = useState(loadInitialData);
  const [errors, setErrors] = useState(initialErrors);
  const [loadingAi, setLoadingAi] = useState(false);
  
  const [activeStep, setActiveStep] = useState(0);
  const [validationError, setValidationError] = useState(null);

  const [currentTemplate, setCurrentTemplate] = useState('modern');
  const [accentColor, setAccentColor] = useState('#0B57D0');
  const [fontFamily, setFontFamily] = useState('Roboto');
  const [visibleSections, setVisibleSections] = useState({
    summary: true, 
    experience: true, 
    education: true,
    projects: true, 
    skills: true, 
    hobbies: true,
  });
  
  const previewRef = useRef(null);
  const theme = useMemo(() => createAppTheme(fontFamily), [fontFamily]);

  // Form handlers
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ 
      ...prev, 
      personalInfo: { ...prev.personalInfo, [name]: value } 
    }));
  };

  const handleSummaryChange = (e) => {
    setResumeData(prev => ({ ...prev, summary: e.target.value }));
  };

  const handleHobbiesChange = (e) => {
    setResumeData(prev => ({ ...prev, hobbies: e.target.value }));
  };

  const handleListChange = (section, id, event) => {
    const { name, value } = event.target;
    setResumeData(prev => ({ 
      ...prev, 
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, [name]: value } : item
      ) 
    }));
  };

  const handleExperienceCheckboxChange = (id, isChecked) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(item =>
        item.id === id ? { ...item, isPresent: isChecked, endDate: isChecked ? '' : item.endDate } : item
      )
    }));
  };

  const handleDateChange = (section, id, fieldName, newValue) => {
    setResumeData(prev => ({ 
      ...prev, 
      [section]: prev[section].map(item => 
        item.id === id ? { ...item, [fieldName]: newValue } : item
      ) 
    }));
  };

const addListItem = (section) => {
    const newId = Date.now();
    let newItem = { id: newId };

    if (section === 'experience') {
      newItem = { 
        id: newId, 
        title: '', 
        company: '', 
        location: '', 
        startDate: '', 
        endDate: '', 
        description: '', 
        isPresent: false 
      };
    } else if (section === 'education') {
      newItem = { id: newId, degree: '', school: '', city: '', year: '' };
    } else if (section === 'projects') {
      newItem = { id: newId, title: '', link: '', description: '' };
    }
    
    setResumeData(prev => ({ 
      ...prev, 
      [section]: [...prev[section], newItem] 
    }));
  };

  const deleteListItem = (section, id) => {
    if (resumeData[section].length > 1) {
      setResumeData(prev => ({ 
        ...prev, 
        [section]: prev[section].filter(item => item.id !== id) 
      }));
    }
  };

  const handleAddSkill = (skill) => {
    if (skill.trim() !== '' && !resumeData.skills.includes(skill.trim())) {
      setResumeData(prev => ({ 
        ...prev, 
        skills: [...prev.skills, skill.trim()] 
      }));
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setResumeData(prev => ({ 
      ...prev, 
      skills: prev.skills.filter(s => s !== skillToDelete) 
    }));
  };

  // Skills extract function
  const extractSkillsFromText = (text) => {
    const foundSkills = new Set();
    const lowerCaseText = text.toLowerCase();
    PREDEFINED_SKILL_LIST.forEach(skill => {
      if (lowerCaseText.includes(skill.toLowerCase())) {
        foundSkills.add(skill);
      }
    });
    return Array.from(foundSkills);
  };

  // Naya function: Bullet points generate karne ke liye
  const handleGenerateBullets = async (title, context) => {
    setLoadingAi(true);
    
    try {
      const response = await fetch('/.netlify/functions/generate-bullets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, context }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate bullet points');
      }

      const data = await response.json();
      return data.bullets;

    } catch (error) {
      console.error('Error generating bullet points:', error);
      // Fallback bullets
      return [
        "Managed operational workflows and processes",
        "Improved efficiency through process optimization", 
        "Coordinated with teams to achieve targets",
        "Implemented quality control measures",
        "Developed performance reports and metrics"
      ];
    } finally {
      setLoadingAi(false);
    }
  };

  // Main AI Generation Function
  const handleAiGenerate = async (section, id, promptText) => {
    // Agar 'bullets' section hai toh alag function call karein
    if (section === 'bullets') {
      return await handleGenerateBullets(id, promptText);
    }

    // Baaki sections ke liye original AI generation
    if (section !== 'summary' && !promptText.trim()) {
      alert("Please enter a Title first to generate description.");
      return;
    }
    if (section === 'summary' && !promptText.trim()) {
      promptText = "a software developer";
    }

    setLoadingAi(true);
    
    try {
      const response = await fetch('/.netlify/functions/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section, promptText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'AI generation failed. Please try again.');
      }

      const aiResponse = data.content;

      if (section === 'summary') {
        setResumeData(prev => ({ ...prev, summary: aiResponse }));
        // Skills extract karna
        const extractedSkills = extractSkillsFromText(aiResponse);
        setResumeData(prev => {
          const currentSkillsLower = prev.skills.map(s => s.toLowerCase());
          const newSkills = extractedSkills.filter(s => !currentSkillsLower.includes(s.toLowerCase()));
          return { ...prev, skills: [...prev.skills, ...newSkills] };
        });

      } else {
        setResumeData(prev => ({
          ...prev,
          [section]: prev[section].map(item =>
            item.id === id ? { 
              ...item, 
              description: (item.description + "\n" + aiResponse).trim() 
            } : item
          )
        }));
      }

    } catch (error) {
      console.error('Error calling AI function:', error);
      alert(error.message); 
    } finally {
      setLoadingAi(false);
    }
  };

  const handlers = {
    handlePersonalInfoChange, 
    handleSummaryChange, 
    handleHobbiesChange,
    handleListChange, 
    addListItem, 
    deleteListItem,
    handleAddSkill, 
    handleDeleteSkill, 
    handleAiGenerate,
    handleGenerateBullets,
    handleExperienceCheckboxChange
  };

  const customizationHandlers = {
    handleTemplateChange: (e, newTemplate) => newTemplate && setCurrentTemplate(newTemplate),
    handleSectionToggle: (e) => setVisibleSections(prev => ({ 
      ...prev, 
      [e.target.name]: e.target.checked 
    })),
    handleColorChange: (newColor) => newColor && setAccentColor(newColor),
    handleFontChange: (newFont) => setFontFamily(newFont),
  };

  const handleNext = () => {
    const { isValid, error } = validateStep(activeStep, resumeData);
    if (isValid) {
      setActiveStep((prev) => prev + 1);
      setValidationError(null);
    } else {
      setValidationError(error);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSave = () => { 
    localStorage.setItem('resumeData', JSON.stringify(resumeData)); 
    alert('Progress Saved!'); 
  };

  // PDF Download Function
  const handleDownloadPDF = () => {
    console.log("Download PDF clicked...");
    
    const element = previewRef.current;
    
    if (!element) {
      console.error("Preview element (ref) not found!");
      alert("Error: Preview not ready. Please try again.");
      return;
    }
    
    console.log("Preview element found:", element);
    
    const fileName = resumeData.personalInfo.fullName.trim() || 'resume';
    
    const opt = {
      margin:       0.5,
      filename:     `${fileName}_${currentTemplate}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    console.log("Starting PDF generation...");
    try {
      html2pdf().from(element).set(opt).save();
    } catch (error) {
      console.error("html2pdf failed:", error);
      alert("An error occurred while generating the PDF.");
    }
  };
  
  // Har step ke liye sahi props pass karein
  const getStepContent = (step) => {
    const stepProps = { 
      resumeData, 
      errors, 
      handlers, 
      loadingAi 
    };
    
    switch (step) {
      case 0: 
        return <StepPersonalInfo {...stepProps} />;
      case 1: 
        return <StepSummary {...stepProps} />;
      case 2: 
        return <StepExperience {...stepProps} />;
      case 3: 
        return <StepProjects {...stepProps} />;
      case 4: 
        return <StepSkills {...stepProps} PREDEFINED_SKILL_LIST={PREDEFINED_SKILL_LIST} />;
      case 5: 
        return <StepSettingsDownload
          visibleSections={visibleSections}
          currentTemplate={currentTemplate}
          accentColor={accentColor}
          fontFamily={fontFamily}
          handlers={customizationHandlers}
        />;
      default: 
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        p: { xs: 1, sm: 2, md: 4 },
        background: 'linear-gradient(to bottom right, #f3e8ff, #e9d5ff, #c084fc, #9333ea)', 
      }}>
        <Container maxWidth="xl" sx={{ p: 0 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 4 }}>
            
            {/* --- LEFT COLUMN (EDITOR) --- */}
            <Paper 
              elevation={8}
              sx={{ 
                width: { xs: '100%', lg: '50%' },
                borderRadius: '1.5rem', 
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <WizardHeader steps={steps} activeStep={activeStep} />
              <Box sx={{ p: { xs: 2, md: 4 }, overflowY: 'auto', flexGrow: 1 }}>
                {getStepContent(activeStep)}
                {validationError && (
                  <Box sx={{ mt: 2, color: 'red' }}>{validationError}</Box>
                )}
              </Box>
              <WizardFooter
                activeStep={activeStep}
                stepsLength={steps.length}
                handleBack={handleBack}
                handleSave={handleSave}
                handleNext={handleNext}
                handleDownloadPDF={handleDownloadPDF}
              />
            </Paper>

            {/* --- RIGHT COLUMN (PREVIEW) --- */}
            <Box 
              sx={{ 
                width: { xs: '100%', lg: '50%' },
                display: 'flex',
                flexDirection: 'column',
                gap: 2 
              }}
            >
              <ResumeScore resumeData={resumeData} />
              
              <Box 
                sx={{ 
                  mt: 0,
                  flexGrow: 1, 
                  display: 'flex', 
                }}
              >
                <Suspense fallback={
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <CircularProgress />
                  </Box>
                }>
                  {/* Sabhi templates ko 'ref={previewRef}' pass ho raha hai */}
                  {currentTemplate === 'modern' && (
                    <TemplateModern 
                      data={resumeData} 
                      ref={previewRef} 
                      visibleSections={visibleSections} 
                      theme={{ accentColor, fontFamily }} 
                      stretchHeight={true}
                    /> 
                  )}
                  {currentTemplate === 'classic' && (
                    <TemplateClassic 
                      data={resumeData} 
                      ref={previewRef} 
                      visibleSections={visibleSections} 
                      theme={{ accentColor, fontFamily }} 
                      stretchHeight={true}
                    />
                  )}
                  {currentTemplate === 'swiss' && (
                    <TemplateSwiss 
                      data={resumeData} 
                      ref={previewRef} 
                      visibleSections={visibleSections} 
                      theme={{ accentColor, fontFamily }} 
                      stretchHeight={true}
                    />
                  )}
                  {currentTemplate === 'corporate' && (
                    <TemplateCorporate 
                      data={resumeData} 
                      ref={previewRef} 
                      visibleSections={visibleSections} 
                      theme={{ accentColor, fontFamily }} 
                      stretchHeight={true}
                    />
                  )}
                </Suspense>
              </Box>
            </Box>

          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;