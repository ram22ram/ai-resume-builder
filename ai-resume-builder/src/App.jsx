import React, { useState, useRef, Suspense, useMemo } from 'react';
import { 
  Box, Paper, CircularProgress, 
  CssBaseline, Container, Button 
} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { ArrowLeft } from 'lucide-react';

// 'html2pdf' library
import html2pdf from 'html2pdf.js';

// Components
import HomePage from './components/HomePage';
import { PREDEFINED_SKILL_LIST } from './utils/constants'; 
import { validateStep } from './utils/resumeUtils';
import StepPersonalInfo from './components/steps/StepPersonalInfo';
import StepSummary from './components/steps/StepSummary';
import StepExperience from './components/steps/StepExperience';
import EducationSection from './components/EducationSection';
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

// --- Styled Back Button ---
const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: '#4b5563',
  backgroundColor: 'rgba(255,255,255,0.5)',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
}));

// Initial data loader
const loadInitialData = () => {
  try {
    const savedData = localStorage.getItem('resumeData');
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Failed to load data from localStorage", error);
  }
  return {
    personalInfo: { fullName: '', email: '', phone: '', address: '', linkedin: '', portfolio: '' },
    summary: '',
    experience: [{ 
      id: 1, 
      title: '', 
      company: '', 
      location: '', 
      startDate: '', 
      endDate: '',   
      isPresent: false, 
      description: '' 
    }],
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

const steps = ['Personal Info', 'Summary', 'Experience', 'Education', 'Projects', 'Skills', 'Settings & Download'];

const createAppTheme = (fontFamily) => {
  return createTheme({
    typography: { fontFamily: fontFamily || '"Roboto", "Helvetica", "Arial", sans-serif' },
    palette: { primary: { main: '#6d28d9' } },
  });
};

function App() {
  const [view, setView] = useState('home');
  
  const [resumeData, setResumeData] = useState(loadInitialData);
  const [errors, setErrors] = useState(initialErrors);
  const [loadingAi, setLoadingAi] = useState(false);
  
  const [activeStep, setActiveStep] = useState(0);
  const [validationError, setValidationError] = useState(null);

  const [currentTemplate, setCurrentTemplate] = useState('modern');
  const [accentColor, setAccentColor] = useState('#0B57D0');
  const [fontFamily, setFontFamily] = useState('Roboto');
  
  // Visibility State
  const [visibleSections, setVisibleSections] = useState({
    summary: true, 
    experience: true, 
    education: true,
    projects: true, 
    skills: true, 
    hobbies: true,
  });

  // Section Order State
  const [sectionOrder, setSectionOrder] = useState([
    'summary', 'experience', 'education', 'projects', 'skills', 'hobbies',
  ]);
  
  const previewRef = useRef(null);
  const theme = useMemo(() => createAppTheme(fontFamily), [fontFamily]);

  // --- HANDLERS ---

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };
  const handleSummaryChange = (e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }));
  const handleHobbiesChange = (e) => setResumeData((prev) => ({ ...prev, hobbies: e.target.value }));
  
  const handleListChange = (section, id, event) => {
    const { name, value } = event.target;
    setResumeData((prev) => ({ ...prev, [section]: prev[section].map((item) => item.id === id ? { ...item, [name]: value } : item) }));
  };

  const handleDateChange = (section, id, fieldName, newValue) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, [fieldName]: newValue } : item
      )
    }));
  };

  const handleListReorder = (section, newItems) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: newItems
    }));
  };

  const handleExperienceCheckboxChange = (id, isChecked) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) =>
        item.id === id ? { ...item, isPresent: isChecked, endDate: isChecked ? '' : item.endDate } : item
      )
    }));
  };

  const addListItem = (section) => {
    const newId = Date.now();
    let newItem = { id: newId };
    if (section === 'experience') {
      newItem = { id: newId, title: '', company: '', location: '', startDate: '', endDate: '', description: '', isPresent: false };
    } else if (section === 'education') {
      newItem = { id: newId, degree: '', school: '', city: '', year: '' };
    } else if (section === 'projects') {
      newItem = { id: newId, title: '', link: '', description: '' };
    }
    setResumeData((prev) => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const deleteListItem = (section, id) => {
    if (resumeData[section].length > 1) {
      setResumeData((prev) => ({ ...prev, [section]: prev[section].filter((item) => item.id !== id) }));
    }
  };

  const handleAddSkill = (skill) => {
    if (skill.trim() !== '' && !resumeData.skills.includes(skill.trim())) {
      setResumeData((prev) => ({ ...prev, skills: [...prev.skills, skill.trim()] }));
    }
  };

  const handleDeleteSkill = (skillToDelete) => {
    setResumeData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skillToDelete) }));
  };
  
  // --- FIX: RESTORED AI LOGIC ---
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

  const handleGenerateBullets = async (title, context) => {
    // Placeholder if you need specific bullet generation logic later
  };

  const handleAiGenerate = async (section, id, promptText) => {
    if (section !== 'summary' && !promptText.trim()) {
      alert("Please enter a Title first to generate description.");
      return;
    }
    if (section === 'summary' && !promptText.trim()) {
      promptText = "a software developer";
    }

    setLoadingAi(true);
    
    try {
      // Call the Netlify Function
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

      const aiResponse = data.aiResponse;

      if (section === 'summary') {
        // For Summary: Update summary text & extract skills
        setResumeData(prev => ({ ...prev, summary: aiResponse }));
        const extractedSkills = extractSkillsFromText(aiResponse);
        setResumeData(prev => {
          const currentSkillsLower = prev.skills.map(s => s.toLowerCase());
          const newSkills = extractedSkills.filter(s => !currentSkillsLower.includes(s.toLowerCase()));
          return { ...prev, skills: [...prev.skills, ...newSkills] };
        });

      } else {
        // For Experience/Projects: Append to description
        setResumeData(prev => ({
          ...prev,
          [section]: prev[section].map(item =>
            item.id === id ? { ...item, description: (item.description + "\n" + aiResponse).trim() } : item
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
  // ---------------------------------

  // Combined Handlers Object
  const handlers = {
    handlePersonalInfoChange, 
    handleSummaryChange, 
    handleHobbiesChange,
    handleListChange, 
    handleDateChange, 
    handleListReorder, 
    addListItem, 
    deleteListItem,
    handleAddSkill, 
    handleDeleteSkill, 
    handleAiGenerate, // <-- Now this contains the real logic
    handleGenerateBullets,
    handleExperienceCheckboxChange
  };

  const customizationHandlers = {
    handleTemplateChange: (e, newTemplate) => newTemplate && setCurrentTemplate(newTemplate),
    handleSectionToggle: (e) => setVisibleSections((prev) => ({ ...prev, [e.target.name]: e.target.checked })),
    handleColorChange: (newColor) => newColor && setAccentColor(newColor),
    handleFontChange: (newFont) => setFontFamily(newFont),
    handleSectionReorder: (newOrder) => setSectionOrder(newOrder),
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

  // --- RAZORPAY INTEGRATION ---
  const handleDownloadPDF = () => {
    const triggerPdfDownload = () => {
      const element = previewRef.current;
      if (!element) {
        alert("Error: Download failed. Please try again.");
        return;
      }
      
      const fileName = resumeData.personalInfo.fullName.trim() || 'resume';
      const opt = {
        margin: 0.5,
        filename: `${fileName}_${currentTemplate}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      
      try {
        html2pdf().from(element).set(opt).save();
      } catch (error) {
        console.error("html2pdf failed:", error);
        alert("An error occurred while generating the PDF.");
      }
    };

    const options = {
      key: "1PonYlx7j6UHP6m0FAnniw0j", 
      amount: 30 * 100, 
      currency: "INR",
      name: "AI Resume Builder",
      description: "Premium Resume Download",
      handler: function (response) {
        alert("Payment Successful! Your download will start now.");
        triggerPdfDownload(); 
      },
      prefill: {
        name: resumeData.personalInfo.fullName || "User",
        email: resumeData.personalInfo.email || "",
        contact: resumeData.personalInfo.phone || ""
      },
      theme: { color: "#6d28d9" }
    };

    try {
      const paymentObject = new window.Razorpay(options);
      paymentObject.on('payment.failed', function (response) {
        alert("Payment Failed: " + response.error.description);
      });
      paymentObject.open();
    } catch (e) {
      console.error("Razorpay error:", e);
      alert("Error: Payment gateway failed to load. Please ensure you are online.");
    }
  };
  
  const getStepContent = (step) => {
    const stepProps = { resumeData, errors, handlers, loadingAi };
    
    switch (step) {
      case 0: return <StepPersonalInfo {...stepProps} />;
      case 1: return <StepSummary {...stepProps} />;
      case 2: return <StepExperience {...stepProps} />;
      case 3: return (
        <EducationSection 
           data={resumeData.education}
           onChange={(id, e) => handlers.handleListChange('education', id, e)}
           onDateChange={handlers.handleDateChange}
           onAdd={() => handlers.addListItem('education')}
           onDelete={(id) => handlers.deleteListItem('education', id)}
           onReorder={(newItems) => handlers.handleListReorder('education', newItems)}
           errors={errors.education}
        />
      );
      case 4: return <StepProjects {...stepProps} />;
      case 5: return <StepSkills {...stepProps} PREDEFINED_SKILL_LIST={PREDEFINED_SKILL_LIST} />;
      case 6: 
        return <StepSettingsDownload
          sectionOrder={sectionOrder}
          visibleSections={visibleSections}
          currentTemplate={currentTemplate}
          accentColor={accentColor}
          fontFamily={fontFamily}
          handlers={customizationHandlers}
        />;
      default: return 'Unknown step';
    }
  };

  if (view === 'home') {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HomePage onStart={() => setView('builder')} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        p: { xs: 1, sm: 2, md: 4 },
        background: 'linear-gradient(to bottom right, #f3e8ff, #e9d5ff, #c084fc, #9333ea)', 
      }}>
        <Container maxWidth="xl" sx={{ p: 0 }}>
          
          <BackButton 
            startIcon={<ArrowLeft />} 
            onClick={() => setView('home')} 
            variant="outlined"
          >
            Back to Home
          </BackButton>

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
                  {currentTemplate === 'modern' && (
                    <TemplateModern 
                      data={resumeData} 
                      ref={previewRef} 
                      visibleSections={visibleSections} 
                      sectionOrder={sectionOrder}
                      theme={{ accentColor, fontFamily }} 
                      stretchHeight={true}
                    /> 
                  )}
                  {currentTemplate === 'classic' && (
                    <TemplateClassic 
                      data={resumeData} 
                      ref={previewRef} 
                      visibleSections={visibleSections} 
                      sectionOrder={sectionOrder}
                      theme={{ accentColor, fontFamily }} 
                      stretchHeight={true}
                    />
                  )}
                  {currentTemplate === 'swiss' && (
                    <TemplateSwiss 
                      data={resumeData} 
                      ref={previewRef} 
                      visibleSections={visibleSections} 
                      sectionOrder={sectionOrder}
                      theme={{ accentColor, fontFamily }} 
                      stretchHeight={true}
                    />
                  )}
                  {currentTemplate === 'corporate' && (
                    <TemplateCorporate 
                      data={resumeData} 
                      ref={previewRef} 
                      visibleSections={visibleSections} 
                      sectionOrder={sectionOrder}
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