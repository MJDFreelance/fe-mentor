"use client";

import { useCart } from "@/app/audiophile/components/CartContext";
import { useState } from "react";
import context from "@/app/audiophile/context.module.css";
import text from "@/app/audiophile/text.module.css";

export const CartAdd = ({
  slug,
  useButton = true,
  className,
  counterClassName,
}: {
  slug: string;
  useButton?: boolean;
  className?: string;
  counterClassName?: string;
}) => {
  const [quantity, setQuantity] = useState(1);

  const { cart, updateQuantity } = useCart();

  const handleMinus = () => {
    if (useButton) {
      setQuantity((prev) => prev - 1);
      return;
    }
    updateQuantity(slug, -1);
  };

  const handlePlus = () => {
    if (useButton) {
      setQuantity((prev) => prev + 1);
      return;
    }
    updateQuantity(slug, 1);
  };

  const handleAddToCart = () => {
    updateQuantity(slug, quantity);
    setQuantity(1);
  };

  return (
    <div className={`${className} ${text.link} `}>
      <span
        className={`flex max-w-30 flex-1 items-center justify-center bg-[#F1F1F1] rounded-[#8px] ${counterClassName}`}
      >
        <button
          disabled={useButton && quantity < 1}
          onClick={handleMinus}
          className={`justify-self-center flex-1`}
        >
          -
        </button>
        <span className={`text-center flex-1`}>
          {useButton ? quantity : (cart[slug] ?? 0)}
        </span>
        <button onClick={handlePlus} className={`justify-self-center flex-1`}>
          +
        </button>
      </span>
      {useButton && (
        <button
          onClick={handleAddToCart}
          className={`text-white max-w-40 px-8 py-4 flex-1 bg-primary w-fit rounded-card uppercase hover:bg-[#FBAF85]`}
        >
          add to cart
        </button>
      )}
    </div>
  );
};
