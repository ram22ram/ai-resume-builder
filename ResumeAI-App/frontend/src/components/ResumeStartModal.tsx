import {
  Dialog,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';
import { ResumeOrigin } from '../context/ResumeContext';

type Mode = 'select' | 'confirm' | 'error';

interface Props {
  open: boolean;
  mode: Mode;
  onSelect: (o: ResumeOrigin, file?: File) => void;
  onConfirmOverwrite: () => void;
  onCancelOverwrite: () => void;
}

const ResumeStartModal = ({
  open,
  mode,
  onSelect,
  onConfirmOverwrite,
  onCancelOverwrite,
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // File selection handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onSelect('upload', file);

    // Reset value to allow re-upload of same file if needed
    e.target.value = '';
  };

  return (
    <Dialog 
      open={open} 
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        style: { borderRadius: 16, padding: '8px' }
      }}
    >
      <Box px={3} py={4} textAlign="center" position="relative">
        {/* Close Button (Optional: only for select mode) */}
        {mode === 'select' && (
          <IconButton 
            onClick={onCancelOverwrite} 
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        )}

        <Typography variant="h6" fontWeight={700} mb={1}>
          {mode === 'confirm'
            ? 'Overwrite Existing Resume?'
            : mode === 'error'
            ? 'Oops! Something went wrong'
            : 'Ready to build your Resume?'}
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={4}>
          {mode === 'confirm'
            ? 'Starting a new flow will replace your current progress.'
            : mode === 'error'
            ? 'We encountered an error. Please try uploading again.'
            : 'Choose how you want to begin your journey.'}
        </Typography>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          hidden
          onChange={handleFileChange}
        />

        {mode === 'select' && (
          <Stack spacing={2}>
            {/* OPTION 1: UPLOAD */}
            <Button 
              fullWidth
              variant="outlined"
              size="large"
              onClick={() => fileInputRef.current?.click()} 
              startIcon={<UploadFileIcon />}
              sx={{ py: 1.5, textTransform: 'none', fontSize: '1rem' }}
            >
              Upload Existing PDF
            </Button>

            {/* OPTION 2: AI MAGIC */}
            <Button 
              fullWidth
              variant="contained" 
              size="large"
              onClick={() => onSelect('ai')} 
              startIcon={<AutoAwesomeIcon />}
              sx={{ 
                py: 1.5, 
                textTransform: 'none', 
                fontSize: '1rem',
                background: 'linear-gradient(45deg, #6366f1 30%, #a855f7 90%)',
                boxShadow: '0 3px 5px 2px rgba(168, 85, 247, .3)'
              }}
            >
              Create with AI Magic
            </Button>
          </Stack>
        )}

        {mode === 'confirm' && (
          <Stack spacing={2} direction="row">
            <Button 
              fullWidth 
              variant="contained" 
              color="error"
              onClick={onConfirmOverwrite}
            >
              Yes, Overwrite
            </Button>
            <Button 
              fullWidth 
              variant="outlined" 
              onClick={onCancelOverwrite}
            >
              Keep Current
            </Button>
          </Stack>
        )}

        {mode === 'error' && (
          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={() => fileInputRef.current?.click()}
              startIcon={<UploadFileIcon />}
            >
              Try Uploading Again
            </Button>
            <Button
              variant="text"
              onClick={() => onSelect('ai')}
            >
              Or Start with AI
            </Button>
          </Stack>
        )}
      </Box>
    </Dialog>
  );
};

export default ResumeStartModal;