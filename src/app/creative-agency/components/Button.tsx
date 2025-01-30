import { ReactNode } from "react";

export const Button = ({ children }: { children: ReactNode }) => {
  return (
    <button
      className={`mt-6 w-fit self-start rounded-[10px] bg-primary px-10 py-6 text-white`}
    >
      {children}
    </button>
  );
};
