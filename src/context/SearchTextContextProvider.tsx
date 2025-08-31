import React, {createContext, useContext, useState} from "react";
import {useDebounce} from "../lib/hooks.ts";

type SearchTextContextProviderProps = {
	children: React.ReactNode
}

type SearchTextContext = {
	searchText: string,
	debouncedSearchText: string,
	handleChangeSearchText: (newSearchText: string) => void,
};

export const SearchTextContext = createContext<SearchTextContext | null>(null);

export default function SearchTextContextProvider({ children }: SearchTextContextProviderProps) {
	const [searchText, setSearchText] = useState('');
	const debouncedSearchText = useDebounce(searchText, 250);

	const handleChangeSearchText = (newSearchText: string) => {
		setSearchText(newSearchText);
	}

	return (
		<SearchTextContext.Provider
			value={{
				searchText,
				debouncedSearchText,
				handleChangeSearchText
			}}
		>
			{children}
		</SearchTextContext.Provider>
	);
}

export function useSearchTextContext() {
	const context = useContext(SearchTextContext);

	if (!context) {
		throw new Error('useContext(SearchTextContext) must be used within a SearchTextContextProvider');
	}

	return context;
}