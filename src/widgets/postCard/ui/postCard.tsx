import c from "./postCard.module.scss";
import {ChevronDown, Flag, Heart} from "lucide-react";
import {StatItem} from "features/statItem";
import {PostTag} from "features/postTag";
import defaultAvatar from "shared/icons/icon-user.svg";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentLanguage} from "entities/appConfig";
import {getLocalTimeNumbers} from "shared/lib/getLocalTimeNumbers";
import {getShortNumber} from "shared/lib/getShortNumber";
import {useState} from "react";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import clsx from "clsx";
import {openDescriptionHandler} from "../model/openDescriptionHandler";
import {useTranslation} from "react-i18next";
import {Link, useNavigate} from "react-router-dom";
import type {TagType} from "entities/tag";
import {DeleteButton} from "features/deleteButton";
import {EditButton} from "features/editButton";
import {BackLink} from "features/backLink";
import {likeClickHandler} from "../model/likeClickHandler";
import {reportClickHandler} from "../model/reportClickHandler";
import {showHint} from "../model/showHint";
import {hideHint} from "../model/hideHint";
import {ConfirmModal} from "widgets/confirmModal";
import {deleteButtonClickHandler} from "../model/deleteButtonClickHandler";
import {confirmDeletePost} from "../model/confirmDeletePost";

interface PostCardProps {
    authorAvatarUrl: string;
    authorName: string;
    authorULID: string;
    imageUrl: string;
    albumName: string;
    albumULID: string;
    title: string;
    description: string;
    tagsList: TagType[];
    isOwner?: boolean;
    likesCount: number;
    reportsCount: number;
    ULID: string;
    createdAt?: string;
}

export const PostCard = ({
    authorAvatarUrl,
    authorName,
    authorULID,
    imageUrl,
    title,
    description,
    tagsList,
    likesCount,
    reportsCount,
    albumName,
    albumULID,
    ULID,
    isOwner = false,
    createdAt = ""
}: PostCardProps) => {
    const { t } = useTranslation();
    const language = useSelector(selectCurrentLanguage);
    const navigate = useNavigate();

    const windowWidth = useWindowWidth();
    const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);

    const isDesktop = windowWidth >= 1200;
    const resultDate = getLocalTimeNumbers(language, createdAt);
    const avatarImg = authorAvatarUrl || defaultAvatar;

    const [likes, setLikes] = useState(likesCount);
    const [isLiked, setIsLiked] = useState(false);
    const [isReported, setIsReported] = useState(false);

    const dispatch = useDispatch();

    const [isShowConfirm, setIsShowConfirm] = useState(false);

    return (
        <section className={c.post_card}>
            <ConfirmModal
                confirmFn={() => confirmDeletePost(navigate, authorULID)}
                ariaLabelConfirm={t("ariaLabel.deletePostModal", {name: title})}
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
                                onMouseEnter={() => showHint(dispatch, t("hint.deletePost"))}
                                onMouseLeave={() => hideHint(dispatch)}
                                onClick={() => deleteButtonClickHandler(setIsShowConfirm)}
                                className={c.delete}
                            />
                            <EditButton
                                postULID={ULID}
                                ariaLabel={t("ariaLabel.editPost")}
                                onMouseEnter={() => showHint(dispatch, t("hint.editPost"))}
                                onMouseLeave={() => hideHint(dispatch)}
                                className={c.edit}
                            />
                        </div>
                    )}
                </div>
                <div className={c.card_area}>
                    <article className={c.card}>
                        <img decoding="async" width="268" height="268" src={imageUrl} alt={title} className={c.card_img} />
                        <div className={c.content}>
                            <div className={c.stats}>
                                <StatItem
                                    type="button"
                                    ariaLabel={isLiked ? t("ariaLabel.unlike") : t("ariaLabel.like")}
                                    iconClassName={c.stat_icon}
                                    className={clsx(c.stat, isLiked && c.active)}
                                    onClick={() => likeClickHandler(setLikes, isLiked, setIsLiked)}
                                    Icon={Heart}
                                    number={getShortNumber(likes)}
                                />
                                <StatItem
                                    type="button"
                                    iconClassName={c.stat_icon}
                                    ariaLabel={isReported ? t("ariaLabel.reported") : t("ariaLabel.report")}
                                    className={clsx(c.stat, isReported && c.active)}
                                    onMouseEnter={() => showHint(dispatch, t("hint.report"))}
                                    onMouseLeave={() => hideHint(dispatch)}
                                    onClick={() => reportClickHandler(isReported, setIsReported)}
                                    Icon={Flag}
                                    number={getShortNumber(reportsCount)}
                                />
                            </div>
                            <Link
                                aria-label={t("ariaLabel.goToUserProfile", {name: authorName})}
                                to={`/profile/${authorULID}`}
                                className={c.author}
                            >
                                <img
                                    decoding="async"
                                    src={avatarImg}
                                    alt={authorName}
                                    className={c.author_avatar}
                                    width="32"
                                    height="32"
                                />
                                <p className={c.author_name}>
                                    {authorName}
                                </p>
                            </Link>
                            <p className={c.album}>
                                {t("post.inAlbum")}{" "}
                                <Link
                                    aria-label={t("ariaLabel.goToAlbum", {name: albumName})}
                                    to={`/album/${albumULID}`}
                                    className={c.album_name}
                                >
                                    {albumName}
                                </Link>
                            </p>
                            <h1 className={c.title}>{title}</h1>
                            <div className={c.description_wrapper}>
                                <p className={clsx(c.description, !isDescriptionOpened && !isDesktop && c.description_collapsed)}>
                                    {description}
                                </p>
                                {!isDescriptionOpened && !isDesktop && (
                                    <button
                                        className={c.expand_btn}
                                        onClick={() => openDescriptionHandler(setIsDescriptionOpened)}
                                        aria-label={t("ariaLabel.openDescription")}
                                    >
                                        <ChevronDown width="24" height="24" />
                                    </button>
                                )}
                            </div>
                            {tagsList.length > 0 && (
                                <ul className={c.tags}>
                                    {tagsList.map(tag => (
                                        <li key={tag.id}>
                                            <PostTag tag={tag} />
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <p className={c.date}>{resultDate}</p>
                        </div>
                        {isOwner && (
                            <div className={c.desktop_actions}>
                                <EditButton
                                    postULID={ULID}
                                    ariaLabel={t("ariaLabel.editPost")}
                                    onMouseEnter={() => showHint(dispatch, t("hint.editPost"))}
                                    onMouseLeave={() => hideHint(dispatch)}
                                    className={c.edit}
                                />
                                <DeleteButton
                                    ariaLabel={t("ariaLabel.deletePost")}
                                    onMouseEnter={() => showHint(dispatch, t("hint.deletePost"))}
                                    onMouseLeave={() => hideHint(dispatch)}
                                    onClick={() => deleteButtonClickHandler(setIsShowConfirm)}
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
