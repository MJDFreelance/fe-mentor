import Link from "next/link";
import { Menu } from "@/app/audiophile/components/Menu";
import { CategoryLinks } from "@/app/audiophile/components/CategoryLinks";
import text from "@/app/audiophile/text.module.css";

const Page = () => {
  return (
    <div
      className={`flex flex-col gap-30 md:gap-24 gap-10 max-w-page-width w-full text-[13px] tracking-[1px]`}
    >
      <header
        className={`grid bg-[#0E0E0E] grid-cols-2 text-white grid-areas-[menu_menu|hr_hr|main_main] xl:grid-areas-[menu_menu|hr_hr|main_free] grid-rows-[auto_auto_1fr]`}
      >
        <picture className="col-start-1 col-end-[-1] row-start-1 row-end-[-1]">
          <source
            srcSet="/audiophile/home/desktop/image-hero.jpg"
            media="(min-width: 1280px)"
          />
          <source
            srcSet="/audiophile/home/tablet/image-header.jpg"
            media="(min-width: 768px)"
          />
          <source
            srcSet="/audiophile/home/mobile/image-header.jpg"
            media="(max-width: 767px)"
          />
          <img
            src="/audiophile/home/mobile/image-header.jpg"
            alt="Hero image"
            className="w-full h-auto"
          />
        </picture>
        <Menu />
        <hr className={`col-span-2 xl:mx-[165px] md:mx-10 grid-area-[hr]`} />
        <section
          className={`flex flex-col gap-6 xl:px-[165px] px-10 grid-area-[main] self-center max-xl:items-center`}
        >
          <span className={`${text.overline} opacity-50`}>NEW PRODUCT</span>
          <h1 className={`${text.h1} max-xl:text-center`}>
            XX99 Mark II Headphones
          </h1>
          <p className={`${text.body} max-xl:text-center`}>
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <button
            className={`${text.link} px-8 py-4 w-fit bg-primary mt-4 font-bold hover:bg-[#FBAF85]`}
          >
            See Product
          </button>
        </section>
      </header>
      <CategoryLinks />
      <section
        className={`grid md:grid-cols-2 px-6 md:px-10 xl:px-[165px] gap-y-12 gap-x-3`}
      >
        <address
          className={`grid col-span-2 xl:grid-cols-2 max-xl:justify-center bg-primary auto-cols-auto rounded-card 
                        bg-[url(/audiophile/home/desktop/pattern-circles.svg)] bg-no-repeat xl:bg-[-100px_-50px] bg-[center_-300px]`}
        >
          <picture className="w-[172px] max-w-[70%] md:w-[197px] xl:w-[410px] xl:mx-30 xl:translate-y-5 xl:mt-20 max-xl:justify-self-center max-xl:my-12">
            <source
              srcSet="/audiophile/home/desktop/image-speaker-zx9.png"
              media="(min-width: 1280px)"
            />
            <source
              srcSet="/audiophile/home/tablet/image-speaker-zx9.png"
              media="(min-width: 768px)"
            />
            <source
              srcSet="/audiophile/home/mobile/image-speaker-zx9.png"
              media="(max-width: 767px)"
            />
            <img
              src="/audiophile/home/mobile/image-speaker-zx9.png"
              alt="Hero image"
              className="w-full h-auto"
            />
          </picture>
          <section
            className={`flex flex-col max-xl:items-center max-xl:text-center gap-6 text-white self-center 
                            not-italic xl:pl-10 max-xl:pb-16 max-xl:justify-self-center`}
          >
            <h2 className={`font-bold ${text.h1} max-w-[10ch]`}>ZX9 SPEAKER</h2>
            <p
              className={`font-bold ${text.body} max-w-20ch md:max-w-40ch opacity-75`}
            >
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </p>
            <Link
              href={`/audiophile/products/zx9-speaker`}
              className={`${text.link} bg-black px-8 py-4 text-white w-fit mt-4 hover:bg-muted`}
            >
              See Product
            </Link>
          </section>
        </address>
        <address
          className={`flex flex-col gap-8 font-bold py-25 col-span-2 rounded-card not-italic px-6 md:px-18 xl:px-24 max-sm:bg-right bg-cover bg-no-repeat md:bg-[length:100%] md:bg-right-bottom
                    bg-[url(/audiophile/home/mobile/image-speaker-zx7.jpg)] sm:bg-[url(/audiophile/home/tablet/image-speaker-zx7.jpg)] xl:bg-[url(/audiophile/home/desktop/image-speaker-zx7.jpg)]`}
        >
          <h2 className={`${text.h4} pr-10`}>ZX7 SPEAKER</h2>
          <Link
            href={`/audiophile/products/zx7-speaker`}
            className={`${text.link} border border-black w-fit px-8 py-4 hover:bg-black hover:text-white`}
          >
            See Product
          </Link>
        </address>
        <picture className="object-center max-md:col-span-2 rounded-card overflow-hidden">
          <source
            srcSet="/audiophile/home/desktop/image-earphones-yx1.jpg"
            media="(min-width: 1280px)"
          />
          <source
            srcSet="/audiophile/home/tablet/image-earphones-yx1.jpg"
            media="(min-width: 768px)"
          />
          <source
            srcSet="/audiophile/home/mobile/image-earphones-yx1.jpg"
            media="(max-width: 767px)"
          />
          <img
            src="/audiophile/home/mobile/image-earphones-yx1.jpg"
            alt="Hero image"
            className="w-full h-auto"
          />
        </picture>
        <address
          className={`max-md:col-span-2 flex flex-col items-center justify-center gap-8 font-bold rounded-card not-italic px-6 md:px-18 xl:px-24 max-sm:bg-right 
                        bg-[#F1F1F1] py-10`}
        >
          <div className={`flex flex-col gap-8`}>
            <h2 className={`${text.h4}`}>YX1 EARPHONES</h2>
            <Link
              href={`/audiophile/products/yx1-earphones`}
              className={`${text.link} border border-black w-fit px-8 py-4 hover:bg-black hover:text-white`}
            >
              See Product
            </Link>
          </div>
        </address>
      </section>
      <section
        className={`flex max-xl:flex-col-reverse px-6 md:px-10 xl:px-[165px] items-center`}
      >
        <div
          className={`flex flex-col gap-8 justify-center flex-1 max-xl:pt-16 max-xl:text-center max-xl:items-center  md:px-14 xl:px-0 max-w-[105ch] `}
        >
          <h2 className={`${text.h4alt} uppercase w-20ch`}>
            Bringing you the{" "}
            <strong className={`text-primary font-bold`}>best</strong> audio
            gear
          </h2>
          <p className={`${text.body} xl:max-w-[58.5ch] xl:pr-4`}>
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
        <picture className="flex-1">
          <source
            srcSet="/audiophile/shared/desktop/image-best-gear.jpg"
            media="(min-width: 1280px)"
          />
          <source
            srcSet="/audiophile/shared/tablet/image-best-gear.jpg"
            media="(min-width: 768px)"
          />
          <source
            srcSet="/audiophile/shared/mobile/image-best-gear.jpg"
            media="(max-width: 767px)"
          />
          <img
            src="/audiophile/shared/mobile/image-best-gear.jpg"
            alt="Hero image"
            className="w-full h-auto"
          />
        </picture>
      </section>
    </div>
  );
};

export default Page;
