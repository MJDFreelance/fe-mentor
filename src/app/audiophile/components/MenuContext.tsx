"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

type ValueType = {
  openMenu: string | undefined;
  setOpenMenu: Dispatch<SetStateAction<string | undefined>>;
};

export const Overlay = () => {
  const { openMenu, setOpenMenu } = useMenu();
  return !!openMenu ? (
    <div
      onClick={() => setOpenMenu(undefined)}
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 cursor-pointer`}
    ></div>
  ) : null;
};

const MenuContext = createContext<ValueType>({
  openMenu: undefined,
  setOpenMenu: () => {},
});
export const useMenu = () => useContext(MenuContext);
export const MenuProvider = (props: { children: ReactNode }) => {
  const [openMenu, setOpenMenu] = useState<string | undefined>();

  const handleClickOutside = () => {
    // setOpenMenu(undefined);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <MenuContext.Provider value={{ openMenu, setOpenMenu }}>
      {props.children}
    </MenuContext.Provider>
  );
};
