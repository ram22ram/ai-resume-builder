import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

interface Props {
    open: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ open, onClose }) => {
    const { login } = useAuth();

    const handleGoogleLogin = () => {
        // Simulate Google Login for now (or integrate actual Google Button)
        const mockUser = {
            _id: '123',
            name: 'Demo User',
            email: 'demo@example.com',
            isPremium: false
        };
        login(mockUser, 'mock-token');
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Sign In Required</DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    Please sign in to save and download your resume.
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button 
                        variant="contained" 
                        startIcon={<Google />}
                        onClick={handleGoogleLogin}
                        fullWidth
                        sx={{ bgcolor: '#DB4437', '&:hover': { bgcolor: '#c53929' } }}
                    >
                        Sign in with Google
                    </Button>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginModal;
