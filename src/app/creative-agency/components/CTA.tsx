import { ReactNode } from "react";

export const CTA = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className={`grid items-center px-6 py-24 md:flex md:justify-between`}
    >
      {children}
    </section>
  );
};
