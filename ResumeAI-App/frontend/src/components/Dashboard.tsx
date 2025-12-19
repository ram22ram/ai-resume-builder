import React from 'react';
import {
  Map, FileText, Lock, Mic, Send, ArrowRight,
  Sparkles, Download, Lightbulb, AlertCircle,
  Activity, FileQuestion, Upload, BookOpen,
  MessageCircle, ShieldCheck, Target, LucideIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// --- Types & Interfaces ---
export interface JourneyStepData {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'active' | 'locked';
  unlockCondition?: string;
}

export interface ResourceData {
  id: number;
  title: string;
  duration: string;
  icon: LucideIcon;
  colorTheme: 'orange' | 'blue' | 'purple';
}

// --- Constants & Fake Data ---
const MOCK_JOURNEY_STEPS: JourneyStepData[] = [
  { id: 1, title: 'Create Master Resume', description: 'Build a comprehensive resume with all your experiences.', icon: FileText, status: 'active' },
  { id: 2, title: 'Optimize for ATS', description: 'Ensure your resume passes applicant tracking systems.', icon: Lock, status: 'locked', unlockCondition: 'Complete Step 1 to unlock' },
  { id: 3, title: 'Mock Interview Prep', description: 'Practice with AI-powered interview scenarios.', icon: Mic, status: 'locked', unlockCondition: 'Complete Step 2 to unlock' },
  { id: 4, title: 'Outreach & Cold Email', description: 'Craft compelling outreach messages to hiring managers.', icon: Send, status: 'locked', unlockCondition: 'Complete Step 3 to unlock' }
];

const MOCK_RESOURCES: ResourceData[] = [
  { id: 1, title: 'Top 10 Interview Questions for 2025', duration: '5 min read', icon: MessageCircle, colorTheme: 'orange' },
  { id: 2, title: 'How to Beat the ATS System', duration: '8 min read', icon: ShieldCheck, colorTheme: 'blue' },
  { id: 3, title: 'Crafting a Standout Summary', duration: '6 min read', icon: Target, colorTheme: 'purple' }
];

// --- Custom Styles (Scoped to Dashboard) ---
const DASHBOARD_STYLES = `
  /* Force Dashboard specific fonts and resets */
  .dashboard-container { font-family: 'Outfit', sans-serif; }
  
  .glass-card { background: rgba(30, 41, 59, 0.5); backdrop-filter: blur(16px); border: 1px solid rgba(148, 163, 184, 0.1); }
  .glass-card-hover { transition: all 0.3s ease; }
  .glass-card-hover:hover { background: rgba(30, 41, 59, 0.7); border-color: rgba(148, 163, 184, 0.2); transform: translateY(-2px); }
  
  .gradient-text-dash { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  
  .timeline-line { position: absolute; left: 15px; top: 40px; bottom: 40px; width: 2px; background: linear-gradient(180deg, #667eea 0%, rgba(102, 126, 234, 0.2) 100%); }
  
  .step-indicator { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 10; }
  .step-active { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); box-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
  .step-locked { background: rgba(51, 65, 85, 0.5); border: 2px solid rgba(148, 163, 184, 0.2); }
  
  .template-preview { background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%); border: 2px dashed rgba(102, 126, 234, 0.3); position: relative; }
  
  .pulse-dot { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
  
  .shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent); animation: shimmer 2s infinite; position: absolute; inset: 0; z-index: 0; }
  @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
`;

// --- Sub-Components ---

const JourneyStepItem: React.FC<{ step: JourneyStepData; isLast: boolean; onClick: (link: string) => void }> = ({ step, isLast, onClick }) => {
  const StepIcon = step.icon;
  const isActive = step.status === 'active';

  // Map steps to routes
  const getRoute = (id: number) => {
    switch(id) {
      case 1: return '/builder';
      case 2: return '/ats';
      case 3: return '/interview';
      case 4: return '/email';
      default: return '#';
    }
  };

  return (
    <div
      className={`relative ${!isLast ? 'mb-8' : ''} flex gap-4 ${isActive ? 'cursor-pointer group' : 'opacity-60'}`}
      onClick={() => isActive && onClick(getRoute(step.id))}
    >
      <div className={`step-indicator flex-shrink-0 ${isActive ? 'step-active' : 'step-locked'}`}>
        <StepIcon className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className={`font-semibold ${isActive ? 'text-white' : ''}`}>
            {step.title}
          </h3>
          <span className={`text-xs px-2 py-1 rounded-full ${isActive ? 'bg-green-500/20 text-green-400 pulse-dot' : 'bg-slate-700 text-slate-400'}`}>
            {isActive ? 'Ready' : 'Locked'}
          </span>
        </div>
        <p className={`text-sm mb-2 ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
          {step.description}
        </p>
        {isActive ? (
          <button className="text-sm text-purple-400 hover:text-purple-300 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Start Now <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <p className="text-xs text-slate-600">{step.unlockCondition}</p>
        )}
      </div>
    </div>
  );
};

const InsightCard: React.FC<{ title: string; subtitle: string; description: React.ReactNode; icon: LucideIcon; iconBgClass: string; iconColorClass: string }> = ({
  title, subtitle, description, icon: Icon, iconBgClass, iconColorClass
}) => (
  <div className="glass-card glass-card-hover rounded-xl p-5">
    <div className="flex items-start gap-3 mb-3">
      <div className={`w-10 h-10 rounded-lg ${iconBgClass} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-5 h-5 ${iconColorClass}`} />
      </div>
      <div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-slate-400">{subtitle}</p>
      </div>
    </div>
    <p className="text-sm text-slate-300">{description}</p>
  </div>
);

const ResourceItem: React.FC<{ resource: ResourceData }> = ({ resource }) => {
  const ResourceIcon = resource.icon;
  const colorMap = {
    orange: { bg: 'bg-orange-500/20', text: 'text-orange-400' },
    blue: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/20', text: 'text-purple-400' }
  };
  const theme = colorMap[resource.colorTheme];

  return (
    <div className="block w-full text-left p-3 rounded-lg hover:bg-slate-700/50 transition-all group cursor-pointer">
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${theme.bg} ${theme.text}`}>
          <ResourceIcon className="w-4 h-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium group-hover:text-purple-400 transition-colors">
            {resource.title}
          </p>
          <p className="text-xs text-slate-500 mt-1">{resource.duration}</p>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Handle navigation
  const handleNavigate = (path: string) => navigate(path);

  if (!user) return null;

  return (
    // Note: No <Layout> here because HomePage already has one.
    // Also added w-full to ensure it takes width.
    <div className="dashboard-container w-full">
      <style>{DASHBOARD_STYLES}</style>
      
      <div className="max-w-7xl mx-auto px-4 md:px-0 pt-10 pb-20">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2 text-white">
            Welcome back, <span className="gradient-text-dash">{user.name.split(' ')[0]}</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Your career command center is ready. Let's land your dream job.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT COLUMN: Application Journey */}
          <div className="lg:col-span-4">
            <div className="glass-card rounded-2xl p-6 relative h-full">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                <Map className="w-5 h-5 text-purple-400" />
                Your Application Journey
              </h2>

              <div className="relative">
                <div className="timeline-line"></div>
                {MOCK_JOURNEY_STEPS.map((step, index) => (
                  <JourneyStepItem
                    key={step.id}
                    step={step}
                    isLast={index === MOCK_JOURNEY_STEPS.length - 1}
                    onClick={handleNavigate}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Value & Action */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Template of the Week */}
            <div
              className="glass-card glass-card-hover rounded-2xl p-6 cursor-pointer"
              onClick={() => handleNavigate('/builder')}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  Template of the Week
                </h2>
                <span className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full font-medium">
                  Trending
                </span>
              </div>

              {/* Template Preview Box */}
              <div className="template-preview rounded-xl p-8 mb-4 min-h-48 flex items-center justify-center relative overflow-hidden">
                {/* The Shimmer Layer (z-index 0) */}
                <div className="shimmer"></div>
                
                {/* Content Layer (z-index 10 - FIXED VISIBILITY ISSUE) */}
                <div className="text-center relative z-10">
                  <FileText className="w-16 h-16 text-purple-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-300">Minimalist Pro Template</p>
                </div>
              </div>

              <p className="text-slate-300 mb-4 text-sm">
                Recruiters are loving minimal designs this month. Clean layouts with strong typography stand out in 2025.
              </p>

              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20">
                <Download className="w-5 h-5" />
                Use This Template
              </button>
            </div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightCard
                title="Quick Tip"
                subtitle="Data-driven results matter"
                description={<span>Using numbers like "Improved sales by 20%" increases hiring chances by 40%. Quantify everything you can.</span>}
                icon={Lightbulb}
                iconBgClass="bg-green-500/20"
                iconColorClass="text-green-400"
              />
              <InsightCard
                title="ATS Myth Buster"
                subtitle="Common formatting mistake"
                description={<span>Fact: Tables and columns often confuse ATS bots. Keep your layout simple and single-column for best results.</span>}
                icon={AlertCircle}
                iconBgClass="bg-red-500/20"
                iconColorClass="text-red-400"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Quick Tools */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Resume Health Check */}
            <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <Activity className="w-5 h-5 text-blue-400" />
                Resume Health Check
              </h2>

              <div className="flex flex-col items-center py-4 flex-1 justify-center">
                <div className="w-24 h-24 mb-4 flex items-center justify-center relative">
                   {/* Circle Background */}
                   <div className="absolute inset-0 rounded-full border-[4px] border-slate-700/50"></div>
                   <div className="text-center z-10">
                      <FileQuestion className="w-8 h-8 text-slate-500 mx-auto mb-1" />
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">No data</p>
                   </div>
                </div>

                <p className="text-xs text-slate-400 text-center mb-6 leading-relaxed">
                  Upload your resume to see your ATS compatibility score and get tips.
                </p>

                <button
                  onClick={() => handleNavigate('/ats')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                >
                  <Upload className="w-4 h-4" />
                  Upload Resume
                </button>
              </div>
            </div>

            {/* Recent Resources */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                <BookOpen className="w-5 h-5 text-orange-400" />
                Recent Resources
              </h2>

              <div className="space-y-3">
                {MOCK_RESOURCES.map((resource) => (
                  <ResourceItem key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className="mt-6 glass-card rounded-2xl p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-slate-700/50">
            <div>
              <p className="text-2xl font-bold gradient-text-dash">0</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Resumes Created</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text-dash">0</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Applications</p>
            </div>
            <div>
              <p className="text-2xl font-bold gradient-text-dash">0%</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">ATS Score</p>
            </div>
            <div className="border-none">
              <p className="text-2xl font-bold gradient-text-dash">--</p>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Next Interview</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;