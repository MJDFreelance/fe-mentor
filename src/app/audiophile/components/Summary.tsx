"use client";

import { formatDecimalAsDollars } from "@/lib/utilities/numeric";
import { ReactNode } from "react";
import { useCart } from "@/app/audiophile/components/CartContext";
import Link from "next/link";
import { CartAdd } from "@/app/audiophile/components/CartAdd";
import context from "@/app/audiophile/context.module.css";
import text from "@/app/audiophile/text.module.css";

export const Summary = ({
  children,
  className,
  type = "cart",
}: {
  children?: ReactNode;
  className?: string;
  type?: "cart" | "summary";
}) => {
  const { basketProducts } = useCart();

  const totalPrice = basketProducts?.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );
  const shipping = 50;
  const vat = 0.2 * totalPrice;
  const grandTotal = totalPrice + shipping;

  return (
    <aside
      className={`flex flex-col gap-8 xl:w-[350px] px-8 py-8 bg-white rounded-[8px] h-fit ${className} ${type === "cart" && `w-[377px] max-w-[calc(100vw-32px)]`} text-black text-left`}
    >
      <h2
        className={`${text.price} font-bold text-[18px] tracking-[1.29px] uppercase`}
      >
        {type === "summary"
          ? "Summary"
          : `Cart (${basketProducts?.length ?? 0})`}
      </h2>
      <ul className={`flex flex-col gap-6`}>
        {basketProducts?.map((product) => {
          return (
            <li
              key={product.slug}
              className={`grid grid-cols-[auto_1fr_auto] font-bold gap-x-4`}
            >
              <img
                src={product?.image.desktop}
                alt={product?.name}
                className={`w-16 h-16 row-span-2 rounded-[8px]`}
              />
              <h3 className={`${text.body} self-end`}>
                {product?.name
                  .split(" ")
                  .splice(0, product?.name.split(" ").length - 1)
                  .join()}
              </h3>
              <span className={`${text.body} font-[.875rem] opacity-50`}>
                {formatDecimalAsDollars(product?.price, {
                  hasCommas: true,
                  integerOnly: true,
                })}
              </span>
              {type === "summary" ? (
                <span
                  className={`${text.link} col-start-3 row-start-1 self-end text-[15px] leading-[25px] tracking-0 opacity-50`}
                >
                  x{product.quantity}
                </span>
              ) : (
                <CartAdd
                  className={`col-start-3 row-start-1 row-span-2 self-center w-[96px] h-8`}
                  counterClassName={`h-full`}
                  slug={product.slug}
                  useButton={false}
                />
              )}
            </li>
          );
        })}
      </ul>
      <div className={`grid grid-cols-[auto_1fr] gap-y-2`}>
        <span className={`${text.body} uppercase`}>total</span>
        <span
          className={`justify-self-end font-bold text-[1.125rem] tracking-0`}
        >
          {formatDecimalAsDollars(totalPrice, {
            hasCommas: true,
            integerOnly: true,
          })}
        </span>
        {type === "summary" && (
          <>
            <span className={`${text.body} uppercase`}>shipping</span>
            <span
              className={`justify-self-end font-bold text-[18px] tracking-0`}
            >
              {formatDecimalAsDollars(shipping, {
                hasCommas: true,
                integerOnly: true,
              })}
            </span>
            <span className={`${text.body} uppercase`}>vat</span>
            <span
              className={`justify-self-end font-bold text-[18px] tracking-0`}
            >
              {formatDecimalAsDollars(vat, {
                hasCommas: true,
                integerOnly: true,
              })}
            </span>
            <span
              className={`text-[15px] leading-[25px] tracking-0 mt-4 uppercase`}
            >
              grand total
            </span>
            <span
              className={`justify-self-end font-bold text-[18px] tracking-0 mt-4`}
            >
              {formatDecimalAsDollars(grandTotal, {
                hasCommas: true,
                integerOnly: true,
              })}
            </span>
          </>
        )}
        {type === "cart" && (
          <Link
            href={`/audiophile/basket`}
            className={`${text.link} flex w-full justify-center uppercase bg-primary text-white py-4 col-span-2 rounded-[8px] mt-4`}
          >
            checkout
          </Link>
        )}
      </div>
      {children}
    </aside>
  );
};
