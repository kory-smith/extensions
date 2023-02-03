import { List } from "@raycast/api";
import { useEffect, useState } from "react";
import { useSearchBookmarks, Bookmark } from "./api";
import { BookmarkListItem } from "./components";

export default function Command() {
  const { isLoading, bookmarks } = useSearchBookmarks();
  const [searchText, setSearchText] = useState("");
  const [filteredBookmarks, setFilteredBookmarks] = useState(bookmarks);

  useEffect(() => {
    if (bookmarks) {
      setFilteredBookmarks(filterByTags(bookmarks, searchText));
    }
  }, [searchText, bookmarks]);

  return (
    <List isLoading={isLoading} onSearchTextChange={setSearchText} searchBarPlaceholder="Search by tags..." throttle>
      {filteredBookmarks &&
        filteredBookmarks.map((bookmark) => <BookmarkListItem key={bookmark.id} bookmark={bookmark} />)}
    </List>
  );
}

function filterByTags(bookmarks: Bookmark[], searchTerm: string) {
  return bookmarks.filter((bookmark) => {
    const searchTags = searchTerm.split(" ");
    const bookmarkTags = bookmark.tags?.split(" ");
    return searchTags.every((searchTag) => {
      return bookmarkTags?.some((bookmarkTag) => {
        return bookmarkTag.includes(searchTag);
      });
    });
  });
}
