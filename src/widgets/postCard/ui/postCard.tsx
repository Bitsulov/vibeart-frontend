import c from "./postCard.module.scss";
import { ChevronDown, Flag, Heart } from "lucide-react";
import { StatItem } from "features/statItem";
import { PostTag } from "features/postTag";
import defaultAvatar from "shared/icons/icon-user.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentLanguage } from "entities/appConfig";
import { getLocalTimeNumbers } from "shared/lib/getLocalTimeNumbers";
import { useEffect, useRef, useState } from "react";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import clsx from "clsx";
import { openDescriptionHandler } from "../model/openDescriptionHandler";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import type { TagType } from "entities/tag";
import { DeleteButton } from "features/deleteButton";
import { EditButton } from "features/editButton";
import { BackLink } from "features/backLink";
import { likeClickHandler } from "../model/likeClickHandler";
import { reportClickHandler } from "../model/reportClickHandler";
import { showHint } from "../model/showHint";
import { hideHint } from "../model/hideHint";
import { ConfirmModal } from "widgets/confirmModal";
import { deleteButtonClickHandler } from "../model/deleteButtonClickHandler";
import { confirmDeletePost } from "../model/confirmDeletePost";
import { useMutation } from "@tanstack/react-query";
import { createReport, deletePostById, toggleLike } from "entities/post";
import { deletePostSuccessHandler } from "../model/deletePostSuccessHandler";
import { deletePostErrorHandler } from "../model/deletePostErrorHandler";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";
import { toggleLikeErrorHandler } from "../model/toggleLikeErrorHandler";
import { reportErrorHandler } from "../model/reportErrorHandler";
import { reportSuccessHandler } from "../model/reportSuccessHandler";

/** Свойства компонента {@link PostCard}. */
interface PostCardProps {
    /** URL аватара автора публикации. */
    authorAvatarUrl: string;
    /** Отображаемое имя автора публикации. */
    authorName: string;
    /** UUID автора публикации — используется для формирования ссылки на его профиль. */
    authorUUID: string;
    /** Признак того, что автором публикации является сообщество, а не пользователь. По умолчанию `false`. */
    isAuthorCommunity?: boolean;
    /** URL изображения публикации. */
    imageUrl: string;
    /** Название альбома, к которому относится публикация. */
    albumName: string;
    /** UUID альбома — используется для формирования ссылки на альбом. */
    albumUUID: string;
    /** Заголовок публикации. */
    title: string;
    /** Текстовое описание публикации. */
    description: string;
    /** Список тегов публикации. */
    tagsList: TagType[];
    /** Признак того, что просматривающий пользователь является автором публикации. При `true` отображаются кнопки редактирования и удаления. По умолчанию `false`. */
    isOwner?: boolean;
    /** Количество лайков публикации. */
    likesCount: number;
    /** Признак того, что текущий пользователь поставил лайк публикации. По умолчанию `false`. */
    isLiked?: boolean;
    /** Количество жалоб на публикацию. */
    reportsCount: number;
    /** Признак того, что текущий пользователь пожаловался на публикацию. По умолчанию `false`. */
    isReported?: boolean;
    /** UUID публикации. */
    UUID: string;
    /** Дата публикации в формате ISO 8601. По умолчанию пустая строка. */
    createdAt?: string;
    /** Статус загрузки данных публикации. */
    isLoadingData?: boolean;
}

/**
 * Детальная карточка публикации с изображением, лайками, жалобами, тегами и кнопками управления.
 *
 * Лайк переключается оптимистично, с откатом при ошибке; жалоба фиксируется
 * только после успешного ответа сервера. На узких экранах (< 1200 px) описание
 * сворачивается с кнопкой раскрытия. Для владельца публикации отображаются кнопки
 * редактирования и удаления; удаление требует подтверждения через {@link ConfirmModal}.
 */
export const PostCard = ({
    authorAvatarUrl,
    authorName,
    authorUUID,
    isAuthorCommunity = false,
    imageUrl,
    title,
    description,
    tagsList,
    likesCount,
    isLiked: isLikedProp = false,
    reportsCount,
    isReported: isReportedProp = false,
    albumName,
    albumUUID,
    UUID,
    isOwner = false,
    createdAt = "",
    isLoadingData = false
}: PostCardProps) => {
    const { t } = useTranslation();
    const language = useSelector(selectCurrentLanguage);
    const navigate = useNavigate();

    const windowWidth = useWindowWidth();
    const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);
    const [isDescriptionOverflowing, setIsDescriptionOverflowing] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    const isDesktop = windowWidth >= 1200;
    const resultDate = isLoadingData
        ? t("loading...")
        : createdAt
          ? getLocalTimeNumbers(language, createdAt)
          : "";

    const avatarImg = authorAvatarUrl || defaultAvatar;
    const resultTitle = isLoadingData ? t("loading...") : title;
    const resultDescription = isLoadingData ? t("loading...") : description;
    const resultAuthorName = isLoadingData ? t("loading...") : authorName || authorUUID;
    const authorHref = isAuthorCommunity
        ? `/communities/${authorUUID}`
        : `/profile/${authorUUID}`;
    const authorAriaLabel = isAuthorCommunity
        ? t("ariaLabel.goToCommunityProfile", { name: resultAuthorName })
        : t("ariaLabel.goToUserProfile", { name: resultAuthorName });

    const [likes, setLikes] = useState(likesCount);
    const [isLiked, setIsLiked] = useState(isLikedProp);
    const [reports, setReports] = useState(reportsCount);
    const [isReported, setIsReported] = useState(isReportedProp);

    useEffect(() => {
        setLikes(likesCount);
        setIsLiked(isLikedProp);
    }, [likesCount, isLikedProp]);

    useEffect(() => {
        setIsReported(isReportedProp);
        setReports(reportsCount);
    }, [isReportedProp, reportsCount]);

    useEffect(() => {
        const element = descriptionRef.current;
        if (!element) return;

        setIsDescriptionOverflowing(element.scrollHeight > element.clientHeight);
    }, [resultDescription, isDesktop]);

    const dispatch = useDispatch();

    const [isShowConfirm, setIsShowConfirm] = useState(false);

    const deletePostMutation = useMutation({
        mutationFn: deletePostById,
        onSuccess: () => deletePostSuccessHandler(navigate, authorHref),
        onError: (error: AxiosError<AppError>) => deletePostErrorHandler(error, dispatch)
    });

    const toggleLikeMutation = useMutation({
        mutationFn: toggleLike,
        onError: (error: AxiosError<AppError>) =>
            toggleLikeErrorHandler(error, dispatch, isLiked, setIsLiked, setLikes)
    });

    const addReportMutation = useMutation({
        mutationFn: createReport,
        onSuccess: () => reportSuccessHandler(setIsReported, setReports),
        onError: (error: AxiosError<AppError>) => reportErrorHandler(error, dispatch)
    });

    return (
        <section className={c.post_card}>
            <ConfirmModal
                confirmFn={() => confirmDeletePost(UUID, deletePostMutation.mutateAsync)}
                ariaLabelConfirm={t("ariaLabel.deletePostModal", { name: title })}
                text={t("modal.deletePost")}
                isShowModal={isShowConfirm}
                setIsShowModal={setIsShowConfirm}
            />
            <div className="container">
                <div className={c.controls}>
                    <BackLink className={c.back} />
                    {isOwner && (
                        <div className={c.mobile_actions}>
                            <DeleteButton
                                ariaLabel={t("ariaLabel.deletePost")}
                                onMouseEnter={() =>
                                    showHint(dispatch, t("hint.deletePost"))
                                }
                                onMouseLeave={() => hideHint(dispatch)}
                                onClick={() => deleteButtonClickHandler(setIsShowConfirm)}
                                className={c.delete}
                            />
                            <EditButton
                                UUID={UUID}
                                type="post"
                                ariaLabel={t("ariaLabel.editPost")}
                                onMouseEnter={() =>
                                    showHint(dispatch, t("hint.editPost"))
                                }
                                onMouseLeave={() => hideHint(dispatch)}
                                className={c.edit}
                            />
                        </div>
                    )}
                </div>
                <div className={c.card_area}>
                    <article className={c.card}>
                        {isLoadingData ? (
                            <img
                                decoding="async"
                                width="268"
                                height="268"
                                alt={resultTitle}
                                className={clsx(c.card_img, c.card_img_loading)}
                            />
                        ) : (
                            imageUrl && (
                                <img
                                    decoding="async"
                                    width="268"
                                    height="268"
                                    src={imageUrl}
                                    alt={resultTitle}
                                    className={c.card_img}
                                />
                            )
                        )}
                        <div className={c.content}>
                            <div className={c.stats}>
                                <StatItem
                                    type="button"
                                    ariaLabel={
                                        isLiked
                                            ? t("ariaLabel.unlike")
                                            : t("ariaLabel.like")
                                    }
                                    iconClassName={c.stat_icon}
                                    className={clsx(c.stat, isLiked && c.active)}
                                    onClick={() =>
                                        likeClickHandler(
                                            setLikes,
                                            isLiked,
                                            setIsLiked,
                                            UUID,
                                            toggleLikeMutation.mutateAsync
                                        )
                                    }
                                    Icon={Heart}
                                    number={likes}
                                />
                                <StatItem
                                    type="button"
                                    iconClassName={c.stat_icon}
                                    ariaLabel={
                                        isReported
                                            ? t("ariaLabel.reported")
                                            : t("ariaLabel.report")
                                    }
                                    className={clsx(c.stat, isReported && c.active)}
                                    onMouseEnter={() =>
                                        showHint(dispatch, t("hint.report"))
                                    }
                                    onMouseLeave={() => hideHint(dispatch)}
                                    onClick={() =>
                                        reportClickHandler(
                                            isReported,
                                            UUID,
                                            addReportMutation.mutateAsync
                                        )
                                    }
                                    Icon={Flag}
                                    number={reports}
                                />
                            </div>
                            <Link
                                aria-label={authorAriaLabel}
                                to={authorHref}
                                className={c.author}
                            >
                                <img
                                    decoding="async"
                                    src={avatarImg}
                                    alt={resultAuthorName}
                                    className={c.author_avatar}
                                    width="32"
                                    height="32"
                                />
                                <p className={c.author_name}>{resultAuthorName}</p>
                            </Link>
                            {albumName && (
                                <p className={c.album}>
                                    {t("post.inAlbum")}{" "}
                                    <Link
                                        aria-label={t("ariaLabel.goToAlbum", {
                                            name: albumName
                                        })}
                                        to={`/album/${albumUUID}`}
                                        className={c.album_name}
                                    >
                                        {albumName}
                                    </Link>
                                </p>
                            )}
                            <h1 className={c.title}>{resultTitle}</h1>
                            <div className={c.description_wrapper}>
                                <p
                                    ref={descriptionRef}
                                    className={clsx(
                                        c.description,
                                        !isDescriptionOpened &&
                                            !isDesktop &&
                                            c.description_collapsed,
                                        !isDescriptionOpened &&
                                            !isDesktop &&
                                            isDescriptionOverflowing &&
                                            c.description_overflowing
                                    )}
                                >
                                    {resultDescription}
                                </p>
                                {!isDescriptionOpened &&
                                    !isDesktop &&
                                    isDescriptionOverflowing && (
                                        <button
                                            className={c.expand_btn}
                                            onClick={() =>
                                                openDescriptionHandler(
                                                    setIsDescriptionOpened
                                                )
                                            }
                                            aria-label={t("ariaLabel.openDescription")}
                                        >
                                            <ChevronDown width="24" height="24" />
                                        </button>
                                    )}
                            </div>
                            {tagsList.length > 0 && (
                                <ul className={c.tags}>
                                    {tagsList.map((tag, i) => (
                                        <li key={i}>
                                            <PostTag tag={tag} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {resultDate && <p className={c.date}>{resultDate}</p>}
                        </div>
                        {isOwner && (
                            <div className={c.desktop_actions}>
                                <EditButton
                                    UUID={UUID}
                                    type="post"
                                    ariaLabel={t("ariaLabel.editPost")}
                                    onMouseEnter={() =>
                                        showHint(dispatch, t("hint.editPost"))
                                    }
                                    onMouseLeave={() => hideHint(dispatch)}
                                    className={c.edit}
                                />
                                <DeleteButton
                                    ariaLabel={t("ariaLabel.deletePost")}
                                    onMouseEnter={() =>
                                        showHint(dispatch, t("hint.deletePost"))
                                    }
                                    onMouseLeave={() => hideHint(dispatch)}
                                    onClick={() =>
                                        deleteButtonClickHandler(setIsShowConfirm)
                                    }
                                    className={c.delete}
                                />
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </section>
    );
};
