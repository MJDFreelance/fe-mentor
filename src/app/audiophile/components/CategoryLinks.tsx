import Link from "next/link";
import ArrowRight from "@/app/audiophile/icons/icon-arrow-right.svg";
import text from "@/app/audiophile/text.module.css";

export const CategoryLinks = () => {
  const categories = ["headphones", "speakers", "earphones"];

  return (
    <section
      className={`grid md:grid-cols-3 px-6 md:px-10 xl:px-[165px] gap-x-2.5 xl:gap-x-7.5 gap-y-4`}
    >
      {categories.map((category) => (
        <address key={category} className={`group flex flex-col items-center`}>
          <img
            src={`/audiophile/shared/desktop/image-category-thumbnail-${category}.png`}
            alt="Hero image"
            className="h-40 z-10"
          />
          <section
            className={`font-bold flex flex-col w-full items-center uppercase items-center not-italic text-center 
                            bg-[#F1F1F1] pt-20 pb-5.5 xl:pb-8 -mt-20 rounded-card`}
          >
            <h2 className={`${text.h6}`}>{category}</h2>
            <Link
              href={`/audiophile/sections/${category}`}
              className={`flex gap-3 items-center group-hover:text-[#D87D4A]`}
            >
              shop <ArrowRight />
            </Link>
          </section>
        </address>
      ))}
    </section>
  );
};
