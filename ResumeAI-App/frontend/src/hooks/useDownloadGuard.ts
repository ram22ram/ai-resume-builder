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

        // 1️⃣ Not logged in → login
        if (!user) {
            navigate('/login', {
                state: { intent: 'download' },
            });
            return;
        }

        // 2️⃣ Premium template but no plan
        if (isPremiumTemplate && !user.isPremium) {
            navigate('/pricing');
            return;
        }

        // 3️⃣ Allowed
        downloadFn();
    };

    return { handleDownload };
};
