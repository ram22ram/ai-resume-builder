import { useEffect } from 'react';

export const useAutoSave = (key: string, data: any) => {
    useEffect(() => {
        const handler = setTimeout(() => {
            localStorage.setItem(key, JSON.stringify(data));
        }, 600);

        return () => clearTimeout(handler);
    }, [key, data]);
};
