import type { PostType } from "./type";

export function createPost({
    id = Date.now(),
    title = "",
    description = "",
    authorName,
    authorId,
    authorUserName,
    likes = 0,
    comments = 0,
    reposts = 0,
    date = new Date().toISOString(),
    srcImg,
    srcAuthor,
    tags = []
}: PostType) {
    return {
        id,
        title,
        description,
        authorName,
        authorId,
        authorUserName,
        likes,
        comments,
        reposts,
        date,
        srcImg,
        srcAuthor,
        tags
    };
}
