import c from "./commentsForm.module.scss";
import {useForm} from "react-hook-form";
import {InputForm} from "features/inputForm";
import type {ICommentsForm} from "../lib/types";
import type {CommentType} from "entities/comment";
import React from "react";
import {submitValidHandler} from "../model/submitValidHandler";
import type {UserType} from "entities/user";
import {SendHorizontal} from "lucide-react";
import {useTranslation} from "react-i18next";

interface CommentFormProps {
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
    user: UserType
}

export const CommentsForm = ({ user, setComments, ...props }: CommentFormProps) => {
    const { register, setValue, handleSubmit, formState: {errors, isSubmitted} } = useForm<ICommentsForm>({shouldFocusError: false});
    const { t } = useTranslation();

	return (
		<form
            className={c.form}
            onSubmit={handleSubmit(
                (data) => submitValidHandler(data, setComments, user, setValue)
            )}
            {...props}
        >
			<InputForm
                {...register(
                    "sendComment",
                    {required: true}
                )}
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
	)
}
