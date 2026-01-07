import { useEffect, useState, useRef } from "react";
import classes from "./galleryList.module.scss";
import { GalleryItem } from "features/galleryItem";
import { Link } from "react-router-dom";
import type { PostType } from "entities/post";
import { useTranslation } from "react-i18next";

interface GalleryListPropsType {
    postsList: PostType[];
    queryText: string | null;
}

const GalleryList = ({ postsList, queryText, ...props }: GalleryListPropsType) => {
	const { t } = useTranslation();

    const [filteredList, setFilteredList] = useState<PostType[]>([]);
    const [showLoader, setShowLoader] = useState(true);
    const loaderRef = useRef(null);

    // window.addEventListener("scroll", e => {
    // 	   if(loaderRefcurrent?.offsetTop - window.scrollY - window.innerHeight < 0) {
    // 	     	loadPosts();
    // 	   }
    // })

    useEffect(() => {
        if (queryText !== null) {
            const lowerText = queryText.toLowerCase();
			const tagCheckStr = lowerText.slice(1);
            setFilteredList(
                postsList.filter(post => {
                    if (
                        post.title.toLowerCase().includes(lowerText) ||
                        post.authorUserName.toLowerCase().includes(tagCheckStr) ||
                        post.authorName.toLowerCase().includes(lowerText) ||
                        post.description.toLowerCase().includes(lowerText) ||
                        post.tags.some(tag => tag.name.toLowerCase().includes(tagCheckStr))
                    ) {
                        return post;
                    }
                })
            );
        } else {
            setFilteredList(postsList);
        }
    }, [postsList, queryText]);

    return (
        <>
            {filteredList.length > 0 ? (
                <div className={classes.gallery__list} {...props}>
                    {filteredList.map(post => (
                        <GalleryItem
                            id={post.id}
                            // isLiked={post.isLiked}
                            likes={post.likes}
                            comments={post.comments}
                            reposts={post.reposts}
                            srcImg={post.srcImg}
                            date={post.date}
                            title={post.title}
                            description={post.description}
                            authorId={post.authorId}
                            authorName={post.authorName}
                            srcAuthor={post.srcAuthor}
                            key={post.id}
                        />
                    ))}
                </div>
            ) : (
                <h2 className={classes.gallery__title}>
                    {t("undefinedGalleryPosts", { queryText: queryText })}
                    <Link to="/gallery" className={classes.gallery__link}>
                        {t("return")}
                    </Link>
                </h2>
            )}
            {/* <Loader ref={loaderRef} show={showLoader ? true : false}/> */}
        </>
    );
};

export { GalleryList };
