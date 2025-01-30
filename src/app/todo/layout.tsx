import { ReactNode } from "react";
import text from "@/app/todo/text.module.css";
import { ToDoProvider } from "@/app/todo/components/TodoContext";
import { DarkModeProvider } from "@/app/todo/components/DarkModeContext";

const scene = text;

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <DarkModeProvider>
      <ToDoProvider>
        <section
          className={`${scene.page} flex min-h-screen flex-col items-center bg-background`}
        >
          <main className={`w-full max-w-[540px] px-6`}>{children}</main>
        </section>
      </ToDoProvider>
    </DarkModeProvider>
  );
};

export default Layout;
