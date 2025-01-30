import data from "@/app/hangman/data.json";
import Link from "next/link";
import Image from "next/image";
import _ from "lodash";
import { GameProgress } from "@/app/hangman/game/[category]/GameProgress";
import { Game } from "@/app/hangman/game/[category]/Game";
import { GameProvider } from "@/app/hangman/game/[category]/GameContext";
import text from "@/app/hangman/text.module.css";

const Page = async ({ params }: { params: { category: string } }) => {
  const category = params.category;
  const categories: Record<string, { name: string }[]> = data.categories;

  const formattedCategoryName: string = category
    .split("-")
    .map((a: string) => (a === "tv" ? "TV" : _.startCase(a)))
    .join(" ");
  const categoryItems = categories[formattedCategoryName];

  return (
    <GameProvider categoryItems={categoryItems}>
      <section
        className={`flex flex-1 flex-col justify-between  px-6 py-8 gap-20`}
      >
        <div className={`flex justify-between items-center`}>
          <div className={`flex items-center gap-4 md:gap-6 text-white `}>
            <Link
              href={`/hangman/categories`}
              className={`flex items-center justify-center relative h-[40px] w-[40px] bg-[url(/hangman/images/circle.svg)] 
                bg-cover`}
            >
              <Image
                src="/hangman/images/icon-menu.svg"
                alt="The Hangman Game"
                width={17}
                height={16}
                className={``}
              />
            </Link>
            <span className={`${text.gametitle}`}>{_.startCase(category)}</span>
          </div>
          <div className={`flex items-center gap-4 md:gap-6`}>
            <GameProgress />
            <Image
              src={`/hangman/images/icon-heart.svg`}
              alt={`heart`}
              height={49}
              width={53}
              className={`h-6 w-6 md:h-8 md:w-13`}
            />
          </div>
        </div>
        <Game />
      </section>
    </GameProvider>
  );
};

export default Page;
