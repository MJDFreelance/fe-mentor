import Link from "next/link";
import ArrowRight from "@/app/audiophile/icons/icon-arrow-right.svg";
import data from "@/app/audiophile/data.json";
import { formatDecimalAsDollars } from "@/lib/utilities/numeric";
import { CartAdd } from "@/app/audiophile/components/CartAdd";
import { Menu } from "@/app/audiophile/components/Menu";
import { NextGoBack } from "@/app/audiophile/components/NextGoBack";
import text from "@/app/audiophile/text.module.css";

const Page = ({ params: { slug } }: any) => {
  const product = data.find((product: any) => product.slug === slug);

  return (
    <div
      className={`flex flex-col gap-30 md:gap-24 gap-10 max-w-page-width w-full text-[13px] tracking-[1px]`}
    >
      <header
        className={`grid bg-[#0E0E0E] grid-cols-2 text-white grid-areas-[menu_menu|hr_hr|main_main] xl:grid-areas-[menu_menu|hr_hr|main_free] grid-rows-[auto_auto_1fr]`}
      >
        <Menu />
        <NextGoBack />
      </header>
      {product && (
        <>
          <section
            key={product.id}
            className={`-mt-30 md:-mt-24 grid md:grid-cols-[auto_auto] md:flex-row-reverse 
                            px-6 md:px-10 xl:px-[165px] items-center gap-y-8`}
          >
            <div
              className={`flex flex-col gap-8 justify-center flex-1 justify-self-end`}
            >
              <div className={`flex flex-col gap-8 md:ml-[128px]`}>
                {product.new && (
                  <span className={`${text.overline} uppercase text-primary`}>
                    new product
                  </span>
                )}
                <h2 className={`${text.h4alt2} max-w-[15ch]`}>
                  {product.name}
                </h2>
                <p className={``}>{product.description}</p>
                <span className={`${text.price}`}>
                  {formatDecimalAsDollars(product.price)}
                </span>
                <CartAdd slug={slug} className={`flex gap-4`} />
              </div>
            </div>
            <picture className="h-full col-start-1 row-start-1 w-full md:w-[281px] xl:w-[540px]">
              <source
                srcSet={product.image.desktop}
                media="(min-width: 1280px)"
              />
              <source
                srcSet={product.image.tablet}
                media="(min-width: 768px)"
              />
              <source
                srcSet={product.image.mobile}
                media="(max-width: 767px)"
              />
              <img
                src={product.image.mobile}
                alt="Hero image"
                className="w-full h-full object-cover"
              />
            </picture>
          </section>
          <section
            className={`grid md:grid-cols-2 xl:grid-cols-3 px-6 md:px-10 xl:px-[165px] gap-y-[88px] md:gap-y-30`}
          >
            <div className={`flex flex-col col-span-2 gap-8 max-xl:col-span-2`}>
              <h2 className={`${text.feature}`}>Features</h2>
              <div className={`flex flex-col gap-4`}>
                {product.features.split(/\n\n/).map((featuretext, index) => (
                  <p
                    key={index}
                    className={`${text.body} xl:max-w-[85ch] pr-8`}
                  >
                    {featuretext}
                  </p>
                ))}
              </div>
            </div>
            <div
              className={`flex flex-col gap-8 max-xl:col-span-2 max-xl:grid md:grid-cols-subgrid`}
            >
              <h2 className={`uppercase ${text.feature}`}>In the box</h2>
              <ul>
                {product.includes.map((item, index) => (
                  <li key={index} className={`flex gap-6`}>
                    <span className={`text-primary`}>{item.quantity}x</span>
                    <span>{item.item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section
            className={`grid px-6 md:px-10 xl:px-[165px] md:grid-cols-[277fr_395fr] gap-8`}
          >
            <picture className="md:col-start-1 md:row-start-1">
              <source
                srcSet={product.gallery.first.desktop}
                media="(min-width: 1280px)"
              />
              <source
                srcSet={product.gallery.first.tablet}
                media="(min-width: 768px)"
              />
              <source
                srcSet={product.gallery.first.mobile}
                media="(max-width: 767px)"
              />
              <img
                src={product.gallery.first.mobile}
                alt="Hero image"
                className="w-full h-auto"
              />
            </picture>
            <picture className="md:col-start-1 md:row-start-2">
              <source
                srcSet={product.gallery.second.desktop}
                media="(min-width: 1280px)"
              />
              <source
                srcSet={product.gallery.second.tablet}
                media="(min-width: 768px)"
              />
              <source
                srcSet={product.gallery.second.mobile}
                media="(max-width: 767px)"
              />
              <img
                src={product.gallery.second.mobile}
                alt="Hero image"
                className="w-full h-auto"
              />
            </picture>
            <picture className="md:row-span-2 md:col-start-2">
              <source
                srcSet={product.gallery.third.desktop}
                media="(min-width: 1280px)"
              />
              <source
                srcSet={product.gallery.third.tablet}
                media="(min-width: 768px)"
              />
              <source
                srcSet={product.gallery.third.mobile}
                media="(max-width: 767px)"
              />
              <img
                src={product.gallery.third.mobile}
                alt="Hero image"
                className="w-full h-auto max-md:max-h-[368px]"
              />
            </picture>
          </section>

          <section
            className={`grid md:grid-cols-3 px-6 md:px-10 xl:px-[165px] gap-x-2.5 xl:gap-x-7.5 gap-y-14 font-bold`}
          >
            {product.others?.map((other) => (
              <address
                key={other.slug}
                className={`flex flex-col items-center gap-8 not-italic`}
              >
                <picture className="md:row-span-2 md:col-start-2 mt-2">
                  <source
                    srcSet={other.image.desktop}
                    media="(min-width: 1280px)"
                  />
                  <source
                    srcSet={other.image.tablet}
                    media="(min-width: 768px)"
                  />
                  <source
                    srcSet={other.image.mobile}
                    media="(max-width: 767px)"
                  />
                  <img
                    src={other.image.mobile}
                    alt="Hero image"
                    className="w-full h-auto max-md:max-h-[368px]"
                  />
                </picture>
                <h2 className={`${text.h5}`}>{other.name}</h2>
                <Link
                  href={`/audiophile/products/${other.slug}`}
                  className={`flex gap-3 items-center px-8 py-4 bg-primary uppercase text-white hover:bg-[#FBAF85]`}
                >
                  see product
                </Link>
              </address>
            ))}
          </section>
        </>
      )}

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
                            bg-[#F1F1F1] pt-20 pb-5.5 xl:pb-8 -mt-20 rounded-[8px]`}
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
          className={`flex flex-col gap-6 justify-center flex-1 pt-8 text-center md:text-left px-6 lg:px-0 max-w-[95ch]`}
        >
          <h2 className={`${text.h4alt} uppercase max-w-20ch`}>
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
