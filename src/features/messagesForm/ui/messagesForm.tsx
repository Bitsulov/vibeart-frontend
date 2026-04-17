import c from "./messagesForm.module.scss";
import {InputForm} from "features/inputForm";
import {useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import type {IMessagesForm} from "../lib/types";
import {SendHorizontal} from "lucide-react";
import type {MessageType} from "entities/message";
import React from "react";
import {submitValidHandler} from "../model/submitValidHandler";

interface MessagesFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

/**
 * Форма отправки сообщения в чате.
 *
 * @param setMessages - Сеттер списка сообщений для моментального обновления интерфейса.
 */
export const MessagesForm = ({ setMessages, ...props }: MessagesFormProps) => {
    const { t } = useTranslation();

    const { register, setValue, handleSubmit, formState: {errors, isSubmitted} } = useForm<IMessagesForm>({shouldFocusError: false});

	return (
		<form
            className={c.form}
            onSubmit={handleSubmit(
                (data) => submitValidHandler(data, setMessages, setValue)
            )}
            {...props}>
            <InputForm
                {...register(
                    "sendMessage",
                    {required: true}
                )}
                placeholder={t("chat.write")}
                className={c.input}
                isError={!!errors.sendMessage}
                isSubmitted={isSubmitted}
                isShowStatus={false}
                autoComplete="off"
                id="sendMessage"
            />
            <button className={c.submit} aria-label={t("ariaLabel.sendMessage")} type="submit">
                <SendHorizontal className={c.icon} strokeWidth="2" width="13" height="13" />
            </button>
		</form>
	)
}
