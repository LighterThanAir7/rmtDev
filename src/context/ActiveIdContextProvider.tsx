import React, {createContext, useContext} from "react";
import {useActiveId} from "../lib/hooks.ts";

type ActiveIdContextProviderProps = {
	children: React.ReactNode
}

type ActiveIdContext = {
	activeId: number | null,
}

export const ActiveIdContext = createContext<ActiveIdContext | null>(null);

export default function ActiveIdContextProvider({ children }: ActiveIdContextProviderProps) {
	const activeId = useActiveId();

	return (
		<ActiveIdContext.Provider value={{ activeId }}>
			{children}
		</ActiveIdContext.Provider>
	);
}

export function useActiveIdContext() {
	const context = useContext(ActiveIdContext);

	if (!context) {
		throw new Error('useContext(ActiveIdContext) must be used within a ActiveIdContextProvider');
	}

	return context;
}