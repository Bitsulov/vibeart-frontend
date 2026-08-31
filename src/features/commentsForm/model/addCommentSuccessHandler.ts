import type { AxiosResponse } from "axios";
import { type CommentResponse, type CommentType, createComment } from "entities/comment";
import { createUser } from "entities/user";
import type React from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { ICommentsForm } from "../lib/types";

/**
 * Добавляет комментарий, полученный от сервера, в начало списка, увеличивает счётчик
 * комментариев публикации и сбрасывает поле ввода формы.
 *
 * @param response - Ответ сервера с данными созданного комментария: {@link CommentResponse}.
 * @param setComments - Сеттер списка комментариев.
 * @param setCommentsCount - Сеттер счётчика комментариев публикации.
 * @param setValue - Функция сброса значения поля формы {@link ICommentsForm}.
 */
export function addCommentSuccessHandler(
    response: AxiosResponse<CommentResponse>,
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>,
    setCommentsCount: React.Dispatch<React.SetStateAction<number>>,
    setValue: UseFormSetValue<ICommentsForm>
) {
    const comment = response.data;

    setComments(comments => [
        createComment({
            UUID: comment.uuid,
            text: comment.text,
            createdAt: comment.createdAt,
            author: createUser({
                UUID: comment.author.uuid,
                title: comment.author.name,
                username: comment.author.username,
                description: comment.author.description,
                worksCount: comment.author.worksCount,
                subscribersCount: comment.author.subscribersCount,
                subscribesCount: comment.author.subscribesCount,
                albumList: [],
                createdAt: comment.author.createdAt,
                trustStatus: comment.author.trustStatus,
                isAuthenticated: false,
                isBlocked: false,
                onlineStatus: comment.author.onlineStatus,
                role: "USER",
                avatarUrl: comment.author.avatarUrl
            })
        }),
        ...comments
    ]);
    setCommentsCount(count => count + 1);
    setValue("sendComment", "");
}
