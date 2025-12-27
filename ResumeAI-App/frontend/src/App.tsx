import React, { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Existing Components
import ATSChecker from './components/ATSChecker';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import RefundPolicy from './components/RefundPolicy';
import HomePage from './components/HomePage';
import AllTemplatesPage from './components/AllTemplatesPage';

// Main Resume Builder Component
import ResumeBuilder from './components/ResumeBuilder';

// New Features
import InterviewSimulator from './components/InterviewSimulator';
import GithubConverter from './components/GithubConverter';
import ColdEmail from './components/ColdEmail';
import Dashboard from './components/Dashboard';
import MarketingPage from './pages/MarketingPage';

function App() {
  const theme = useMemo(() => createTheme({ 
    typography: { fontFamily: '"Outfit", sans-serif' }, 
    palette: { primary: { main: '#7c3aed' }, mode: 'dark' } 
  }), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/builder" element={<ResumeBuilder />} />
          
          {/* Note: ATSChecker updated code doesn't need props */}
          <Route path="/ats" element={<ATSChecker />} /> 
          
          {/* ✅ FIXED: Added required props 'onSelect' and 'onBack' */}
          <Route 
            path="/templates" 
            element={
              <AllTemplatesPage 
                onSelect={(template: any) => console.log(template)} 
                onBack={() => window.location.href='/'} 
              />
            } 
          />
          <Route path="/start" element={<MarketingPage />} />
          {/* AI Tools */}
          <Route path="/interview" element={<InterviewSimulator />} />
          <Route path="/github" element={<GithubConverter />} />
          <Route path="/email" element={<ColdEmail />} />

          {/* ✅ FIXED: Added 'onBack' prop for Legal Pages */}
          <Route path="/privacy" element={<PrivacyPolicy onBack={() => window.location.href='/'} />} />
          <Route path="/terms" element={<TermsConditions onBack={() => window.location.href='/'} />} />
          <Route path="/refund" element={<RefundPolicy onBack={() => window.location.href='/'} />} />
        </Routes>
    </ThemeProvider>
  );
}

export default App;