import c from "./communitiesLists.module.scss";
import { useTranslation } from "react-i18next";
import { SearchInput } from "features/searchInput";
import { CommunitiesAddButton } from "features/communitiesAddButton";
import { useEffect, useState } from "react";
import type { ComponentPropsWithoutRef, Dispatch, Ref, SetStateAction } from "react";
import type { CommunityType } from "entities/community";
import { CommunitiesList } from "widgets/communitiesList";
import { useDebouncedValue } from "shared/hooks/useDebouncedValue";

/** Свойства компонента {@link CommunitiesLists}. */
interface CommunitiesListsProps extends ComponentPropsWithoutRef<"section"> {
    /** Список сообществ, владельцем которых является текущий пользователь. */
    communitiesListOwned: CommunityType[];
    /** Список сообществ, на которые подписан текущий пользователь. */
    communitiesListMy: CommunityType[];
    /** Список всех остальных доступных сообществ, не вошедших в подписки. */
    communitiesListAll: CommunityType[];
    /** Ref невидимого элемента-триггера в конце списка «Все сообщества» — при появлении во viewport запускает подгрузку следующей страницы. */
    loadMoreRef?: Ref<HTMLDivElement>;
    /** Обработчик изменения текста поиска, выполняющийся после задержки. */
    onSearchChange?: (value: string) => void;
    /** Общее количество страниц списка «Мои сообщества». */
    ownedCommunitiesPagesCount?: number;
    /** Номер текущей активной страницы списка «Мои сообщества». */
    ownedCommunitiesCurrentPage?: number;
    /** Функция обновления текущей страницы списка «Мои сообщества». */
    setOwnedCommunitiesCurrentPage?: Dispatch<SetStateAction<number>>;
    /** Общее количество страниц списка «Мои подписки». */
    subscribedCommunitiesPagesCount?: number;
    /** Номер текущей активной страницы списка «Мои подписки». */
    subscribedCommunitiesCurrentPage?: number;
    /** Функция обновления текущей страницы списка «Мои подписки». */
    setSubscribedCommunitiesCurrentPage?: Dispatch<SetStateAction<number>>;
}

/**
 * Секция страницы сообществ: поле поиска, кнопка создания и три списка —
 * «мои» (владелец), «подписки» и «все».
 *
 * Объединяет {@link CommunitiesList} для собственных, подписанных и всех остальных
 * сообществ, а также кнопку перехода к созданию нового сообщества {@link CommunitiesAddButton}.
 */
export const CommunitiesLists = ({
    communitiesListOwned,
    communitiesListMy,
    communitiesListAll,
    loadMoreRef,
    onSearchChange,
    ownedCommunitiesPagesCount,
    ownedCommunitiesCurrentPage,
    setOwnedCommunitiesCurrentPage,
    subscribedCommunitiesPagesCount,
    subscribedCommunitiesCurrentPage,
    setSubscribedCommunitiesCurrentPage,
    ...props
}: CommunitiesListsProps) => {
    const { t } = useTranslation();

    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebouncedValue(searchValue.trim(), 400);

    useEffect(() => {
        onSearchChange?.(debouncedSearchValue);
    }, [debouncedSearchValue, onSearchChange]);

    return (
        <section className={c.communities} {...props}>
            <h1 className={c.title}>{t("communities.title")}</h1>
            <SearchInput
                className={c.search}
                placeholder={t("searchPlaceholder")}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
            <CommunitiesAddButton className={c.button} />
            <CommunitiesList
                className={c.list_owned}
                communitiesList={communitiesListOwned}
                title={t("communities.myCommunities")}
                emptyTitle={t("communities.emptyOwned")}
                pagesCount={ownedCommunitiesPagesCount}
                currentPage={ownedCommunitiesCurrentPage}
                setCurrentPage={setOwnedCommunitiesCurrentPage}
                pagesDelta={3}
                isOwnedList
            />
            <CommunitiesList
                className={c.list_my}
                communitiesList={communitiesListMy}
                title={t("communities.mySubscriptions")}
                emptyTitle={t("communities.emptyMy")}
                pagesCount={subscribedCommunitiesPagesCount}
                currentPage={subscribedCommunitiesCurrentPage}
                setCurrentPage={setSubscribedCommunitiesCurrentPage}
                pagesDelta={3}
            />
            <CommunitiesList
                className={c.list_all}
                communitiesList={communitiesListAll}
                title={t("communities.allCommunities")}
                emptyTitle={t("communities.emptyAll")}
                loadMoreRef={loadMoreRef}
            />
        </section>
    );
};
