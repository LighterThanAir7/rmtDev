import { TriangleDownIcon } from "@radix-ui/react-icons";
import {useRef, useState} from "react";
import BookmarksPopover from "./BookmarksPopover.tsx";
import {useOnClickOutside} from "../lib/hooks.ts";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const bookmarksBtn = useRef<HTMLButtonElement>(null);
  const bookmarksPopover = useRef<HTMLDivElement>(null);
  useOnClickOutside([bookmarksBtn, bookmarksPopover], () => setIsOpen(false));

  return (
    <section>
      <button className="bookmarks-btn" onClick={() => setIsOpen(!isOpen)} ref={bookmarksBtn}>
        Bookmarks <TriangleDownIcon />
      </button>

      { isOpen && <BookmarksPopover ref={bookmarksPopover} /> }
    </section>
  );
}
