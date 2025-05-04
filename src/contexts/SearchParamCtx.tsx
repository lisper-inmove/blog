import { createContext, ReactNode, useContext, useState } from "react";

type SearchContextType = {
    searchParam: string;
    setSearchParam: (value: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function useSearchContext() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        return {
            searchParam: "",
            setSearchParam: () => {},
        };
    }
    return context;
}

export function SearchContextProvider({ children }: { children: ReactNode }) {
    // or pass user as parameter
    const [searchParam, setSearchParam] = useState("");

    const value: SearchContextType = {
        searchParam,
        setSearchParam,
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}
