import { Layout } from "widgets/layout";
import c from "./gallery.module.scss";
import { useTranslation } from "react-i18next";
import { Navigation } from "widgets/navigation";
import { createUser, selectUserInfo } from "entities/user";
import { createCommunity } from "entities/community";
import { useMediaQuery } from "shared/hooks/useMediaQuery";
import { GalleryPostList } from "widgets/galleryPostList";
import {
    createPost,
    getPosts,
    searchPosts,
    type PostResponse,
    type PostType
} from "entities/post";
import { createTag } from "entities/tag";
import { useSelector } from "react-redux";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useOnInView } from "react-intersection-observer";
import { useSearchParams } from "react-router";
import { loadMorePostsHandler } from "../model/loadMorePostsHandler";

/** Страница галереи со списком постов и навигацией. */
export const Gallery = () => {
    const { t } = useTranslation();

    const isDesktop = useMediaQuery("(width >= 1200px)");
    const userInfo = useSelector(selectUserInfo);

    const postsPageSize = 18;

    const [searchParams, setSearchParams] = useSearchParams();
    const initialSearchValue = searchParams.get("search") ?? "";
    const [searchValue, setSearchValue] = useState(initialSearchValue);

    useEffect(() => {
        setSearchParams(
            params => {
                if (searchValue) {
                    params.set("search", searchValue);
                } else {
                    params.delete("search");
                }
                return params;
            },
            { replace: true }
        );
    }, [searchValue, setSearchParams]);

    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteQuery({
            queryKey: [`posts ${userInfo.UUID} ${searchValue}`],
            queryFn: ({ pageParam }) =>
                searchValue
                    ? searchPosts(searchValue, undefined, undefined, {
                          page: pageParam,
                          size: postsPageSize
                      })
                    : getPosts(undefined, { page: pageParam, size: postsPageSize }),
            initialPageParam: 0,
            getNextPageParam: (lastPage, allPages) =>
                lastPage.data.last ? undefined : allPages.length
        });

    const loadMoreRef = useOnInView<HTMLDivElement>(
        inView =>
            loadMorePostsHandler(inView, hasNextPage, isFetchingNextPage, fetchNextPage),
        { rootMargin: "200px" }
    );

    const postsCache = useRef(new Map<string, PostType>());
    const [posts, setPosts] = useState<PostType[] | undefined>(undefined);

    useEffect(() => {
        if (!data) return;

        const mappedPosts = data.pages
            .flatMap(page => page.data.content)
            .map((post: PostResponse) => {
                const cachedPost = postsCache.current.get(post.uuid);
                if (cachedPost) return cachedPost;

                const mappedPost = createPost({
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
                    author: post.author
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
                              UUID: "",
                              owner: createUser({
                                  UUID: post.community!.owner.uuid,
                                  title: post.community!.owner.name,
                                  username: post.community!.owner.username,
                                  description: post.community!.owner.description,
                                  worksCount: post.community!.owner.worksCount,
                                  subscribersCount:
                                      post.community!.owner.subscribersCount,
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
                              imageUrl: post.community!.avatarUrl,
                              posts: post.community!.worksCount,
                              subscribers: post.community!.subscribersCount,
                              subscribes: post.community!.subscribesCount,
                              createdAt: post.community!.createdAt,
                              isSubscribed: false,
                              isBlocked: false,
                              trustStatus: post.community!.trustStatus
                          })
                });

                postsCache.current.set(post.uuid, mappedPost);
                return mappedPost;
            });

        setPosts(mappedPosts);
    }, [data]);

    return (
        <Layout>
            <title>{t("titles.gallery")}</title>
            <meta name="description" content={t("description.gallery")} />
            <meta property="og:title" content={t("titles.gallery")} />
            <meta property="og:description" content={t("description.gallery")} />
            <div className={`container ${c.galleryContainer}`}>
                <div className={c.main}>
                    {isDesktop && (
                        <Navigation role={userInfo.role} UUID={userInfo.UUID} />
                    )}
                    <div className={c.content}>
                        <GalleryPostList
                            isLoading={isLoading}
                            postList={posts}
                            loadMoreRef={loadMoreRef}
                            initialSearchValue={initialSearchValue}
                            onSearchChange={setSearchValue}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    );
};
