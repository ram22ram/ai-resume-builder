import React, { useState, useRef, useEffect } from 'react';
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
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const InterviewSimulator = () => {
  const { user, login, isLoading } = useAuth(); // ✅ IMPORT isLoading
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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const res = await axios.post(`${API_URL}/auth/google`, { token: credentialResponse.credential });
      if (res.data.success) login(res.data.user, res.data.token);
    } catch (err) { console.error("Login Failed", err); }
  };

  const speakText = (text: string) => {
    if (!audioEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const startInterview = async () => {
    if (!jobRole.trim()) return;
    setStarted(true);
    setLoading(true);
    setIsTyping(true);
    
    // @ts-ignore
    const res = await generateContent(`Act as a professional interviewer for ${jobRole}...`, "Interviewer");
    setTimeout(() => { setMessages([{ role: 'ai', text: res }]); setLoading(false); setIsTyping(false); speakText(res); }, 1500);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
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
    if (isListening) { recognitionRef.current?.stop(); } else { setInput(''); recognitionRef.current?.start(); setIsListening(true); }
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading, isTyping]);
  const resetInterview = () => { setStarted(false); setMessages([]); setJobRole(''); window.speechSynthesis.cancel(); };

  // Wait for auth to check before showing lock
  if (isLoading) return <Layout><Box sx={{height: '100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><Typography color="white">Loading...</Typography></Box></Layout>;

  return (
    <Layout>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse-red { 0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); } 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); } }
        .animate-fade { animation: fadeIn 0.5s ease-out; }
        .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .chat-bubble-user { background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; border-radius: 20px 20px 4px 20px; }
        .chat-bubble-ai { background: rgba(15, 23, 42, 0.7); color: #e2e8f0; border-radius: 20px 20px 20px 4px; border: 1px solid rgba(255, 255, 255, 0.1); }
      `}</style>

      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" mb={6} className="animate-fade">
          <Chip label="AI INTERVIEW SIMULATOR" sx={{ bgcolor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', border: '1px solid rgba(168, 85, 247, 0.3)', mb: 3 }} icon={<Brain size={14} />} />
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 900, color: 'white' }}>Ace Your Next <br /> Interview</Typography>
        </Box>

        <Paper className="glass-panel" sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.15)', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(20px)', mb: 6 }}>
          
          <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(255, 255, 255, 0.03)' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar sx={{ bgcolor: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}><Bot /></Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>AI Interviewer</Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8' }}>{started ? (isSpeaking ? 'Speaking...' : 'Listening...') : 'Ready'}</Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1}>
                {started && <IconButton onClick={() => setAudioEnabled(!audioEnabled)} sx={{ color: 'white' }}>{audioEnabled ? <Volume2 /> : <VolumeX />}</IconButton>}
                {started && <Button variant="outlined" size="small" onClick={resetInterview} sx={{ borderColor: '#ef4444', color: '#ef4444' }}>End Session</Button>}
              </Stack>
            </Stack>
          </Box>

          {!started ? (
            <Box sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
              
              {/* ✅ VIP LOCK: Only shows if user is NOT logged in */}
              {!user && (
                <Box sx={{ position: 'absolute', inset: 0, zIndex: 20, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Card sx={{ p: 4, textAlign: 'center', bgcolor: '#1e293b', border: '1px solid #a855f7' }}>
                        <Lock size={48} color="#a855f7" style={{ margin: '0 auto 16px' }} />
                        <Typography variant="h5" color="white" fontWeight="bold" gutterBottom>VIP Feature</Typography>
                        <Typography color="#94a3b8" mb={3}>Mock Interviews use advanced AI Audio. <br/> Please sign in to start a session.</Typography>
                        <Box display="flex" justifyContent="center">
                            <GoogleLogin onSuccess={handleGoogleSuccess} theme="filled_black" shape="pill" />
                        </Box>
                    </Card>
                </Box>
              )}

              <Mic size={48} color="#a855f7" style={{ marginBottom: 20 }} />
              <Typography variant="h5" fontWeight="bold" mb={2} color="white">Configure Your Interview</Typography>
              <Stack spacing={3} sx={{ width: '100%', maxWidth: '500px' }}>
                <TextField fullWidth label="Target Job Role" value={jobRole} onChange={(e) => setJobRole(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }} />
                <TextField fullWidth label="Experience Level" value={experience} onChange={(e) => setExperience(e.target.value)} sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }} />
                <Button variant="contained" size="large" onClick={startInterview} disabled={!jobRole} startIcon={<Mic size={20} />} sx={{ bgcolor: '#3b82f6', py: 1.5 }}>Start Interview</Button>
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
                          <Avatar sx={{ bgcolor: msg.role === 'user' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(168, 85, 247, 0.2)' }}>{msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}</Avatar>
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
                  <IconButton onClick={toggleListening} sx={{ bgcolor: isListening ? '#ef4444' : 'rgba(255,255,255,0.1)', color: 'white' }}>{isListening ? <MicOff /> : <Mic />}</IconButton>
                  <TextField fullWidth placeholder={isListening ? "Listening..." : "Type answer..."} value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} sx={{ '& .MuiOutlinedInput-root': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }} />
                  <Button variant="contained" onClick={handleSend} disabled={loading || !input} sx={{ bgcolor: '#3b82f6' }}><Send size={20} /></Button>
                </Stack>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
    </Layout>
  );
};

export default InterviewSimulator;