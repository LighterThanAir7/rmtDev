import {useEffect, useState} from "react";
import {JobItem, JobItemExpanded} from "./types.ts";
import {BASE_API_URL} from "./constants.ts";
import {useQuery} from "@tanstack/react-query";
import {handleError} from "./utilities.ts";

type JobItemApiResponse = {
	public: boolean
	jobItem: JobItemExpanded
};

type JobItemsApiResonse = {
	public: boolean,
	sorted: boolean,
	jobItems: JobItem[];
}

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
	const response = await fetch(`${BASE_API_URL}/${id}`);
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.data.description);
	}

	return await response.json();
}

export function useJobItem(id: number | null) {
	const { data, isInitialLoading } = useQuery(
		['job-item', id],
		() => id ? fetchJobItem(id) : null,
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(id),
			onError: handleError
		}
	);

	return {
		jobItem: data?.jobItem,
		isLoading: isInitialLoading
	} as const;
}

const fetchJobItems = async (searchText: string): Promise<JobItemsApiResonse> => {
	const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.data.description);
	}

	return await response.json();
}

export function useJobItems(searchText: string) {
	const { data, isInitialLoading } = useQuery(
		['job-items', searchText],
		() => searchText ? fetchJobItems(searchText) : null,
		{
			staleTime: 1000 * 60 * 60,
			refetchOnWindowFocus: false,
			retry: false,
			enabled: Boolean(searchText),
			onError: handleError
		}
	);

	return {
		jobItems: data?.jobItems,
		isLoading: isInitialLoading
	} as const;
}

export function useDebounce<T>(value: T, timeout = 500): T {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timerId = setTimeout(() => setDebouncedValue(value), timeout);
		return () => clearTimeout(timerId);
	}, [value, timeout]);

	return debouncedValue;
}

export function useActiveId() {
	const [activeId, setActiveId] = useState<number | null>(null);

	useEffect(() => {
		const handleHashChange = () => {
			const id = +window.location.hash.slice(1);
			setActiveId(id);
		}

		handleHashChange(); // On component mount

		window.addEventListener('hashchange', handleHashChange);

		return () => {
			window.removeEventListener('hashchange', handleHashChange)
		}
	}, []);

	return activeId;
}
