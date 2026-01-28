import {
  Dialog,
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  alpha,
  Backdrop
} from '@mui/material';
import { LifeLine } from 'react-loading-indicators';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EditNoteIcon from '@mui/icons-material/EditNote'; 
import CloseIcon from '@mui/icons-material/Close';
import { useRef,useEffect, useState } from 'react';
import { ResumeOrigin } from '../context/ResumeContext';
import axios from 'axios';

type Mode = 'select' | 'confirm' | 'error';

interface Props {
  open: boolean;
  mode: Mode;
  onSelect: (o: ResumeOrigin, file?: File) => void;
  onConfirmOverwrite: () => void;
  onCancelOverwrite: () => void;
  isParsing: boolean;
}

const ResumeStartModal = ({
  open,
  mode,
  onSelect,
  onConfirmOverwrite,
  onCancelOverwrite,
  isParsing
}: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/health`).catch(() => {});
    }
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onSelect('upload', file);
    e.target.value = '';
  };

  return (
    <>
    <Dialog 
      open={open && !isParsing}
      maxWidth="xs" 
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: '#020617', 
          backgroundImage: 'none',
          borderRadius: 4,
          border: '1px solid',
          borderColor: alpha('#ffffff', 0.1),
        }
      }}
    >
      <Box px={3} py={5} textAlign="center" position="relative">
        <IconButton 
          onClick={onCancelOverwrite}
          sx={{ position: 'absolute', right: 12, top: 12, color: 'grey.500' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        <Typography variant="h5" fontWeight={800} color="white" mb={1}>
          {mode === 'confirm' ? 'Start Fresh?' : 'Build Your Resume'}
        </Typography>

        <Typography variant="body2" color="grey.500" mb={4}>
          {mode === 'confirm' 
            ? 'Starting over will clear your current progress.' 
            : 'Choose how you want to provide your information.'}
        </Typography>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          hidden
          onChange={handleFileChange}
        />

        {mode === 'select' && (
          <Stack spacing={2.5}>
            {/* OPTION 1: UPLOAD RESUME */}
            <Button 
              fullWidth
              variant="contained" 
              onClick={() => fileInputRef.current?.click()}
              startIcon={<UploadFileIcon />}
              sx={{ 
                py: 2, 
                borderRadius: 2,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                }
              }}
            >
              Upload Existing Resume
            </Button>

            <Typography variant="caption" color="grey.600">
              — OR —
            </Typography>

            {/* OPTION 2: MANUAL ENTRY (No AI mentions) */}
            <Button 
              fullWidth
              variant="outlined"
              onClick={() => onSelect('ai')} // Function name same rakha hai taaki logic na tute
              startIcon={<EditNoteIcon />}
              sx={{ 
                py: 1.5, 
                borderRadius: 2,
                fontSize: '0.95rem',
                textTransform: 'none',
                color: 'white',
                borderColor: alpha('#ffffff', 0.2),
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: alpha('#ffffff', 0.05)
                }
              }}
            >
              Fill Details Manually
            </Button>
          </Stack>
        )}

        {mode === 'confirm' && (
          <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
            <Button fullWidth variant="contained" color="error" onClick={onConfirmOverwrite}>
              Overwrite
            </Button>
            <Button fullWidth variant="outlined" onClick={onCancelOverwrite} sx={{ color: 'white', borderColor: 'grey.700' }}>
              Cancel
            </Button>
          </Stack>
        )}
      </Box>
    </Dialog>
    {/* 2. Modern LifeLine Loader Overlay */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: 'column',
          bgcolor: 'rgba(2, 6, 23, 0.9)' // Dark slate theme
        }}
        open={isParsing}
      >
        <LifeLine color="#32cd32" size="medium" text="" textColor="" />
        <Typography mt={2} fontWeight={600} sx={{ letterSpacing: 1 }}>
          Waking up AI Servers...
        </Typography>
        <Typography variant="caption" color="grey.500">
          This may take 45-50 seconds on first run.
        </Typography>
      </Backdrop>
      </>
  );
};

export default ResumeStartModal;