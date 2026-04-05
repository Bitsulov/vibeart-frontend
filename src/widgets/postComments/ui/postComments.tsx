import c from "./postComments.module.scss";
import {useTranslation} from "react-i18next";
import {getShortNumber} from "shared/lib/getShortNumber";
import type {CommentType} from "entities/comment";
import {Comment} from "features/comment";
import {useState} from "react";
import type {UserType} from "entities/user";
import {CommentsForm} from "features/commentsForm";

interface PostCommentsProps {
    commentsCount: number;
    commentsList: CommentType[];
    userInfo: UserType;
}

export const PostComments = ({ userInfo, commentsList, commentsCount, ...props }: PostCommentsProps) => {
    const { t } = useTranslation();

    const [comments, setComments] = useState<CommentType[]>(commentsList);

	return (
		<section className={c.comments} {...props}>
            <div className="container">
                <div className={c.comments_inner}>
                    <h2 className={c.title}>{t("post.Comments")} ({getShortNumber(commentsCount)})</h2>
                    <div className={c.commentsList}>
                        <CommentsForm setComments={setComments} user={userInfo} />
                        {comments.map((comment) => (
                            <Comment
                                key={comment.createdAt}
                                text={comment.text}
                                authorULID={comment.author.ULID}
                                authorName={comment.author.name}
                                authorAvatarUrl={comment.author.avatarUrl}
                                date={comment.createdAt}
                            />
                        ))}
                    </div>
                </div>
            </div>
		</section>
	)
}
