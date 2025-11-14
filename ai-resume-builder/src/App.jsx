import React, { useState, useRef, Suspense, useMemo } from 'react';
import { 
  Box, Paper, CircularProgress, 
  CssBaseline, Container 
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// 'html2pdf' library
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
      // Date ko string hi rakhein taaki HTML input unhein padh sake
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

  // Form handlers (Aapke original handlers)
  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };
  const handleSummaryChange = (e) => setResumeData(prev => ({ ...prev, summary: e.target.value }));
  const handleHobbiesChange = (e) => setResumeData(prev => ({ ...prev, hobbies: e.target.value }));
  const handleListChange = (section, id, event) => {
    const { name, value } = event.target;
    setResumeData(prev => ({ ...prev, [section]: prev[section].map(item => item.id === id ? { ...item, [name]: value } : item) }));
  };
  const handleExperienceCheckboxChange = (id, isChecked) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(item =>
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
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
  };
  const deleteListItem = (section, id) => {
    if (resumeData[section].length > 1) {
      setResumeData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }));
    }
  };
  const handleAddSkill = (skill) => {
    if (skill.trim() !== '' && !resumeData.skills.includes(skill.trim())) {
      setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill.trim()] }));
    }
  };
  const handleDeleteSkill = (skillToDelete) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToDelete) }));
  };
  const extractSkillsFromText = (text) => {
    // ... (Aapka skill extraction logic)
  };
  const handleGenerateBullets = async (title, context) => {
    // ... (Aapka AI bullet logic)
  };
  const handleAiGenerate = async (section, id, promptText) => {
    // ... (Aapka main AI logic)
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
    handleSectionToggle: (e) => setVisibleSections(prev => ({ ...prev, [e.target.name]: e.target.checked })),
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

  // --- FIX: 'handleDownloadPDF' function ko Razorpay logic se badal diya gaya hai ---
  const handleDownloadPDF = () => {
    
    // 1. Asli PDF download logic (ise hum payment ke baad call karenge)
    const triggerPdfDownload = () => {
      console.log("Payment successful, triggering download...");
      const element = previewRef.current;
      if (!element) {
        console.error("Preview element (ref) not found!");
        alert("Error: Download failed. Please try again.");
        return;
      }
      
      const fileName = resumeData.personalInfo.fullName.trim() || 'resume';
      const opt = {
        margin:       0.5,
        filename:     `${fileName}_${currentTemplate}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };
      
      try {
        html2pdf().from(element).set(opt).save();
      } catch (error) {
        console.error("html2pdf failed:", error);
        alert("An error occurred while generating the PDF.");
      }
    };

    // 2. Razorpay Options
    const options = {
      // --- FIX: Yahaan sirf "Key ID" aayegi ---
      // Aapne `rzp_test_RTqlujdlisjX34` daala tha, jo bilkul sahi hai
      key: "rzp_test_RTqlujdlisjX34", 
      
      // --- DANGER: Yeh keys Yahaan KABHI NAHI daalein ---
      // RAZORPAY_KEY_SECRET = 'uRDDsWwskPrM7EJ7mHwv2CiA' (YEH HATAO)
      // RAZORPAY_WEBHOOK_SECRET = 'Tco@2025' (YEH BHI HATAO)
      
      amount: 30 * 100, // 30 RS (yaani 3000 paise)
      currency: "INR",
      name: "AI Resume Builder",
      description: "PDF Download",
      // image: "https://ai-builder-resume.netlify.app/logo.png", // (Optional: Apna logo URL)
      
      // 3. Payment successful hone par yeh function chalaayein
      handler: function (response) {
        // response.razorpay_payment_id // Payment ID
        alert("Payment Successful! Your download will start now.");
        // Ab PDF download shuru karein
        triggerPdfDownload(); 
      },
      
      // (Optional) Pehle se bhari hui jaankaari
      prefill: {
        name: resumeData.personalInfo.fullName || "User",
        email: resumeData.personalInfo.email || "",
        contact: resumeData.personalInfo.phone || ""
      },
      theme: {
        color: "#6d28d9" // Aapke app ke theme se match karta hua
      }
    };

    // 4. Payment popup ko kholne ke liye
    try {
      // 'window.Razorpay' tabhi kaam karega jab aapne index.html mein script daali ho
      const paymentObject = new window.Razorpay(options);
      
      // Payment fail hone par
      paymentObject.on('payment.failed', function (response) {
        alert("Payment Failed: " + response.error.description);
        console.error("Payment Failed:", response.error);
      });
      
      // Popup kholien
      paymentObject.open();
    } catch (e) {
      console.error("Razorpay error:", e);
      alert("Error: Payment gateway failed to load. Please check your internet connection or if the script is added to index.html.");
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
                handleDownloadPDF={handleDownloadPDF} // <-- Yahaan function pass ho raha hai
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