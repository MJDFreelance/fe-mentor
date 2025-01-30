import { useSidebar } from "@/components/ui/sidebar"
import {ReactNode} from "react";

export const CustomSidebarTrigger = ({className, children}:{className:string, children:ReactNode}) => {
    const { toggleSidebar } = useSidebar()

    return <button className={className} onClick={toggleSidebar}>{children}</button>
};