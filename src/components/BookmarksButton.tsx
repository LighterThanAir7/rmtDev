import { TriangleDownIcon } from "@radix-ui/react-icons";
import {useEffect, useRef, useState} from "react";
import BookmarksPopover from "./BookmarksPopover.tsx";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const bookmarksBtn = useRef<HTMLButtonElement>(null);
  const bookmarksPopover = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !bookmarksBtn.current?.contains(e.target) &&
        !bookmarksPopover.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => document.removeEventListener('click', handleClick);
  }, []);

  return (
    <section>
      <button className="bookmarks-btn" onClick={() => setIsOpen(!isOpen)} ref={bookmarksBtn}>
        Bookmarks <TriangleDownIcon />
      </button>

      { isOpen && <BookmarksPopover ref={bookmarksPopover} /> }
    </section>
  );
}
