import {ReactNode} from "react";
import Link from "next/link";
import Image from "next/image";
import {Search, SearchProvider} from "@/app/entertainment-app/components/Search";
import {FavouritesProvider} from "@/app/entertainment-app/components/Favourites";

const Layout = ({children}:{children:ReactNode}) => {
    return (
        <SearchProvider>
            <FavouritesProvider>
                <section className={`flex max-xl:flex-col bg-[#10141E] h-screen max-w-100vw overflow-x-hidden`}>
                    <aside className={`flex xl:flex-col bg-[#161D2F] py-4.5 px-10 items-center xl:ml-8`}>
                        <Link href={`/entertainment-app`} className={`w-6 h-5 bg-[url(/entertainment-app/logo.svg)]`} />
                        <menu className={`flex items-center mx-auto gap-6 xl:flex-col xl:mt-19`}>
                            <Link href={``} className={`w-4 h-4 bg-[url(/entertainment-app/icon-nav-home.svg)] bg-contain`} />
                            <Link href={``} className={`w-4 h-4 bg-[url(/entertainment-app/icon-nav-movie.svg)] bg-contain`} />
                            <Link href={``} className={`w-4 h-4 bg-[url(/entertainment-app/icon-nav-tv-series.svg)] bg-contain`} />
                            <Link href={`/entertainment-app/favourites`} className={`w-4 h-4 bg-[url(/entertainment-app/icon-nav-bookmark.svg)] bg-contain`} />
                        </menu>
                        <Link href={``} className={`w-6 h-6 items-center xl:mt-auto xl:mb-6`} >
                            <Image src={`/entertainment-app/image-avatar.png`} alt={``} height={24} width={24} />
                        </Link>
                    </aside>
                    <main className={`mx-auto flex flex-col gap-6 py-6 px-4 w-full overflow-x-hidden`}>
                        <div className={`flex w-full items-center h-6 bg-[url(/entertainment-app/icon-search.svg)] bg-contain pl-10 bg-no-repeat`}>
                            <Search />
                        </div>
                        {children}
                    </main>
                </section>
            </FavouritesProvider>
        </SearchProvider>
    );
};

export default Layout;