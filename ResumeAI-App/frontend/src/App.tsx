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
