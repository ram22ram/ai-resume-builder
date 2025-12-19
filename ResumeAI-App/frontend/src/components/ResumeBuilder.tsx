import { useState, useRef, useEffect } from 'react';
import { Box, Paper, Container, Stack, Snackbar, Alert, Button, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import Layout from '../components/Layout'; 
import html2pdf from 'html2pdf.js';

// COMPONENTS
import WizardHeader from './WizardHeader';
import WizardFooter from './WizardFooter';
import ResumeScore from './common/ResumeScore';
import StepPersonalInfo from './steps/StepPersonalInfo';
import StepSummary from './steps/StepSummary'; 
import StepExperience from './steps/StepExperience';
import StepEducation from './steps/StepEducation'; 
import StepProjects from './steps/StepProjects';
import StepSkills from './steps/StepSkills';
import StepSettingsDownload from './steps/StepSettingsDownload';
import TemplateSelector from './templates/TemplateSelector';

// AUTH & API
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

declare global { interface Window { Razorpay: any; } }

// INTERFACES (Explicitly defined to prevent errors)
interface PersonalInfo { fullName: string; email: string; phone: string; address: string; linkedin: string; portfolio: string; jobTitle: string; photo: string | null; }
interface Experience { id: number; title: string; company: string; location: string; startDate: string; endDate: string; isPresent: boolean; description: string; }
interface Education { id: number; school: string; degree: string; location: string; startDate: string; endDate: string; grade: string; }
interface Project { id: number; title: string; link: string; description: string; techStack: string; }
interface Skill { id?: number; name: string; level?: number; }

interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[]; 
  hobbies: string;
}

const initialData: ResumeData = {
  personalInfo: { fullName: '', email: '', phone: '', address: '', linkedin: '', portfolio: '', jobTitle: '', photo: null },
  summary: '', experience: [], education: [], projects: [], skills: [], hobbies: ''
};

const steps = ['Personal Info', 'Summary', 'Experience', 'Education', 'Projects', 'Skills', 'Settings'];

const ResumeBuilder = () => {
  const { user, login } = useAuth();
  
  const [saveError, setSaveError] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [activeStep, setActiveStep] = useState(0);
  
  const [currentTemplate, setCurrentTemplate] = useState('modern');
  const [accentColor, setAccentColor] = useState('#3b82f6');
  const [fontFamily, setFontFamily] = useState('inter');
  const [density, setDensity] = useState('compact');
  const [photoMode, setPhotoMode] = useState('visible');
  const [visibleSections, setVisibleSections] = useState({ summary: true, experience: true, education: true, projects: true, skills: true, hobbies: true });
  const [sectionOrder, setSectionOrder] = useState(['summary', 'experience', 'education', 'projects', 'skills', 'hobbies']);
  
  const previewRef = useRef<HTMLDivElement>(null);

  // LOAD DATA FROM DB OR LOCALSTORAGE
  useEffect(() => {
    const loadData = async () => {
        if (user) {
            try {
                const token = localStorage.getItem('resume_token');
                const res = await axios.get(`${API_URL}/resume`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.success && res.data.data) {
                    setResumeData(prev => ({ ...prev, ...res.data.data }));
                }
            } catch (err) { console.error("DB Load Error", err); }
        } else {
            const saved = localStorage.getItem('resumeData');
            if (saved) setResumeData(JSON.parse(saved));
        }
    };
    loadData();
  }, [user]);

  // AUTO SAVE LOGIC
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
        if (user) {
            try {
                const token = localStorage.getItem('resume_token');
                await axios.post(`${API_URL}/resume`, resumeData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSaveError(false);
            } catch (e) { console.error("DB Save Error", e); }
        } else {
            try {
                localStorage.setItem('resumeData', JSON.stringify(resumeData));
                setSaveError(false);
            } catch (e) { setSaveError(true); }
        }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [resumeData, user]);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post(`${API_URL}/auth/google`, { token: credentialResponse.credential });
      if (res.data.success) {
        login(res.data.user, res.data.token);
        setLoginDialogOpen(false);
        await axios.post(`${API_URL}/resume`, resumeData, { headers: { Authorization: `Bearer ${res.data.token}` } });
      }
    } catch (err) { console.error("Login Failed", err); }
  };

  const handlers = {
    handlePersonalInfoChange: (e: any) => setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [e.target.name]: e.target.value } })),
    handleImageUpload: (img: string | null) => setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, photo: img } })),
    handleSummaryChange: (e: any) => setResumeData(prev => ({ ...prev, summary: e.target.value })),
    handleListChange: (section: string, id: number, e: any) => setResumeData(prev => ({ ...prev, [section]: (prev[section as keyof ResumeData] as any[]).map(item => item.id === id ? { ...item, [e.target.name]: e.target.value } : item) })),
    addListItem: (section: string) => setResumeData(prev => ({ ...prev, [section]: [...(prev[section as keyof ResumeData] as any[]), { id: Date.now() }] })),
    deleteListItem: (section: string, id: number) => setResumeData(prev => ({ ...prev, [section]: (prev[section as keyof ResumeData] as any[]).filter(item => item.id !== id) })),
    handleAddSkill: (skill: string) => { if (!resumeData.skills.includes(skill)) setResumeData(prev => ({ ...prev, skills: [...prev.skills, skill] })) },
    handleDeleteSkill: (skillToDelete: string) => setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToDelete) })),
    handleTemplateChange: (_: any, newTemplate: string) => { if(newTemplate) setCurrentTemplate(newTemplate); },
    handleColorChange: (newColor: string) => setAccentColor(newColor),
    handleFontChange: (newFont: string) => setFontFamily(newFont),
    handleDensityChange: (newDensity: string) => setDensity(newDensity),
    handlePhotoModeChange: (newMode: string) => setPhotoMode(newMode),
    handleSectionToggle: (e: any) => setVisibleSections(prev => ({ ...prev, [e.target.name]: e.target.checked })),
    handleSectionReorder: (newOrder: string[]) => setSectionOrder(newOrder),
    handleDateChange: (section: string, id: number, field: string, value: any) => { const dateStr = value ? value.toISOString() : ''; setResumeData(prev => ({ ...prev, [section]: (prev[section as keyof ResumeData] as any[]).map(item => item.id === id ? { ...item, [field]: dateStr } : item) })); },
    handleExperienceCheckboxChange: (id: number, checked: boolean) => setResumeData(prev => ({ ...prev, experience: prev.experience.map(exp => exp.id === id ? { ...exp, isPresent: checked, endDate: checked ? '' : exp.endDate } : exp) })),
    handleListReorder: (section: string, newItems: any[]) => setResumeData(prev => ({ ...prev, [section]: newItems })),
    handleAiGenerate: (section: string, id: any = null) => { setLoadingAi(true); setTimeout(() => { setLoadingAi(false); }, 1000); }
  };

  const handleManualSave = () => {
    if (!user) { setLoginDialogOpen(true); return; }
    setSaveSuccess(true);
  };

  const generatePDF = () => {
    if (!previewRef.current) return;
    const opt = { 
        margin: 0.5, 
        filename: `${resumeData.personalInfo.fullName || 'resume'}.pdf`, 
        // ✅ FIX IS HERE: Added 'as const'
        image: { type: 'jpeg' as const, quality: 1 }, 
        html2canvas: { scale: 2, useCORS: true }, 
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' as const } 
    };
    html2pdf().from(previewRef.current).set(opt).save();
  };

  const handleDownloadPDF = () => {
    if (!user) {
        setLoginDialogOpen(true);
        return;
    }
    const hasUsedFreeTrial = localStorage.getItem('hasUsedFreeTrial');
    if (!hasUsedFreeTrial) {
      generatePDF();
      localStorage.setItem('hasUsedFreeTrial', 'true');
      alert("🎉 First download is Free! (Trial Used)");
      return;
    }
    if (!window.Razorpay) { alert("Payment gateway failed."); return; }
    const options = {
      key: "rzp_live_Rs9tzrmjy49UtW", 
      amount: 3000, currency: "INR", name: "ResumeAI Pro", description: "Premium Resume",
      image: "https://resume-ai.co.in/favicon.svg",
      handler: function (response: any) { generatePDF(); },
      prefill: { name: resumeData.personalInfo.fullName, email: resumeData.personalInfo.email, contact: resumeData.personalInfo.phone },
      theme: { color: "#7c3aed" }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);

  const renderStep = () => {
    switch (activeStep) {
        case 0: return <StepPersonalInfo resumeData={resumeData} handlers={handlers} />;
        case 1: return <StepSummary resumeData={resumeData} handlers={handlers} loadingAi={loadingAi} />;
        case 2: return <StepExperience resumeData={resumeData} handlers={handlers} loadingAi={loadingAi} />;
        case 3: return <StepEducation resumeData={resumeData} handlers={handlers} />;
        case 4: return <StepProjects resumeData={resumeData} handlers={handlers} loadingAi={loadingAi} />;
        case 5: return <StepSkills resumeData={resumeData} handlers={handlers} />;
        case 6: return <StepSettingsDownload visibleSections={visibleSections} sectionOrder={sectionOrder} currentTemplate={currentTemplate} accentColor={accentColor} fontFamily={fontFamily} density={density} photoMode={photoMode} handlers={handlers} />;
        default: return null;
    }
  };

  return (
    <Layout>
      <Box sx={{ minHeight: '100vh', pt: 4, pb: 8 }}>
        <Container maxWidth="xl">
          <Snackbar open={saveSuccess} autoHideDuration={3000} onClose={() => setSaveSuccess(false)}>
            <Alert severity="success">Resume saved to Cloud!</Alert>
          </Snackbar>

          <Dialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)}>
            <DialogTitle>Save & Download</DialogTitle>
            <DialogContent sx={{ textAlign: 'center', p: 4 }}>
                <Typography mb={3}>Please sign in to save your progress to the cloud and download your resume.</Typography>
                <Box display="flex" justifyContent="center">
                    <GoogleLogin onSuccess={handleGoogleSuccess} theme="filled_black" width="250" />
                </Box>
            </DialogContent>
          </Dialog>

          <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4} alignItems="stretch">
            <Paper sx={{ width: { xs: '100%', lg: '45%' }, background: 'rgba(30, 41, 59, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}><WizardHeader steps={steps} activeStep={activeStep} /></Box>
                <Box sx={{ p: 4, flex: 1, color: 'white' }}>{renderStep()}</Box>
                <Box sx={{ p: 3, borderTop: '1px solid rgba(255,255,255,0.1)', bgcolor: 'rgba(0,0,0,0.2)' }}>
                   <WizardFooter activeStep={activeStep} stepsLength={steps.length} handleBack={handleBack} handleSave={handleManualSave} handleNext={handleNext} handleDownloadPDF={handleDownloadPDF} />
                </Box>
            </Paper>
            <Box sx={{ width: { xs: '100%', lg: '55%' }, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ResumeScore resumeData={resumeData} />
                <Box sx={{ width: '100%', minHeight: '297mm', bgcolor: 'white', boxShadow: '0 0 30px rgba(0,0,0,0.5)', color: 'black' }}>
                    <Box ref={previewRef} sx={{ height: '100%' }}>
                        <TemplateSelector templateName={currentTemplate} data={resumeData} theme={{ accentColor, fontFamily, density, photoMode }} visibleSections={visibleSections} sectionOrder={sectionOrder} />
                    </Box>
                </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
};

export default ResumeBuilder;