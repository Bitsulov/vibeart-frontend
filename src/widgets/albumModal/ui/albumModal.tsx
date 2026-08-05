import c from "./albumModal.module.scss";
import clsx from "clsx";
import { StylizedButton } from "features/stylizedButton";
import React, { useEffect, useMemo, useState } from "react";
import { defaultTransitionTime } from "shared/const/const";
import { useTranslation } from "react-i18next";
import { closeButtonClickHandler } from "../model/closeButtonClickHandler";
import { modalClickHandler } from "../model/modalClickButton";
import { createPost, getPostsByAuthor, searchPosts } from "entities/post";
import { addPostsToAlbum } from "entities/album";
import { createUser } from "entities/user";
import { createCommunity } from "entities/community";
import { createTag } from "entities/tag";
import { SearchInput } from "features/searchInput";
import { PostListModal } from "../../postListModal";
import { searchHandler } from "../model/searchHandler";
import { TransparentButton } from "features/transparentButton";
import { addPostsErrorHandler } from "../model/addPostsErrorHandler";
import { addPostsSuccessHandler } from "../model/addPostsSuccessHandler";
import { addSelectedPostsHandler } from "../model/addSelectedPostsHandler";
import { useDebouncedValue } from "shared/hooks/useDebouncedValue";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

/** Свойства компонента {@link AlbumModal}. */
interface AlbumModalProps {
    /** Признак того, что модальное окно в данный момент открыто. */
    isShowModal: boolean;
    /** Функция обновления признака видимости модального окна. */
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    /** UUID автора альбома. */
    authorUUID: string;
    /** UUID альбома, в который добавляются публикации. */
    albumUUID: string;
}

/**
 * Модальное окно выбора и добавления публикаций в альбом.
 *
 * Содержит поле поиска и список публикаций с постраничной навигацией через {@link PostListModal}.
 * Поиск выполняется полнотекстовым запросом среди публикаций автора альбома с задержкой в 400 мс
 * после последнего ввода, без поискового запроса отображаются все публикации автора.
 * Закрывается по клику на фон или кнопку «Закрыть» с анимацией исчезновения.
 * Выбранные публикации хранятся в локальном состоянии и передаются в {@link addSelectedPostsHandler}.
 */
export const AlbumModal = ({
    isShowModal,
    setIsShowModal,
    authorUUID,
    albumUUID,
    ...props
}: AlbumModalProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const [isDisappearring, setIsDisappearring] = useState(false);
    const transitionTime =
        parseInt(
            globalThis
                .getComputedStyle?.(globalThis.document?.documentElement)
                ?.getPropertyValue("--transition-time")
        ) || defaultTransitionTime;

    const [currentPage, setCurrentPage] = useState(1);
    const [pagesDelta, setPagesDelta] = useState(2);

    const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

    const [searchValue, setSearchValue] = useState<string>("");
    const debouncedSearchValue = useDebouncedValue(searchValue.trim(), 400);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearchValue]);

    const postsQuery = useQuery({
        queryKey: [
            `author posts ${authorUUID} ${albumUUID} ${debouncedSearchValue}`,
            currentPage
        ],
        queryFn: () =>
            debouncedSearchValue
                ? searchPosts(debouncedSearchValue, authorUUID, albumUUID, {
                      page: currentPage - 1
                  })
                : getPostsByAuthor(authorUUID, albumUUID, { page: currentPage - 1 }),
        enabled: isShowModal
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

    const addPostsMutation = useMutation({
        mutationFn: addPostsToAlbum,
        onSuccess: () =>
            addPostsSuccessHandler(
                queryClient,
                albumUUID,
                dispatch,
                setIsDisappearring,
                transitionTime,
                setIsShowModal,
                setSelectedPosts
            ),
        onError: (error: AxiosError<AppError>) => addPostsErrorHandler(error, dispatch)
    });

    return (
        <>
            {isShowModal && (
                <div
                    onClick={() =>
                        closeButtonClickHandler(
                            setIsDisappearring,
                            transitionTime,
                            setIsShowModal,
                            setSelectedPosts
                        )
                    }
                    className={clsx(c.background, isDisappearring && c.close)}
                >
                    <div className="container">
                        <dialog
                            open
                            onClick={e => modalClickHandler(e)}
                            aria-modal="true"
                            className={c.modal}
                            {...props}
                        >
                            <div className={c.top}>
                                <h3 className={c.title}>{t("album.addPost")}</h3>
                            </div>
                            <div className={c.content}>
                                <div className={c.container}>
                                    <SearchInput
                                        value={searchValue}
                                        onChange={e => searchHandler(e, setSearchValue)}
                                        className={c.search}
                                    />
                                    <PostListModal
                                        postList={postList}
                                        pagesCount={pages}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pagesDelta={pagesDelta}
                                        setPagesDelta={setPagesDelta}
                                        selectedPosts={selectedPosts}
                                        setSelectedPosts={setSelectedPosts}
                                    />
                                </div>
                            </div>
                            <div className={c.bottom}>
                                <div className={c.buttons}>
                                    <TransparentButton
                                        className={c.button}
                                        ariaLabel={t("ariaLabel.closeModal")}
                                        onClick={() =>
                                            closeButtonClickHandler(
                                                setIsDisappearring,
                                                transitionTime,
                                                setIsShowModal,
                                                setSelectedPosts
                                            )
                                        }
                                    >
                                        {t("Close")}
                                    </TransparentButton>
                                    <StylizedButton
                                        className={c.button}
                                        ariaLabel={t("ariaLabel.addPostsInAlbum")}
                                        onClick={() =>
                                            addSelectedPostsHandler(
                                                addPostsMutation.mutate,
                                                albumUUID,
                                                selectedPosts
                                            )
                                        }
                                    >
                                        {t("Add")}
                                    </StylizedButton>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            )}
        </>
    );
};
