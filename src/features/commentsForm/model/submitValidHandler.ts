import type { ICommentsForm } from "../lib/types";
import { type CommentType, createComment } from "entities/comment";
import React from "react";
import { createUser, type PrincipalUserState } from "entities/user";
import type { UseFormSetValue } from "react-hook-form";

/**
 * Обрабатывает успешную отправку формы комментария.
 * Добавляет новый комментарий в начало списка и сбрасывает поле ввода.
 *
 * @param data - Данные формы с текстом комментария.
 * @param setComments - Сеттер списка комментариев.
 * @param author - Объект текущего пользователя-автора.
 * @param setValue - Функция сброса поля формы (react-hook-form).
 */
export function submitValidHandler(
    data: ICommentsForm,
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>,
    author: PrincipalUserState,
    setValue: UseFormSetValue<ICommentsForm>
) {
    const user = createUser({
        UUID: author.UUID,
        title: author.name,
        username: author.username,
        description: "",
        worksCount: 0,
        subscribersCount: 0,
        subscribesCount: 0,
        albumList: [],
        createdAt: "",
        trustStatus: author.trustStatus,
        isAuthenticated: true,
        isBlocked: author.isBlocked,
        onlineStatus: "ONLINE",
        role: author.role,
        avatarUrl: ""
    });

    setComments(comments => [
        createComment({
            text: data.sendComment,
            createdAt: new Date().toISOString(),
            author: user
        }),
        ...comments
    ]);
    setValue("sendComment", "");
}
