import { ReactNode } from "react";

export const Approach = ({ children }: { children: ReactNode }) => {
  return (
    <section
      className={`grid gap-12 bg-primary px-6 py-24 text-white grid-area-[appr] xl:grid-cols-subgrid`}
    >
      {children}
    </section>
  );
};

export const ApproachList = ({ children }: { children: ReactNode }) => {
  return <ol className={`grid gap-10 md:px-10 xl:col-start-2`}>{children}</ol>;
};

export const ApproachListItem = ({
  children,
  number,
}: {
  children: ReactNode;
  number: string;
}) => {
  return (
    <li className={`grid`}>
      {number}
      {children}
    </li>
  );
};
