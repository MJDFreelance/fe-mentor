"use client"

import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useState} from "react";

const lettersInAlphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const pickRandFromArray = (arr: {name:string}[]) => arr[Math.floor(Math.random() * arr.length)];

type ValueType = {
    lettersInAlphabet: string[];
    phrase: string;
    handleGuess: (letter: string) => void;
    guessed: string[];
    hasLost: boolean;
    hasWon: boolean;
    resetGame: () => void;
    countWrong: number;
}

const GameContext = createContext<ValueType>({
    lettersInAlphabet,
    phrase: 'test',
    handleGuess: () => {
    },
    guessed: [],
    hasLost: false,
    hasWon: false,
    countWrong: 0,
    resetGame: () => {
    }
});
export const useGame = () => useContext(GameContext);
export const GameProvider: FC<{ children?: ReactNode | undefined, categoryItems:{name:string}[] }> = ({categoryItems, children}) => {
    const [phrase, setPhrase] = useState(()=>'');
    useEffect(() => {
        setPhrase(pickRandFromArray(categoryItems).name);
    }, [categoryItems]);
    const [guessed, setGuessed] = useState<string[]>([]);
    const [countWrong, setCountWrong] = useState<number>(0);
    //const [,setHasPaused] = useState<boolean>(false);
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [hasLost, setHasLost] = useState<boolean>(false);
    const resetGame = ()=>{
        setPhrase(pickRandFromArray(categoryItems).name);
        setGuessed([]);
        setCountWrong(0);
        setHasWon(false);
        setHasLost(false);
    };

    const handleGuess = (letter: string) => {
        const phraseLetters = phrase.replaceAll(' ', '').toLowerCase().split('');

        setGuessed((prevGuessed) => {
            const updatedGuessed = [...prevGuessed, letter];

            if (phraseLetters.every(phraseLetter => updatedGuessed.includes(phraseLetter))) {
                setHasWon(true);
            }

            if (!phrase.toLowerCase().includes(letter)) {
                setCountWrong((prevCount) => {
                    if (prevCount === 9) {
                        setHasLost(true);
                        return prevCount;
                    }
                    return prevCount + 1;
                });
            }

            return updatedGuessed;
        });
    }

    const handleKeyPress = useCallback((event:any) => {
        if (event.key && lettersInAlphabet.includes(event.key.toString().toLowerCase())) handleGuess(event.key.toLowerCase());
    }, [phrase]);

    useEffect(() => {
        // Add event listener to window for keydown
        window.addEventListener('keydown', handleKeyPress);

        // Cleanup to remove the event listener when component unmounts
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <GameContext.Provider value={{
            lettersInAlphabet,
            phrase,
            handleGuess,
            guessed,
            hasLost,
            hasWon,
            resetGame,
            countWrong
        }}>
            {children}
        </GameContext.Provider>
    );
};
