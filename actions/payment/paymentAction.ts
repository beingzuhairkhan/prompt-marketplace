const Stripe = require('stripe');

const STRIPE_SECRET_KEY = "sk_test_51QZcBLSJhVqg59053BFwalRq2fqdE8fRelXvbUOD5fLasFMoKbGiTt2OuBsIrj337FWkzIvrbqx3j4EstayyuFC900oJg8O6vB";
if (!STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key is not set in environment variables.");
}

const stripe = new Stripe(STRIPE_SECRET_KEY , { apiVersion: '2023-10-16' });

export const stripePublishableKey = () => {
    const publishableKey = "pk_test_51QZcBLSJhVqg5905FxdMlaprjJg4VFdELmypaisEQhKSB5J7YjTlu2ASpEWNIDkOByOrAX7UsggGPbhOiyVs3prq003tLDMp7l";
    if (!publishableKey) {
        throw new Error("Stripe publishable key is not set in environment variables.");
    }
    return publishableKey;
};

export const stripePaymentIntent = async ({ amount }: { amount: number }) => {
    try {
        if (!amount || amount <= 0) {
            throw new Error("Invalid amount provided.");
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Ensure amount is in cents
            currency: 'INR',
            metadata: { company: 'PromptBuy' },
            automatic_payment_methods: { enabled: true },
        });

        return {
            id: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
            status: paymentIntent.status,
        };
    } catch (error) {
        console.error("stripePaymentIntent error:", error);
        throw new Error("Failed to create payment intent.");
    }
};
