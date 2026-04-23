import { useMemo, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, CircularProgress, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from 'react-helmet-async';

/* ================= CONTEXT ================= */
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';

/* ================= COMPONENT IMPORTS (STATIC) ================= */
// Keep HomePage static for instant LCP (Largest Contentful Paint)
import HomePage from './components/HomePage';

/* ================= LAZY LOADED PAGES ================= */
const Dashboard = lazy(() => import('./components/Dashboard'));
const BuilderPage = lazy(() => import('./pages/BuilderPage'));
const TemplateSelectPage = lazy(() => import('./pages/TemplateSelectPage'));
const AuthSuccess = lazy(() => import('./pages/AuthSuccess'));
const MarketingPage = lazy(() => import('./pages/MarketingPage'));
const SEOLandingPage = lazy(() => import('./pages/SEOLandingPage'));

// Premium Tools
const InterviewSimulator = lazy(() => import('./components/InterviewSimulator'));
const GithubConverter = lazy(() => import('./components/GithubConverter'));
const ColdEmail = lazy(() => import('./components/ColdEmail'));

// Legal
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./components/TermsConditions'));
const RefundPolicy = lazy(() => import('./components/RefundPolicy'));

/* ================= ROUTE GUARDS ================= */
import ProtectedRoute from './components/ProtectedRoute';
import PremiumGate from './components/PremiumGate';
import ATSChecker from './components/ATSChecker';

// Simple Loading Component
const LoadingFallback = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'background.default' }}>
    <CircularProgress color="primary" />
  </Box>
);

import { usePageTracking } from './hooks/usePageTracking';

function App() {
  usePageTracking();
  
  const theme = useMemo(
    () =>
      createTheme({
        typography: { fontFamily: '"Outfit", sans-serif' },
        palette: {
          mode: 'dark',
          primary: { main: '#8b5cf6' },
          background: {
            default: '#020617',
            paper: '#0f172a',
          },
        },
      }),
    []
  );

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <ResumeProvider>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>

                  {/* ================= PUBLIC ================= */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/start" element={<MarketingPage />} />
                  <Route path="/auth-success" element={<AuthSuccess />} />

                  {/* ================= SEO LANDING PAGES (INDIA FOCUS) ================= */}
                  <Route path="/free-resume-builder-india" element={
                    <SEOLandingPage
                      seoTitle="Free Resume Builder India | ATS Friendly CV Maker"
                      seoDesc="Build a free ATS-friendly resume in India. Pass Naukri and company portals easily with our AI resume maker."
                      seoKeywords="free resume builder india, resume maker india, ATS resume india"
                      h1={<>Free Resume Builder <br/><span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #c084fc 50%, #22c55e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>for India</span></>}
                      subtitle="Designed specifically to pass ATS filters at top Indian companies. Build your professional resume in 5 minutes for free."
                      targetAudience="INDIAN JOB SEEKERS"
                    />
                  } />
                  <Route path="/ats-resume-checker-free" element={
                    <SEOLandingPage
                      seoTitle="ATS Resume Checker Free | AI Resume Scanner"
                      seoDesc="Check your ATS score for free. Find missing keywords and fix your resume format instantly."
                      seoKeywords="ats resume checker free, ats score, resume scanner online"
                      h1={<>ATS Resume Checker <br/><span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #c084fc 50%, #22c55e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Free Online</span></>}
                      subtitle="Stop getting rejected by bots. Instantly scan your resume against job descriptions and get actionable feedback."
                      targetAudience="FRUSTRATED APPLICANTS"
                    />
                  } />
                  <Route path="/resume-builder-for-freshers" element={
                    <SEOLandingPage
                      seoTitle="Resume Builder for Freshers | Best CV Format"
                      seoDesc="The best resume builder for freshers and college students in India. Highlight your skills without experience."
                      seoKeywords="resume builder for freshers, best resume format for fresher, student resume maker"
                      h1={<>Best Resume Builder <br/><span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #c084fc 50%, #22c55e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>for Freshers</span></>}
                      subtitle="No experience? No problem. Use our AI to highlight your projects, skills, and education to land your first job."
                      targetAudience="COLLEGE STUDENTS & GRADUATES"
                    />
                  } />
                  <Route path="/ai-resume-builder-india" element={
                    <SEOLandingPage
                      seoTitle="AI Resume Builder India | Smart CV Generator"
                      seoDesc="Use AI to write your resume bullet points. The smartest AI resume builder tailored for the Indian IT market."
                      seoKeywords="ai resume builder india, chatgpt resume maker, smart cv generator"
                      h1={<>The Smartest AI <br/><span style={{ background: 'linear-gradient(135deg, #60a5fa 0%, #c084fc 50%, #22c55e 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Resume Builder</span></>}
                      subtitle="Let AI write your resume. Generate perfectly phrased, keyword-rich bullet points optimized for Indian recruiters."
                      targetAudience="TECH PROFESSIONALS"
                    />
                  } />

                  {/* ================= DASHBOARD ================= */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* ================= TEMPLATES ================= */}
                  <Route path="/templates" element={<TemplateSelectPage />} />

                  {/* ================= RESUME BUILDER (CORE) ================= */}
                  <Route
                    path="/builder"
                    element={
                      // <ProtectedRoute>
                      <BuilderPage />
                      // </ProtectedRoute>
                    }
                  />

                  {/* ================= PREMIUM TOOLS ================= */}
                  <Route
                    path="/interview"
                    element={
                      <PremiumGate>
                        <InterviewSimulator />
                      </PremiumGate>
                    }
                  />

                  <Route
                    path="/github"
                    element={
                      <PremiumGate>
                        <GithubConverter />
                      </PremiumGate>
                    }
                  />

                  <Route
                    path="/email"
                    element={
                      <PremiumGate>
                        <ColdEmail />
                      </PremiumGate>
                    }
                  />

                  {/* ================= ATS ================= */}
                  <Route
                    path="/ats"
                    element={<ATSChecker />}
                  />


                  {/* ================= LEGAL ================= */}
                  <Route
                    path="/privacy"
                    element={<PrivacyPolicy />}
                  />
                  <Route
                    path="/terms"
                    element={<TermsConditions />}
                  />
                  <Route
                    path="/refund"
                    element={<RefundPolicy />}
                  />

                  {/* ================= FALLBACK ================= */}
                  <Route path="*" element={<HomePage />} />

                </Routes>
              </Suspense>
            </ResumeProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
