"use client";

import IconMenu from "@/app/photosnap/icons/menu.svg";
import { Menu } from "@/app/photosnap/components/Menu";
import { useMenu } from "@/app/photosnap/components/MenuContext";
import { MouseEventHandler } from "react";

export const Dropdown = () => {
  const { openMenu, setOpenMenu } = useMenu();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setOpenMenu((prev) => {
      return prev === "menu" ? undefined : "menu";
    });
  };

  return (
    <div className={`md:hidden list-none group col-start-3 justify-self-end`}>
      <button onClick={handleClick} className={`dropdown-button`}>
        <IconMenu />
      </button>
      <div
        className={`dropdown-container grid absolute md:relative ${!openMenu && "hidden"} md:grid-cols-subgrid 
                md:col-span-2 justify-between max-md:py-20 max-md:grid-cols-1 items-center max-md:w-full max-md:bottom-0 
                max-md:translate-y-full max-md:bg-white max-md:gap-9 max-md:left-0`}
      >
        <Menu />
      </div>
    </div>
  );
};
