import c from "./galleryPostList.module.scss";
import { useTranslation } from "react-i18next";
import { SearchInput } from "features/searchInput";
import { useEffect, useState } from "react";
import { searchChangeHandler } from "../model/searchChangeHandler";
import type { PostType } from "entities/post";
import { GalleryAddButton } from "features/galleryAddButton";
import Masonry, { type MasonryProps } from "react-masonry-css";
import { Post } from "features/post";
import { masonryBreakpointsConfig } from "../config/masonryBreakpointsConfig";

/** Свойства компонента {@link GalleryPostList}. */
interface GalleryPostListProps {
    /** Список публикаций для отображения в галерее. */
    postList: PostType[] | undefined;
    /** Конфигурация количества колонок Masonry для разных ширин экрана. По умолчанию используется {@link masonryBreakpointsConfig}. */
    masonryBreakpoints?: MasonryProps["breakpointCols"];
    /** Признак загрузки списка публикаций — скрывает карточки до получения данных. По умолчанию `false`. */
    isLoading?: boolean;
}

/**
 * Галерея публикаций в формате Masonry с полем поиска и кнопкой добавления.
 *
 * Количество колонок адаптируется к ширине экрана через конфигурацию точек остановки
 * {@link masonryBreakpointsConfig} или переданный `masonryBreakpoints`. Каждая публикация
 * отображается с автоматической высотой через {@link Post}.
 */
export const GalleryPostList = ({
    postList,
    masonryBreakpoints,
    isLoading = false,
    ...props
}: GalleryPostListProps) => {
    const { t } = useTranslation();

    const [searchValue, setSearchValue] = useState("");
    const [resultPostList, setResultPostList] = useState<PostType[]>(postList ?? []);

    useEffect(() => {
        setResultPostList(postList ?? []);
    }, [postList]);

    return (
        <section className={c.gallery_list} {...props}>
            <h1 className={c.title}>{t("gallery.title")}</h1>
            <SearchInput
                className={c.search}
                value={searchValue}
                onChange={e => searchChangeHandler(e, setSearchValue)}
            />
            <GalleryAddButton className={c.button_add} />
            <Masonry
                breakpointCols={masonryBreakpoints ?? masonryBreakpointsConfig}
                className={c.list}
                columnClassName={c.column}
            >
                {!isLoading &&
                    resultPostList.map(post => (
                        <Post
                            key={post.UUID}
                            date={post.createdAt}
                            author={post.author}
                            title={post.name}
                            imageUrl={post.imageUrl}
                            UUID={post.UUID}
                            isLiked={post.isLiked}
                            autoHeight={true}
                        />
                    ))}
            </Masonry>
        </section>
    );
};
