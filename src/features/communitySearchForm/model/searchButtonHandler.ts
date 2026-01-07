import type { CommunityType } from "entities/community";
import type React from "react";

export function searchButtonHandler(
    e: React.MouseEvent<HTMLInputElement> | React.FormEvent<HTMLFormElement>,
    searchTextValue: string,
	fullCommunitiesList: CommunityType[],
    isOpenSearch: boolean,
    setIsOpenSearch: React.Dispatch<React.SetStateAction<boolean>>,
    setCommunitiesList: React.Dispatch<React.SetStateAction<CommunityType[]>>
) {
    e.preventDefault();
    if (isOpenSearch) {
        const lowerText = searchTextValue.trim().toLowerCase();
		if(lowerText === "") {
			setCommunitiesList(fullCommunitiesList);
		} else {
			setCommunitiesList(
				fullCommunitiesList.filter(
					i => i.title.toLowerCase().includes(lowerText) || i.description.toLowerCase().includes(lowerText) || i.userName.toLowerCase().includes(lowerText)
				)
			);
		}
    } else {
        setIsOpenSearch(true);
    }
}
