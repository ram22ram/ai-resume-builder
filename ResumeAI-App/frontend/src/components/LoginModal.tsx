import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, Typography, Box, TextField, Divider, Alert, CircularProgress } from '@mui/material';
import { Google, Email } from '@mui/icons-material';
import axios from 'axios';

interface Props {
    open: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

    // 🪄 Magic Link Logic
    const handleMagicLogin = async () => {
        if (!email || !email.includes('@')) {
            setMessage({ type: 'error', text: 'Please enter a valid email' });
            return;
        }
        setLoading(true);
        setMessage(null);
        try {
            await axios.post(`${API_URL}/auth/magic-login`, { email });
            setMessage({ type: 'success', text: 'Magic link sent! Check your email (and server logs).' });
        } catch (err) {
            setMessage({ type: 'error', text: 'Failed to send magic link. Try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRedirect = () => {
         window.location.href = `${API_URL}/auth/google`;
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>Sign In</DialogTitle>
            <DialogContent>
                {message && (
                    <Alert severity={message.type} sx={{ mb: 2 }}>{message.text}</Alert>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    {/* Google Login */}
                    <Button 
                        variant="outlined" 
                        startIcon={<Google />}
                        onClick={handleGoogleRedirect}
                        fullWidth
                        sx={{ py: 1.5, borderColor: '#ddd', color: '#fff', '&:hover': { borderColor: '#fff' } }}
                    >
                        Continue with Google
                    </Button>

                    <Divider sx={{ my: 1, color: '#666' }}>OR</Divider>

                    {/* Email Input */}
                    <TextField
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />

                    {/* Magic Link Button */}
                    <Button 
                        variant="contained" 
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Email />}
                        onClick={handleMagicLogin}
                        disabled={loading}
                        fullWidth
                        sx={{ py: 1.5, bgcolor: '#fff', color: '#000', '&:hover': { bgcolor: '#f0f0f0' } }}
                    >
                        {loading ? 'Sending...' : 'Send Magic Link'}
                    </Button>

                    <Typography variant="caption" align="center" color="text.secondary">
                        We'll send a magic link to your email. No password needed.
                    </Typography>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
