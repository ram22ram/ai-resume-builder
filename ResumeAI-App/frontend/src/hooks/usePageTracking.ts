import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
    interface Window {
        gtag: (command: string, ...args: any[]) => void;
    }
}

export const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        if (typeof window.gtag !== 'undefined') {
            window.gtag('config', 'G-159RFC5L2W', {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);
};
