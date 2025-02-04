import { newOrders } from "@/actions/orders/createOrders";
import { getUser } from "@/actions/user/getUser";
import { styles } from "@/utils/styles";
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

type Props = {
    setOpen: (open: boolean) => void;
    open: boolean;
    promptData: any;
};

const CheckoutForm = ({ setOpen, open, promptData }: Props) => {
    const [message, setMessage] = useState<string>("");
    const stripe = useStripe();
    const elements = useElements();

    //console.log("Prompt Data:", promptData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData = await getUser()
        if (!stripe || !elements) {
            setMessage("Stripe has not loaded yet.");
            return;
        }

        // Confirm the payment with the provided elements and client secret
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin, // Make sure to set your return URL
            },
            redirect: "if_required", // Allows redirect only if required by payment method
        });

        if (error) {
            // Handle the error and show the error message
            setMessage(error.message || "Payment failed. Please try again.");
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            // promptsId , payment_method , payment_id
            await newOrders({promptsId :promptData?.id , payment_id: paymentIntent?.id , payment_method: paymentIntent?.payment_method as string , userId:userData.user?.id }).then((res)=>{
                setOpen(!open);
                window.location.reload();
                
            })
        
        } else {
            setMessage("Payment failed. Please try again.");
        }
    };

    return (
        <div className="p-6">
            <form id="payment-form" onSubmit={handleSubmit}>
                {/* Authentication Element for Link */}
                <LinkAuthenticationElement id="link-authentication-element" />

                {/* Payment Element for card details */}
                <PaymentElement id="payment-element" />

                {/* Button for payment */}
                <button
                    type="submit"
                    disabled={!open || !stripe || !elements}
                    className={`${styles.button}   w-full bg-[#64ff4b] text-black font-bold rounded-lg`}
                >
                    Pay RS{promptData?.price}
                </button>

                {/* Message display area for success/error */}
                {message && (
                    <div id="payment-message" className="text-red-600 font-bold pt-3">
                        {message}
                    </div>
                )}
            </form>
        </div>
    );
};

export default CheckoutForm;
