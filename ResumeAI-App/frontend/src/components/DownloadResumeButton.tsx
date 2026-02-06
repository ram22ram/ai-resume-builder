import { Button } from '@mui/material';
import { useDownloadGuard } from '../hooks/useDownloadGuard';
import { generatePDF } from '../utils/pdfExport';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { ALL_TEMPLATES } from '../templates/templates.config';

const DownloadResumeButton = () => {
    const { user } = useAuth();
    const { selectedTemplate } = useResume();
    const { handleDownload } = useDownloadGuard();
    
    // Determine Label
    const template = ALL_TEMPLATES.find(t => t.id === selectedTemplate);
    const isPremium = template?.isPremium;

    let label = 'Download Resume';
    if (!user && !isPremium) label = 'Download Free Resume';
    else if (!user && isPremium) label = 'Login to Download';
    else if (user && isPremium && !user.isPremium) label = 'Upgrade to Download';
    else if (user && isPremium && user.isPremium) label = 'Download Premium Resume';

    return (
        <Button
            variant="contained"
            fullWidth
            onClick={() => handleDownload(generatePDF)}
            color={isPremium ? 'warning' : 'primary'}
            sx={{ 
                fontWeight: 'bold', 
                py: 1.5,
                boxShadow: isPremium ? '0 4px 14px 0 rgba(245, 158, 11, 0.39)' : undefined
            }}
        >
            {label}
        </Button>
    );
};

export default DownloadResumeButton;
