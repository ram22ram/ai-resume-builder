import {
  Dialog,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
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

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onSelect('upload', file);

    // 🔴 IMPORTANT: allow same file re-upload
    e.target.value = '';
  };

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <Box px={4} py={4} textAlign="center">
        <Typography fontWeight={700} mb={3}>
          {mode === 'confirm'
            ? 'Overwrite existing resume?'
            : mode === 'error'
           ? 'Something went wrong. Please try again.'
            : 'How do you want to start?'}
        </Typography>

        {/* 🔹 Hidden React-controlled file input */}
          <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        hidden
        onChange={handleFileChange}
      />


        {mode === 'select' && (
          <Stack spacing={2}>
            <Button onClick={handleUploadClick} startIcon={<UploadFileIcon />}>
              Upload Resume
            </Button>

            {/* <Button
              onClick={() => onSelect('linkedin')}
              startIcon={<LinkedInIcon />}
            >
              Import from LinkedIn
            </Button>

            <Button
              variant="contained"
              onClick={() => onSelect('ai')}
              startIcon={<AutoAwesomeIcon />}
            >
              Start with AI
            </Button> */}
          </Stack>
        )}

        {mode === 'confirm' && (
          <Stack spacing={2}>
            <Button variant="contained" onClick={onConfirmOverwrite}>
              Yes, overwrite
            </Button>
            <Button variant="outlined" onClick={onCancelOverwrite}>
              Cancel
            </Button>
          </Stack>
        )}

        {mode === 'error' && (
          <Stack spacing={2}>
            <Button
              onClick={() => onSelect('linkedin')}
              startIcon={<LinkedInIcon />}
            >
              Try LinkedIn again
            </Button>

            <Button
              onClick={handleUploadClick}
              startIcon={<UploadFileIcon />}
            >
              Upload Resume instead
            </Button>

            <Button
              variant="contained"
              onClick={() => onSelect('ai')}
              startIcon={<AutoAwesomeIcon />}
            >
              Start with AI
            </Button>
          </Stack>
        )}
      </Box>
    </Dialog>
  );
};

export default ResumeStartModal;
