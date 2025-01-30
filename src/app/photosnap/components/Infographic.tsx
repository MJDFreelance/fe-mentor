import {ReactNode} from "react";

export const Infographic = ({children}:{children:ReactNode}) => {
    return (
        <div className={`grid text-center gap-4 grid-rows-subgrid row-span-3 my-7 md:my-9 xl:my-14`}>
            {children}
        </div>
    );
};