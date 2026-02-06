import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { ALL_TEMPLATES } from '../templates/templates.config';

export const useDownloadGuard = () => {
    const { user } = useAuth();
    const { selectedTemplate } = useResume();
    const navigate = useNavigate();

    const handleDownload = (downloadFn: () => void) => {
        const template = ALL_TEMPLATES.find(
            (t) => t.id === selectedTemplate
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

        // 3️⃣ Allowed
        downloadFn();
    };

    return { handleDownload };
};
