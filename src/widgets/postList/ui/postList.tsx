import c from "./postList.module.scss";
import type {PostType} from "entities/post";
import {useTranslation} from "react-i18next";
import {Post} from "features/post";
import {PagesButtons} from "features/pagesButtons";
import React, {useState} from "react";
import {PlusCircle} from "lucide-react";
import clsx from "clsx";
import {AlbumModal} from "../../albumModal";
import {addPostsAlbumHandler} from "../model/addPostsAlbumHandler";

interface PostListProps {
    postList: PostType[] | undefined;
    title: string | undefined;
    pagesCount: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    pagesDelta: number;
    setPagesDelta: React.Dispatch<React.SetStateAction<number>>;
    className?: string;
    isShowAddButton?: boolean;
    flexible?: boolean;
    isUniqueTitle?: boolean
}

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
    ...props
}: PostListProps) => {
    const { t } = useTranslation();

    const isPostsExists = postList && postList.length;
    const isShowButton = isShowAddButton && currentPage === pagesCount;

    const [isShowAlbumModal, setIsShowAlbumModal] = useState(false);

	return (
		<section className={`${c.post_list} ${className}`} {...props}>
            {isShowButton &&
                <AlbumModal
                    isShowModal={isShowAlbumModal}
                    setIsShowModal={setIsShowAlbumModal}
                    postList={postList ?? []}
                />
            }
            {isPostsExists ? (
                <>
                    <h1 className={clsx(c.title, flexible && c.flexible)}>{isUniqueTitle ? title : t("Posts")}</h1>
                    <div className={c.list_wrapper}>
                        <div className={clsx(c.list, flexible && c.flexible)}>
                            {postList.map(post =>
                                <Post
                                    imageUrl={post.imageUrl}
                                    key={`post ${post.ULID}`}
                                    title={post.name}
                                    date={post.createdAt}
                                    author={post.author}
                                    ULID={post.ULID}
                                    isShowAuthor={false}
                                />
                            )}
                            {isShowButton &&
                                <button
                                    onClick={() => addPostsAlbumHandler(setIsShowAlbumModal)}
                                    aria-label={t("ariaLabel.addPostAlbum")}
                                    className={c.add_post}
                                >
                                    <PlusCircle className={c.add_icon} />
                                    <h3 className={c.add_post_title}>{t("AddAlbum")}</h3>
                                </button>
                            }
                        </div>
                    </div>
                    <PagesButtons
                        setPagesDelta={setPagesDelta}
                        pagesDelta={pagesDelta}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        pagesCount={pagesCount}
                    />
                </>
            ): isShowAddButton ? (
                    <>
                        <h1 className={clsx(c.title, flexible && c.flexible)}>{isUniqueTitle ? title : t("Posts")}</h1>
                        <div className={c.list_wrapper}>
                            <div className={clsx(c.list, c.grid_3, flexible && c.flexible)}>
                                <button aria-label={t("ariaLabel.addPostAlbum")} className={c.add_post}>
                                    <PlusCircle className={c.add_icon} />
                                    <h3 className={c.add_post_title}>{t("AddAlbum")}</h3>
                                </button>
                            </div>
                        </div>
                    </>
            ):
                <h1 className={`${c.title} ${c.empty}`}>{t("emptyPosts")}</h1>
            }
		</section>
	)
}
