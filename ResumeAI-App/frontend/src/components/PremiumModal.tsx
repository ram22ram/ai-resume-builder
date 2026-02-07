import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Star, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Props {
    open: boolean;
    onClose: () => void;
}

const PremiumModal: React.FC<Props> = ({ open, onClose }) => {
    const { login, user } = useAuth();

    const handleUpgrade = () => {
        // Simulate upgrade
        if (user) {
            login({ ...user, isPremium: true }, 'mock-token-upgraded');
        }
        onClose();
        alert("Account upgraded to Premium! (Simulation)");
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Box sx={{ bgcolor: '#1e293b', color: 'white', p: 3, textAlign: 'center' }}>
                <Star size={48} color="#fbbf24" fill="#fbbf24" style={{ marginBottom: 16 }} />
                <Typography variant="h5" fontWeight="bold">Unlock Premium Templates</Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Stand out with professional designs used by top candidates.
                </Typography>
            </Box>
            <DialogContent sx={{ p: 4 }}>
                <Typography variant="h6" gutterBottom>Why Go Premium?</Typography>
                <List>
                    <ListItem>
                        <ListItemIcon><Check color="green" /></ListItemIcon>
                        <ListItemText primary="Access to all 25+ Premium Templates" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Check color="green" /></ListItemIcon>
                        <ListItemText primary="Unlimited PDF Downloads" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon><Check color="green" /></ListItemIcon>
                        <ListItemText primary="ATS Optimization Tools" />
                    </ListItem>
                </List>
            </DialogContent>
            <DialogActions sx={{ p: 2, borderTop: '1px solid #e2e8f0' }}>
                <Button onClick={onClose} color="inherit">Maybe Later</Button>
                <Button 
                    variant="contained" 
                    color="warning" 
                    onClick={handleUpgrade}
                    sx={{ px: 4 }}
                >
                    Upgrade Now - $9/mo
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PremiumModal;
