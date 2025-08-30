import {TSortBy} from "../lib/types.ts";

type SortingControlsProps = {
  sortBy: TSortBy,
  onClick: (sortBy: TSortBy) => void
}

type SortingButtonProps = {
  children: React.ReactNode,
  onClick: () => void,
  isActive: boolean
}

export default function SortingControls({ sortBy, onClick }: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton onClick={() => onClick('relevant')} isActive={sortBy === 'relevant'}>
        Relevance
      </SortingButton>
      <SortingButton onClick={() => onClick('recent')} isActive={sortBy === 'recent'}>
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