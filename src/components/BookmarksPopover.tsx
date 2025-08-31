import JobList from "./JobList.tsx";
import {useBookmarksContext} from "../context/BookmarkContextProvider.tsx";
import {forwardRef} from "react";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_props, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();

  return (
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>
  );
});

export default BookmarksPopover;