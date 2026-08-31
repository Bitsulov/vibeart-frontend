import c from "./postComments.module.scss";
import { useTranslation } from "react-i18next";
import { getShortNumber } from "shared/lib/getShortNumber";
import { createComment, getCommentsByPost, type CommentType } from "entities/comment";
import { createUser } from "entities/user";
import { Comment } from "features/comment";
import { useEffect, useMemo, useState } from "react";
import { CommentsForm } from "features/commentsForm";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { showToast } from "features/toast";
import axios from "axios";

/** Свойства компонента {@link PostComments}. */
interface PostCommentsProps {
    /** UUID публикации, к которой относятся комментарии. */
    postUUID: string;
}

/**
 * Секция комментариев публикации с формой добавления и списком комментариев.
 *
 * Загружает комментарии по `postUUID` и хранит список и счётчик
 * в локальном состоянии. {@link CommentsForm} добавляет в них комментарий,
 * полученный от сервера после успешной отправки.
 */
export const PostComments = ({ postUUID, ...props }: PostCommentsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const commentsQuery = useQuery({
        queryKey: [`comments ${postUUID}`],
        queryFn: () => getCommentsByPost(postUUID, { sort: "createdAt,desc" }),
        enabled: !!postUUID
    });

    const fetchedComments = useMemo(
        () =>
            (commentsQuery.data?.data.content ?? []).map(comment =>
                createComment({
                    UUID: comment.uuid,
                    text: comment.text,
                    createdAt: comment.createdAt,
                    author: createUser({
                        UUID: comment.author.uuid,
                        title: comment.author.name,
                        username: comment.author.username,
                        description: comment.author.description,
                        worksCount: comment.author.worksCount,
                        subscribersCount: comment.author.subscribersCount,
                        subscribesCount: comment.author.subscribesCount,
                        albumList: [],
                        createdAt: comment.author.createdAt,
                        trustStatus: comment.author.trustStatus,
                        isAuthenticated: false,
                        isBlocked: false,
                        onlineStatus: comment.author.onlineStatus,
                        role: "USER",
                        avatarUrl: comment.author.avatarUrl
                    })
                })
            ),
        [commentsQuery.data]
    );

    const [comments, setComments] = useState<CommentType[]>([]);
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        if (!commentsQuery.data) return;
        setComments(fetchedComments);
        setCount(commentsQuery.data.data.totalElements);
    }, [commentsQuery.data, fetchedComments]);

    useEffect(() => {
        if (!commentsQuery.error) return;
        if (axios.isAxiosError(commentsQuery.error) && !commentsQuery.error.response) {
            dispatch(showToast({ message: "api.networkError", type: "error" }));
            return;
        }
        dispatch(showToast({ message: "api.serverError", type: "error" }));
    }, [commentsQuery.error, dispatch]);

    return (
        <section id="comments" className={c.comments} {...props}>
            <div className="container">
                <div className={c.comments_inner}>
                    <h2 className={c.title}>
                        {t("post.Comments")} ({getShortNumber(count)})
                    </h2>
                    <div className={c.commentsList}>
                        <CommentsForm
                            postUUID={postUUID}
                            setComments={setComments}
                            setCommentsCount={setCount}
                        />
                        {comments.length > 0
                            ? comments.map(comment => (
                                  <Comment
                                      key={comment.UUID}
                                      text={comment.text}
                                      authorUUID={comment.author.UUID}
                                      authorName={comment.author.title}
                                      authorAvatarUrl={comment.author.avatarUrl}
                                      date={comment.createdAt}
                                  />
                              ))
                            : commentsQuery.isSuccess && (
                                  <p className={c.empty}>{t("post.emptyComments")}</p>
                              )}
                    </div>
                </div>
            </div>
        </section>
    );
};
