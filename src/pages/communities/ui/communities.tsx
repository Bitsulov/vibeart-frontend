import { Layout } from "widgets/layout";
import c from "./communities.module.scss";
import { Navigation } from "widgets/navigation";
import { createUser, selectUserInfo } from "entities/user";
import { useTranslation } from "react-i18next";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { CommunitiesLists } from "widgets/communitiesLists";
import {
    createCommunity,
    getCommunities,
    getCommunitiesByUser,
    getCommunitiesByUserAndSearch,
    getCommunitiesBySearch,
    getOwnedCommunities
} from "entities/community";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useOnInView } from "react-intersection-observer";
import { loadMoreCommunitiesHandler } from "../model/loadMoreCommunitiesHandler";

/**
 * Страница списка сообществ с полем поиска и тремя списками — «Мои сообщества»,
 * «Мои подписки» и «Все сообщества».
 *
 * Поиск фильтрует списки «Мои подписки» и «Все сообщества» с задержкой в 400 мс
 * после последнего ввода, список «Мои сообщества» от поиска не зависит.
 * Список «Все сообщества» подгружается бесконечной прокруткой через
 * {@link loadMoreCommunitiesHandler}, остальные два — постраничной навигацией.
 */
export const Communities = () => {
    const { t } = useTranslation();

    const windowWidth = useWindowWidth();
    const userInfo = useSelector(selectUserInfo);
    const userUUID = userInfo.UUID || undefined;

    const [searchValue, setSearchValue] = useState("");

    const communitiesPageSize = 12;

    const allCommunitiesQuery = useInfiniteQuery({
        queryKey: [`communities all ${userInfo.UUID} ${searchValue}`],
        queryFn: ({ pageParam }) =>
            searchValue
                ? getCommunitiesBySearch(searchValue, userUUID, {
                      page: pageParam,
                      size: communitiesPageSize
                  })
                : getCommunities(userUUID, {
                      page: pageParam,
                      size: communitiesPageSize
                  }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.data.last ? undefined : allPages.length
    });

    const loadMoreRef = useOnInView<HTMLDivElement>(
        inView =>
            loadMoreCommunitiesHandler(
                inView,
                allCommunitiesQuery.hasNextPage,
                allCommunitiesQuery.isFetchingNextPage,
                allCommunitiesQuery.fetchNextPage
            ),
        { rootMargin: "200px" }
    );

    const communitiesListAll = (
        allCommunitiesQuery.data?.pages.flatMap(page => page.data.content) ?? []
    ).map(community =>
        createCommunity({
            UUID: community.uuid,
            owner: createUser({
                UUID: community.owner.uuid,
                title: community.owner.name,
                username: community.owner.username,
                description: community.owner.description,
                worksCount: community.owner.worksCount,
                subscribersCount: community.owner.subscribersCount,
                subscribesCount: community.owner.subscribesCount,
                albumList: [],
                createdAt: community.owner.createdAt,
                trustStatus: community.owner.trustStatus,
                isAuthenticated: false,
                isBlocked: false,
                onlineStatus: community.owner.onlineStatus,
                role: "USER",
                avatarUrl: community.owner.avatarUrl
            }),
            username: community.username,
            title: community.name,
            description: community.description,
            albumsList: [],
            admins: [],
            posts: community.worksCount,
            subscribers: community.subscribersCount,
            subscribes: community.subscribesCount,
            createdAt: community.createdAt,
            imageUrl: community.avatarUrl,
            isSubscribed: false,
            isBlocked: false,
            trustStatus: community.trustStatus
        })
    );

    const ownedCommunitiesPageSize = 4;
    const [ownedCommunitiesCurrentPage, setOwnedCommunitiesCurrentPage] = useState(1);

    const ownedCommunitiesQuery = useQuery({
        queryKey: [`communities owned ${userInfo.UUID}`, ownedCommunitiesCurrentPage],
        queryFn: () =>
            getOwnedCommunities({
                page: ownedCommunitiesCurrentPage - 1,
                size: ownedCommunitiesPageSize
            }),
        enabled: !!userInfo.UUID
    });

    const ownedCommunitiesPagesCount = ownedCommunitiesQuery.data?.data.totalPages || 1;

    const communitiesListOwned = (ownedCommunitiesQuery.data?.data.content ?? []).map(
        community =>
            createCommunity({
                UUID: community.uuid,
                owner: createUser({
                    UUID: community.owner.uuid,
                    title: community.owner.name,
                    username: community.owner.username,
                    description: community.owner.description,
                    worksCount: community.owner.worksCount,
                    subscribersCount: community.owner.subscribersCount,
                    subscribesCount: community.owner.subscribesCount,
                    albumList: [],
                    createdAt: community.owner.createdAt,
                    trustStatus: community.owner.trustStatus,
                    isAuthenticated: false,
                    isBlocked: false,
                    onlineStatus: community.owner.onlineStatus,
                    role: "USER",
                    avatarUrl: community.owner.avatarUrl
                }),
                username: community.username,
                title: community.name,
                description: community.description,
                albumsList: [],
                admins: [],
                posts: community.worksCount,
                subscribers: community.subscribersCount,
                subscribes: community.subscribesCount,
                createdAt: community.createdAt,
                imageUrl: community.avatarUrl,
                isSubscribed: false,
                isBlocked: false,
                trustStatus: community.trustStatus
            })
    );

    const subscribedCommunitiesPageSize = 4;
    const [subscribedCommunitiesCurrentPage, setSubscribedCommunitiesCurrentPage] =
        useState(1);

    useEffect(() => {
        setSubscribedCommunitiesCurrentPage(1);
    }, [searchValue]);

    const subscribedCommunitiesQuery = useQuery({
        queryKey: [
            `communities my ${userInfo.UUID} ${searchValue}`,
            subscribedCommunitiesCurrentPage
        ],
        queryFn: () =>
            searchValue
                ? getCommunitiesByUserAndSearch(searchValue, userInfo.UUID, {
                      page: subscribedCommunitiesCurrentPage - 1,
                      size: subscribedCommunitiesPageSize
                  })
                : getCommunitiesByUser(userInfo.UUID, {
                      page: subscribedCommunitiesCurrentPage - 1,
                      size: subscribedCommunitiesPageSize
                  }),
        enabled: !!userInfo.UUID
    });

    const subscribedCommunitiesPagesCount =
        subscribedCommunitiesQuery.data?.data.totalPages || 1;

    const communitiesListMy = (subscribedCommunitiesQuery.data?.data.content ?? []).map(
        community =>
            createCommunity({
                UUID: community.uuid,
                owner: createUser({
                    UUID: community.owner.uuid,
                    title: community.owner.name,
                    username: community.owner.username,
                    description: community.owner.description,
                    worksCount: community.owner.worksCount,
                    subscribersCount: community.owner.subscribersCount,
                    subscribesCount: community.owner.subscribesCount,
                    albumList: [],
                    createdAt: community.owner.createdAt,
                    trustStatus: community.owner.trustStatus,
                    isAuthenticated: false,
                    isBlocked: false,
                    onlineStatus: community.owner.onlineStatus,
                    role: "USER",
                    avatarUrl: community.owner.avatarUrl
                }),
                username: community.username,
                title: community.name,
                description: community.description,
                albumsList: [],
                admins: [],
                posts: community.worksCount,
                subscribers: community.subscribersCount,
                subscribes: community.subscribesCount,
                createdAt: community.createdAt,
                imageUrl: community.avatarUrl,
                isSubscribed: true,
                isBlocked: false,
                trustStatus: community.trustStatus
            })
    );

    return (
        <Layout isSmallTitle={true}>
            <title>{t("titles.communities")}</title>
            <meta name="description" content={t("description.communities")} />
            <meta property="og:title" content={t("titles.communities")} />
            <meta property="og:description" content={t("description.communities")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 && (
                        <Navigation role={userInfo.role} UUID={userInfo.UUID} />
                    )}
                    <div className={c.content}>
                        <CommunitiesLists
                            communitiesListOwned={communitiesListOwned}
                            communitiesListMy={communitiesListMy}
                            communitiesListAll={communitiesListAll}
                            loadMoreRef={loadMoreRef}
                            onSearchChange={setSearchValue}
                            ownedCommunitiesPagesCount={ownedCommunitiesPagesCount}
                            ownedCommunitiesCurrentPage={ownedCommunitiesCurrentPage}
                            setOwnedCommunitiesCurrentPage={
                                setOwnedCommunitiesCurrentPage
                            }
                            subscribedCommunitiesPagesCount={
                                subscribedCommunitiesPagesCount
                            }
                            subscribedCommunitiesCurrentPage={
                                subscribedCommunitiesCurrentPage
                            }
                            setSubscribedCommunitiesCurrentPage={
                                setSubscribedCommunitiesCurrentPage
                            }
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
