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
import { usePathname, useRouter } from "next/navigation";

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

  const handleClickOutside = (e: MouseEvent) => {
    const dropdownElement = document.querySelector(".dropdown-container");
    const dropdownButton = document.querySelector(".dropdown-button"); // Adjust this selector to match your dropdown container
    if (
      dropdownElement?.contains(e.target as Node) ||
      dropdownButton?.contains(e.target as Node)
    ) {
      return; // Ignore clicks inside the dropdown
    }
    setOpenMenu(undefined); // Close the menu otherwise
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const pathname = usePathname(); // Current route pathname

  useEffect(() => {
    setOpenMenu(undefined);
  }, [pathname]); // Runs whenever the pathname changes

  return (
    <MenuContext.Provider value={{ openMenu, setOpenMenu }}>
      {props.children}
    </MenuContext.Provider>
  );
};
