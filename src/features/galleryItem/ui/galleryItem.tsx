import classes from "./galleryItem.module.scss";
import { Link } from "react-router-dom";
import { checkDateYear } from "shared/lib/dates";
import { LikeButton } from "features/likeButton";
import { ShareButton } from "features/shareButton";
import { CommentButton } from "features/commentButton";

interface GalleryItemProps {
    id: number;
    isLiked?: boolean;
    likes: number;
    comments: number;
    reposts: number;
    srcImg: string;
    date: string;
    title: string;
    description: string;
    authorId: number;
    authorName: string;
    srcAuthor: string;
}

const GalleryItem = ({
    id,
    isLiked = false,
    likes,
    comments,
    reposts,
    srcImg,
    date,
    title,
    description,
    authorId,
    authorName,
    srcAuthor,
    ...props
}: GalleryItemProps) => {
    const postDate = checkDateYear(date);

    return (
        <div className={classes.gallery__item} {...props}>
            <Link className={classes.gallery__itemImageLink} to={`/post/${id}`}>
                <img src={srcImg} alt={title} className={classes.gallery__itemImage} />
            </Link>
            <div className={classes.gallery__itemInfo}>
                <Link to={`/profile/${authorId}`} className={classes.gallery__itemAuthorWrapper}>
                    <img src={srcAuthor} alt="avatar" className={classes.gallery__itemAuthorImg} />
                    <h3 className={classes.gallery__itemAuthorName}>{authorName}</h3>
                </Link>
                <Link className={classes.gallery__itemTextLink} to={`/post/${id}`}>
                    <h3 className={classes.gallery__itemTitle}>{title}</h3>
                    <p className={classes.gallery__itemDescription}>{description}</p>
                </Link>
                <div className={classes.gallery__itemActions}>
                    <span className={classes.gallery__itemDate}>{postDate}</span>
                    <div className={classes.gallery__itemButtons}>
                        <LikeButton count={likes} isLiked={isLiked} />
                        <CommentButton href={`/post/${id}#comments`} count={comments} />
                        <ShareButton count={reposts} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { GalleryItem };
