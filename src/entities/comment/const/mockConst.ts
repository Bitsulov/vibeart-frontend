import type {CommentType} from "../lib/types";
import {createComment} from "../model/createComment";
import {profileUserMock} from "entities/user";

export const commentsMock: CommentType[] = [
    createComment({id: 1, author: profileUserMock, text: "Текст комментария Текст комментария Текст комментария", createdAt: "2026-04-05T08:52:55.271Z"}),
    createComment({id: 2, author: profileUserMock, text: "Текст комментария Текст комментария Текст комментария", createdAt: "2026-04-05T08:52:55.272Z"}),
    createComment({id: 3, author: profileUserMock, text: "Текст комментария Текст комментария Текст комментария", createdAt: "2026-04-05T08:52:55.273Z"}),
    createComment({id: 4, author: profileUserMock, text: "Текст комментария Текст комментария Текст комментария", createdAt: "2026-04-05T08:52:55.274Z"}),
    createComment({id: 5, author: profileUserMock, text: "Текст комментария Текст комментария Текст комментария", createdAt: "2026-04-05T08:52:55.275Z"}),
];
