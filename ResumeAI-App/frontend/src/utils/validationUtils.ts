
export const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone: string): boolean => {
    const re = /^\+?[0-9\s-]{10,}$/;
    return re.test(phone);
};
