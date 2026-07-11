import c from "./post.module.scss";
import { getLocalTimeNumbers } from "shared/lib/getLocalTimeNumbers";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "entities/appConfig";
import { StatItem } from "features/statItem";
import { Heart, MessageSquare } from "lucide-react";
import { getShortNumber } from "shared/lib/getShortNumber";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { postClickHandler } from "../model/postClickHandler";
import type { UserType } from "entities/user";
import { toggleLikeHandler } from "../model/toggleLikeHandler";
import { useState } from "react";
import clsx from "clsx";
import { resetNavigate } from "../model/resetNavigate";

/** Свойства компонента {@link Post}. */
interface PostProps {
    /** Дата публикации в формате ISO 8601. */
    date: string;
    /** Полный профиль автора поста. */
    author: UserType;
    /** Заголовок публикации. */
    title: string;
    /** Количество лайков. По умолчанию `0`. */
    likesCount?: number;
    /** Количество комментариев. По умолчанию `0`. */
    commentsCount?: number;
    /** URL изображения публикации. */
    imageUrl: string;
    /** UUID публикации для формирования ссылки `/post/:uuid`. */
    UUID: string;
    /** Признак видимости блока с именем автора. По умолчанию `true`. */
    isShowAuthor?: boolean;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /**
     * Режим взаимодействия с карточкой:
     * - `"link"` — переходит на страницу поста при клике.
     * - `"button"` — вызывает `onClick` без навигации.
     */
    type?: "button" | "link";
    /** Целевой контекст открытия ссылок (`_blank`, `_self` и др.). */
    target?: "_blank" | "_self" | "_parent" | "_top";
    /** Обработчик клика для режима `"button"`. */
    onClick?: () => void;
    /** Признак адаптивной высоты карточки по содержимому вместо фиксированного соотношения сторон. */
    autoHeight?: boolean;
    /** Признак активности ссылок на пост и автора. При `false` применяется CSS-класс `disabled`. */
    enable?: boolean;
}

/**
 * Карточка публикации.
 *
 * Отображает обложку, имя автора, заголовок, дату, счётчики лайков и
 * комментариев. Поддерживает два режима взаимодействия (`link` / `button`),
 * настройку целевого контекста ссылок и локальное оптимистичное обновление
 * счётчика лайков без обращения к серверу.
 */
export const Post = ({
    title,
    author,
    date,
    UUID,
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

    const resultOnClickFn =
        type === "link" ? () => postClickHandler(navigate, UUID) : onClick;

    return (
        <article
            aria-label={t("ariaLabel.goToPost", { name: title })}
            onClick={resultOnClickFn}
            className={clsx(
                c.post,
                className,
                autoHeight && c.autoHeight,
                !imageUrl && c.border
            )}
            {...props}
        >
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={`${t("Post")} ${title}`}
                    className={c.post_img}
                />
            )}
            <div className={clsx(c.info, isShowAuthor && c.high)}>
                <div onClick={e => resetNavigate(e)} className={c.bottom}>
                    {resultDate && <p className={c.date}>{resultDate}</p>}
                    {isShowAuthor &&
                        (target === "_self" ? (
                            <Link
                                aria-label={t("ariaLabel.goToUserProfile", {
                                    name: author.name
                                })}
                                to={`/profile/${author.UUID}`}
                                className={c.name}
                                target="_self"
                            >
                                {author.name}
                            </Link>
                        ) : (
                            <a
                                rel="nofollow noopener noreferrer"
                                aria-label={t("ariaLabel.goToUserProfile", {
                                    name: author.name
                                })}
                                href={`/profile/${author.UUID}`}
                                className={c.name}
                                target={target}
                            >
                                {author.name}
                            </a>
                        ))}
                    {target === "_self" ? (
                        <Link
                            aria-label={t("ariaLabel.goToPost", { name: title })}
                            to={`/post/${UUID}`}
                            className={clsx(c.title, !enable && c.disabled)}
                            target="_self"
                        >
                            {title}
                        </Link>
                    ) : (
                        <a
                            rel="nofollow noopener noreferrer"
                            aria-label={t("ariaLabel.goToPost", { name: title })}
                            href={`/post/${UUID}`}
                            className={clsx(c.title, !enable && c.disabled)}
                            target={target}
                        >
                            {title}
                        </a>
                    )}
                    <div className={c.stats}>
                        <StatItem
                            type="button"
                            onClick={() =>
                                toggleLikeHandler(setLikesNumber, isLiked, setIsLiked)
                            }
                            ariaLabel={
                                isLiked ? t("ariaLabel.unlike") : t("ariaLabel.like")
                            }
                            className={clsx(c.stat, !enable && c.disabled)}
                            iconClassName={clsx(isLiked && c.active)}
                            Icon={Heart}
                            number={getShortNumber(likesNumber, 1)}
                        />
                        <StatItem
                            type="link"
                            href={`/post/${UUID}#comments`}
                            ariaLabel={t("ariaLabel.goToPostComments", { name: title })}
                            className={clsx(c.stat, !enable && c.disabled)}
                            Icon={MessageSquare}
                            number={getShortNumber(commentsCount, 1)}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
};
