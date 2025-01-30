import {ReactNode} from "react";

export const HomeArticle = ({children, orient, isFeature=false, isInnerFeature=false}:
                            { children: ReactNode, orient:'left'|'right', isFeature?:boolean, isInnerFeature?:boolean }) => {
    return (
        <article data-orient={orient} data-feature={isFeature} data-inner-feature={isInnerFeature}
                 className={`relative flex flex-col-reverse group md:grid md:col-span-3 md:grid-cols-subgrid w-full md:h-[600px] md:data-[feature=true]:h-[650px]
                            xl:grid-areas-[text_image_image] xl:data-[orient=right]:grid-areas-[image_image_text] md:data-[inner-feature=true]:h-[490px]
                            md:grid-areas-[text_text_image] md:data-[orient=right]:grid-areas-[image_text_text]`}>
            {children}
        </article>
    );
};

export const HomeArticleText = ({children}:{children:ReactNode}) => {
    return (
            <section className={`relative flex flex-col md:grid-area-[text] mx-auto justify-center w-full bg-white max-md:py-18 max-md:px-7
                                group-data-[feature=true]:bg-black group-data-[feature=true]:text-white 
                                group-data-[inner-feature=true]:bg-black group-data-[inner-feature=true]:text-white
                                `}>
                <div className={`h-1.5 w-32 left-10 top-0 absolute bg-blue-900 hidden max-md:group-data-[feature=true]:block max-md:group-data-[inner-feature=true]:block
                        bg-gradient-to-tr from-[#FFC593] via-[#BC7198] to-[#5A77FF]`}></div>
                <div className={`relative grid gap-5 md:max-w-[612px] px-10 xl:px-[112px] w-full`}>
                    <div className={`h-full w-1.5 left-0 absolute bg-blue-900 hidden md:group-data-[feature=true]:block md:group-data-[inner-feature=true]:block
                    bg-gradient-to-tr from-[#FFC593] via-[#BC7198] to-[#5A77FF]`}></div>
                    {children}
                </div>
            </section>
    );
};

