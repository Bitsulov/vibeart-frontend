export { createPost } from "./model/createPost";
export type {
    PostType,
    PostResponse,
    UpdatePostRequest,
    CreatePostRequest
} from "./lib/types";
export {
    profileAlbum1PostsMock,
    profileAlbum2PostsMock,
    postMock,
    galleryPostsMock,
    postResponseMock,
    postsPageResponseMock
} from "./const/mockConst";
export {
    getPosts,
    getPostsByAuthor,
    getPost,
    addPost,
    updatePostByUUID,
    deletePostById,
    searchPosts,
    toggleLike,
    createReport
} from "./api/postApi";
