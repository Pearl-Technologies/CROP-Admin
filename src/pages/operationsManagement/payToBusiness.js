import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
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

  axios({
    url:`${process.env.HOST}/api/customer/royalty/purchaseRequest`,
    method: "POST",
    data:{type:"CROP", quantity:100, user_id:"6433cc8279495c4233562ecb"}
    }).then(function(response){
      console.log(response);
      if (response.statusCode === 500) return;
    //   toast.loading("Redirecting...");
      stripe.redirectToCheckout({ sessionId: response.data.id });
    })

};

let cart={
  "_id": {
    "$oid": "6459d52ef7b4743b8d8fe49d"
  },
  "user_id": {
    "$oid": "64523209aa7185fc036b3fdb"
  },
  "cart": [
    {
      "availDate": {
        "fromDate": "2023-04-06",
        "toDate": "2023-05-03"
      },
      "mktDate": {
        "fromDate": "30/4/2023"
      },
      "_id": "644a0bdfd6d1cb77a63acaed",
      "title": "Store Second Product Update",
      "image": [],
      "redeemProps": 3000,
      "description": "Desc",
      "brand": "Brand Update",
      "quantity": 305,
      "status": "active",
      "customiseMsg": "Customize Mes",
      "mktOfferFor": "topRank",
      "bidPrice": 405,
      "bid": true,
      "market": false,
      "city": "Bundaberg",
      "rating": 0,
      "likes": 0,
      "user": "643cd01d448a0837e2cf24cc",
      "createdAt": "2023-04-27T05:45:03.807Z",
      "updatedAt": "2023-04-27T08:59:14.513Z",
      "__v": 0,
      "slot": "weekly",
      "cartQuantity": 6,
      "purchaseStatus": 0
    },
    {
      "availDate": {
        "fromDate": "2023-04-20",
        "toDate": "2023-05-06"
      },
      "_id": "644a0c40d6d1cb77a63acaf4",
      "title": "Third Product",
      "image": [],
      "redeemProps": 2000,
      "description": "It is an new earphone",
      "brand": "Brand",
      "quantity": 400,
      "status": "active",
      "customiseMsg": "Thanks for buying this product",
      "mktOfferFor": "topRankOffer",
      "bidPrice": 0,
      "bid": false,
      "market": false,
      "city": "Bundaberg",
      "rating": 0,
      "likes": 0,
      "user": "643cd01d448a0837e2cf24cc",
      "createdAt": "2023-04-27T05:46:40.031Z",
      "updatedAt": "2023-04-27T05:46:40.031Z",
      "__v": 0,
      "cartQuantity": 3,
      "purchaseStatus": 0
    }
  ],
  "createdAt": {
    "$date": "2023-05-09T05:07:58.209Z"
  },
  "updatedAt": {
    "$date": "2023-05-13T10:12:10.100Z"
  },
  "__v": 0
}
const handleRedeem = async () => {
  const stripe = await getStripe();

  axios({
    url:`${process.env.HOST}/api/order/redeem`,
    method: "POST",
    data:cart
    }).then(function(response){
      console.log(response);
      if (response.statusCode === 500) return;
    //   toast.loading("Redirecting...");
      stripe.redirectToCheckout({ sessionId: response.data.id });
    })

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
        <button role="link" onClick={handleRedeem}>
          redeem
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
