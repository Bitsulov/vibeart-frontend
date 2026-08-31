import { Layout } from "widgets/layout";
import { PostCard } from "widgets/postCard";
import { selectUserInfo } from "entities/user";
import { getPost } from "entities/post";
import { createTag } from "entities/tag";
import { useDispatch, useSelector } from "react-redux";
import { PostComments } from "widgets/postComments";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import axios from "axios";
import type { AppError } from "shared/lib/types";
import { showToast } from "features/toast";

/** Страница публикации с карточкой поста и секцией комментариев. */
export const Post = () => {
    const userInfo = useSelector(selectUserInfo);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { uuid } = useParams();
    const postUUID = uuid ?? "";

    const { data, error, isLoading } = useQuery({
        queryKey: [`post ${uuid}`],
        queryFn: () => getPost(postUUID)
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
                navigate("/unknown_page", { replace: true });
                return;
            }
            dispatch(showToast({ message: "api.serverError", type: "error" }));
        } else {
            console.error(error);
        }
    }, [error, dispatch, navigate]);

    const post = data?.data;
    const tagsList = (post?.tags ?? []).map(title => createTag({ title, createdAt: "" }));

    const isOwner =
        (post?.author?.uuid === userInfo.UUID ||
            post?.community?.owner.uuid === userInfo.UUID ||
            post?.community?.admins.some(admin => admin.uuid === userInfo.UUID)) ??
        false;

    const isAuthorCommunity = !post?.author && !!post?.community;
    const authorAvatarUrl = post?.author?.avatarUrl ?? post?.community?.avatarUrl ?? "";
    const authorName = post?.author?.name ?? post?.community?.name ?? "";
    const authorUUID = post?.author?.uuid ?? post?.community?.username ?? "";

    return (
        <Layout>
            <title>{t("titles.post")}</title>
            <meta name="description" content={t("description.post")} />
            <meta property="og:title" content={t("titles.post")} />
            <meta property="og:description" content={t("description.post")} />
            <PostCard
                authorAvatarUrl={authorAvatarUrl}
                authorName={authorName}
                authorUUID={authorUUID}
                isAuthorCommunity={isAuthorCommunity}
                imageUrl={post?.imageUrl ?? ""}
                title={post?.title ?? ""}
                description={post?.description ?? ""}
                tagsList={tagsList}
                likesCount={post?.likesCount ?? 0}
                isLiked={post?.liked ?? false}
                reportsCount={post?.reportsCount ?? 0}
                isReported={post?.reported ?? false}
                createdAt={post?.createdAt ?? ""}
                albumName=""
                albumUUID=""
                UUID={post?.uuid ?? ""}
                isOwner={isOwner}
                isLoadingData={isLoading}
            />
            <PostComments postUUID={postUUID} />
        </Layout>
    );
};
