import c from "./galleryPostList.module.scss";
import { useTranslation } from "react-i18next";
import { SearchInput } from "features/searchInput";
import { useEffect, useState } from "react";
import type { Ref } from "react";
import { searchChangeHandler } from "../model/searchChangeHandler";
import type { PostType } from "entities/post";
import { GalleryAddButton } from "features/galleryAddButton";
import Masonry, { type MasonryProps } from "react-masonry-css";
import { Post } from "features/post";
import { masonryBreakpointsConfig } from "../config/masonryBreakpointsConfig";
import { useDebouncedValue } from "shared/hooks/useDebouncedValue";

/** Свойства компонента {@link GalleryPostList}. */
interface GalleryPostListProps {
    /** Список публикаций для отображения в галерее. */
    postList: PostType[] | undefined;
    /** Конфигурация количества колонок Masonry для разных ширин экрана. По умолчанию используется {@link masonryBreakpointsConfig}. */
    masonryBreakpoints?: MasonryProps["breakpointCols"];
    /** Признак загрузки списка публикаций - скрывает карточки до получения данных. По умолчанию `false`. */
    isLoading?: boolean;
    /** Ref невидимого элемента-триггера в конце списка - при появлении во viewport запускает подгрузку следующей страницы постов. */
    loadMoreRef?: Ref<HTMLDivElement>;
    /** Начальное значение поля поиска. По умолчанию `""`. */
    initialSearchValue?: string;
    /** Обработчик изменения текста поиска, выполняющийся после задержки. */
    onSearchChange?: (value: string) => void;
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
    loadMoreRef,
    initialSearchValue = "",
    onSearchChange,
    ...props
}: GalleryPostListProps) => {
    const { t } = useTranslation();

    const [searchValue, setSearchValue] = useState(initialSearchValue);
    const debouncedSearchValue = useDebouncedValue(searchValue, 400);

    useEffect(() => {
        onSearchChange?.(debouncedSearchValue.trim());
    }, [debouncedSearchValue, onSearchChange]);

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
                    (postList ?? []).map(post => (
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
            <div ref={loadMoreRef} aria-hidden="true" className={c.load_more} />
        </section>
    );
};
