import { useEffect, useRef } from 'react';
import axios from 'axios';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';

/**
 * useAutoSave
 * Debounced (2s) autosave to MongoDB when user is authenticated.
 * localStorage (managed by ResumeContext) remains the primary offline fallback.
 * Silently fails if API is unreachable — data is always safe in localStorage.
 */
export const useAutoSave = () => {
    const { resume } = useResume();
    const { isAuthenticated } = useAuth();
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const isMountedRef = useRef(true);

    useEffect(() => {
        isMountedRef.current = true;
        return () => { isMountedRef.current = false; };
    }, []);

    useEffect(() => {
        // Only sync to DB when logged in; localStorage handles offline/anonymous
        if (!isAuthenticated) return;

        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(async () => {
            if (!isMountedRef.current) return;
            try {
                const token = localStorage.getItem('resume_token');
                if (!token) return;
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/resume/save`,
                    { resumeData: resume },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (err) {
                // Silently swallow — localStorage is always the fallback
                console.warn('[AutoSave] Could not sync to server. Data is safe in localStorage.', err);
            }
        }, 2000); // 2-second debounce

        return () => clearTimeout(timerRef.current);
    }, [resume, isAuthenticated]);
};
