import {ReactNode} from "react";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <div className={`flex items-center justify-center font-[Roboto] bg-[#36384D] min-h-screen max-w-screen w-full`}>
            {children}
        </div>
    );
};

export default Layout;