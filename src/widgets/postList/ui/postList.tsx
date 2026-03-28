import c from "./postList.module.scss";
import type {PostType} from "entities/post";
import {useTranslation} from "react-i18next";
import {Post} from "features/post";
import {PagesButtons} from "features/pagesButtons";
import React from "react";

interface PostListProps {
    postList: PostType[] | undefined;
    title: string | undefined;
    pagesCount: number;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    pagesDelta: number;
    setPagesDelta: React.Dispatch<React.SetStateAction<number>>
}

export const PostList = ({
    title,
    postList,
    pagesCount,
    currentPage,
    setCurrentPage,
    pagesDelta,
    setPagesDelta,
    ...props
}: PostListProps) => {
    const { t } = useTranslation();

    const isPostsExists = postList && postList.length;

	return (
		<section className={c.post_list} {...props}>
            {isPostsExists ? (
                <>
                    <h1 className={c.title}>{title}</h1>
                    <div className={c.list}>
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
                    </div>
                    <PagesButtons
                        setPagesDelta={setPagesDelta}
                        pagesDelta={pagesDelta}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        pagesCount={pagesCount}
                    />
                </>
            ):
                <h1 className={`${c.title} ${c.empty}`}>{t("emptyPosts")}</h1>
            }
		</section>
	)
}
