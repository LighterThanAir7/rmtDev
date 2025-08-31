import React, {createContext, useCallback, useContext, useMemo, useState} from "react";
import {useSearchQuery} from "../lib/hooks.ts";
import {RESULTS_PER_PAGE} from "../lib/constants.ts";
import {JobItem, TPageDirection, TSortBy} from "../lib/types.ts";
import {useSearchTextContext} from "./SearchTextContextProvider.tsx";

type JobItemsContextProviderProps = {
	children: React.ReactNode
}

type JobItemsContext = {
	jobItems: JobItem[] | undefined,
	jobItemsSortedAndSliced: JobItem[],
	totalNumberOfResults: number,
	totalNumberOfPages: number,
	currentPage: number,
	isLoading: boolean,
	sortBy: TSortBy,
	handlePageChange: (direction: TPageDirection) => void,
	handleSortByChange: (sortBy: TSortBy) => void,
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({ children }: JobItemsContextProviderProps) {
	// Depencencies
	const { debouncedSearchText } = useSearchTextContext();

	// State
	const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState<'relevant' | 'recent'>('relevant');

	// Derived
	const totalNumberOfResults = jobItems?.length || 0;
	const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);
	const jobItemsSorted = useMemo(() =>
		[...(jobItems || [])]?.sort((a, b) => {
			if (sortBy === 'relevant') {
				return b.relevanceScore - a.relevanceScore;
			} else {
				return a.daysAgo - b.daysAgo;
			}
		}), [sortBy, jobItems]
	);

	const jobItemsSortedAndSliced = useMemo(() => jobItemsSorted.slice(
		currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
		currentPage * RESULTS_PER_PAGE
	), [jobItemsSorted, currentPage]);

	// Handlers
	const handlePageChange = useCallback((direction: TPageDirection) => {
		if (direction === 'next') {
			setCurrentPage((prev) => ++prev);
		} else if (direction === 'prev') {
			setCurrentPage((prev) => --prev);
		}
	}, []);
	const handleSortByChange = useCallback((sortBy: TSortBy) => {
		setCurrentPage(1);
		setSortBy(sortBy);
	}, []);

	const contextValue = useMemo(() => ({
		currentPage,
		totalNumberOfResults,
		totalNumberOfPages,
		jobItems,
		jobItemsSortedAndSliced,
		isLoading,
		sortBy,
		handlePageChange,
		handleSortByChange
	}), [currentPage, totalNumberOfPages, jobItems, isLoading, sortBy, handlePageChange, handleSortByChange]);

	return (
		<JobItemsContext.Provider value={contextValue}>
			{children}
		</JobItemsContext.Provider>
	);
}

export function useJobItemsContext() {
	const context = useContext(JobItemsContext);

	if (!context) {
		throw new Error('useContext(JobItemsContext) must be used within a JobItemsContextProvider');
	}

	return context;
}