import c from "./galleryPostList.module.scss";
import {useTranslation} from "react-i18next";
import {SearchInput} from "features/searchInput";
import {useState} from "react";
import {searchChangeHandler} from "../model/searchChangeHandler";
import type {PostType} from "entities/post";
import {GalleryAddButton} from "features/galleryAddButton";
import Masonry, {type MasonryProps} from "react-masonry-css";
import {Post} from "features/post";
import {masonryBreakpointsConfig} from "../config/masonryBreakpointsConfig";

interface GalleryPostListProps {
    postList: PostType[];
    masonryBreakpoints?: MasonryProps["breakpointCols"];
}

/** Галерея постов в формате Masonry с поиском и кнопкой добавления. */
export const GalleryPostList = ({ postList, masonryBreakpoints, ...props }: GalleryPostListProps) => {
    const { t } = useTranslation();

    const [searchValue, setSearchValue] = useState("");
    const [resultPostList, _setResultPostList] = useState<PostType[]>(postList);

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
                {resultPostList.map((post) => (
                    <Post
                        key={post.ULID}
                        date={post.createdAt}
                        author={post.author}
                        title={post.name}
                        imageUrl={post.imageUrl}
                        ULID={post.ULID}
                        autoHeight={true}
                    />
                ))}
            </Masonry>
		</section>
	)
}
