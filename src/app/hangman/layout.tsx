import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className={`font-mouseMemoirs flex flex-col bg-fixed items-center leading-[1.2] tracking-[1.05] bg-[url(/hangman/images/background-desktop.svg)]  w-full min-h-screen bg-bottom bg-cover`}
    >
      <div
        className={`max-w-[1440px] flex flex-col font-mouseMemoirs leading-[1.2] tracking-[1.05] w-full min-h-screen bg-bottom bg-cover`}
      >
        {children}
      </div>
    </section>
  );
};

export default Layout;
