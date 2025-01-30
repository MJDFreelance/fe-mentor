"use client"

import {useSearch} from "@/app/entertainment-app/components/Search";
import {useFavourites} from "@/app/entertainment-app/components/Favourites";
import {useMemo} from "react";
import Image from "next/image";

const Page = () => {
    const {items} = useSearch();
    const {favourites} = useFavourites();

    const mappedFavourites = useMemo(() => {
            return Object.values(favourites).map(favourite => items.find(item => item.id === favourite));
        },
        [items, favourites]);

    return (
        <section className={`flex flex-col gap-6 text-white`}>


            <h2 className={`font-light text-[20px] -tracking-[.31px]`}>Recommended for you</h2>
            <div className={`grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10`}>
                {mappedFavourites.map((item, index) => (
                    <div key={`item-${index}`}
                         className={`flex flex-col gap-2 items-start relative p-4 rounded-[8px] flex-shrink-0 overflow-hidden aspect-[280/174] xl:max-w-[350px]` }>
                        <div className={`relative h-[174px] w-full bg-black rounded-[8px]`}>
                            <Image className={`z-0`} fill
                                   src={item?.thumbnail.regular?.small ?? '/entertainment-app/icon-nav-home.svg'}
                                   alt={item?.title??''}/>
                        </div>
                        <div
                            className={`grid gap-y-1 grid-cols-[auto_auto_auto_auto_auto] relative z-10 text-[12px]`}>
                            <span>{item?.year}</span>
                            <span></span>
                            <span
                                className={`px-4.5 bg-[url(/entertainment-app/icon-nav-${item?.category.toLowerCase()}.svg)]`}>{item?.category}</span>
                            <span></span>
                            <span>{item?.rating}</span>
                            <h2 className={`col-span-5 text-[15px]`}>{item?.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Page;