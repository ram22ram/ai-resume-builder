import axios from 'axios';

export const startSubscription = async (token: string) => {
    const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/create-subscription`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );

    const { subscriptionId, key } = res.data;

    const rzp = new (window as any).Razorpay({
        key,
        subscription_id: subscriptionId,
        name: 'ResumeAI Pro',
        description: 'Premium Monthly Plan',
        handler: () => {
            window.location.href = '/dashboard';
        },
    });

    rzp.open();
};
