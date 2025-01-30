import {ReactNode} from "react";
import Link from "next/link";

export const StoryCard = ({children, image}:{children:ReactNode, image:string}) => {
    return (
        <div className={`relative grid group hover:-translate-y-[10%] transition-transform duration-500`}>
            <Link href={`/`} style={{backgroundImage: `url('/photosnap/stories/desktop/${image}.jpg')`}}
                  className={`flex flex-col justify-end md:aspect-[360/500] p-10 gap-4 relative
                             bg-cover bg-center content-[' '] max-md:h-[375px]
                                before:absolute before:bottom-0 before:h-[70%] before:w-full before:left-0  
                                before:bg-gradient-to-b before:from-transparent before:to-black
                                `}>
                {children}
            </Link>
            <div className={`absolute bottom-0 translate-y-full h-0 group-hover:h-1.5 bg-blue-900 w-full 
                max-w-0 group-hover:max-w-[500px] transition-[max-width] duration-500 justify-self-center
                        bg-gradient-to-tr from-[#FFC593] via-[#BC7198] to-[#5A77FF]`}></div>
        </div>
    );
};