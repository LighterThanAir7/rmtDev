import JobList from "./JobList.tsx";
import {useBookmarksContext} from "../context/BookmarkContextProvider.tsx";
import {forwardRef} from "react";
import {createPortal} from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_props, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();

  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>, document.body
  );
});

export default BookmarksPopover;