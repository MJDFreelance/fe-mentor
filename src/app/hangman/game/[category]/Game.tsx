"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FancyText } from "@/app/hangman/components/FancyText";
import Link from "next/link";
import { useGame } from "@/app/hangman/game/[category]/GameContext";
import text from "@/app/hangman/text.module.css";

export const Game = () => {
  const {
    handleGuess,
    guessed,
    hasLost,
    hasWon,
    resetGame,
    phrase,
    lettersInAlphabet,
  } = useGame();

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center gap-2 md:gap-3`}
      >
        {phrase.split(" ").map((word, index) => (
          <div className={`flex gap-2 md:gap-3`} key={`${word}-${index}`}>
            {word.split("").map((letter, index) => (
              <div
                className={`${text.guessedletter} btn-shadow bg-[#2463FF] flex justify-center items-center text-white uppercase
                                                rounded-[12px] md:rounded-[32px] xl:rounded-[40px]
                                                w-10 h-16 md:w-[88px] md:h-[112px] xl:w-[112px] xl:h-[128px]
                                            ${!guessed.includes(letter.toLowerCase()) && "!text-[0px] opacity-25"}`}
                key={`${letter}-${index}`}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div
        className={`grid grid-cols-9 w-fit self-justify-center self-center text-white gap-2 md:gap-4 xl:gap-8`}
      >
        {lettersInAlphabet.map((letter, index) => (
          <button
            key={`${letter}-${index}`}
            onClick={() => handleGuess(letter)}
            className={`${text.keyboard} bg-white text-[#261676] uppercase
                                        rounded-[8px] md:rounded-[24px]
                                        w-7 h-14 md:w-16 md:h-20 xl:w-[109px] xl:h-[84px]
                                ${guessed.includes(letter) && "opacity-25"}`}
          >
            {letter}
          </button>
        ))}
      </div>
      <Dialog open={hasLost}>
        <DialogContent
          className="font-mouseMemoirs mt-[50px] bg-full px-8 flex flex-col max-w-[324px] w-fit md:max-w-[592px] bg-gradient-to-b from-[#344ABA] to-[hsl(230,100%,24%,0.83)]
               items-center outline-transparent border-transparent !rounded-[72px] btn-card-shadow "
        >
          {hasLost && (
            <div className={`-translate-y-[60px]`}>
              <DialogHeader>
                <DialogTitle>
                  <FancyText
                    className={`${text.pausetitle} gradient-text text-white -translate-y-[30px] md:-translate-y-[60px]`}
                  >
                    You lose
                  </FancyText>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-[34px] items-center px-[52px] pt-15">
                <button
                  onClick={() => resetGame()}
                  className={`${text.link} bg-[#2463FF] text-nowrap text-white py-1.5 md:py-6 uppercase btn-shadow rounded-[20px] md:rounded-[48px] px-16`}
                >
                  restart
                </button>
                <Link
                  href={`/hangman/categories`}
                  className={`${text.link} bg-[#2463FF] text-nowrap text-white py-1.5 md:py-6 uppercase btn-shadow rounded-[20px] md:rounded-[48px] px-16`}
                >
                  new category
                </Link>
                <Link
                  href={`/hangman`}
                  className={`${text.link} bg-gradient-to-b from-[#FE71FE] to-[#7199FF] text-white py-1.5 md:py-6 uppercase btn-shadow-pink rounded-[20px] md:rounded-[48px] px-16`}
                >
                  quit game
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={hasWon}>
        <DialogContent
          className="font-mouseMemoirs mt-[50px] bg-full px-8 flex flex-col max-w-[324px] w-fit md:max-w-[592px] bg-gradient-to-b from-[#344ABA] to-[hsl(230,100%,24%,0.83)]
               items-center outline-transparent border-transparent !rounded-[72px] btn-card-shadow"
        >
          {hasWon && (
            <div className={`-translate-y-[60px]`}>
              <DialogHeader>
                <DialogTitle>
                  <FancyText
                    className={`${text.pausetitle} gradient-text text-white`}
                  >
                    You Win
                  </FancyText>
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-[34px] items-center px-[52px] pt-15">
                <button
                  onClick={() => resetGame()}
                  className={`${text.link} bg-[#2463FF] text-nowrap text-white py-1.5 md:py-6 uppercase btn-shadow rounded-[20px] md:rounded-[48px] px-16`}
                >
                  restart
                </button>
                <Link
                  href={`/hangman/categories`}
                  className={`${text.link} bg-[#2463FF] text-nowrap text-white py-1.5 md:py-6 uppercase btn-shadow rounded-[20px] md:rounded-[48px] px-16`}
                >
                  new category
                </Link>
                <Link
                  href={`/hangman`}
                  className={`${text.link} bg-gradient-to-b from-[#FE71FE] to-[#7199FF] text-white py-1.5 md:py-6 uppercase btn-shadow-pink rounded-[20px] md:rounded-[48px] px-16`}
                >
                  quit game
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
