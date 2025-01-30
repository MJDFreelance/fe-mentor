"use client";

import Link from "next/link";
import { Summary } from "@/app/audiophile/components/Summary";
import { CategoryLinks } from "@/app/audiophile/components/CategoryLinks";
import text from "@/app/audiophile/text.module.css";
import { Overlay, useMenu } from "@/app/audiophile/components/MenuContext";

export const Menu = () => {
  const { openMenu, setOpenMenu } = useMenu();

  return (
    <menu
      className={`z-10 grid grid-cols-[1fr_auto_1fr] col-span-2 py-8 xl:px-[165px] px-10 grid-area-[menu] relative`}
    >
      <Overlay />
      <div className={`xl:hidden group w-fit`}>
        <button
          onClick={() =>
            setOpenMenu((prev) =>
              prev !== "category" ? "category" : undefined,
            )
          }
        >
          <img
            src={`/audiophile/shared/tablet/icon-hamburger.svg`}
            alt={`menu`}
          />
        </button>
        {openMenu === "category" && (
          <div
            className={`z-[60] group-focus-within:flex absolute bottom-0 right-0 w-full grid justify-center bg-white text-black py-14 translate-y-full`}
          >
            <CategoryLinks />
          </div>
        )}
      </div>
      <img
        alt={`audiophile`}
        src={`/audiophile/shared/desktop/logo.svg`}
        className={``}
      />
      <ul
        className={`${text.menulink} flex gap-8 uppercase font-bold max-xl:hidden`}
      >
        <li>
          <Link href={`/audiophile`} className={`hover:text-[#D87D4A]`}>
            home
          </Link>
        </li>
        <li>
          <Link
            href={`/audiophile/sections/headphones`}
            className={`hover:text-[#D87D4A]`}
          >
            headphones
          </Link>
        </li>
        <li>
          <Link
            href={`/audiophile/sections/speakers`}
            className={`hover:text-[#D87D4A]`}
          >
            speakers
          </Link>
        </li>
        <li>
          <Link
            href={`/audiophile/sections/earphones`}
            className={`hover:text-[#D87D4A]`}
          >
            earphones
          </Link>
        </li>
      </ul>
      <div className={`justify-self-end group`}>
        <button
          onClick={() =>
            setOpenMenu((prev) => (prev !== "summary" ? "summary" : undefined))
          }
          className={`list-none`}
        >
          <img src={`/audiophile/shared/desktop/icon-cart.svg`} alt={`cart`} />
        </button>
        {openMenu === "summary" && (
          <div
            className={`flex max-md:justify-center translate-y-[calc(100%+24px)] absolute z-[60] md:mr-10 bottom-0 right-0 max-md:w-screen xl:shadow xl:translate-x-[-130px]`}
          >
            <Summary className={``} />
          </div>
        )}
      </div>
    </menu>
  );
};
