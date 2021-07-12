import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/basketSlice";
import router from "next/router";

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [hasPrime] = useState(Math.random() < 0.5);
  const [quantity, setQuantity] = useState(null);

  const addItemToCart = () => {
    setQuantity(quantity + 1);
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
      quantity,
    };

    dispatch(addToCart(product));
  };

  const buyNow = () => {
    addItemToCart();
    router.push("/checkout");
  };

  const removeOneFromCart = () => {
    setQuantity(quantity - 1);
    if (quantity <= 0) {
      setQuantity(0);
    }
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="/prime.png" alt="" />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <div className="flex flex-col space-y-2 justify-self-bottom mt-auto">
        {quantity > 0 ? (
          <div className="flex items-center mx-auto">
            <button onClick={removeOneFromCart} className="inc-dec">
              -
            </button>
            <input
              className="w-10 text-center focus:outline-none"
              value={quantity}
              readOnly
            />
            <button className="inc-dec" onClick={addItemToCart}>
              +
            </button>
          </div>
        ) : (
          <button onClick={addItemToCart} className="button">
            Add to Cart
          </button>
        )}

        <button onClick={buyNow} className="button">
          Buy now
        </button>
      </div>
    </div>
  );
}

export default Product;
