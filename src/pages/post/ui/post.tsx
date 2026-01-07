import { useState } from "react";
import classes from "./post.module.scss";
import { PostCommentsList } from "widgets/postCommentsList";
import { useHashScroll } from "shared/hooks/useHashScroll";
import { PostCard } from "widgets/postCard";
import { PostCommentsForm } from "features/postCommentsForm";
import { submitPostCommentsFormHandler } from "../model/submitFormHandler";
import { postMock } from "entities/post";
import { commentsMock } from "entities/comment";
import { useSelector } from "react-redux";
import { selectUserInfo } from "entities/user";
import { Layout } from "widgets/layout";
import { useLoadPageStatus } from "entities/pageStats";
import { postAlbumMock } from "entities/album";
import { postAlbumsWithPostsMock } from "entities/albumsWithPosts";

const Post = () => {
    useHashScroll();
    const isPageLoaded = useLoadPageStatus();

    const [comments, setComments] = useState(commentsMock);
    const [textAreaValue, setTextAreaValue] = useState("");
    const userData = useSelector(selectUserInfo);

	const album = postAlbumsWithPostsMock.postId === postMock.id ? postAlbumMock : null;

    const defaultAddedObject = {
        id: Date.now(), // !!!
        srcImg: userData.srcImg,
        authorId: userData.id,
        authorName: userData.fullName,
        text: textAreaValue.trim()
    };

    return (
        <Layout pageStatus={isPageLoaded}>
            <main className={classes.post}>
                <PostCard
                    srcImg={postMock.srcImg}
                    srcAuthor={postMock.srcAuthor}
                    authorId={postMock.authorId}
                    name={postMock.authorName}
					album={album}
                    title={postMock.title}
                    description={postMock.description}
                    tags={postMock.tags}
                    date={postMock.date}
                    likes={postMock.likes}
                    reposts={postMock.reposts}
                />
                <PostCommentsList commentsList={comments} length={postMock.comments} id="comments" />
                <PostCommentsForm
                    value={textAreaValue}
                    setValue={setTextAreaValue}
                    onSubmit={e =>
                        submitPostCommentsFormHandler(
                            e,
                            comments,
                            setComments,
                            textAreaValue,
                            setTextAreaValue,
                            defaultAddedObject
                        )
                    }
                />
            </main>
        </Layout>
    );
};

export { Post };
