import React from "react";
import {useJobItemsContext} from "../context/JobItemsContextProvider.tsx";

type SortingButtonProps = {
  children: React.ReactNode,
  onClick: () => void,
  isActive: boolean
}

export default function SortingControls() {
  const { sortBy, handleSortByChange } = useJobItemsContext();

  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton onClick={() => handleSortByChange('relevant')} isActive={sortBy === 'relevant'}>
        Relevance
      </SortingButton>
      <SortingButton onClick={() => handleSortByChange('recent')} isActive={sortBy === 'recent'}>
        Recent
      </SortingButton>
    </section>
  );
}

function SortingButton({ children, onClick, isActive }: SortingButtonProps) {
  return (
    <button
      className={`sorting__button${isActive ? ' sorting__button--active' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}