import React from 'react';
import { Button } from '@mui/material';
import { useDownloadGuard } from '../hooks/useDownloadGuard';
import { generatePDF } from '../utils/pdfExport';

const DownloadResumeButton = () => {
    const { handleDownload } = useDownloadGuard();

    return (
        <Button
            variant="contained"
            fullWidth
            onClick={() => handleDownload(generatePDF)}
        >
            Download Resume
        </Button>
    );
};

export default DownloadResumeButton;
