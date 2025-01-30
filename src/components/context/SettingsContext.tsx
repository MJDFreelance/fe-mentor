"use client"

import {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";

type SettingsValueType = {
    setColorMode: (mode: string) => void;
    setFont: (font: string) => void;
};

const SettingsContext = createContext({
                                                            setColorMode: (mode: string) => {
                                                                new Error(mode)
                                                            },
                                                            setFont: (font: string) => {
                                                                new Error(font)
                                                            }});
export const useSettings = () => useContext<SettingsValueType>(SettingsContext);
export const SettingsProvider: FC<{ children?: ReactNode | undefined, className?: string }> = props => {
    const [colorMode, setColorMode] = useState(`light`);
    const [font, setFont] = useState(`inconsolata`);

    return (
        <SettingsContext.Provider value={{colorMode, setColorMode, setFont}}>
            <div data-color-mode={colorMode} data-font={font} className={`group ${props.className}`}>
                {props.children}
            </div>
        </SettingsContext.Provider>
    );
};
