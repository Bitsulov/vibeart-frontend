import c from "./commentsForm.module.scss";
import { useForm, useWatch } from "react-hook-form";
import { InputForm } from "features/inputForm";
import type { ICommentsForm } from "../lib/types";
import type { CommentType } from "entities/comment";
import { addComment } from "entities/comment";
import React from "react";
import { submitValidHandler } from "../model/submitValidHandler";
import { addCommentSuccessHandler } from "../model/addCommentSuccessHandler";
import { addCommentErrorHandler } from "../model/addCommentErrorHandler";
import { SendHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { AppError } from "shared/lib/types";

/** Свойства компонента {@link CommentsForm}. */
interface CommentFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    /** UUID публикации, к которой добавляется комментарий. */
    postUUID: string;
    /** Функция обновления списка комментариев для добавления комментария, полученного от сервера. */
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
    /** Функция обновления счётчика комментариев публикации. */
    setCommentsCount: React.Dispatch<React.SetStateAction<number>>;
}

/**
 * Форма добавления комментария к публикации.
 *
 * Использует react-hook-form для валидации поля ввода. После успешной отправки
 * на сервер комментарий из ответа добавляется в список через `setComments`, счётчик
 * комментариев увеличивается, а поле очищается. При ошибке показывается уведомление.
 */
export const CommentsForm = ({
    postUUID,
    setComments,
    setCommentsCount,
    ...props
}: CommentFormProps) => {
    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: { errors, isSubmitted }
    } = useForm<ICommentsForm>({ shouldFocusError: false });
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const sendCommentValue = useWatch({ control, name: "sendComment" });

    const addCommentMutation = useMutation({
        mutationFn: addComment,
        onSuccess: response =>
            addCommentSuccessHandler(response, setComments, setCommentsCount, setValue),
        onError: (error: AxiosError<AppError>) => addCommentErrorHandler(error, dispatch)
    });

    return (
        <form
            className={c.form}
            onSubmit={handleSubmit(data =>
                submitValidHandler(data, postUUID, addCommentMutation.mutateAsync)
            )}
            {...props}
        >
            <InputForm
                value={sendCommentValue}
                {...register("sendComment", { required: true })}
                placeholder={t("post.placeholder")}
                className={c.input}
                isError={!!errors.sendComment}
                isSubmitted={isSubmitted}
                isShowStatus={false}
                autoComplete="off"
                id="sendComment"
            />
            <button type="submit" className={c.submit}>
                <SendHorizontal height="30" width="30" className={c.submit_icon} />
            </button>
        </form>
    );
};
