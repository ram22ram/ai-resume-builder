import { useAuth } from '../context/AuthContext';

export const usePremium = () => {
    const { user, isAuthenticated, isLoading } = useAuth();

    return {
        isLoggedIn: isAuthenticated,
        isPremium: !!user?.isPremium,
        isLoading,
    };
};
