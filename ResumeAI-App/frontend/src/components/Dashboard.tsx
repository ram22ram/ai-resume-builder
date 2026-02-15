import React from 'react';
import { 
  Sparkles, FileText, Activity, 
  Map as MapIcon, Download, Upload 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';
import Layout from './Layout';

// --- Types (Internal) ---
type StepStatus = 'active' | 'locked';
interface JourneyStep {
  id: number;
  title: string;
  description: string;
  status: StepStatus;
  unlockText?: string;
  path: string;
}

// --- Inbuilt Sub-Component: JourneyStep ---
const JourneyStepItem: React.FC<{ step: JourneyStep; onNavigate: (path: string) => void }> = ({ step, onNavigate }) => (
  <div 
    className={`step ${step.status}`} 
    onClick={() => step.status === 'active' && onNavigate(step.path)}
  >
    <span className="dot" />
    <div>
      <h3>
        {step.title}
        {step.status === 'active' && <small>Ready</small>}
      </h3>
      <p>{step.description}</p>
      {step.status === 'active' ? (
        <span className="start-link" style={{color: '#818cf8', fontSize: '13px', fontWeight: 600}}>Start Now →</span>
      ) : (
        <em>{step.unlockText}</em>
      )}
    </div>
  </div>
);

// --- Inbuilt Sub-Component: StatsBar ---
const StatsBar: React.FC<{ data: any }> = ({ data }) => (
  <footer className="stats">
    <div>
      <strong>{data.resumes || 0}</strong>
      <span>Resumes Created</span>
    </div>
    <div>
      <strong>{data.apps || 0}</strong>
      <span>Applications</span>
    </div>
    <div>
      <strong>{data.ats || '0%'}</strong>
      <span>Avg ATS Score</span>
    </div>
    <div>
      <strong>{data.interviews || '--'}</strong>
      <span>Next Interview</span>
    </div>
  </footer>
);

// --- Main Dashboard Component ---
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Dynamic Data Based on User Progress
  const journeySteps: JourneyStep[] = [
    { 
      id: 1, 
      title: 'Create Master Resume', 
      description: 'Build a comprehensive resume with all your experiences.', 
      status: 'active', 
      path: '/builder' 
    },
    { 
      id: 2, 
      title: 'Optimize for ATS', 
      description: 'Ensure your resume passes applicant tracking systems.', 
      status: user?.resumeCreated ? 'active' : 'locked', 
      unlockText: 'Complete Step 1 to unlock',
      path: '/ats' 
    },
    { 
      id: 3, 
      title: 'Mock Interview Prep', 
      description: 'Practice with AI-powered interview scenarios.', 
      status: 'locked', 
      unlockText: 'Complete Step 2 to unlock',
      path: '/interview' 
    },
    { 
      id: 4, 
      title: 'Outreach & Cold Email', 
      description: 'Craft compelling outreach messages.', 
      status: 'locked', 
      unlockText: 'Complete Step 3 to unlock',
      path: '/email' 
    },
  ];

  return (
    <Layout>
       <div className="dashboard">
      <header>
        <h1>Welcome back, <span>{user?.name?.split(' ')[0] || 'User'}</span></h1>
        <p>Your career command center is ready. Let's land your dream job.</p>
      </header>

      <div className="grid">
        {/* LEFT: Journey */}
        <section className="card journey">
          <h2><MapIcon size={20} color="#818cf8"/> Your Application Journey</h2>
          <div style={{ position: 'relative', marginTop: '20px' }}>
            <div style={{ position: 'absolute', left: '6px', top: '10px', bottom: '40px', width: '2px', background: 'rgba(255,255,255,0.05)' }} />
            {journeySteps.map(step => (
              <JourneyStepItem key={step.id} step={step} onNavigate={(path) => navigate(path)} />
            ))}
          </div>
        </section>

        {/* CENTER: Template */}
        <section className="card template">
          {/* ✅ UPGRADE BANNER (New) */}
          {!user?.isPremium && (
            <div style={{
              background: 'linear-gradient(45deg, #f59e0b, #d97706)',
              borderRadius: '8px', padding: '12px', marginBottom: '20px',
              color: 'white', textAlign: 'center', cursor: 'pointer'
            }} onClick={() => navigate('/pricing')}>
              <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Sparkles size={16} fill="white" /> Upgrade to Pro
              </h4>
              <p style={{ margin: '4px 0 0', fontSize: '13px', opacity: 0.9 }}>Unlock Premium Templates & AI Writer</p>
            </div>
          )}

          <div className="template-head">
            <h2><Sparkles size={20} color="#eab308"/> Template of the Week</h2>
            <span className="badge">Trending</span>
          </div>

          <div className="template-box" onClick={() => navigate('/builder')} style={{cursor: 'pointer'}}>
            <div className="shimmer" />
            <FileText size={40} color="#6366f1" style={{ marginBottom: '10px', position: 'relative' }} />
            <p style={{position: 'relative'}}>Minimalist Pro Template</p>
          </div>

          <p className="desc">
            Recruiters are loving minimal designs this month. Clean layouts with
            strong typography stand out in 2025.
          </p>

          <button onClick={() => navigate('/builder')} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
            <Download size={18} /> Use This Template
          </button>
        </section>

        {/* RIGHT: Tools */}
        <section className="card side">
          <div className="health">
            <h2 style={{ justifyContent: 'center' }}><Activity size={20} color="#3b82f6"/> Resume Health</h2>
            <div className="circle">{user?.atsScore || 'No Data'}</div>
            <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '15px' }}>Upload your resume to see ATS score.</p>
            <button className="blue" onClick={() => navigate('/ats')} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}}>
              <Upload size={18} /> Upload Resume
            </button>
          </div>

          {/* ✅ DOWNLOAD HISTORY (New) */}
          <div className="resources" style={{ marginTop: '20px' }}>
            <h2><Download size={20} color="#10b981"/> Recent Downloads</h2>
            {(user?.resumesCreated ?? 0) > 0 ? (
              <ul style={{ maxHeight: '150px', overflowY: 'auto' }}>
                <li style={{ fontSize: '13px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: 'white' }}>Minimalist Resume.pdf</span>
                  <br/><span style={{ fontSize: '11px', color: '#64748b' }}>Just now</span>
                </li>
              </ul>
            ) : (
                <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', padding: '10px' }}>No downloads yet</p>
            )}
          </div>
        </section>
      </div>

      <StatsBar data={{
        resumes: user?.resumesCreated,
        apps: user?.applicationsCount,
        ats: user?.atsScore,
        interviews: user?.nextInterview
      }} />
    </div>
    </Layout>
  );
};

export default Dashboard;