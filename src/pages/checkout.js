import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const [session] = useSession();
  const total = useSelector(selectTotal);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //creare a checkout session in backend
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    //redirect customer to checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/**Left Section */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/advert.png"
            objectFit="contain"
            width={1800}
            height={500}
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Your Cart is empty." : "Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
                rating={item.rating}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        {/*Right Section */}
        {items.length !== 0 ? (
          <div className="flex flex-col bg-white p-10 shadow-md">
            {items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  Subtotal of {items.length} items:
                  <span className="font-bold">
                    <Currency quantity={total} currency="USD" />
                  </span>
                </h2>
                <button
                  onClick={createCheckoutSession}
                  role="link"
                  disabled={!session}
                  className={`button mt-2 ${
                    !session &&
                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {!session ? "Sign In to checkout" : "Proceed to checkout"}
                </button>
              </>
            )}
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default Checkout;
