export { createComment } from "./model/createComment";
export type {
    CommentType,
    CommentResponse,
    CreateCommentRequest,
    UpdateCommentRequest
} from "./lib/types";
export {
    commentsMock,
    commentResponseMock,
    commentsPageResponseMock
} from "./const/mockConst";
export {
    getCommentsByPost,
    addComment,
    updateCommentById,
    deleteCommentById
} from "./api/commentApi";
