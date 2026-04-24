import React, { useState, useMemo } from 'react';
import { Box, Button, Typography, LinearProgress, Chip } from '@mui/material';
import Layout from '../components/Layout';
import { useResume } from '../context/ResumeContext';
import { Download, ChevronRight, ChevronLeft, Layout as LayoutIcon, Cloud, CloudCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ResumeRenderer from '../components/renderer/ResumeRenderer';
import SectionEditor from '../components/SectionEditor';
import SectionManager from '../components/SectionManager';
import { useAuth } from '../context/AuthContext';
import { PREMIUM_TEMPLATES } from '../templates/TemplateRegistry';
import LoginModal from '../components/LoginModal';
import PremiumModal from '../components/PremiumModal';
import SEO from '../components/SEO';
import { useAutoSave } from '../hooks/useAutoSave';

// ─── Autosave status indicator ───────────────────────────────────────────────
// Watches resume changes and shows "Saving…" / "Saved" feedback
const useAutoSaveStatus = (isAuthenticated: boolean, resume: any) => {
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const timerRef = React.useRef<ReturnType<typeof setTimeout>>();

    React.useEffect(() => {
        if (!isAuthenticated) return;
        setStatus('saving');
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setStatus('saved');
            setTimeout(() => setStatus('idle'), 2500);
        }, 2200); // slightly after the 2s debounce in useAutoSave
        return () => clearTimeout(timerRef.current);
    }, [resume, isAuthenticated]);

    return status;
};

const BuilderPage = () => {
    const { resume } = useResume();
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const [isManagerOpen, setIsManagerOpen] = useState(false);
    const [showPreviewMobile, setShowPreviewMobile] = useState(false);

    // Modal States
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isPremiumOpen, setIsPremiumOpen] = useState(false);

    // Autosave: syncs to MongoDB when logged in, localStorage otherwise
    useAutoSave();
    const saveStatus = useAutoSaveStatus(isAuthenticated, resume);

    // Memoised so a new array reference isn't created on every render
    const steps = useMemo(() => resume.sections.filter(s => s.isVisible), [resume.sections]);

    // Sync activeStep if steps change (removed or reordered)
    React.useEffect(() => {
        if (activeStep >= steps.length && steps.length > 0) {
            setActiveStep(steps.length - 1);
        }
    }, [steps.length, activeStep]);

    const progress = steps.length > 0 ? ((activeStep + 1) / steps.length) * 100 : 0;
    const isLastStep = activeStep === steps.length - 1;

    const handleDownload = () => {
        if (!isAuthenticated) { setIsLoginOpen(true); return; }
        if (PREMIUM_TEMPLATES.has(resume.templateId) && !user?.isPremium) {
            setIsPremiumOpen(true); return;
        }
        window.print();
    };

    // ─── Save status indicator chip ─────────────────────────────────
    const SaveIndicator = () => {
        if (!isAuthenticated || saveStatus === 'idle') return null;
        return (
            <Chip
                icon={saveStatus === 'saving'
                    ? <Cloud size={14} />
                    : <CloudCheck size={14} />}
                label={saveStatus === 'saving' ? 'Saving…' : 'Saved'}
                size="small"
                sx={{
                    fontSize: '0.7rem',
                    color: saveStatus === 'saved' ? '#4ade80' : '#94a3b8',
                    bgcolor: 'transparent',
                    border: '1px solid',
                    borderColor: saveStatus === 'saved' ? 'rgba(74,222,128,0.3)' : 'rgba(148,163,184,0.2)',
                    transition: 'all 0.3s ease',
                }}
            />
        );
    };

    return (
        <Layout>
            <SEO 
                title="AI Resume Builder | Create ATS-Friendly Resume"
                description="Use our free AI resume builder to create a professional, ATS-optimized resume. Choose from premium templates and land your dream job in India."
                keywords="resume builder, AI resume maker, ATS friendly resume, online resume builder, professional CV maker"
            />
            {/* PRINT CONTAINER (Hidden on Screen) */}
            <div id="print-container">
                <ResumeRenderer key={resume.templateId} templateId={resume.templateId} data={resume} />
                {!user?.isPremium && (
                    <div className="watermark">
                        Created with <b>ResumeAI</b> • resume-ai.co.in
                    </div>
                )}
            </div>

            {/* BUILDER CONTAINER */}
            <Box
                // data-lenis-prevent
                sx={{
                    height: 'calc(100vh - 80px)',
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    // Prevent the page / parent from scrolling — only inner panels should scroll
                    overflow: 'hidden',
                    bgcolor: 'background.default',
                    // allow children with flex and minHeight: 0 to properly constrain
                    minHeight: 0,
                    flex: 1,
                }}
            >
                {/* ── LEFT NAV (desktop) ─────────────────────────────────── */}
                <Box sx={{
                    display: { xs: 'none', md: 'flex' },
                    width: 220,
                    flexDirection: 'column',
                    bgcolor: 'background.paper',
                    borderRight: 1,
                    borderColor: 'divider',
                    px: 2,
                    py: 3,
                    minHeight: 0,
                }}>
                    <Typography variant="overline" sx={{ color: 'text.secondary', mb: 1, letterSpacing: 1 }}>SECTIONS</Typography>
                    <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3, mb: 2 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto', minHeight: 0 }}>
                        {steps.map((s, idx) => (
                            <Button
                                key={s.id}
                                onClick={() => setActiveStep(idx)}
                                size="small"
                                fullWidth
                                sx={{
                                    justifyContent: 'flex-start',
                                    textTransform: 'none',
                                    color: idx === activeStep ? 'primary.main' : 'text.secondary',
                                    bgcolor: idx === activeStep ? 'action.selected' : 'transparent',
                                    px: 1.5,
                                }}
                            >
                                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: idx === activeStep ? 'primary.main' : 'divider', mr: 1.5 }} />
                                {s.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flex: 1 }} />
                    <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2, borderStyle: 'dashed' }}>Upgrade to Pro</Button>
                </Box>

                {/* ── LEFT PANEL: EDITOR ──────────────────────────────────── */}
                <Box sx={{
                    width: { xs: '100%', md: '40%' },
                    height: { xs: showPreviewMobile ? '0' : '100%', md: '100%' },
                    overflow: 'auto',
                    display: { xs: showPreviewMobile ? 'none' : 'flex', md: 'flex' },
                    flexDirection: 'column',
                    borderRight: { xs: 0, md: 1 },
                    borderBottom: { xs: 1, md: 0 },
                    borderColor: 'divider',
                    // critical for nested flex children to allow inner scrolling
                    minHeight: 0,
                    bgcolor: 'background.paper',
                    alignItems: 'center',
                }}>

                    {/* ── Toolbar ── */}
                    <Box sx={{
                        px: 2, py: 1.5,
                        borderBottom: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 1,
                        flexShrink: 0,
                    }}>
                        <Button
                            startIcon={<LayoutIcon size={15} />}
                            onClick={() => navigate('/templates')}
                            size="small"
                            color="inherit"
                            sx={{ fontSize: { xs: '0.7rem', sm: '0.8rem' }, minWidth: 0, px: 1 }}
                        >
                            Template
                        </Button>

                        <SaveIndicator />

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {!user?.isPremium && (
                                <Button
                                    onClick={() => setIsPremiumOpen(true)}
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    sx={{ display: { xs: 'none', sm: 'inline-flex' }, fontSize: '0.75rem' }}
                                >
                                    Pro
                                </Button>
                            )}
                            {/* Mobile: toggle to preview */}
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setShowPreviewMobile(true)}
                                sx={{ display: { xs: 'inline-flex', md: 'none' }, fontSize: '0.7rem', px: 1 }}
                            >
                                Preview
                            </Button>
                        </Box>
                    </Box>

                    {/* ── Progress Bar ── */}
                    <Box sx={{ px: 2, pt: 1.5, pb: 0.5, flexShrink: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                                Step {activeStep + 1} of {steps.length}
                            </Typography>
                            <Typography variant="caption" fontWeight={700} color="primary">
                                {steps[activeStep]?.title || 'Editor'}
                            </Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{
                                height: 4,
                                borderRadius: 2,
                                bgcolor: 'rgba(255,255,255,0.06)',
                                '& .MuiLinearProgress-bar': { borderRadius: 2 },
                            }}
                        />
                    </Box>

                    {/* ── Step Content (Scrollable) ── */}
                    <Box sx={{ flex: 1, overflowY: 'auto', minHeight: 0, scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' as any }}>
                        {steps[activeStep] && (
                            <SectionEditor
                                key={steps[activeStep].id}
                                type={steps[activeStep].type}
                                sectionId={steps[activeStep].id}
                            />
                        )}
                    </Box>

                    {/* ── Navigation Footer ── */}
                    <Box sx={{
                        p: { xs: 1.5, sm: 2 },
                        borderTop: 1,
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        flexShrink: 0,
                    }}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={() => setIsManagerOpen(true)}
                            size="small"
                            sx={{ borderStyle: 'dashed', fontSize: '0.8rem' }}
                        >
                            Manage Sections (Reorder / Add)
                        </Button>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={() => setActiveStep(p => p - 1)}
                                startIcon={<ChevronLeft size={16} />}
                                size="small"
                            >
                                Back
                            </Button>
                            {isLastStep ? (
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleDownload}
                                    endIcon={<Download size={15} />}
                                    size="small"
                                >
                                    Download PDF
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={() => setActiveStep(p => p + 1)}
                                    endIcon={<ChevronRight size={16} />}
                                    size="small"
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Box>

                    {/* Modals */}
                    <SectionManager open={isManagerOpen} onClose={() => setIsManagerOpen(false)} />
                    <LoginModal open={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
                    <PremiumModal open={isPremiumOpen} onClose={() => setIsPremiumOpen(false)} />
                </Box>

                {/* ── RIGHT PANEL: PREVIEW ────────────────────────────────── */}
                <Box sx={{
                    flex: 1,
                    bgcolor: '#475569',
                    p: { xs: 2, md: 3 },
                    display: { xs: showPreviewMobile ? 'flex' : 'none', md: 'flex' },
                    flexDirection: 'column',
                    alignItems: 'center',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    minHeight: 0,
                    position: 'relative',
                    height: '100%', 
                }}>
                    {/* Mobile: Back to editor button */}
                    <Box sx={{
                        display: { xs: 'flex', md: 'none' },
                        width: '100%',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                        flexShrink: 0,
                    }}>
                        <Button
                            size="small"
                            variant="contained"
                            color="inherit"
                            onClick={() => setShowPreviewMobile(false)}
                            startIcon={<ChevronLeft size={15} />}
                            sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white' }}
                        >
                            Back to Editor
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={handleDownload}
                            startIcon={<Download size={15} />}
                        >
                            Download
                        </Button>
                    </Box>

                    {/* A4 Preview — wrapper collapses layout footprint to visual size */}
                    <Box sx={{
                        width: {
                            xs: 'calc(210mm * 0.38)',
                            sm: 'calc(210mm * 0.55)',
                            md: 'calc(210mm * 0.72)',
                            lg: 'calc(210mm * 0.82)',
                        },
                        height: {
                            xs: 'calc(297mm * 0.38)',
                            sm: 'calc(297mm * 0.55)',
                            md: 'calc(297mm * 0.72)',
                            lg: 'calc(297mm * 0.82)',
                        },
                        position: 'relative',
                        mb: 3,
                        flexShrink: 0,
                        mx: 'auto',
                    }}>
                        <Box sx={{
                            width: '210mm',
                            minHeight: '297mm',
                            bgcolor: 'white',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                            transform: {
                                xs: 'scale(0.38)',
                                sm: 'scale(0.55)',
                                md: 'scale(0.72)',
                                lg: 'scale(0.82)',
                            },
                            transformOrigin: 'top left',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            overflow: 'visible',
                        }}>
                            <ResumeRenderer key={resume.templateId} templateId={resume.templateId} data={resume} />
                        </Box>
                    </Box>
                </Box>

                {/* Floating Download — desktop only (mobile has inline button) */}
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<Download size={16} />}
                    onClick={handleDownload}
                    sx={{
                        display: { xs: 'none', md: 'inline-flex' },
                        position: 'fixed',
                        bottom: 28,
                        right: 28,
                        borderRadius: 10,
                        px: 3,
                        py: 1.5,
                        zIndex: 50,
                        boxShadow: '0 8px 32px rgba(34,197,94,0.35)',
                    }}
                >
                    Download PDF
                </Button>
            </Box>
        </Layout>
    );
};

export default BuilderPage;
