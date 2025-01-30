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
          className={`flex items-center justify-center relative h-[40px] w-[40px] bg-gradient-to-b 
                    from-[#FE71FE] to-[#7199FF] btn-circle-small rounded-full`}
        >
          <Image
            src="/hangman/images/icon-back.svg"
            alt="The Hangman Game"
            width={17}
            height={16}
            className={``}
          />
        </Link>
        <FancyText className={`gradient-text ${text.menutitle}`}>
          How to Play
        </FancyText>
      </div>
      <section className={`grid lg:grid-cols-3 gap-6`}>
        <article
          className={`grid grid-cols-[auto_1fr] lg:grid-cols-1 bg-white rounded-[20px] p-8 lg:p-12 gap-2 md:gap-x-10 
                    max-lg:grid-rows-[auto_1fr] justify-center`}
        >
          <h2
            className={`md:row-span-2 self-center flex gap-4 uppercase lg:mx-auto`}
          >
            <span className={`text-[hsl(223,100%,57%)] ${text.rulenumber}`}>
              01
            </span>
          </h2>
          <h2 className={`flex gap-4 uppercase lg:mx-auto ${text.ruletitle}`}>
            {" "}
            choose a category
          </h2>
          <p className={`max-md:col-span-2 ${text.ruletext}`}>
            First, choose a word category, like animals or movies. The computer
            then randomly selects a secret word from that topic and shows you
            blanks for each letter of the word.
          </p>
        </article>
        <article
          className={`grid grid-cols-[auto_1fr] lg:grid-cols-1 bg-white rounded-[20px] p-8 lg:p-12 gap-2 md:gap-x-10 
                    max-lg:grid-rows-[auto_1fr] justify-center`}
        >
          <h2
            className={`md:row-span-2 self-center flex gap-4 uppercase lg:mx-auto`}
          >
            <span className={`text-[hsl(223,100%,57%)] ${text.rulenumber}`}>
              02
            </span>
          </h2>
          <h2 className={`flex gap-4 uppercase lg:mx-auto ${text.ruletitle}`}>
            {" "}
            guess letters
          </h2>
          <p className={`max-md:col-span-2  ${text.ruletext}`}>
            Take turns guessing letters. The computer fills in the relevant
            blank spaces if your guess is correct. If it’s wrong, you lose some
            health, which empties after eight incorrect guesses.
          </p>
        </article>
        <article
          className={`grid grid-cols-[auto_1fr] lg:grid-cols-1 bg-white rounded-[20px] p-8 lg:p-12 gap-2 md:gap-x-10  
                    max-lg:grid-rows-[auto_1fr] justify-center`}
        >
          <h2
            className={`md:row-span-2 ${text.rulenumber} self-center flex gap-4 uppercase lg:mx-auto`}
          >
            <span className={`text-[hsl(223,100%,57%)] `}>03</span>
          </h2>
          <h2 className={`flex gap-4 uppercase lg:mx-auto ${text.ruletitle}`}>
            {" "}
            win or lose
          </h2>
          <p className={`max-md:col-span-2 ${text.ruletext}`}>
            You win by guessing all the letters in the word before your health
            runs out. If the health bar empties before you guess the word, you
            lose.
          </p>
        </article>
      </section>
    </section>
  );
};

export default Page;
