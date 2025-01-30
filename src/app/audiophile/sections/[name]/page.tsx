import Link from "next/link";
import ArrowRight from "@/app/audiophile/icons/icon-arrow-right.svg";
import data from "@/app/audiophile/data.json";
import { Menu } from "@/app/audiophile/components/Menu";
import text from "@/app/audiophile/text.module.css";

const Page = ({ params: { name } }: any) => {
  const products = data
    .filter((product: any) => product.category === name)
    .sort((a: any, b: any) => a.new - b.new)
    .reverse();

  return (
    <div
      className={`flex flex-col gap-30 md:gap-24 gap-10 max-w-page-width w-full`}
    >
      <header
        className={`grid bg-[#0E0E0E] grid-cols-2 text-white grid-areas-[menu_menu|hr_hr|main_main] xl:grid-areas-[menu_menu|hr_hr|main_free] grid-rows-[auto_auto_1fr]`}
      >
        <Menu />
        <h1
          className={`${text.h4} min-h-[241px] bg-black flex justify-center items-center col-span-3 uppercase`}
        >
          {name}
        </h1>
      </header>
      {products.map((product, index) => (
        <section
          key={product.id}
          className={`flex flex-col-reverse ${index % 2 > 0 ? "xl:flex-row" : "xl:flex-row-reverse"} px-6 md:px-10 xl:px-[165px] items-center`}
        >
          <div
            className={`flex flex-col gap-8 justify-center flex-1 max-xl:pt-16 max-xl:text-center max-xl:items-center max-xl:px-14 max-w-[105ch] `}
          >
            <div
              className={`flex flex-col gap-8 w-fit ${index % 2 > 0 ? "" : "xl:ml-auto"} max-w-[445px] max-xl:items-center`}
            >
              {product.new && (
                <span
                  className={`${text.overline} uppercase text-primary text-overline`}
                >
                  new product
                </span>
              )}
              <h2 className={`${text.h4alt} uppercase max-w-20ch`}>
                {product.name}
              </h2>
              <p className={`${text.body} px-6 !font-normal xl:max-w-[58.5ch]`}>
                {product.description}
              </p>
              <Link
                href={`/audiophile/products/${product.slug}`}
                className={`${text.link} hover:bg-[#FBAF85] text-white px-8 py-4 bg-primary w-fit rounded-card uppercase`}
              >
                see product
              </Link>
            </div>
          </div>
          <picture className="flex-1">
            <source
              srcSet={product.categoryImage.desktop}
              media="(min-width: 1280px)"
            />
            <source
              srcSet={product.categoryImage.tablet}
              media="(min-width: 768px)"
            />
            <source
              srcSet={product.categoryImage.mobile}
              media="(max-width: 767px)"
            />
            <img
              src={product.categoryImage.mobile}
              alt="Hero image"
              className="w-full h-auto w-full xl:w-[540px]"
            />
          </picture>
        </section>
      ))}
      <section
        className={`grid md:grid-cols-3 px-6 md:px-10 xl:px-[165px] gap-x-2.5 xl:gap-x-7.5 gap-y-4`}
      >
        <address className={`flex flex-col items-center`}>
          <img
            src="/audiophile/shared/desktop/image-category-thumbnail-headphones.png"
            alt="Hero image"
            className="h-40 z-10"
          />
          <section
            className={`font-bold flex flex-col w-full items-center uppercase items-center not-italic text-center 
                            bg-[#F1F1F1] pt-20 pb-5.5 xl:pb-8 -mt-20 rounded-card`}
          >
            <h2 className={`${text.h6}`}>headphones</h2>
            <Link href={""} className={`flex gap-3 items-center`}>
              shop <ArrowRight />
            </Link>
          </section>
        </address>
        <address className={`flex flex-col items-center`}>
          <img
            src="/audiophile/shared/desktop/image-category-thumbnail-speakers.png"
            alt="Hero image"
            className="h-40 z-10"
          />
          <section
            className={`font-bold flex flex-col w-full items-center uppercase items-center not-italic text-center 
                            bg-[#F1F1F1] pt-20 pb-5.5 xl:pb-8 -mt-20 rounded-card`}
          >
            <h2 className={`${text.h6}`}>speakers</h2>
            <Link href={""} className={`flex gap-3 items-center`}>
              shop <ArrowRight />
            </Link>
          </section>
        </address>
        <address className={`flex flex-col items-center`}>
          <img
            src="/audiophile/shared/desktop/image-category-thumbnail-earphones.png"
            alt="Hero image"
            className="h-40 z-10"
          />
          <section
            className={`font-bold flex flex-col w-full items-center uppercase items-center not-italic text-center 
                            bg-[#F1F1F1] pt-20 pb-5.5 xl:pb-8 -mt-20 rounded-card`}
          >
            <h2 className={`${text.h6}`}>earphones</h2>
            <Link href={""} className={`flex gap-3 items-center`}>
              shop <ArrowRight />
            </Link>
          </section>
        </address>
      </section>
      <section
        className={`flex max-xl:flex-col-reverse px-6 md:px-10 xl:px-[165px] items-center`}
      >
        <div
          className={`flex flex-col gap-8 justify-center flex-1 max-xl:pt-16 max-xl:text-center max-xl:items-center max-xl:px-14 max-w-[105ch] `}
        >
          <h2 className={`${text.h4alt} px-6 uppercase w-20ch`}>
            Bringing you the{" "}
            <strong className={`text-primary font-bold`}>best</strong> audio
            gear
          </h2>
          <p className={`${text.body} px-6 xl:max-w-[58.5ch] xl:pr-4`}>
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
