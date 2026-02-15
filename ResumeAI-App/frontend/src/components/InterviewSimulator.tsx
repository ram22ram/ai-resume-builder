import { useState, useRef, useEffect } from 'react';
import { 
  Box, TextField, Button, Paper, Typography, 
  Container, Avatar, Chip, Fade, Stack, IconButton, Alert, Tooltip, Card
} from '@mui/material';
import { 
  Send, User, Bot, Mic, MicOff, Volume2, VolumeX, Brain, Lock
} from 'lucide-react';
// @ts-ignore
import { generateContent } from '../utils/aiService';
import Layout from './Layout';
import { useAuth } from '../context/AuthContext';
import SEO from './SEO';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const InterviewSimulator = () => {
  const { user, isLoading } = useAuth();
  const [jobRole, setJobRole] = useState('');
  const [experience, setExperience] = useState('');
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results).map((result: any) => result[0]).map((result) => result.transcript).join('');
        setInput(transcript);
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const speakText = (text: string) => {
    if (!audioEnabled || !user) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startInterview = async () => {
    if (!jobRole.trim() || !user) return;
    setStarted(true);
    setLoading(true);
    setIsTyping(true);
    
    // @ts-ignore
    const res = await generateContent(`Act as a professional interviewer for ${jobRole}...`, "Interviewer");
    setTimeout(() => { setMessages([{ role: 'ai', text: res }]); setLoading(false); setIsTyping(false); speakText(res); }, 1500);
  };

  const handleSend = async () => {
    if (!input.trim() || !user) return;
    const userMsg = input;
    if (isListening) recognitionRef.current?.stop();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    setIsTyping(true);
    // @ts-ignore
    const res = await generateContent(`Interview for ${jobRole}. Candidate said: "${userMsg}"...`, "Interviewer");
    setTimeout(() => { setMessages(prev => [...prev, { role: 'ai', text: res }]); setLoading(false); setIsTyping(false); speakText(res); }, 2000);
  };

  const toggleListening = () => {
    if (!user) return;
    if (isListening) { 
      recognitionRef.current?.stop(); 
    } else { 
      setInput(''); 
      recognitionRef.current?.start(); 
      setIsListening(true); 
    }
  };

  useEffect(() => { 
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isTyping]);
  
  const resetInterview = () => { 
    setStarted(false); 
    setMessages([]); 
    setJobRole(''); 
    window.speechSynthesis.cancel(); 
  };

  // Fix: Convert user to boolean for disabled props
  const isUserLoggedIn = !!user; // ✅ Converts null/undefined to false

  return (
    <Layout>
      <SEO 
        title="AI Mock Interview Practice" 
        description="Practice for your job interview with our AI Simulator. Get real-time feedback and improve your answers."
        keywords="mock interview, ai interview practice, interview preparation, interview questions"
      />
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
        @keyframes pulse-purple { 0% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.4); } 70% { box-shadow: 0 0 0 10px rgba(168, 85, 247, 0); } 100% { box-shadow: 0 0 0 0 rgba(168, 85, 247, 0); } }
        .animate-fade { animation: fadeIn 0.5s ease-out; }
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .chat-bubble-user { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 20px 20px 4px 20px; }
        .chat-bubble-ai { background: rgba(15, 23, 42, 0.7); color: #e2e8f0; border-radius: 20px 20px 20px 4px; border: 1px solid rgba(255, 255, 255, 0.1); }
      `}</style>

      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={6} className="animate-fade">
          <Chip 
            label={isUserLoggedIn ? "AI INTERVIEW SIMULATOR" : "🔒 PREMIUM FEATURE - LOGIN REQUIRED"} 
            sx={{ 
              bgcolor: isUserLoggedIn ? 'rgba(168, 85, 247, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
              color: isUserLoggedIn ? '#a855f7' : '#ef4444', 
              border: `1px solid ${isUserLoggedIn ? 'rgba(168, 85, 247, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`, 
              mb: 3,
              animation: isUserLoggedIn ? 'none' : 'pulse-purple 2s infinite'
            }} 
            icon={isUserLoggedIn ? <Brain size={14} /> : <Lock size={14} />} 
          />
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 900, color: 'white' }}>
            {isUserLoggedIn ? 'Ace Your Next Interview' : 'Unlock AI Mock Interviews'}
          </Typography>
          <Typography color="#94a3b8" sx={{ mt: 2, maxWidth: '600px', mx: 'auto' }}>
            {isUserLoggedIn 
              ? 'Practice with our AI-powered interviewer and get real-time feedback'
              : 'Login to access voice-interactive AI interviews with personalized feedback'
            }
          </Typography>
        </Box>

        <Paper className="glass-panel" sx={{ 
          borderRadius: 4, 
          overflow: 'hidden', 
          border: `1px solid ${isUserLoggedIn ? 'rgba(255, 255, 255, 0.15)' : 'rgba(239, 68, 68, 0.3)'}`, 
          background: 'rgba(15, 23, 42, 0.7)', 
          backdropFilter: 'blur(20px)', 
          mb: 6,
          position: 'relative'
        }}>
          
          {/* VIP LOCK OVERLAY - Shows when user is NOT logged in */}
          {!isUserLoggedIn && !isLoading && (
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              zIndex: 20, 
              background: 'rgba(2, 6, 23, 0.92)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 4,
              textAlign: 'center'
            }}>
              <Card sx={{ 
                p: 5, 
                textAlign: 'center', 
                bgcolor: '#0f172a', 
                border: '2px solid #a855f7',
                borderRadius: 3,
                maxWidth: '500px',
                width: '100%'
              }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%',
                  bgcolor: 'rgba(168, 85, 247, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  mx: 'auto',
                  border: '2px solid rgba(168, 85, 247, 0.3)'
                }}>
                  <Lock size={40} color="#a855f7" />
                </Box>
                
                <Typography variant="h4" color="white" fontWeight="bold" gutterBottom>
                  🔒 Premium Feature Locked
                </Typography>
                
                <Typography color="#94a3b8" sx={{ mb: 4, fontSize: '1.1rem' }}>
                  <strong>AI Mock Interview Simulator</strong> is a VIP feature for registered users.
                  <br /><br />
                  Get <strong>real-time voice analysis, personalized feedback, and confidence scoring</strong> 
                  with our advanced AI interviewer.
                </Typography>
                
                <Box display="flex" justifyContent="center" mb={3}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`}
                    sx={{ 
                      bgcolor: '#a855f7', 
                      color: 'white',
                      fontWeight: 'bold',
                      px: 5,
                      py: 1.5,
                      fontSize: '1rem',
                      borderRadius: '12px',
                      '&:hover': { 
                        bgcolor: '#9333ea',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    🔐 Login with Google to Unlock
                  </Button>
                </Box>
                
                <Typography variant="caption" color="#64748b">
                  Already have an account? Refresh after login
                </Typography>
              </Card>
            </Box>
          )}
          
          {/* Show loading only when isLoading is true AND user is null */}
          {isLoading && !isUserLoggedIn && (
            <Box sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              zIndex: 15, 
              background: 'rgba(2, 6, 23, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Typography color="white">Checking authentication...</Typography>
            </Box>
          )}

          <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.03)' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ 
                  bgcolor: isUserLoggedIn ? 'rgba(168, 85, 247, 0.2)' : 'rgba(100, 116, 139, 0.2)', 
                  color: isUserLoggedIn ? '#a855f7' : '#64748b' 
                }}>
                  <Bot />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: isUserLoggedIn ? 'white' : '#94a3b8' }}>
                    {isUserLoggedIn ? 'AI Interviewer' : '🔒 Interviewer (Locked)'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                    {isUserLoggedIn 
                      ? (started ? (isSpeaking ? 'Speaking...' : 'Listening...') : 'Ready')
                      : 'Login to unlock'
                    }
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1}>
                {started && isUserLoggedIn && (
                  <>
                    <Tooltip title={audioEnabled ? "Mute audio" : "Unmute audio"}>
                      <IconButton 
                        onClick={() => setAudioEnabled(!audioEnabled)} 
                        sx={{ color: 'white' }}
                        disabled={!isUserLoggedIn}
                      >
                        {audioEnabled ? <Volume2 /> : <VolumeX />}
                      </IconButton>
                    </Tooltip>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      onClick={resetInterview} 
                      sx={{ borderColor: '#ef4444', color: '#ef4444' }}
                    >
                      End Session
                    </Button>
                  </>
                )}
              </Stack>
            </Stack>
          </Box>

          {!started ? (
            <Box sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <Mic size={48} color={isUserLoggedIn ? "#a855f7" : "#64748b"} style={{ marginBottom: 20, opacity: isUserLoggedIn ? 1 : 0.5 }} />
              <Typography variant="h5" fontWeight="bold" mb={2} color={isUserLoggedIn ? "white" : "#94a3b8"}>
                {isUserLoggedIn ? 'Configure Your Interview' : 'Feature Preview - Login to Configure'}
              </Typography>
              <Stack spacing={3} sx={{ width: '100%', maxWidth: '500px' }}>
                <TextField 
                  fullWidth 
                  label="Target Job Role" 
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  disabled={!isUserLoggedIn} // ✅ FIXED: boolean value
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      '&.Mui-disabled': { opacity: 0.5 }
                    },
                    '& .MuiInputLabel-root': { color: isUserLoggedIn ? '#cbd5e1' : '#64748b' }
                  }} 
                />
                <TextField 
                  fullWidth 
                  label="Experience Level" 
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  disabled={!isUserLoggedIn} // ✅ FIXED: boolean value
                  sx={{ 
                    '& .MuiOutlinedInput-root': { 
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      '&.Mui-disabled': { opacity: 0.5 }
                    },
                    '& .MuiInputLabel-root': { color: isUserLoggedIn ? '#cbd5e1' : '#64748b' }
                  }} 
                />
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={isUserLoggedIn ? startInterview : () => window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`}
                  disabled={!jobRole && isUserLoggedIn} // ✅ FIXED: boolean value
                  startIcon={isUserLoggedIn ? <Mic size={20} /> : <Lock size={20} />}
                  sx={{ 
                    bgcolor: isUserLoggedIn ? '#3b82f6' : '#a855f7', 
                    py: 1.5,
                    opacity: (!jobRole && isUserLoggedIn) ? 0.7 : 1,
                    '&:hover': { bgcolor: isUserLoggedIn ? '#2563eb' : '#9333ea' }
                  }}
                >
                  {isUserLoggedIn ? 'Start Interview' : '🔒 Login to Unlock Feature'}
                </Button>
                
                {!isUserLoggedIn && (
                  <Alert severity="info" sx={{ bgcolor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <Typography variant="body2">
                      <strong>Preview mode:</strong> You can see the interface but need to login to use the AI interviewer.
                    </Typography>
                  </Alert>
                )}
              </Stack>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
              <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
                <Stack spacing={3}>
                  {messages.map((msg, index) => (
                    <Fade in={true} key={index}>
                      <Box sx={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                        <Stack direction={msg.role === 'user' ? 'row-reverse' : 'row'} spacing={2} sx={{ maxWidth: '85%' }}>
                          <Avatar sx={{ 
                            bgcolor: msg.role === 'user' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(168, 85, 247, 0.2)' 
                          }}>
                            {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                          </Avatar>
                          <Paper className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'} sx={{ p: 3 }}>
                            <Typography sx={{ lineHeight: 1.6 }}>{msg.text}</Typography>
                          </Paper>
                        </Stack>
                      </Box>
                    </Fade>
                  ))}
                  <div ref={bottomRef} />
                </Stack>
              </Box>
              <Box sx={{ p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)', bgcolor: 'rgba(15, 23, 42, 0.8)' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Tooltip title={isUserLoggedIn ? (isListening ? "Stop listening" : "Start voice input") : "Login to use voice"}>
                    <span>
                      <IconButton 
                        onClick={toggleListening} 
                        sx={{ 
                          bgcolor: isListening ? '#ef4444' : 'rgba(255,255,255,0.1)', 
                          color: 'white',
                          opacity: isUserLoggedIn ? 1 : 0.5
                        }}
                        disabled={!isUserLoggedIn} // ✅ FIXED: boolean value
                      >
                        {isListening ? <MicOff /> : <Mic />}
                      </IconButton>
                    </span>
                  </Tooltip>
                  <TextField 
                    fullWidth 
                    placeholder={isUserLoggedIn ? (isListening ? "Listening..." : "Type your answer...") : "Login to type..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && isUserLoggedIn && handleSend()}
                    disabled={!isUserLoggedIn} // ✅ FIXED: boolean value
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        '&.Mui-disabled': { opacity: 0.5 }
                      }
                    }} 
                  />
                  <Button 
                    variant="contained" 
                    onClick={isUserLoggedIn ? handleSend : () => window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`}
                    disabled={(loading || !input) && isUserLoggedIn} // ✅ FIXED: boolean value
                    sx={{ 
                      bgcolor: isUserLoggedIn ? '#3b82f6' : '#a855f7',
                      opacity: ((loading || !input) && isUserLoggedIn) ? 0.7 : 1
                    }}
                  >
                    {isUserLoggedIn ? <Send size={20} /> : '🔒'}
                  </Button>
                </Stack>
              </Box>
            </Box>
          )}
        </Paper>
        
        {/* Additional Info for Non-Logged Users */}
        {!isUserLoggedIn && (
          <Box sx={{ textAlign: 'center', mt: 4, p: 3, bgcolor: 'rgba(15, 23, 42, 0.5)', borderRadius: 2 }}>
            <Typography variant="h6" color="white" gutterBottom>
              Why Login for Mock Interviews?
            </Typography>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} justifyContent="center" sx={{ mt: 2 }}>
              {[
                { title: 'Voice Analysis', desc: 'Real-time feedback on speech clarity and pace' },
                { title: 'Personalized Questions', desc: 'AI generates role-specific interview questions' },
                { title: 'Progress Tracking', desc: 'Save and review your interview history' }
              ].map((feature, i) => (
                <Box key={i} sx={{ textAlign: 'center', maxWidth: '200px' }}>
                  <Box sx={{ fontSize: '1.5rem', mb: 1 }}>✨</Box>
                  <Typography variant="subtitle2" color="white" fontWeight="bold">{feature.title}</Typography>
                  <Typography variant="caption" color="#94a3b8">{feature.desc}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default InterviewSimulator;