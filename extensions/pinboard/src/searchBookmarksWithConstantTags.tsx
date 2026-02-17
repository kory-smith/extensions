import { Action, ActionPanel, Icon, List, getPreferenceValues, openExtensionPreferences, popToRoot } from "@raycast/api";
import { usePinboardBookmarks } from "./hooks/usePinboardBookmarks";
import { BookmarkListItem, EmptyView } from "./components";

export default function Command() {
  const { constantTags } = getPreferenceValues<{ constantTags?: string }>();
  const tagList = constantTags?.split(" ").filter(Boolean) ?? [];

  const { bookmarks, isLoading, setSearchText, removeBookmark } = usePinboardBookmarks({
    constantTags: tagList.length > 0 ? tagList : undefined,
  });

  return (
    <List
      isLoading={isLoading}
      filtering={false}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search bookmarks..."
    >
      <EmptyView
        title={!constantTags ? "No Constant Tags Added" : undefined}
        description={!constantTags ? "Press enter to add constant tags" : undefined}
        actions={
          !constantTags && (
            <ActionPanel>
              <Action
                onAction={() => {
                  openExtensionPreferences();
                  popToRoot();
                }}
                title="Add Constant Tags"
                icon={Icon.Gear}
              />
            </ActionPanel>
          )
        }
      />
      {bookmarks.map((bookmark) => (
        <BookmarkListItem key={bookmark.id} bookmark={bookmark} onDelete={removeBookmark} />
      ))}
    </List>
  );
}
