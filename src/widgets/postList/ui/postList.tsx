import c from "./postList.module.scss";
import type { PostType } from "entities/post";
import { useTranslation } from "react-i18next";
import { Post } from "features/post";
import { PagesButtons } from "features/pagesButtons";
import { useEffect, useState } from "react";
import type { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { PlusCircle } from "lucide-react";
import clsx from "clsx";
import { AlbumModal } from "widgets/albumModal";
import { addPostsAlbumHandler } from "../model/addPostsAlbumHandler";

/** Свойства компонента {@link PostList}. */
interface PostListProps extends ComponentPropsWithoutRef<"section"> {
    /** Список публикаций для отображения. При `undefined` или пустом массиве показывается заглушка. */
    postList: PostType[] | undefined;
    /** Заголовок секции. Отображается только если `isUniqueTitle === true`. */
    title: string | undefined;
    /** Общее количество страниц публикаций. */
    pagesCount: number;
    /** Номер текущей страницы. */
    currentPage: number;
    /** Функция обновления номера текущей страницы. */
    setCurrentPage: Dispatch<SetStateAction<number>>;
    /** Количество кнопок страниц, отображаемых по обе стороны от текущей в {@link PagesButtons}. */
    pagesDelta: number;
    /** Функция обновления `pagesDelta`. Значение пересчитывается внутри компонента при изменении ширины экрана. */
    setPagesDelta: Dispatch<SetStateAction<number>>;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Если `true`, в конце последней страницы отображается кнопка добавления публикации в альбом. По умолчанию `false`. */
    isShowAddButton?: boolean;
    /** Если `true`, список растягивается на всю доступную ширину контейнера. По умолчанию `false`. */
    flexible?: boolean;
    /** Если `true`, в заголовке отображается `title`; иначе — локализованная строка `"Posts"`. По умолчанию `true`. */
    isUniqueTitle?: boolean;
    /** UUID автора альбома — публикации которого предлагаются в {@link AlbumModal}. Обязателен при `isShowAddButton === true`. */
    authorUUID?: string;
    /** UUID альбома, в который добавляются публикации через {@link AlbumModal}. Обязателен при `isShowAddButton === true`. */
    albumUUID?: string;
}

/**
 * Список публикаций с постраничной навигацией и опциональной кнопкой добавления в альбом.
 *
 * Адаптирует значение `pagesDelta` в зависимости от ширины экрана.
 * Кнопка добавления в альбом отображается только на последней странице при `isShowAddButton === true`
 * и открывает {@link AlbumModal} для выбора публикаций.
 * При пустом списке показывает заглушку или только кнопку добавления (если `isShowAddButton === true`).
 */
export const PostList = ({
    title,
    postList,
    pagesCount,
    currentPage,
    setCurrentPage,
    pagesDelta,
    setPagesDelta,
    className = "",
    isShowAddButton = false,
    flexible = false,
    isUniqueTitle = true,
    authorUUID = "",
    albumUUID = "",
    ...props
}: PostListProps) => {
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

    const isPostsExists = postList && postList.length;
    const isShowButton = isShowAddButton && currentPage === pagesCount;

    const [isShowAlbumModal, setIsShowAlbumModal] = useState(false);

    return (
        <section className={`${c.post_list} ${className}`} {...props}>
            {isShowButton && (
                <AlbumModal
                    isShowModal={isShowAlbumModal}
                    setIsShowModal={setIsShowAlbumModal}
                    authorUUID={authorUUID}
                    albumUUID={albumUUID}
                />
            )}
            {isPostsExists ? (
                <>
                    <h1 className={clsx(c.title, flexible && c.flexible)}>
                        {isUniqueTitle ? title : t("Posts")}
                    </h1>
                    <div className={c.list_wrapper}>
                        <div className={clsx(c.list, flexible && c.flexible)}>
                            {postList.map(post => (
                                <Post
                                    imageUrl={post.imageUrl}
                                    key={`post ${post.UUID}`}
                                    title={post.name}
                                    date={post.createdAt}
                                    author={post.author}
                                    UUID={post.UUID}
                                    isShowAuthor={false}
                                />
                            ))}
                            {isShowButton && (
                                <button
                                    onClick={() =>
                                        addPostsAlbumHandler(setIsShowAlbumModal)
                                    }
                                    aria-label={t("ariaLabel.addPostAlbum")}
                                    className={c.add_post}
                                >
                                    <PlusCircle className={c.add_icon} />
                                    <h3 className={c.add_post_title}>{t("AddAlbum")}</h3>
                                </button>
                            )}
                        </div>
                    </div>
                    <PagesButtons
                        pagesDelta={pagesDelta}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        pagesCount={pagesCount}
                    />
                </>
            ) : isShowAddButton ? (
                <>
                    <h1 className={clsx(c.title, flexible && c.flexible)}>
                        {isUniqueTitle ? title : t("Posts")}
                    </h1>
                    <div className={c.list_wrapper}>
                        <div className={clsx(c.list, c.grid_3, flexible && c.flexible)}>
                            <button
                                onClick={() => addPostsAlbumHandler(setIsShowAlbumModal)}
                                aria-label={t("ariaLabel.addPostAlbum")}
                                className={c.add_post}
                            >
                                <PlusCircle className={c.add_icon} />
                                <h3 className={c.add_post_title}>{t("AddAlbum")}</h3>
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <h1 className={`${c.title} ${c.empty}`}>{t("emptyPosts")}</h1>
            )}
        </section>
    );
};
