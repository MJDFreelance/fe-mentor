"use client";

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type ValueType = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
};

const DarkModeContext = createContext<ValueType>({
  isDarkMode: false,
  setIsDarkMode: () => {},
});
export const useDarkMode = () => useContext(DarkModeContext);
export const DarkModeProvider: FC<{ children?: ReactNode | undefined }> = (
  props,
) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    console.log("isDarkMode", isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
      }}
    >
      <div data-theme={isDarkMode ? "dark" : "light"}>{props.children}</div>
    </DarkModeContext.Provider>
  );
};
