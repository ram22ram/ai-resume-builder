import React from 'react';
import { Button } from '@mui/material';
import { Download } from 'lucide-react';
import { exportResumePDF } from '../utils/pdfExport';
import { useAuth } from '../context/AuthContext';

interface Props {
  previewRef: React.RefObject<HTMLDivElement>;
}

const DownloadPDFButton: React.FC<Props> = ({ previewRef }) => {
  const { user } = useAuth();

  const handleDownload = async () => {
    if (!previewRef.current) return;

    await exportResumePDF(previewRef.current, {
      filename: `${user?.name || 'resume'}.pdf`,
      premium: false, // 🔓 FREE for now
    });
  };

  return (
    <Button
      variant="contained"
      startIcon={<Download size={18} />}
      onClick={handleDownload}
    >
      Download PDF
    </Button>
  );
};

export default DownloadPDFButton;
