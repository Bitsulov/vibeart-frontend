import c from "./postComments.module.scss";
import { useTranslation } from "react-i18next";
import { getShortNumber } from "shared/lib/getShortNumber";
import type { CommentType } from "entities/comment";
import { Comment } from "features/comment";
import { useState } from "react";
import type { PrincipalUserState } from "entities/user";
import { CommentsForm } from "features/commentsForm";

/** Свойства компонента {@link PostComments}. */
interface PostCommentsProps {
    /** Общее количество комментариев к публикации, отображаемое в заголовке секции. */
    commentsCount: number;
    /** Начальный список комментариев, загруженных с сервера. */
    commentsList: CommentType[];
    /** Профиль текущего пользователя — передаётся в форму добавления комментария. */
    userInfo: PrincipalUserState;
}

/**
 * Секция комментариев публикации с формой добавления и списком комментариев.
 *
 * Хранит список комментариев в локальном состоянии, что позволяет оптимистично
 * добавлять новые через {@link CommentsForm} без повторного запроса к серверу.
 */
export const PostComments = ({
    userInfo,
    commentsList,
    commentsCount,
    ...props
}: PostCommentsProps) => {
    const { t } = useTranslation();

    const [comments, setComments] = useState<CommentType[]>(commentsList);

    return (
        <section id="comments" className={c.comments} {...props}>
            <div className="container">
                <div className={c.comments_inner}>
                    <h2 className={c.title}>
                        {t("post.Comments")} ({getShortNumber(commentsCount)})
                    </h2>
                    <div className={c.commentsList}>
                        <CommentsForm setComments={setComments} user={userInfo} />
                        {comments.map(comment => (
                            <Comment
                                key={comment.createdAt}
                                text={comment.text}
                                authorUUID={comment.author.UUID}
                                authorName={comment.author.title}
                                authorAvatarUrl={comment.author.avatarUrl}
                                date={comment.createdAt}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
