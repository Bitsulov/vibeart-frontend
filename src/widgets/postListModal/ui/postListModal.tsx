import c from "./postListModal.module.scss";
import {Post} from "features/post";
import {PagesButtons} from "features/pagesButtons";
import type {PostType} from "entities/post";
import {useTranslation} from "react-i18next";
import React from "react";
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
                        setPagesDelta={setPagesDelta}
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
