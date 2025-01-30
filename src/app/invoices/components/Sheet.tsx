"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import IconMoon from "@/app/invoices/icons/icon-moon.svg";
import IconSun from "@/app/invoices/icons/icon-sun.svg";
import { useDark } from "@/app/invoices/components/DarkContext";
import { useInvoice } from "@/app/invoices/components/InvoiceContext";

type ValueType = {
  paperOpen: boolean;
  setPaperOpen: Dispatch<SetStateAction<boolean>>;
};

const SheetContext = createContext<ValueType>({
  paperOpen: false,
  setPaperOpen: () => {
    throw Error("setPaperOpen not implemented");
  },
});

export const useSheet = () => useContext(SheetContext);

export const SheetProvider = ({ children }: { children: ReactNode }) => {
  const [paperOpen, setPaperOpen] = useState(false);

  return (
    <SheetContext.Provider value={{ paperOpen, setPaperOpen }}>
      {children}
    </SheetContext.Provider>
  );
};

export const Sheet = ({ children }: { children?: ReactNode }) => {
  const { paperOpen, setPaperOpen } = useSheet();
  const { mode, setMode } = useDark();
  const { viewMode } = useInvoice();

  useEffect(() => {
    if (viewMode?.view) {
      setPaperOpen(true);
    } else {
      setPaperOpen(false);
    }
  }, [viewMode]);

  return (
    <>
      <div
        onClick={() => setPaperOpen(false)}
        className={`h-screen w-screen absolute bg-black 
                ${paperOpen ? `opacity-60 cursor-pointer` : `opacity-0 pointer-events-none`} transition-opacity duration-1000`}
      ></div>
      <div className={`relative`}>
        <aside
          className={`group-data-[color-mode=dark]:bg-[#141625] md:pl-5 md:-ml-5 absolute top-[100%] left-0 h-[calc(100vh-72px)] md:h-[calc(100vh-80px)] bg-white max-w-[100vw] w-[616px] rounded-r-[20px] 
                            xl:h-[100vh] xl:top-0 xl:left-24 ${paperOpen ? `translate-x-0` : `-translate-x-[100%]`} transition-transform duration-1000`}
        >
          {children}
        </aside>
        <menu
          className={`group-data-[color-mode=dark]:bg-[#1E2139] flex justify-between xl:flex-col items-center relative w-full h-18 md:h-20 xl:h-screen xl:w-24 bg-[#373B53] xl:rounded-r-[20px]`}
        >
          <div
            className={`flex items-center justify-center relative h-18 md:h-20 w-[80px] xl:w-full bg-[#7C5DFA] rounded-r-[20px] overflow-hidden mb-full
                    content-[''] before:absolute before:h-[50%] before:bottom-0 before:left-0 before:right-0 before:bg-[#9277FF] before:rounded-tl-[20px]`}
          >
            <img src={`/invoices/logo.svg`} className={`relative h-10 w-10`} />
          </div>
          <div className={`flex xl:flex-col items-center gap-12 md:gap-14`}>
            <button
              onClick={() =>
                setMode((prev) => (prev === "dark" ? "light" : "dark"))
              }
            >
              {mode === "dark" ? <IconSun /> : <IconMoon />}
            </button>
            <img
              src={`/invoices/image-avatar.jpg`}
              className={`aspect-square rounded-full w-10`}
            />
            <span></span>
          </div>
        </menu>
      </div>
    </>
  );
};
