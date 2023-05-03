import React from "react";
import { loadStripe } from "@stripe/stripe-js";
let stripePromise;
const getStripe = () => {
    // console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

const handleCheckout = async () => {
  const stripe = await getStripe();
  const response = await fetch(
    `http://${process.env.HOST}/api/customer/royalty/purchaseRequest`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({type:"CROP", quantity:100}),
    }
  );
  if (response.statusCode === 500) return;
  const data = await response.json();
//   toast.loading("Redirecting...");
  stripe.redirectToCheckout({ sessionId: data.id });
};
export default function PreviewPage() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <>
      <section>
        <button role="link" onClick={handleCheckout}>
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 400px;
            height: 112px;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            height: 36px;
            background: #556cd6;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </>
  );
}
