import { Layout } from "widgets/layout";
import c from "./community.module.scss";
import { Navigation } from "widgets/navigation";
import { createUser, selectUserInfo } from "entities/user";
import { useTranslation } from "react-i18next";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { AlbumSlider } from "widgets/albumSlider";
import { createAlbum, getAlbumsByAuthor } from "entities/album";
import { createPost, getPosts, getPostsByAuthor } from "entities/post";
import { createTag } from "entities/tag";
import { PostList } from "widgets/postList";
import { useEffect, useMemo, useState } from "react";
import { CommunityInfo } from "widgets/communityInfo";
import { CommunityAddPostButton } from "features/communityAddPostButton";
import { createCommunity, getCommunity } from "entities/community";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import { loadMoreAlbumsHandler } from "../model/loadMoreAlbumsHandler";

/**
 * Страница сообщества с информационным блоком, слайдером альбомов и списком публикаций.
 *
 * Выбранный в {@link AlbumSlider} альбом определяет, публикации какого альбома отображаются
 * в {@link PostList}. Специальное значение `"all"` соответствует всем публикациям сообщества.
 */
export const Community = () => {
    const { uuid } = useParams();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const windowWidth = useWindowWidth();
    const userInfo = useSelector(selectUserInfo);

    const [selectedAlbum, setSelectedAlbum] = useState<string>("all");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pagesDelta, setPagesDelta] = useState<number>(2);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedAlbum]);

    const communityUUID = uuid ?? "";

    const { data, error } = useQuery({
        queryKey: [`community ${communityUUID}`],
        queryFn: () => getCommunity(communityUUID),
        enabled: !!communityUUID
    });

    const albumsPageSize = 5;

    const albumsQuery = useInfiniteQuery({
        queryKey: [`albums ${communityUUID}`],
        queryFn: ({ pageParam }) =>
            getAlbumsByAuthor(communityUUID, { page: pageParam, size: albumsPageSize }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.data.last ? undefined : allPages.length,
        enabled: !!communityUUID
    });

    const albumsList = useMemo(
        () =>
            (albumsQuery.data?.pages.flatMap(page => page.data.content) ?? []).map(
                album =>
                    createAlbum({
                        UUID: album.uuid,
                        name: album.title,
                        description: album.description,
                        postCount: album.worksCount,
                        postsList: [],
                        imageUrl: album.imageUrl,
                        createdAt: album.createdAt
                    })
            ),
        [albumsQuery.data]
    );

    const currentAlbum = useMemo(
        () => albumsList.find(album => album.UUID === selectedAlbum),
        [albumsList, selectedAlbum]
    );

    const postListTitle =
        selectedAlbum === "all" ? t("profile.albumAll") : currentAlbum?.name;

    const postsPageSize = 6;

    const postsQuery = useQuery({
        queryKey:
            selectedAlbum === "all"
                ? [`author posts ${communityUUID}`, currentPage]
                : [`album posts ${selectedAlbum}`, currentPage],
        queryFn: () =>
            selectedAlbum === "all"
                ? getPostsByAuthor(communityUUID, undefined, {
                      page: currentPage - 1,
                      size: postsPageSize
                  })
                : getPosts(selectedAlbum, { page: currentPage - 1, size: postsPageSize }),
        enabled: !!communityUUID
    });

    const pages = postsQuery.data?.data.totalPages || 1;

    const postList = useMemo(
        () =>
            (postsQuery.data?.data.content ?? []).map(post => {
                const author = post.author
                    ? createUser({
                          UUID: post.author.uuid,
                          title: post.author.name,
                          username: post.author.username,
                          description: post.author.description,
                          worksCount: post.author.worksCount,
                          subscribersCount: post.author.subscribersCount,
                          subscribesCount: post.author.subscribesCount,
                          albumList: [],
                          createdAt: post.author.createdAt,
                          trustStatus: post.author.trustStatus,
                          isAuthenticated: false,
                          isBlocked: false,
                          onlineStatus: post.author.onlineStatus,
                          role: "USER",
                          avatarUrl: post.author.avatarUrl
                      })
                    : createCommunity({
                          UUID: post.community!.uuid,
                          owner: createUser({
                              UUID: post.community!.owner.uuid,
                              title: post.community!.owner.name,
                              username: post.community!.owner.username,
                              description: post.community!.owner.description,
                              worksCount: post.community!.owner.worksCount,
                              subscribersCount: post.community!.owner.subscribersCount,
                              subscribesCount: post.community!.owner.subscribesCount,
                              albumList: [],
                              createdAt: post.community!.owner.createdAt,
                              trustStatus: post.community!.owner.trustStatus,
                              isAuthenticated: false,
                              isBlocked: false,
                              onlineStatus: post.community!.owner.onlineStatus,
                              role: "USER",
                              avatarUrl: post.community!.owner.avatarUrl
                          }),
                          username: post.community!.username,
                          title: post.community!.name,
                          description: post.community!.description,
                          albumsList: [],
                          admins: [],
                          posts: post.community!.worksCount,
                          subscribers: post.community!.subscribersCount,
                          subscribes: post.community!.subscribesCount,
                          createdAt: post.community!.createdAt,
                          imageUrl: post.community!.avatarUrl,
                          isSubscribed: false,
                          isBlocked: false,
                          trustStatus: post.community!.trustStatus
                      });

                return createPost({
                    UUID: post.uuid,
                    name: post.title,
                    description: post.description,
                    likes: post.likesCount,
                    comments: post.commentsCount,
                    reports: post.reportsCount,
                    tagsList: post.tags.map(title =>
                        createTag({ title, createdAt: new Date().toISOString() })
                    ),
                    commentList: [],
                    checkStatus: "checked",
                    AIStatus: post.aiStatus,
                    imageUrl: post.imageUrl,
                    createdAt: post.createdAt,
                    isLiked: post.liked,
                    isReported: post.reported,
                    author
                });
            }),
        [postsQuery.data]
    );

    const community = data?.data;

    const communityData = createCommunity({
        UUID: communityUUID,
        owner: createUser({
            UUID: community?.owner.uuid ?? "",
            title: community?.owner.name ?? "",
            username: community?.owner.username ?? "",
            description: community?.owner.description ?? "",
            worksCount: community?.owner.worksCount ?? 0,
            subscribersCount: community?.owner.subscribersCount ?? 0,
            subscribesCount: community?.owner.subscribesCount ?? 0,
            albumList: [],
            createdAt: community?.owner.createdAt ?? new Date().toISOString(),
            trustStatus: community?.owner.trustStatus ?? "TRUST",
            isAuthenticated: false,
            isBlocked: false,
            onlineStatus: community?.owner.onlineStatus ?? "OFFLINE",
            role: "USER",
            avatarUrl: community?.owner.avatarUrl ?? ""
        }),
        username: community?.username ?? "",
        title: community?.name ?? "",
        description: community?.description ?? "",
        albumsList,
        admins:
            community?.admins.map(admin =>
                createUser({
                    UUID: admin.uuid,
                    title: admin.name,
                    username: admin.username,
                    description: admin.description,
                    worksCount: admin.worksCount,
                    subscribersCount: admin.subscribersCount,
                    subscribesCount: admin.subscribesCount,
                    albumList: [],
                    createdAt: admin.createdAt,
                    trustStatus: admin.trustStatus,
                    isAuthenticated: false,
                    isBlocked: false,
                    onlineStatus: admin.onlineStatus,
                    role: "USER",
                    avatarUrl: admin.avatarUrl
                })
            ) ?? [],
        posts: community?.worksCount ?? 0,
        subscribers: community?.subscribersCount ?? 0,
        subscribes: community?.subscribesCount ?? 0,
        createdAt: community?.createdAt ?? new Date().toISOString(),
        imageUrl: community?.avatarUrl ?? "",
        isSubscribed: community?.subscribed ?? false,
        isBlocked: false,
        trustStatus: community?.trustStatus ?? "TRUST"
    });

    const isOwner = communityData.owner.UUID === userInfo.UUID;
    const isAdmin =
        community?.admins.some(admin => admin.uuid === userInfo.UUID) ?? false;
    const isOwnerOrAdmin = isOwner || isAdmin;

    useEffect(() => {
        if (!error) return;

        if (axios.isAxiosError<AppError>(error)) {
            if (!error.response) {
                dispatch(showToast({ message: "api.networkError", type: "error" }));
                return;
            }
            if (error.response.status === 404) {
                dispatch(showToast({ message: "api.communityNotFound", type: "error" }));
                navigate("/unknown_page", { replace: true });
                return;
            }
            dispatch(showToast({ message: "api.serverError", type: "error" }));
        } else {
            console.error(error);
        }
    }, [error, dispatch, navigate]);

    return (
        <Layout isSmallTitle={true}>
            <title>{t("titles.community")}</title>
            <meta name="description" content={t("description.community")} />
            <meta property="og:title" content={t("titles.community")} />
            <meta property="og:description" content={t("description.community")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 && (
                        <Navigation role={userInfo.role} UUID={userInfo.UUID} />
                    )}
                    <div className={c.content}>
                        <CommunityInfo communityInfo={communityData} />
                        {isOwnerOrAdmin && (
                            <CommunityAddPostButton
                                communityUUID={communityUUID}
                                className={c.add_post_button}
                            />
                        )}
                        <AlbumSlider
                            selectedAlbum={selectedAlbum}
                            setSelectedAlbum={setSelectedAlbum}
                            albumsList={albumsList}
                            communityUUID={communityUUID}
                            isShowAddAlbum={isOwnerOrAdmin}
                            onReachEnd={() =>
                                loadMoreAlbumsHandler(
                                    albumsQuery.hasNextPage,
                                    albumsQuery.isFetchingNextPage,
                                    albumsQuery.fetchNextPage
                                )
                            }
                        />
                        <PostList
                            title={postListTitle}
                            postList={postList}
                            pagesCount={pages}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            pagesDelta={pagesDelta}
                            setPagesDelta={setPagesDelta}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
