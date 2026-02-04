import { useAuth } from '../context/AuthContext';

export const usePremium = () => {
    const { user, isLoading } = useAuth();

    return {
        isLoggedIn: !!user,
        isPremium: user?.isPremium === true,
        isLoading,
    };
};
