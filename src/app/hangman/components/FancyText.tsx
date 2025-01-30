import { ReactNode } from "react";

export const FancyText = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative w-fit mx-auto">
      <span
        aria-hidden="true"
        className={`text-nowrap absolute top-0 left-0 text-stroke z-0 ${className}`}
      >
        {children}
      </span>
      <h1 className={`relative z-10 text-nowrap ${className}`}>{children}</h1>
    </div>
  );
};
