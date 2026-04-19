import c from "./communitiesLists.module.scss";
import {useTranslation} from "react-i18next";
import {SearchInput} from "features/searchInput";
import {CommunitiesAddButton} from "features/communitiesAddButton";
import React from "react";
import type {CommunityType} from "entities/community";
import {CommunitiesList} from "widgets/communitiesList";

interface CommunitiesListsProps extends React.ComponentPropsWithoutRef<"section"> {
    communitiesListMy: CommunityType[];
    communitiesListAll: CommunityType[];
}

/**
 * Секция страницы сообществ: поиск, кнопка создания, списки «мои» и «все».
 * @param communitiesListMy - сообщества, на которые подписан пользователь
 * @param communitiesListAll - все доступные сообщества, кроме подписанных
 * @param props - остальные пропсы `section`
 */
export const CommunitiesLists = ({
    communitiesListMy,
    communitiesListAll,
    ...props
}: CommunitiesListsProps) => {
    const { t } = useTranslation();

	return (
		<section className={c.communities} {...props}>
            <h1 className={c.title}>{t("communities.title")}</h1>
            <SearchInput className={c.search} placeholder={t("searchPlaceholder")} />
            <CommunitiesAddButton className={c.button} />
            <CommunitiesList
                className={c.list_my}
                communitiesList={communitiesListMy}
                title={t("communities.myCommunities")}
                emptyTitle={t("communities.emptyMy")}
            />
            <CommunitiesList
                className={c.list_all}
                communitiesList={communitiesListAll}
                title={t("communities.allCommunities")}
                emptyTitle={t("communities.emptyAll")}
            />
		</section>
	)
}
