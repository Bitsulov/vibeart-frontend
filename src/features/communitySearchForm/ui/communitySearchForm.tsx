import React, { useState, useEffect } from "react";
import classes from "./communitySearchForm.module.scss";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import type { CommunityType } from "entities/community";
import { globalOnChangeHandler } from "shared/lib/globalOnChangeHandler";
import { closeSearchHandler } from "../model/closeSearchHandler";
import { searchButtonHandler } from "../model/searchButtonHandler";
import { useTranslation } from "react-i18next";

interface CommunitySearchFormPropsType {
    fullCommunitiesList: CommunityType[];
    setCommunitiesList: React.Dispatch<React.SetStateAction<CommunityType[]>>;
}

export const CommunitySearchForm = ({ fullCommunitiesList, setCommunitiesList }: CommunitySearchFormPropsType) => {
	const { t } = useTranslation();

    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
    const [currentConstSearchText, setCurrentConstSearchText] = useState<string>("Найти");
    const [searchText, setSearchText] = useState<string>("Найти");
    const [labelText, setLabelText] = useState<string>("Сообщество");
    const [searchTextValue, setSearchTextValue] = useState<string>("");
    const width = useWindowWidth();

    useEffect(() => {
        width < 360 ? setCurrentConstSearchText(t("Find")) : setCurrentConstSearchText(t("FindCommunity"));
        width < 500 ? setLabelText(t("Community")) : setLabelText(t("CommunitySearchInputPlaceholder"));
    }, [width]);

    useEffect(() => {
        isOpenSearch ? setSearchText("") : setSearchText(currentConstSearchText);
    }, [isOpenSearch, currentConstSearchText]);

    return (
        <form
            onSubmit={e => 
                searchButtonHandler(
                    e,
                    searchTextValue,
                    fullCommunitiesList,
                    isOpenSearch,
                    setIsOpenSearch,
                    setCommunitiesList
                )
            }
			onKeyDown={e => {
				if (e.key === "Enter") {
				  	searchButtonHandler(
						e,
						searchTextValue,
						fullCommunitiesList,
						isOpenSearch,
						setIsOpenSearch,
						setCommunitiesList
				  	);
				}
			}}
            className={classes.communitySearchWrapper}
        >
            <input
                id="searchCommunity"
                value={searchTextValue}
                onChange={e => globalOnChangeHandler(e, setSearchTextValue)}
                type="text"
                className={isOpenSearch ? `${classes.search} ${classes.open}` : classes.search}
            ></input>
            <label htmlFor="searchCommunity" className={classes.label}>
                {labelText}
            </label>
            <button
                onClick={e =>
                    closeSearchHandler(e, fullCommunitiesList, setSearchTextValue, setIsOpenSearch, setCommunitiesList)
                }
                className={classes.clearSearch}
            >
                ×
            </button>
            <input
                type="submit"
                value={searchText}
                className={classes.searchButton}
            ></input>
        </form>
    );
};
