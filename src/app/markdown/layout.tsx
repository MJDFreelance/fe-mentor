import {ReactNode} from "react";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <div className={`min-h-screen max-w-screen w-full`}>
            {children}
        </div>
    );
};

export default Layout;