import Image from "next/image";
import Link from "next/link";
import text from "@/app/hangman/text.module.css";

const Page = () => {
  return (
    <section
      className={`flex flex-col items-center justify-center w-full min-h-screen bg-bottom bg-cover`}
    >
      <div
        className={`mt-[50px] bg-full px-8 flex flex-col max-w-[324px] w-full md:max-w-[592px] h-[481px] bg-gradient-to-b from-[#344ABA] to-[hsl(230,100%,24%,0.83)]
            justify-between items-center rounded-[72px] btn-card-shadow`}
      >
        <Image
          src="/hangman/images/logo.svg"
          alt="The Hangman Game"
          width={263}
          height={130.2}
          className={`-translate-y-[50px]`}
        />
        <Link
          href={`/hangman/categories`}
          className={`flex items-center justify-center relative h-[160px] w-[160px] bg-gradient-to-b from-[#FE71FE] to-[#7199FF] rounded-full
                -translate-y-[50px] btn-circle`}
        >
          <Image
            src="/hangman/images/icon-play.svg"
            alt="The Hangman Game"
            width={52}
            height={50}
            className={``}
          />
        </Link>
        <Link
          href={`/hangman/rules`}
          className={`${text.link} uppercase py-[12px] flex items-center md:max-w-[260px]
                justify-center w-full bg-[url(/hangman/images/btn-back.png)] text-white bg-no-repeat bg-cover translate-y-[-50px]`}
        >
          how to play
        </Link>
      </div>
    </section>
  );
};

export default Page;
