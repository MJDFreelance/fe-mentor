import Image from "next/image";
import { FancyText } from "@/app/hangman/components/FancyText";
import Link from "next/link";
import text from "@/app/hangman/text.module.css";

const Page = () => {
  return (
    <section className={`flex flex-col px-6 py-8 gap-20`}>
      <div className={`flex justify-between items-center`}>
        <Link
          href={`/hangman`}
          className={`flex items-center justify-center relative min-h-[40px] w-[40px] bg-[url(/hangman/images/circle.svg)] 
                bg-cover`}
        >
          <Image
            src="/hangman/images/icon-back.svg"
            alt="The Hangman Game"
            width={17}
            height={16}
            className={``}
          />
        </Link>
        <FancyText className={`${text.menutitle} gradient-text text-white`}>
          How to Play
        </FancyText>
      </div>
      <section
        className={`${text.category} grid md:grid-cols-2 xl:grid-cols-3 gap-4`}
      >
        <Link
          href={`/hangman/game/movies`}
          className={`flex items-center justify-center bg-[#2463FF] text-white py-6 uppercase btn-shadow rounded-[20px] md:rounded-[48px] min-h-[77px] md:min-h-[190px]`}
        >
          movies
        </Link>
        <Link
          href={`/hangman/game/tv-shows`}
          className={`flex items-center justify-center bg-[#2463FF] text-white py-6 uppercase btn-shadow rounded-[20px] md:rounded-[48px] min-h-[77px] md:min-h-[190px]`}
        >
          tv shows
        </Link>
        <Link
          href={`/hangman/game/countries`}
          className={`flex items-center justify-center bg-[#2463FF] text-white py-6 uppercase btn-shadow rounded-[20px] md:rounded-[48px] min-h-[77px] md:min-h-[190px]`}
        >
          countries
        </Link>
        <Link
          href={`/hangman/game/capital-cities`}
          className={`flex items-center justify-center bg-[#2463FF] text-white py-6 uppercase btn-shadow rounded-[20px] md:rounded-[48px] min-h-[77px] md:min-h-[190px]`}
        >
          capital cities
        </Link>
        <Link
          href={`/hangman/game/animals`}
          className={`flex items-center justify-center bg-[#2463FF] text-white py-6 uppercase btn-shadow rounded-[20px] md:rounded-[48px] min-h-[77px] md:min-h-[190px]`}
        >
          animals
        </Link>
        <Link
          href={`/hangman/game/sports`}
          className={`flex items-center justify-center bg-[#2463FF] text-white py-6 uppercase btn-shadow rounded-[20px] md:rounded-[48px] min-h-[77px] md:min-h-[190px]`}
        >
          sports
        </Link>
      </section>
    </section>
  );
};

export default Page;
