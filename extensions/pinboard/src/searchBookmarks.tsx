import { List } from "@raycast/api";
import { usePinboardBookmarks } from "./hooks/usePinboardBookmarks";
import { BookmarkListItem, EmptyView } from "./components";

export default function Command() {
  const { bookmarks, isLoading, setSearchText, removeBookmark } = usePinboardBookmarks();

  return (
    <List
      isLoading={isLoading}
      filtering={false}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search bookmarks..."
    >
      <EmptyView />
      {bookmarks.map((bookmark) => (
        <BookmarkListItem key={bookmark.id} bookmark={bookmark} onDelete={removeBookmark} />
      ))}
    </List>
  );
}
