import c from "./postListModal.module.scss";
import {Post} from "features/post";
import {PagesButtons} from "features/pagesButtons";
import type {PostType} from "entities/post";
import {useTranslation} from "react-i18next";
import React, {useEffect} from "react";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import {postChooseHandler} from "../model/postChooseHandler";
import clsx from "clsx";

interface PostListModalProps {
    className?: string;
    postList: PostType[];
    pagesCount: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    pagesDelta: number;
    setPagesDelta: React.Dispatch<React.SetStateAction<number>>;
    selectedPosts: string[];
    setSelectedPosts: React.Dispatch<React.SetStateAction<string[]>>
}

/** Список постов с пагинацией для выбора внутри модального окна.
 *
 * @param title - Название альбома.
 * @param postList - Список постов.
 * @param pagesCount - Количество страниц постов.
 * @param currentPage - Номер текущей страницы.
 * @param setCurrentPage - Сеттер текущей страницы.
 * @param pagesDelta - Количество страниц перед и после текущей выбранной страницы.
 * @param setPagesDelta - Сеттер количества страниц перед и после текущей выбранной страницы.
 * @param className - Дополнительное имя класса для секции.
 * @param selectedPosts - Список выбранных постов.
 * @param setSelectedPosts - Сеттер выбранных постов.
 */
export const PostListModal = ({
    className = "",
    postList = [],
    pagesCount,
    currentPage,
    setCurrentPage,
    pagesDelta,
    setPagesDelta,
    selectedPosts = [],
    setSelectedPosts,
    ...props
}: PostListModalProps) => {
    const { t } = useTranslation();

    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth >= 1620) {
            setPagesDelta(4);
        } else if (windowWidth >= 1500) {
            setPagesDelta(3);
        } else if (windowWidth >= 1350) {
            setPagesDelta(4);
        } else if (windowWidth >= 1200) {
            setPagesDelta(3);
        } else if (windowWidth >= 520) {
            setPagesDelta(4);
        } else if (windowWidth >= 450) {
            setPagesDelta(3);
        } else {
            setPagesDelta(2);
        }
    }, [windowWidth, setPagesDelta]);

    const isPostsExists = postList.length !== 0;

	return (
        <section className={`${c.post_list} ${className}`} {...props}>
            {isPostsExists ? (
                <>
                    <div className={c.list}>
                        {postList.map(post => {
                            const isChosenPost = selectedPosts.includes(post.ULID);

                            return (
                                <Post
                                    imageUrl={post.imageUrl}
                                    key={`post ${post.ULID}`}
                                    title={post.name}
                                    date={post.createdAt}
                                    author={post.author}
                                    ULID={post.ULID}
                                    isShowAuthor={false}
                                    type="button"
                                    className={clsx(c.post, isChosenPost && c.active)}
                                    onClick={() => postChooseHandler(isChosenPost, post.ULID, setSelectedPosts)}
                                    target="_blank"
                                />
                            )
                        }

                        )}
                    </div>
                    <PagesButtons
                        pagesDelta={pagesDelta}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        pagesCount={pagesCount}
                        className={c.pages}
                    />
                </>
            ):
                <h1 className={`${c.title} ${c.empty}`}>{t("emptyPosts")}</h1>
            }
        </section>
	)
}
