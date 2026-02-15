import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { TEMPLATES } from '../templates/TemplateRegistry';

export const useDownloadGuard = () => {
    const { user } = useAuth();
    const { resume } = useResume();
    const navigate = useNavigate();

    const handleDownload = (downloadFn: () => void) => {
        const template = TEMPLATES.find(
            (t) => t.id === resume.templateId
        );

        const isPremiumTemplate = template?.isPremium;

        // 1. Check Premium Restrictions
        if (isPremiumTemplate) {
            if (!user) {
                navigate('/login', { state: { intent: 'download' } });
                return;
            }
            if (!user.isPremium) {
                navigate('/pricing');
                return;
            }
        }

        // 2. Allow Download (Free or Premium/Subscribed)
        downloadFn();
    };

    return { handleDownload };
};
