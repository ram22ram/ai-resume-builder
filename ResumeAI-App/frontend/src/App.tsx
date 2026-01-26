import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { HelmetProvider } from 'react-helmet-async';

// ✅ CONTEXT PROVIDERS
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';

// ✅ PAGES / COMPONENTS
import HomePage from './components/HomePage';
import ResumeBuilder from './components/ResumeBuilder';
import Dashboard from './components/Dashboard';
import ATSChecker from './components/ATSChecker';
import InterviewSimulator from './components/InterviewSimulator';
import GithubConverter from './components/GithubConverter';
import ColdEmail from './components/ColdEmail';

import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import RefundPolicy from './components/RefundPolicy';

import AuthSuccess from './pages/AuthSuccess';
import MarketingPage from './pages/MarketingPage';
import ProtectedRoute from './components/ProtectedRoute';

// --- PLACEHOLDERS ---
const SalaryToolsPlaceholder = () => (
  <div style={{ color: 'white', padding: 50 }}>
    Salary Tools & Negotiation Script coming soon...
  </div>
);

const CareerAdvicePlaceholder = () => (
  <div style={{ color: 'white', padding: 50 }}>
    Personalized Career Roadmaps coming soon...
  </div>
);

function App() {
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
              {/* ✅ IMPORTANT: ResumeProvider wraps Routes */}
              <ResumeProvider>
                <Routes>
                  {/* PUBLIC */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/start" element={<MarketingPage />} />
                  <Route path="/auth-success" element={<AuthSuccess />} />

                  {/* DASHBOARD (PROTECTED) */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  {/* ✅ RESUME BUILDER (NOW SAFE) */}
                  <Route path="/builder" element={<ResumeBuilder />} />

                  {/* TOOLS */}
                  <Route path="/ats" element={<ATSChecker />} />
                  <Route path="/interview" element={<InterviewSimulator />} />
                  <Route path="/github" element={<GithubConverter />} />
                  <Route path="/email" element={<ColdEmail />} />
                  <Route path="/salary-tools" element={<SalaryToolsPlaceholder />} />
                  <Route path="/career-advice" element={<CareerAdvicePlaceholder />} />

                  {/* LEGAL */}
                  <Route
                    path="/privacy"
                    element={<PrivacyPolicy onBack={() => window.history.back()} />}
                  />
                  <Route
                    path="/terms"
                    element={<TermsConditions onBack={() => window.history.back()} />}
                  />
                  <Route
                    path="/refund"
                    element={<RefundPolicy onBack={() => window.history.back()} />}
                  />

                  {/* FALLBACK */}
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </ResumeProvider>
            </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
