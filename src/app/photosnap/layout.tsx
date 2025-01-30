import { ReactNode } from "react";
import IconFacebook from "@/app/photosnap/icons/facebook.svg";
import IconYoutube from "@/app/photosnap/icons/youtube.svg";
import IconPinterest from "@/app/photosnap/icons/pinterest.svg";
import IconTwitter from "@/app/photosnap/icons/twitter.svg";
import IconInstagram from "@/app/photosnap/icons/instagram.svg";
import IconMenu from "@/app/photosnap/icons/menu.svg";
import Logo from "@/app/photosnap/icons/logo.svg";
import Link from "next/link";
import { Menu } from "@/app/photosnap/components/Menu";
import Arrow from "@/app/photosnap/icons/arrow.svg";
import text from "@/app/photosnap/text.module.css";
import context from "@/app/photosnap/context.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`${context.page} ${text.body} bg-black`}>
      <div
        className={`max-w-[1440px] mx-auto min-h-screen max-w-screen w-full grid grid-rows-[auto_1fr_auto]`}
      >
        <header
          className={`z-20 sticky top-0 bg-white grid grid-cols-[1fr_auto_1fr] px-10 xl:px-[10.25rem] py-4 items-center`}
        >
          <Link href={`/photosnap`}>
            <Logo className={`fill-black`} />
          </Link>
          {/*<IconMenu className={`md:hidden col-start-3 justify-self-end`} />*/}
          <details
            className={`md:hidden list-none group col-start-3 justify-self-end`}
          >
            <summary>
              <IconMenu />
            </summary>
            <div
              className={`group-focus-within:grid absolute md:relative hidden md:grid-cols-subgrid md:col-span-2 justify-between max-md:py-20 max-md:grid-cols-1
                            items-center max-md:w-full max-md:bottom-0 max-md:translate-y-full max-md:bg-white max-md:gap-9 max-md:left-0`}
            >
              <Menu />
            </div>
          </details>
          <div
            className={`max-md:hidden absolute md:relative grid md:grid-cols-subgrid md:col-span-2 justify-between max-md:py-20 max-md:grid-cols-1
                            items-center max-md:w-full max-md:bottom-0 max-md:translate-y-full max-md:bg-white max-md:gap-9 max-md:left-0`}
          >
            <Menu />
          </div>
        </header>
        <div className={``}>{children}</div>
        <footer
          className={`h-fit grid text-white max-xl:justify-center max-md:text-center md:grid-cols-2 py-16 
                        md:grid-cols-[auto_1fr] xl:grid-cols-[auto_1fr_auto] xl:gap-x-[109px] gap-y-8
                        md:grid-areas-[logo_link|menu_menu|social_copyright] xl:grid-areas-[logo_menu_link|social_menu_copyright] px-10 xl:px-[171px]`}
        >
          <span className={`md:grid-area-[logo] max-md:justify-self-center`}>
            <Logo className={`fill-white`} />
          </span>
          <div
            className={`flex md:grid-area-[social] justify-self-center xl:self-end gap-3`}
          >
            <IconFacebook
              className={`uppercase [&:not(:hover)]:fill-white cursor-pointer`}
            />
            <IconYoutube
              className={`uppercase [&:not(:hover)]:fill-white cursor-pointer`}
            />
            <IconTwitter
              className={`uppercase [&:not(:hover)]:fill-white cursor-pointer`}
            />
            <IconPinterest
              className={`uppercase [&:not(:hover)]:fill-white cursor-pointer`}
            />
            <IconInstagram
              className={`uppercase [&:not(:hover)]:fill-white cursor-pointer`}
            />
          </div>
          <ul
            className={`${text.link} md:grid-area-[menu] md:flex xl:flex-col md:mb-18 xl:mb-0 md:gap-6`}
          >
            <li className={`uppercase hover:opacity-30`}>
              <Link href={`/photosnap`}>home</Link>
            </li>
            <li className={`uppercase hover:opacity-30`}>
              <Link href={`/photosnap/stories`}>stories</Link>
            </li>
            <li className={`uppercase hover:opacity-30`}>
              <Link href={`/photosnap/features`}>features</Link>
            </li>
            <li className={`uppercase hover:opacity-30`}>
              <Link href={`/photosnap/pricing`}>pricing</Link>
            </li>
          </ul>
          <div
            className={`${text.link} md:grid-area-[link] md:text-end justify-self-center md:justify-self-end flex items-center gap-4 hover:underline`}
          >
            GET AN INVITE <Arrow className={`stroke-white`} />
          </div>
          <div
            className={`md:grid-area-[copyright] xl:self-end md:text-end opacity-50`}
          >
            Copyright 2019. All Rights Reserved
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
