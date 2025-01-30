"use client";

import {useGame} from "@/app/hangman/game/[category]/GameContext";
import {Progress} from "@/components/ui/progress";

export const GameProgress = () => {
    const {countWrong} = useGame();

    return (
        <Progress max={100} value={(100 - (countWrong * 10))}
                  className={`w-[57px] md:w-[240px] h-4 md:h-8 p-1 md:p-2 bg-white`}/>
    );
};