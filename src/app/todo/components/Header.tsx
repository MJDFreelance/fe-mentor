"use client";

import text from "@/app/todo/text.module.css";
import { useDarkMode } from "@/app/todo/components/DarkModeContext";

export const Header = () => {
  const { setIsDarkMode } = useDarkMode();

  return (
    <div
      className={`${text.preset1} flex items-center justify-between py-12 uppercase text-foreground md:py-18`}
    >
      <h1>todo</h1>
      <button onClick={(prev) => setIsDarkMode((prev) => !prev)}>T</button>
    </div>
  );
};
