import c from "./profile.module.scss";
import { Layout } from "widgets/layout";
import { ProfileInfo } from "widgets/profileInfo";
import { useTranslation } from "react-i18next";
import { createUser, getUserByUUID, selectUserInfo } from "entities/user";
import { AlbumSlider } from "widgets/albumSlider";
import { createAlbum, getAlbumsByAuthor } from "entities/album";
import { createPost, getPosts, getPostsByAuthor } from "entities/post";
import { createTag } from "entities/tag";
import { Navigation } from "widgets/navigation";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { useEffect, useMemo, useState } from "react";
import { PostList } from "widgets/postList";
import { useDispatch, useSelector } from "react-redux";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import axios from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import { useNavigate } from "react-router-dom";
import { loadMoreAlbumsHandler } from "../model/loadMoreAlbumsHandler";

/**
 * Страница профиля пользователя с информационным блоком, слайдером альбомов и списком публикаций.
 *
 * Выбранный в {@link AlbumSlider} альбом определяет, публикации какого альбома отображаются
 * в {@link PostList}. Специальное значение `"all"` соответствует всем публикациям пользователя.
 */
export const Profile = () => {
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

    const UUID = uuid || "";

    const { data, error, isLoading } = useQuery({
        queryKey: [`user ${UUID}`],
        queryFn: () => getUserByUUID(UUID),
        enabled: !!UUID
    });

    const albumsPageSize = 5;

    const albumsQuery = useInfiniteQuery({
        queryKey: [`albums ${UUID}`],
        queryFn: ({ pageParam }) =>
            getAlbumsByAuthor(UUID, { page: pageParam, size: albumsPageSize }),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) =>
            lastPage.data.last ? undefined : allPages.length,
        enabled: !!UUID
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
                ? [`author posts ${UUID}`, currentPage]
                : [`album posts ${selectedAlbum}`, currentPage],
        queryFn: () =>
            selectedAlbum === "all"
                ? getPostsByAuthor(UUID, undefined, {
                      page: currentPage - 1,
                      size: postsPageSize
                  })
                : getPosts(selectedAlbum, { page: currentPage - 1, size: postsPageSize }),
        enabled: !!UUID
    });

    const pages = postsQuery.data?.data.totalPages || 1;

    const postList = useMemo(
        () =>
            (postsQuery.data?.data.content ?? []).map(post =>
                createPost({
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
                    author: createUser({
                        UUID: post.author!.uuid,
                        title: post.author!.name,
                        username: post.author!.username,
                        description: post.author!.description,
                        worksCount: post.author!.worksCount,
                        subscribersCount: post.author!.subscribersCount,
                        subscribesCount: post.author!.subscribesCount,
                        albumList: [],
                        createdAt: post.author!.createdAt,
                        trustStatus: post.author!.trustStatus,
                        isAuthenticated: false,
                        isBlocked: false,
                        onlineStatus: post.author!.onlineStatus,
                        role: "USER",
                        avatarUrl: post.author!.avatarUrl
                    })
                })
            ),
        [postsQuery.data]
    );

    const userData = createUser({
        UUID,
        title: data?.data.name || "",
        username: data?.data.username || "",
        description: data?.data.description || "",
        worksCount: data?.data.worksCount || 0,
        subscribersCount: data?.data.subscribersCount || 0,
        subscribesCount: data?.data.subscribesCount || 0,
        albumList: albumsList,
        createdAt: data?.data.createdAt || new Date().toISOString(),
        trustStatus: data?.data.trustStatus || "TRUST",
        isAuthenticated: false,
        isBlocked: false,
        onlineStatus: data?.data.onlineStatus || "OFFLINE",
        role: "USER",
        avatarUrl: data?.data.avatarUrl || ""
    });

    const isOwner = UUID === userInfo.UUID;

    useEffect(() => {
        if (!error) return;

        if (axios.isAxiosError<AppError>(error)) {
            if (!error.response) {
                dispatch(showToast({ message: "api.networkError", type: "error" }));
                return;
            }
            if (error.response.status === 404) {
                dispatch(showToast({ message: "api.thisUserNotFound", type: "error" }));
                navigate("/unknown_page", { replace: true });
                return;
            }
            dispatch(showToast({ message: "api.serverError", type: "error" }));
        } else {
            console.error(error);
        }
    }, [error, dispatch, navigate]);

    return (
        <Layout>
            <title>{t("titles.profile")}</title>
            <meta name="description" content={t("description.profile")} />
            <meta property="og:title" content={t("titles.profile")} />
            <meta property="og:description" content={t("description.profile")} />
            <div className="container">
                <div className={c.main}>
                    {windowWidth >= 1200 && (
                        <Navigation role={userInfo.role} UUID={userInfo.UUID} />
                    )}
                    <div className={c.content}>
                        <ProfileInfo
                            isLoadingData={isLoading}
                            userInfo={userData}
                            isSubscribed={data?.data.subscribed ?? false}
                        />
                        <AlbumSlider
                            selectedAlbum={selectedAlbum}
                            setSelectedAlbum={setSelectedAlbum}
                            albumsList={albumsList}
                            isShowAddAlbum={isOwner}
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
