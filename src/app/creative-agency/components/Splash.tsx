import { ReactNode } from "react";

export const Splash = ({ children }: { children: ReactNode }) => {
  return <section className={`grid md:grid-areas-[all]`}>{children}</section>;
};

export const SplashText = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className={`flex flex-col justify-center gap-4 px-6 pb-24 pt-14 md:max-w-1/2 md:gap-5.5 md:px-10 md:grid-area-[all]`}
    >
      {children}
    </section>
  );
};
