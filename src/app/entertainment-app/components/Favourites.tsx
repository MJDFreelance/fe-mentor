"use client"

import {createContext, FC, ReactNode,
    MouseEvent,
    useContext, useState} from "react";

type ValueType = {
    favourites: Record<string, string>,
    setFavourites: (favourites: Record<string, string>) => void,
}

export const Favourite = ({id, className}:{id:string, className:string}) => {
    const {favourites, setFavourites} = useFavourites()
    const handleFavouritesToggle = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const newFavourites = {...favourites}
        if (newFavourites[id]) {
            delete newFavourites[id]
        } else {
            newFavourites[id] = id
        }
        setFavourites(newFavourites)
    }

    return (
        <button className={className} onClick={handleFavouritesToggle}>Add</button>
    );
};

const FavouritesContext = createContext<ValueType>({
    favourites: {},
    setFavourites: () => {throw Error('Favourites Context Not Found')},
});
export const useFavourites = () => useContext(FavouritesContext);
export const FavouritesProvider: FC<{ children?: ReactNode | undefined }> = props => {
    const [favourites, setFavourites] = useState<Record<string, string>>({})

    return (
        <FavouritesContext.Provider value={{favourites, setFavourites}}>
            {props.children}
        </FavouritesContext.Provider>
    );
};
