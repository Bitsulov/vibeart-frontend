import type { CommentType } from "entities/comment";
import classes from "./postCommentsList.module.scss";
import { Link } from "react-router-dom";
import type React from "react";
import { useTranslation } from "react-i18next";

interface PostCommentsListPropsType extends React.HTMLAttributes<HTMLElement> {
    commentsList: CommentType[];
    length: number;
}

const PostCommentsList = ({ commentsList, length, ...props }: PostCommentsListPropsType) => {
	const { t } = useTranslation();

    return (
        <section className={classes.comments} {...props}>
            <h3 className={classes.comments__title}>{t("CommentsLength", {length: length})}</h3>
            <ul className={classes.comments__list}>
                {commentsList.map((commentItem, i) => (
                    <li className={classes.comments__item} key={`comment${i}`}>
                        <div className={classes.comments__inner}>
                            <Link to={`/profile/${commentItem.authorId}`} className={classes.comments__author}>
                                <img
                                    src={commentItem.srcImg}
                                    alt={commentItem.authorName}
                                    className={classes.authorImg}
                                />
                                <h3 className={classes.userLink}>{commentItem.authorName}</h3>
                            </Link>
                            <p>{commentItem.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export { PostCommentsList };
