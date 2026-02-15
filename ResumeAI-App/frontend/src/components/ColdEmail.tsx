import { useState } from 'react';
import { 
  Container, Paper, Typography, TextField, 
  Button, ToggleButton, ToggleButtonGroup, 
  Box, Card, IconButton, CircularProgress,
  Stack, Chip, Alert
} from '@mui/material';
import { 
  Mail, Linkedin, Users, Copy, Sparkles, 
  Zap, MessageSquare, Send, Award, Target,
  Check
} from 'lucide-react';
// @ts-ignore
import { generateContent } from '../utils/aiService';
import Layout from './Layout';
import SEO from './SEO';

const ColdEmail = () => {
  const [jd, setJd] = useState('');
  const [type, setType] = useState('linkedin');
  const [res, setRes] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGen = async () => {
    setLoading(true);
    let promptType = '';
    let tone = '';
    
    switch(type) {
      case 'linkedin':
        promptType = 'short LinkedIn connection request (under 300 characters)';
        tone = 'professional but friendly';
        break;
      case 'email':
        promptType = 'formal cold email for a job application';
        tone = 'professional and respectful';
        break;
      case 'referral':
        promptType = 'polite message asking a senior professional for a referral';
        tone = 'respectful and appreciative';
        break;
    }
    
    // @ts-ignore
    const out = await generateContent(
      `Write a ${promptType} for a candidate applying to this position: "${jd.substring(0,600)}". 
      Tone: ${tone}. Include: 1) Personalized opening, 2) Brief value proposition, 3) Clear call-to-action. 
      Keep it concise and engaging.`,
      "Professional Communication Writer"
    );
    
    setRes(out);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(res);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const messageTypes = [
    { 
      val: 'linkedin', 
      icon: <Linkedin size={20} />, 
      label: 'LinkedIn Connect', 
      desc: 'Short connection request',
      color: '#0A66C2'
    },
    { 
      val: 'email', 
      icon: <Mail size={20} />, 
      label: 'Cold Email', 
      desc: 'Formal job application',
      color: '#EA4335'
    },
    { 
      val: 'referral', 
      icon: <Users size={20} />, 
      label: 'Ask Referral', 
      desc: 'Request internal referral',
      color: '#8B5CF6'
    }
  ];

  return (
    <Layout>
      <SEO 
  title="AI Cold Email Generator for Jobs" 
  description="Generate professional cold emails for recruiters. Get more replies and job interviews with AI-written templates."
  keywords="cold email generator, job application email, email templates for recruiters"
/>
      {/* Global Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-fade { animation: fadeIn 0.5s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .message-card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .message-card:hover {
          border-color: rgba(59, 130, 246, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.1);
        }
      `}</style>

      {/* Background */}
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 0, 
        pointerEvents: 'none',
        bgcolor: '#020617',
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}>
        <Box sx={{ 
          position: 'absolute', 
          top: '20%', 
          right: '15%', 
          width: 300, 
          height: 300, 
          bgcolor: '#06b6d4', 
          borderRadius: '50%', 
          filter: 'blur(120px)', 
          opacity: 0.15 
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: '20%', 
          left: '10%', 
          width: 400, 
          height: 400, 
          bgcolor: '#8b5cf6', 
          borderRadius: '50%', 
          filter: 'blur(120px)', 
          opacity: 0.15 
        }} />
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ 
        py: 8, 
        position: 'relative', 
        zIndex: 1 
      }}>
        {/* Header */}
        <Box textAlign="center" mb={8} className="animate-fade">
          <Chip 
            label="NETWORKING MESSAGE GENERATOR" 
            sx={{ 
              bgcolor: 'rgba(6, 182, 212, 0.1)', 
              color: '#06b6d4', 
              border: '1px solid rgba(6, 182, 212, 0.3)', 
              mb: 3, 
              fontFamily: '"JetBrains Mono", monospace',
              fontWeight: 600,
              letterSpacing: 1
            }} 
            icon={<MessageSquare size={14} />}
          />
          
          <Typography variant="h1" sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem' }, 
            fontWeight: 900, 
            lineHeight: 1.1, 
            mb: 2,
            background: 'linear-gradient(to right, #06b6d4, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Never Ghosted Again
          </Typography>
          
          <Typography sx={{ 
            color: '#94a3b8', 
            maxWidth: '600px', 
            mx: 'auto', 
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}>
            Generate personalized connection requests, cold emails, and referral 
            messages that actually get responses from recruiters and professionals.
          </Typography>
        </Box>

        <Stack spacing={4}>
          {/* Message Type Selection */}
          <Paper className="glass-panel" sx={{ 
            p: 4, 
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(20px)'
          }}>
            <Typography variant="h6" fontWeight="bold" mb={3} color="white">
              1. Choose Your Message Type
            </Typography>
            
            <ToggleButtonGroup 
              value={type} 
              exclusive 
              onChange={(_, v) => v && setType(v)} 
              sx={{ 
                width: '100%',
                '& .MuiToggleButtonGroup-grouped': {
                  border: '1px solid rgba(255, 255, 255, 0.1) !important',
                  borderRadius: '12px !important',
                  margin: '4px !important',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              {messageTypes.map((t) => (
                <ToggleButton 
                  key={t.val} 
                  value={t.val}
                  selected={type === t.val}
                  sx={{ 
                    flex: 1,
                    py: 3,
                    px: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    textTransform: 'none',
                    bgcolor: type === t.val ? `${t.color}20` : 'transparent',
                    borderColor: type === t.val ? `${t.color}40` : 'rgba(255, 255, 255, 0.1)',
                    color: type === t.val ? 'white' : '#94a3b8',
                    '&:hover': {
                      bgcolor: `${t.color}15`,
                      borderColor: `${t.color}30`
                    },
                    '&.Mui-selected': {
                      bgcolor: `${t.color}20`,
                      borderColor: `${t.color}40`,
                      color: 'white'
                    }
                  }}
                >
                  <Box sx={{ 
                    p: 1.5, 
                    borderRadius: 2, 
                    bgcolor: type === t.val ? `${t.color}30` : 'rgba(255, 255, 255, 0.1)',
                    color: type === t.val ? 'white' : t.color
                  }}>
                    {t.icon}
                  </Box>
                  <Box textAlign="center">
                    <Typography fontWeight="bold" fontSize="0.95rem">
                      {t.label}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                      {t.desc}
                    </Typography>
                  </Box>
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Paper>

          {/* Job Details Input */}
          <Paper className="glass-panel" sx={{ 
            p: 4, 
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(20px)'
          }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Box sx={{ 
                p: 1.5, 
                borderRadius: 2, 
                bgcolor: 'rgba(6, 182, 212, 0.1)',
                color: '#06b6d4'
              }}>
                <Target size={24} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                  2. Target Details
                </Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                  Company, Role, and Your Relevant Skills
                </Typography>
              </Box>
            </Stack>
            
            <TextField 
              multiline 
              rows={5}
              fullWidth 
              placeholder={`Example: "Applying for Senior Frontend Developer at Google. Skills: React, TypeScript, Next.js. Experience: 5 years building scalable web applications. Currently working at Amazon as Frontend Lead."`}
              value={jd} 
              onChange={(e) => setJd(e.target.value)} 
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  },
                  '&.Mui-focused': {
                    borderColor: '#06b6d4'
                  }
                },
                '& .MuiInputBase-input': {
                  color: '#e2e8f0',
                  fontFamily: '"Outfit", sans-serif'
                }
              }}
            />
            
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              <Chip 
                label={`${messageTypes.find(t => t.val === type)?.label}`}
                sx={{ 
                  bgcolor: `${messageTypes.find(t => t.val === type)?.color}20`,
                  color: `${messageTypes.find(t => t.val === type)?.color}`,
                  border: `1px solid ${messageTypes.find(t => t.val === type)?.color}30`
                }}
              />
              
              <Button 
                variant="contained" 
                size="large"
                onClick={handleGen} 
                disabled={loading || !jd} 
                startIcon={loading ? <CircularProgress size={20} color="inherit"/> : <Sparkles size={20} />}
                sx={{ 
                  bgcolor: '#06b6d4',
                  px: 4,
                  py: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1rem',
                  '&:hover': {
                    bgcolor: '#0891b2',
                    boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)'
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              >
                {loading ? "Writing Message..." : "Generate Message"}
              </Button>
            </Stack>
          </Paper>

          {res && (
            /* Generated Message */
            <Paper className="glass-panel" sx={{ 
              borderRadius: 4,
              border: '1px solid rgba(6, 182, 212, 0.3)',
              background: 'rgba(6, 182, 212, 0.05)',
              backdropFilter: 'blur(20px)',
              overflow: 'hidden',
              animation: 'fadeIn 0.5s ease-out'
            }}>
              {/* Message Header */}
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
                background: 'rgba(6, 182, 212, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 2, 
                    bgcolor: 'rgba(6, 182, 212, 0.2)',
                    color: '#06b6d4'
                  }}>
                    <Send size={20} />
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Generated {type === 'linkedin' ? 'Connection Request' : type === 'email' ? 'Cold Email' : 'Referral Request'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#67e8f9' }}>
                      Ready to copy and send
                    </Typography>
                  </Box>
                </Stack>
                
                <Stack direction="row" spacing={1}>
                  <IconButton
                    size="small"
                    onClick={handleCopy}
                    sx={{ 
                      color: copied ? '#67e8f9' : '#06b6d4',
                      bgcolor: 'rgba(6, 182, 212, 0.2)',
                      '&:hover': {
                        bgcolor: 'rgba(6, 182, 212, 0.3)'
                      }
                    }}
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </IconButton>
                </Stack>
              </Box>
              
              {/* Message Content */}
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <Card className="message-card" sx={{ p: 3, mb: 3 }}>
                  <Typography sx={{ 
                    whiteSpace: 'pre-line', 
                    color: '#e2e8f0',
                    fontFamily: type === 'email' ? '"Outfit", sans-serif' : '"JetBrains Mono", monospace',
                    fontSize: type === 'linkedin' ? '0.9rem' : '1rem',
                    lineHeight: 1.8
                  }}>
                    {res}
                  </Typography>
                </Card>
                
                <Alert 
                  severity="info"
                  icon={<Zap size={18} />}
                  sx={{ 
                    bgcolor: 'rgba(6, 182, 212, 0.1)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: '#06b6d4',
                    borderRadius: 2,
                    '& .MuiAlert-icon': { color: '#06b6d4' }
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                    Pro Tips for This Message:
                  </Typography>
                  <Stack spacing={1}>
                    <Typography variant="body2">
                      • <strong>Personalize:</strong> Add the recipient's name and company details
                    </Typography>
                    <Typography variant="body2">
                      • <strong>Timing:</strong> Send on Tuesday-Thursday between 10 AM - 2 PM
                    </Typography>
                    {type === 'linkedin' && (
                      <Typography variant="body2">
                        • <strong>LinkedIn:</strong> Add a personalized note when connecting
                      </Typography>
                    )}
                    {type === 'email' && (
                      <Typography variant="body2">
                        • <strong>Subject:</strong> Keep it clear and professional
                      </Typography>
                    )}
                    {type === 'referral' && (
                      <Typography variant="body2">
                        • <strong>Follow-up:</strong> Send a gentle reminder after 3-4 days
                      </Typography>
                    )}
                  </Stack>
                </Alert>
              </Box>
            </Paper>
          )}

          {/* Best Practices */}
          <Paper className="glass-panel" sx={{ 
            p: 3, 
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
              <Award size={20} color="#94a3b8" />
              <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                Why These Messages Work
              </Typography>
            </Stack>
            
            <Stack spacing={2}>
              {[
                {
                  title: "Personalization is Key",
                  desc: "Messages with personal details get 35% higher response rates"
                },
                {
                  title: "Clear Value Proposition",
                  desc: "Recruiters spend 6 seconds on initial screening - make it count"
                },
                {
                  title: "Professional Tone",
                  desc: "Balance professionalism with approachability for best results"
                },
                {
                  title: "Action-Oriented",
                  desc: "Include clear next steps or calls-to-action"
                }
              ].map((item, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    p: 2.5,
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(6, 182, 212, 0.3)'
                    }
                  }}
                >
                  <Typography fontWeight="bold" mb={0.5} color="white">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="#94a3b8">
                    {item.desc}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </Layout>
  );
};

export default ColdEmail;