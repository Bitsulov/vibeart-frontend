import c from "./createPost.module.scss";
import { Layout } from "widgets/layout";
import { BackLink } from "features/backLink";
import { useEffect, useState } from "react";
import { getPost, type PostType } from "entities/post";
import { CreatePostWidget } from "widgets/createPostWidget";
import { Post } from "features/post";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getUserByUUID, selectUser } from "entities/user";
import { onSubmitForm } from "../model/onSubmitForm";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";
import { useSearchParams } from "react-router";

/**
 * Страница создания или редактирования публикации.
 *
 * Отображает живой предпросмотр публикации рядом с формой создания.
 * Предпросмотр обновляется при изменении полей через общее состояние `postInfo`.
 * При попытке создать публикацию без изображения обновляется `isErrorImg`
 * и карточка предпросмотра подсвечивается как ошибочная.
 *
 * Если в адресе передан параметр `post`, страница переходит в режим
 * редактирования: загружает данные публикации и предзаполняет ими форму.
 * Если передан параметр `community`, публикация создаётся от имени
 * указанного сообщества, а не текущего пользователя.
 */
export const CreatePost = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [postInfo, setPostInfo] = useState<Partial<PostType>>({});

    const principalUser = useSelector(selectUser);

    const pagesTags = 15;
    const [currentPageTags, setCurrentPageTags] = useState<number>(1);
    const [pagesDelta, setPagesDelta] = useState<number>(2);

    const [loadedFile, setLoadedFile] = useState<File>();
    const [isErrorImg, setIsErrorImg] = useState<boolean>(false);

    const { data, error } = useQuery({
        queryKey: [`user ${principalUser.UUID}`],
        queryFn: () => getUserByUUID(principalUser.UUID),
        enabled: !!principalUser.UUID
    });

    const [searchParams, _setSearchParams] = useSearchParams();

    const [loadedTags, setLoadedTags] = useState<string[]>([]);

    const loadedPost = useQuery({
        queryKey: [`post ${searchParams.get("post")}`],
        queryFn: () => getPost(searchParams.get("post") || ""),
        enabled: !!searchParams.get("post")
    });

    const [createNewPost, setCreateNewPost] = useState<boolean>(true);
    const communityId = searchParams.get("community");

    const user = createUser({
        UUID: principalUser.UUID,
        albumList: [],
        avatarUrl: data?.data.avatarUrl || "",
        createdAt: data?.data.createdAt || "",
        description: data?.data.description || "",
        isAuthenticated: true,
        isBlocked: false,
        title: data?.data.name || "",
        onlineStatus: "ONLINE",
        role: principalUser.role,
        subscribersCount: data?.data.subscribersCount || 0,
        subscribesCount: data?.data.subscribesCount || 0,
        trustStatus: "TRUST",
        username: data?.data.username || "",
        worksCount: data?.data.worksCount || 0
    });

    useEffect(() => {
        if (!error) return;

        if (axios.isAxiosError<AppError>(error)) {
            if (!error.response) {
                dispatch(showToast({ message: "api.networkError", type: "error" }));
                return;
            }
            if (error.response.status === 404) {
                dispatch(
                    showToast({ message: "api.principalUserNotFound", type: "error" })
                );
                return;
            }
            dispatch(showToast({ message: "api.serverError", type: "error" }));
        } else {
            console.error(error);
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (!loadedPost.data) return;

        const post = loadedPost.data.data;

        setPostInfo({
            UUID: post.uuid,
            name: post.title,
            description: post.description,
            likes: post.likesCount,
            comments: post.commentsCount,
            reports: post.reportsCount,
            AIStatus: post.aiStatus,
            imageUrl: post.imageUrl,
            createdAt: post.createdAt,
            isLiked: post.liked,
            isReported: post.reported
        });
        setLoadedTags(post.tags);
        setCreateNewPost(false);
    }, [loadedPost.data]);

    useEffect(() => {
        if (!loadedPost.error) return;

        if (axios.isAxiosError<AppError>(loadedPost.error)) {
            if (!loadedPost.error.response) {
                dispatch(showToast({ message: "api.networkError", type: "error" }));
                return;
            }
            if (loadedPost.error.response.status === 404) {
                dispatch(showToast({ message: "api.postNotFound", type: "error" }));
                return;
            }
            dispatch(showToast({ message: "api.serverError", type: "error" }));
        } else {
            console.error(loadedPost.error);
        }
    }, [loadedPost.error, dispatch]);

    return (
        <Layout>
            <title>{t("titles.postCreate")}</title>
            <meta name="description" content={t("description.postCreate")} />
            <meta property="og:title" content={t("titles.postCreate")} />
            <meta property="og:description" content={t("description.postCreate")} />
            <section className={c.content}>
                <div className="container">
                    <div className={c.content_inner}>
                        <BackLink className={c.back} />
                        <Post
                            className={clsx(c.post, isErrorImg && c.error)}
                            date={new Date().toISOString()}
                            author={user}
                            title={postInfo?.name ?? ""}
                            imageUrl={postInfo?.imageUrl ?? ""}
                            UUID={postInfo?.UUID ?? ""}
                            isLiked={postInfo?.isLiked ?? false}
                            type="button"
                            enable={false}
                        />
                        <CreatePostWidget
                            className={c.form}
                            setPostInfo={setPostInfo}
                            pages={pagesTags}
                            pagesDelta={pagesDelta}
                            setPagesDelta={setPagesDelta}
                            currentPage={currentPageTags}
                            setCurrentPage={setCurrentPageTags}
                            postInfo={postInfo}
                            postTags={loadedTags}
                            postName={loadedPost.data?.data.title ?? ""}
                            postDescription={loadedPost.data?.data.description ?? ""}
                            UUID={user.UUID}
                            isCreateNewPost={createNewPost}
                            communityId={communityId}
                            loadedFile={loadedFile}
                            setLoadedFile={setLoadedFile}
                            onSubmit={() => onSubmitForm(loadedFile, setIsErrorImg)}
                        />
                    </div>
                </div>
            </section>
        </Layout>
    );
};
