import { ReactNode } from "react";
import { Menu } from "@/app/creative-agency/components/Menu";
import text from "@/app/creative-agency/text.module.css";
import context from "@/app/creative-agency/context.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className={`${text.preset1} ${context.page} flex flex-col items-center font-commissioner`}
    >
      <div className={`grid max-w-page-width`}>
        <Menu />
        <main className={`grid`}>{children}</main>
        <footer />
      </div>
    </div>
  );
};

export default Layout;
