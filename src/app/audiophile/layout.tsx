import { ReactNode } from "react";
import Facebook from "@/app/audiophile/icons/icon-facebook.svg";
import Instagram from "@/app/audiophile/icons/icon-instagram.svg";
import Twitter from "@/app/audiophile/icons/icon-twitter.svg";
import { CartProvider } from "@/app/audiophile/components/CartContext";
import Link from "next/link";
import context from "@/app/audiophile/context.module.css";
import text from "@/app/audiophile/text.module.css";
import { MenuProvider, Overlay } from "@/app/audiophile/components/MenuContext";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <CartProvider>
      <MenuProvider>
        <div
          className={`${context.page} ${text.body} flex flex-col items-center min-h-screen max-w-screen w-full bg-background font-manrope`}
        >
          <div
            className={`flex flex-col flex-1 items-center max-w-screen w-full bg-background font-manrope`}
          >
            {children}
          </div>
          <footer className={`w-full bg-black mt-24`}>
            <div
              className={`grid md:grid-cols-2 py-15 px-10 bg-black w-full  text-white max-md:justify-center 
                    gap-y-12 md:gap-y-8 xl:gap-y-9 max-w-page-width mx-auto px-6 md:px-10 xl:px-page-padding`}
            >
              <img
                alt={`audiophile`}
                src={`/audiophile/shared/desktop/logo.svg`}
                className={`max-md:justify-self-center`}
              />
              <ul
                className={`${text.linkfooter} flex max-md:flex-col items-center xl:justify-self-end max-xl:col-start-1 max-md:justify-self-center 
                        gap-4 md:gap-8 uppercase text-overline`}
              >
                <li>
                  <Link href={`/audiophile`} className={`hover:text-primary`}>
                    home
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/audiophile/sections/headphones`}
                    className={`hover:text-primary`}
                  >
                    headphones
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/audiophile/sections/speakers`}
                    className={`hover:text-primary`}
                  >
                    speakers
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/audiophile/sections/earphones`}
                    className={`hover:text-primary`}
                  >
                    earphones
                  </Link>
                </li>
              </ul>
              <p
                className={`${text.body} col-start-1 max-md:text-center opacity-50`}
              >
                Audiophile is an all in one stop to fulfill your audio needs.
                We&apos;re a small team of music lovers and sound specialists
                who are devoted to helping you get the most out of personal
                audio. Come and visit our demo facility - we&apos;re open 7 days
                a week.
              </p>
              <span
                className={`${text.body} col-start-1 max-md:justify-self-center opacity-50`}
              >
                Copyright 2021. All Rights Reserved
              </span>
              <span
                className={`flex gap-4 md:justify-self-end max-md:col-start-1 justify-self-center`}
              >
                <Facebook /> <Twitter /> <Instagram />
              </span>
            </div>
          </footer>
        </div>
      </MenuProvider>
    </CartProvider>
  );
};

export default Layout;
