import { Snackbar, Alert } from '@mui/material';

interface SuccessToastProps {
  open: boolean;
  onClose: () => void;
  message: string;
}

export const SuccessToast = ({ open, onClose, message }: SuccessToastProps) => (
  <Snackbar 
    open={open} 
    autoHideDuration={3000} 
    onClose={onClose}
    anchorOrigin={{ 
      vertical: 'top', 
      horizontal: 'center' 
    }}
    sx={{
      '& .MuiAlert-root': {
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }
    }}
  >
    <Alert 
      severity="success" 
      sx={{ 
        width: '100%',
        fontSize: { xs: '0.875rem', sm: '1rem' }
      }}
    >
      {message}
    </Alert>
  </Snackbar>
);