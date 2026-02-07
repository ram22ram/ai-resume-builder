import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Layout from '../components/Layout';
import { useResume } from '../context/ResumeContext';
import { Download, ChevronRight, ChevronLeft, Layout as LayoutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ResumeRenderer from '../components/TemplateRenderer';
import SectionEditor from '../components/SectionEditor';

import SectionManager from '../components/SectionManager';
import { useAuth } from '../context/AuthContext';
import { getTemplate } from '../data/templates';

import LoginModal from '../components/LoginModal';
import PremiumModal from '../components/PremiumModal';

const BuilderPage = () => {
    const { resume } = useResume();
    const { user, isAuthenticated } = useAuth(); 
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [isManagerOpen, setIsManagerOpen] = useState(false);
    
    // Modal States
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPremiumOpen, setIsPremiumOpen] = useState(false);

    // This will eventually be mapped to the `resume.sections`
    const steps = resume.sections.filter(s => s.isVisible);

    const handleDownload = () => {
        // 1. Check Auth
        if (!isAuthenticated) {
            setIsLoginOpen(true);
            return;
        }

        // 2. Check Premium
        const templateConfig = getTemplate(resume.templateId);
        
        if (templateConfig.isPremium && !user?.isPremium) {
            setIsPremiumOpen(true);
            return;
        }

        // 3. Trigger Print
        window.print();
    };

    return (
        <Layout>
            {/* PRINT CONTAINER (Hidden on Screen) */}
            <div id="print-container">
                <ResumeRenderer template={resume.templateId} data={resume} />
            </div>

            <Box sx={{ height: 'calc(100vh - 64px)', display: 'flex', overflow: 'hidden', bgcolor: '#f8fafc' }}>
                
                {/* --- LEFT PANEL: EDITOR (40-50%) --- */}
                <Box sx={{ width: '45%', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
                    
                    {/* Toolbar */}
                    <Box sx={{ p: 2, borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <Button startIcon={<LayoutIcon size={16}/>} onClick={() => navigate('/templates')} size="small" color="inherit">
                             Change Template
                         </Button>
                         <Box>
                             {/* Progress or Step Name */}
                             <Typography variant="subtitle2" fontWeight="bold" color="primary">
                                 {steps[activeStep]?.title || 'Editor'}
                             </Typography>
                         </Box>
                    </Box>

                    {/* Step Navigator (Scrollable) */}
                    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 0 }}>
                         {steps[activeStep] && (
                             <SectionEditor 
                                 type={steps[activeStep].type} 
                                 sectionId={steps[activeStep].id} 
                             />
                         )}
                    </Box>

                    {/* Navigation Footer */}
                    <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', gap: 2 }}>
                         <Button 
                            variant="outlined" 
                            color="secondary" 
                            fullWidth 
                            onClick={() => setIsManagerOpen(true)}
                            sx={{ borderStyle: 'dashed' }}
                        >
                            Manage Sections (Reorder / Add)
                        </Button>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <Button 
                                disabled={activeStep === 0} 
                                onClick={() => setActiveStep(p => p - 1)}
                                startIcon={<ChevronLeft />}
                            >
                                Back
                            </Button>
                            <Button 
                                variant="contained" 
                                onClick={() => setActiveStep(p => Math.min(p + 1, steps.length - 1))}
                                endIcon={<ChevronRight />}
                            >
                                Next Step
                            </Button>
                        </Box>
                    </Box>

                    {/* Section Manager Modal */}
                    <SectionManager open={isManagerOpen} onClose={() => setIsManagerOpen(false)} />
                    
                    {/* Auth & Premium Modals */}
                    <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                    <PremiumModal open={isPremiumOpen} onClose={() => setIsPremiumOpen(false)} />
                </Box>



                {/* --- RIGHT PANEL: PREVIEW (55-60%) --- */}
                <Box sx={{ flexGrow: 1, bgcolor: '#64748b', p: 4, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto' }}>


                    {/* A4 Page Container */}
                    <Box 
                        sx={{ 
                            width: '210mm', 
                            minHeight: '297mm', 
                            bgcolor: 'white', 
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            transform: 'scale(0.85)',
                            transformOrigin: 'top center',
                            mb: 10,
                            overflow: 'hidden' 
                        }}
                    >
                        <ResumeRenderer template={resume.templateId} data={resume} />
                    </Box>

                    {/* Floating Action Button for Download (Mobile/Desktop) */}
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<Download />}
                        onClick={handleDownload}
                        sx={{ position: 'fixed', bottom: 30, right: 30, borderRadius: 10, px: 4, py: 1.5, zIndex: 50 }}
                    >
                        Download PDF
                    </Button>
                </Box>

            </Box>
        </Layout>
    );
};

export default BuilderPage;
