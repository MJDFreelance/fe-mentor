"use client"

import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState} from "react";

type ValueType = {
    mode: 'dark'|'light'|undefined;
    setMode: Dispatch<SetStateAction<"light" | "dark" | undefined>>;
};

const DarkContext = createContext<ValueType>({mode:undefined, setMode:()=>{throw Error(`setMode not implemented`)}});
export const useDark = () => useContext(DarkContext);
export const DarkProvider: FC<{ children?: ReactNode | undefined }> = props => {
    const [mode, setMode] = useState<'dark'|'light'|undefined>(`dark`);

    return (
        <DarkContext.Provider value={{mode, setMode}}>
            <div data-color-mode={mode} className={`group`}>
                {props.children}
            </div>
        </DarkContext.Provider>
    );
};
