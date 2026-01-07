import { useEffect, useState } from "react";
import classes from "./profilePostItem.module.scss";
import { LikeButton } from "features/likeButton";
import { CommentButton } from "features/commentButton";
import { ShareButton } from "features/shareButton";
import { checkDateYear } from "shared/lib/dates";
import { Link } from "react-router-dom";
import type { TagType } from "entities/tag";

interface ProfilePostItemType {
    id: number;
    srcImg: string;
    title: string;
    description: string;
    likes: number;
    comments: number;
    reposts: number;
    date: string;
    tags: TagType[];
}

const ProfilePostItem = ({
    id,
    srcImg,
    title,
    description,
    likes,
    comments,
    reposts,
    date,
    tags,
    ...props
}: ProfilePostItemType) => {
    const [postTime, setPostTime] = useState(checkDateYear(date));

    useEffect(() => {
        setPostTime(checkDateYear(date));
    }, [date]);

    return (
        <div className={classes.posts__post} {...props}>
            <Link to={`/post/${id}`} className={classes.postImgParent}>
                <img src={srcImg} alt={title} className={classes.postImg}></img>
            </Link>
            <Link to={`/post/${id}`} className={classes.postNameParent}>
                <h3 className={classes.postName}>{title}</h3>
                <p className={classes.postDescription}>{description}</p>
            </Link>
            <div className={classes.postInfo}>
                <div className={classes.postActions}>
                    <LikeButton count={likes} />
                    <CommentButton count={comments} href={`/post/${id}#comments`} />
                    <ShareButton count={reposts} />
                </div>
                <div className={`${classes.postStats} ${classes.postTime}`}>{postTime}</div>
            </div>
        </div>
    );
};

export { ProfilePostItem };
