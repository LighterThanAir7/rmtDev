import {ArrowLeftIcon, ArrowRightIcon} from "@radix-ui/react-icons";

type PaginationControlsProps = {
  currentPage: number,
  handlePageChange: (direction: 'prev' | 'next') => void
  totalNumberOfPages: number,
};

type PaginationButtonProps = {
  direction: 'prev' | 'next',
  currentPage: number,
  onClick: () => void
};

export default function PaginationControls({ currentPage, handlePageChange, totalNumberOfPages }: PaginationControlsProps) {
  return (
    <section className="pagination">
      {
        currentPage > 1 && (
          <PaginationButton
            direction="prev"
            currentPage={currentPage}
            onClick={() => handlePageChange('prev')}
          />
        )
      }
      {
        currentPage < totalNumberOfPages && (
          <PaginationButton
            direction="next"
            currentPage={currentPage}
            onClick={() => handlePageChange('next')}
          />
        )
      }

    </section>
  );
}

function PaginationButton({ direction, currentPage, onClick }: PaginationButtonProps ) {
  return (
    <button className={`pagination__button pagination__button--${direction}`} onClick={(e) => {
      onClick();
      e.currentTarget.blur();
    }}
      >
      { direction === 'prev' && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      { direction === 'next' && (
        <>
          <ArrowRightIcon />
          Page {currentPage + 1}
        </>
      )}
    </button>
  );
}
