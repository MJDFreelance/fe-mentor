"use client"

import data from "@/app/entertainment-app/data.json";
import { v4 as uuid } from "uuid";
import {
    createContext,
    Dispatch,
    PropsWithChildren,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from "react";
import Fuse from 'fuse.js';

type Item = {
    id?: string,
    title: string,
    category: string,
    year:  number,
    rating: string,
    isBookmarked: boolean,
    isTrending: boolean,
    thumbnail: {
        trending?: {
            small?: string,
            medium?: string,
            large?: string,
        },
        regular: {
            small?: string,
            medium?: string,
            large?: string,
        }
    }
}

type ValueType = {
    search: string,
    setSearch:  Dispatch<SetStateAction<string>>,
    results: Item[],
    items: Item[],
}

export const Search = () => {
    const {search, setSearch} = useSearch();

    return (
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={`Search for movies or TV series`}
               className={`bg-[#10141E] w-full !text-white border-0`} />
    );
};

const SearchContext = createContext<ValueType>({
    search: '',
    results: [],
    items: [],
    setSearch: () => {throw Error('Search Context Not Found')},
});
export const useSearch = () => useContext(SearchContext);
export const SearchProvider = (props: PropsWithChildren<{ children: ReactNode }>) => {
    // Initialize items with consistent IDs
    const [items] = useState<Item[]>(
        () => data.map(item => ({ ...item, id: uuid() }))
    );

    const [search, setSearch] = useState('');
    const [results, setResults] = useState<Item[]>(items);

    useEffect(() => {
        const fuse = new Fuse<Item>(items, {
            keys: ['title', 'category', 'year', 'rating'], // Specify searchable fields
            threshold: 0.3, // Sensitivity
        });

        if (search.trim() === '') {
            setResults(items); // Reset to original data
        } else {
            const fuseResults = fuse.search(search).map(result => result.item);
            setResults(fuseResults);
        }
    }, [search, items]);

    return (
        <SearchContext.Provider
            value={{
                search,
                results,
                items,
                setSearch,
            }}
        >
            {props.children}
        </SearchContext.Provider>
    );
};
