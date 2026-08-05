import c from "./albumCard.module.scss";
import { BackLink } from "features/backLink";
import { DeleteButton } from "features/deleteButton";
import { EditButton } from "features/editButton";
import { useTranslation } from "react-i18next";
import { showHint } from "../model/showHint";
import { hideHint } from "../model/hideHint";
import { useDispatch, useSelector } from "react-redux";
import { deleteButtonClickHandler } from "../model/deleteButtonClickHandler";
import { ConfirmModal } from "widgets/confirmModal";
import { confirmDeletePost } from "../model/confirmDeletePost";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { StatItem } from "features/statItem";
import { ChevronDown, Image } from "lucide-react";
import { getShortNumber } from "shared/lib/getShortNumber";
import clsx from "clsx";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { createPost, getPosts } from "entities/post";
import { createUser } from "entities/user";
import { createCommunity } from "entities/community";
import { createTag } from "entities/tag";
import { openDescriptionHandler } from "../model/openDescriptionHandler";
import { PostList } from "widgets/postList";
import { getLocalTimeNumbers } from "shared/lib/getLocalTimeNumbers";
import { selectCurrentLanguage } from "entities/appConfig";
import { useQuery } from "@tanstack/react-query";

/** Свойства компонента {@link AlbumCard}. */
interface AlbumCardProps {
    /** Признак того, что просматривающий пользователь является автором альбома. При `true` отображаются кнопки редактирования и удаления. */
    isOwner: boolean;
    /** UUID альбома. */
    UUID: string;
    /** UUID автора альбома — используется при удалении для перехода на его профиль. */
    authorUUID: string;
    /** Название альбома. */
    title: string;
    /** Текстовое описание альбома. */
    description: string;
    /** URL обложки альбома. */
    imageUrl: string;
    /** Количество публикаций в альбоме. */
    worksCount: number;
    /** Дата создания альбома в формате ISO 8601. */
    date: string;
}

/**
 * Детальная карточка альбома с обложкой, описанием, статистикой и списком публикаций.
 *
 * На узких экранах (< 1200 px) описание сворачивается с кнопкой раскрытия.
 * Список публикаций загружается через {@link getPosts} и отображается
 * через {@link PostList} с постраничной навигацией.
 * Для владельца альбома отображаются кнопки редактирования и удаления;
 * удаление требует подтверждения через {@link ConfirmModal}.
 */
export const AlbumCard = ({
    title,
    description,
    UUID,
    authorUUID,
    imageUrl,
    worksCount,
    date,
    isOwner = false,
    ...props
}: AlbumCardProps) => {
    const { t } = useTranslation();

    const currentLanguage = useSelector(selectCurrentLanguage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();

    const isDesktop = windowWidth >= 1200;
    const resultDate = date ? getLocalTimeNumbers(currentLanguage, date) : "";

    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);
    const [isDescriptionOverflowing, setIsDescriptionOverflowing] = useState(false);
    const descriptionRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const element = descriptionRef.current;
        if (!element) return;

        setIsDescriptionOverflowing(element.scrollHeight > element.clientHeight);
    }, [description, isDesktop]);

    const [currentPage, setCurrentPage] = useState(1);
    const [pagesDelta, setPagesDelta] = useState(2);

    const postsQuery = useQuery({
        queryKey: [`album posts ${UUID}`, currentPage],
        queryFn: () => getPosts(UUID, { page: currentPage - 1 }),
        enabled: !!UUID
    });

    const pages = postsQuery.data?.data.totalPages || 1;

    const postList = useMemo(
        () =>
            (postsQuery.data?.data.content ?? []).map(post =>
                createPost({
                    UUID: post.uuid,
                    name: post.title,
                    description: post.description,
                    likes: post.likesCount,
                    comments: post.commentsCount,
                    reports: post.reportsCount,
                    tagsList: post.tags.map(title =>
                        createTag({ title, createdAt: new Date().toISOString() })
                    ),
                    commentList: [],
                    checkStatus: "checked",
                    AIStatus: post.aiStatus,
                    imageUrl: post.imageUrl,
                    createdAt: post.createdAt,
                    isLiked: post.liked,
                    isReported: post.reported,
                    author: post.author
                        ? createUser({
                              UUID: post.author.uuid,
                              title: post.author.name,
                              username: post.author.username,
                              description: post.author.description,
                              worksCount: post.author.worksCount,
                              subscribersCount: post.author.subscribersCount,
                              subscribesCount: post.author.subscribesCount,
                              albumList: [],
                              createdAt: post.author.createdAt,
                              trustStatus: post.author.trustStatus,
                              isAuthenticated: false,
                              isBlocked: false,
                              onlineStatus: post.author.onlineStatus,
                              role: "USER",
                              avatarUrl: post.author.avatarUrl
                          })
                        : createCommunity({
                              UUID: "",
                              owner: createUser({
                                  UUID: post.community!.owner.uuid,
                                  title: post.community!.owner.name,
                                  username: post.community!.owner.username,
                                  description: post.community!.owner.description,
                                  worksCount: post.community!.owner.worksCount,
                                  subscribersCount:
                                      post.community!.owner.subscribersCount,
                                  subscribesCount: post.community!.owner.subscribesCount,
                                  albumList: [],
                                  createdAt: post.community!.owner.createdAt,
                                  trustStatus: post.community!.owner.trustStatus,
                                  isAuthenticated: false,
                                  isBlocked: false,
                                  onlineStatus: post.community!.owner.onlineStatus,
                                  role: "USER",
                                  avatarUrl: post.community!.owner.avatarUrl
                              }),
                              username: post.community!.username,
                              title: post.community!.name,
                              description: post.community!.description,
                              albumsList: [],
                              imageUrl: post.community!.avatarUrl,
                              posts: post.community!.worksCount,
                              subscribers: post.community!.subscribersCount,
                              subscribes: post.community!.subscribesCount,
                              createdAt: post.community!.createdAt,
                              isSubscribed: false,
                              isBlocked: false,
                              trustStatus: post.community!.trustStatus
                          })
                })
            ),
        [postsQuery.data]
    );

    return (
        <section className={c.album} {...props}>
            <div className="container">
                <ConfirmModal
                    confirmFn={() => confirmDeletePost(navigate, authorUUID)}
                    ariaLabelConfirm={t("ariaLabel.deleteAlbumModal", { name: title })}
                    text={t("modal.deleteAlbum")}
                    isShowModal={isShowConfirm}
                    setIsShowModal={setIsShowConfirm}
                />
                <div className={c.controls}>
                    <BackLink className={c.back} />
                    {isOwner && (
                        <div className={c.actions}>
                            <DeleteButton
                                ariaLabel={t("ariaLabel.deleteAlbum")}
                                onMouseEnter={() =>
                                    showHint(dispatch, t("hint.deleteAlbum"))
                                }
                                onMouseLeave={() => hideHint(dispatch)}
                                onClick={() => deleteButtonClickHandler(setIsShowConfirm)}
                                className={c.delete}
                            />
                            <EditButton
                                UUID={UUID}
                                type="album"
                                ariaLabel={t("ariaLabel.editAlbum")}
                                onMouseEnter={() =>
                                    showHint(dispatch, t("hint.editAlbum"))
                                }
                                onMouseLeave={() => hideHint(dispatch)}
                                className={c.edit}
                            />
                        </div>
                    )}
                </div>
                <div className={c.card_container}>
                    <article className={c.album_card}>
                        {imageUrl && (
                            <img
                                decoding="async"
                                width="268"
                                height="261"
                                src={imageUrl}
                                alt={title}
                                className={c.img}
                            />
                        )}
                        <div className={c.info}>
                            {!isDesktop && (
                                <StatItem
                                    onMouseEnter={() =>
                                        showHint(dispatch, t("hint.works"))
                                    }
                                    onMouseLeave={() => hideHint(dispatch)}
                                    className={c.works}
                                    iconClassName={c.icon}
                                    Icon={Image}
                                    number={getShortNumber(worksCount)}
                                />
                            )}
                            <h1 className={c.title}>{title}</h1>
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
                                    {description}
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
                            <div className={c.bottom}>
                                {isDesktop && (
                                    <StatItem
                                        onMouseEnter={() =>
                                            showHint(dispatch, t("hint.works"))
                                        }
                                        onMouseLeave={() => hideHint(dispatch)}
                                        className={c.desktop_stat}
                                        iconClassName={c.icon}
                                        Icon={Image}
                                        number={getShortNumber(worksCount)}
                                    />
                                )}
                                <p className={c.date}>{resultDate}</p>
                            </div>
                        </div>
                    </article>
                    <PostList
                        postList={postList}
                        title={title}
                        pagesCount={pages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pagesDelta={pagesDelta}
                        setPagesDelta={setPagesDelta}
                        className={c.posts}
                        isShowAddButton={true}
                        flexible={true}
                        isUniqueTitle={false}
                        authorUUID={authorUUID}
                        albumUUID={UUID}
                    />
                </div>
            </div>
        </section>
    );
};
