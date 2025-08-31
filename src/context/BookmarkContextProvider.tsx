import React, {createContext, useCallback, useContext} from "react";
import {useJobItems, useLocalStorage} from "../lib/hooks.ts";
import {JobItemExpanded} from "../lib/types.ts";

type BookmarkContextProviderProps = {
	children: React.ReactNode
}

type BookmarsContext = {
	bookmarkedIds: number[],
	handleToggleBookmark: (id: number) => void
	bookmarkedJobItems: JobItemExpanded[],
	isLoading: boolean
}

export const BookmarksContext = createContext<BookmarsContext | null>(null);

export default function BookmarkContextProvider({ children }: BookmarkContextProviderProps) {
	const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>('bookmarkedIds', []);
	const { jobItems, isLoading } = useJobItems(bookmarkedIds);

	const handleToggleBookmark = useCallback((id: number) => {
		if (bookmarkedIds.includes(id)) {
			setBookmarkedIds((prev) => prev.filter((bookmarkId) => bookmarkId !== id));
		} else {
			setBookmarkedIds((prev) => [...prev, id]);
		}
	}, [bookmarkedIds, setBookmarkedIds]);

	return (
		<BookmarksContext.Provider value={
			{
				bookmarkedIds,
				handleToggleBookmark,
				bookmarkedJobItems: jobItems,
				isLoading
			}
		}>
			{children}
		</BookmarksContext.Provider>
	);
}

export function useBookmarksContext() {
	const context = useContext(BookmarksContext);

	if (!context) {
		throw new Error('useContext(BookmarksContext) must be used within a BookmarkContextProvider');
	}

	return context;
}