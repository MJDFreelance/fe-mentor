import { ReactNode } from "react";
import { SettingsProvider } from "@/components/context/SettingsContext";
import { SearchProvider } from "@/app/dictionary/components/SearchContext";
import { Options } from "@/app/dictionary/components/Options";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SettingsProvider
      className={`grid auto-rows-max gap-y-[52px]  min-h-screen max-w-screen w-full max-w-[1440px] mx-auto
                    bg-white data-[color-mode=dark]:bg-black data-[color-mode=dark]:text-white
                    font-[Inter] data-[font=serif]:font-[Lora] data-[font=mono]:font-[Inconsolata] px-6`}
    >
      <header className={`flex h-max justify-between  pt-14`}>
        <img src={`/dictionary/logo.svg`} />
        <Options />
      </header>
      <SearchProvider>{children}</SearchProvider>
    </SettingsProvider>
  );
};

export default Layout;
