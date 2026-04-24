import c from "./post.module.scss";
import {getLocalTimeNumbers} from "shared/lib/getLocalTimeNumbers";
import {useSelector} from "react-redux";
import {selectCurrentLanguage} from "entities/appConfig";
import {StatItem} from "features/statItem";
import {Heart, MessageSquare} from "lucide-react";
import {getShortNumber} from "shared/lib/getShortNumber";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import {postClickHandler} from "../model/postClickHandler";
import type {UserType} from "entities/user";
import {toggleLikeHandler} from "../model/toggleLikeHandler";
import {useState} from "react";
import clsx from "clsx";
import {resetNavigate} from "../model/resetNavigate";

interface PostProps {
    date: string;
    author: UserType;
    title: string;
    likesCount?: number;
    commentsCount?: number;
    imageUrl: string;
    ULID: string;
    isShowAuthor?: boolean;
    className?: string;
    type?: "button" | "link";
    target?: "_blank" | "_self" | "_parent" | "_top";
    onClick?: () => void;
    autoHeight?: boolean;
    enable?: boolean;
}

/** Карточка поста в ленте: изображение, автор, лайки и комментарии. */
export const Post = ({
    title,
    author,
    date,
    ULID,
    likesCount = 0,
    commentsCount = 0,
    isShowAuthor = true,
    imageUrl,
    className = "",
    type = "link",
    onClick = () => {},
    target = "_self",
    autoHeight = false,
    enable = true,
     ...props
}: PostProps) => {
    const language = useSelector(selectCurrentLanguage);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const resultDate = date ? getLocalTimeNumbers(language, date) : "";

    const [likesNumber, setLikesNumber] = useState<number>(likesCount);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const resultOnClickFn = type === "link"
        ? () => postClickHandler(navigate, ULID)
        : onClick;

	return (
		<article
            aria-label={t("ariaLabel.goToPost", {name: title})}
            onClick={resultOnClickFn}
            className={clsx(c.post, className, autoHeight && c.autoHeight, !imageUrl && c.border)}
            {...props}
        >
            {imageUrl &&
                <img
                    src={imageUrl}
                    alt={`${t("Post")} ${title}`}
                    className={c.post_img}
                />
            }
			<div className={clsx(c.info, isShowAuthor && c.high)}>
                <div onClick={e => resetNavigate(e)} className={c.bottom}>
                    {resultDate && <p className={c.date}>{resultDate}</p>}
                    {isShowAuthor && (
                        target === "_self" ? (
                            <Link
                                aria-label={t("ariaLabel.goToUserProfile", {name: author.name})}
                                to={`/profile/${author.ULID}`}
                                className={c.name}
                                target="_self"
                            >
                                {author.name}
                            </Link>
                        ):
                            <a
                                rel="nofollow noopener noreferrer"
                                aria-label={t("ariaLabel.goToUserProfile", {name: author.name})}
                                href={`/profile/${author.ULID}`}
                                className={c.name}
                                target={target}
                            >
                                {author.name}
                            </a>
                    )}
                    {target === "_self" ? (
                        <Link
                            aria-label={t("ariaLabel.goToPost", {name: title})}
                            to={`/post/${ULID}`}
                            className={clsx(c.title, !enable && c.disabled)}
                            target="_self"
                        >
                            {title}
                        </Link>
                    ):
                        <a
                            rel="nofollow noopener noreferrer"
                            aria-label={t("ariaLabel.goToPost", {name: title})}
                            href={`/post/${ULID}`}
                            className={clsx(c.title, !enable && c.disabled)}
                            target={target}
                        >
                            {title}
                        </a>
                    }
                    <div className={c.stats}>
                        <StatItem
                            type="button"
                            onClick={() => toggleLikeHandler(setLikesNumber, isLiked, setIsLiked)}
                            ariaLabel={isLiked ? t("ariaLabel.unlike") : t("ariaLabel.like")}
                            className={clsx(c.stat, !enable && c.disabled)}
                            iconClassName={clsx(isLiked && c.active)}
                            Icon={Heart}
                            number={getShortNumber(likesNumber, 1)}
                        />
                        <StatItem
                            type="link"
                            href={`/post/${ULID}#comments`}
                            ariaLabel={t("ariaLabel.goToPostComments", {name: title})}
                            className={clsx(c.stat, !enable && c.disabled)}
                            Icon={MessageSquare}
                            number={getShortNumber(commentsCount, 1)}
                        />
                    </div>
                </div>
            </div>
		</article>
	)
}
