import type {ICommentsForm} from "../lib/types";
import {type CommentType, createComment} from "entities/comment";
import React from "react";
import type {UserType} from "entities/user";
import type {UseFormSetValue} from "react-hook-form";

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
    author: UserType,
    setValue: UseFormSetValue<ICommentsForm>
) {
    setComments(comments => [
        createComment({id: Date.now(), text: data.sendComment, createdAt: new Date().toISOString(), author}),
        ...comments
    ]);
    setValue("sendComment", "");
}
