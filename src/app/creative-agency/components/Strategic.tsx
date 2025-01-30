import { ReactNode } from "react";

export const Strategic = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export const ArticleText = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className={`flex flex-col justify-center gap-4 bg-background px-6 py-14 text-white md:min-h-[784px] md:px-18 md:grid-area-[strat]`}
    >
      {children}
    </section>
  );
};
