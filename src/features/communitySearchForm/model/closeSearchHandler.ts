import type { CommunityType } from "entities/community";
import type React from "react";

export function closeSearchHandler(
    e: React.MouseEvent,
	fullCommunitiesList: CommunityType[],
    setSearchTextValue: React.Dispatch<React.SetStateAction<string>>,
    setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>,
	setCommunitiesList: React.Dispatch<React.SetStateAction<CommunityType[]>>
) {
    e.preventDefault();
	setSearchTextValue("");
	setCommunitiesList(fullCommunitiesList);
	setIsOpenSearch(false);
}
