import React, { useState } from 'react';
import { Box, Button, Container, Grid, Typography, IconButton } from '@mui/material';
import Layout from '../components/Layout';
import { useResume } from '../context/ResumeContext';
import { Download, ChevronRight, ChevronLeft, Layout as LayoutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ResumeRenderer from '../components/renderer/ResumeRenderer';

const BuilderPage = () => {
    const { resume } = useResume();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    // This will eventually be mapped to the `resume.sections`
    const steps = resume.sections.filter(s => s.isVisible);

    return (
        <Layout>
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
                    <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4 }}>
                         {/* DYNAMIC FORM COMPONENT WILL GO HERE */}
                         <Box sx={{ textAlign: 'center', py: 10, color: '#94a3b8' }}>
                             Form for: {steps[activeStep]?.title}
                             <br/>
                             (Coming in Phase 4)
                         </Box>
                    </Box>

                    {/* Navigation Footer */}
                    <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
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
                        <ResumeRenderer data={resume} />
                    </Box>

                    {/* Floating Action Button for Download (Mobile/Desktop) */}
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<Download />}
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
