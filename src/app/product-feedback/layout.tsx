import { ReactNode } from "react";
import { FeedbackProvider } from "@/app/product-feedback/components/FeedbackContext";
import context from "@/app/product-feedback/context.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <FeedbackProvider>
      <div
        className={`${context.page} flex justify-center min-h-screen max-2-screen w-full bg-[#F7F8FD] font-jost`}
      >
        {children}
      </div>
    </FeedbackProvider>
  );
};

export default Layout;
