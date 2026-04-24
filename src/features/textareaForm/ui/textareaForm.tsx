import c from "./textareaForm.module.scss";
import clsx from "clsx";
import React from "react";
import {Check, CircleX} from "lucide-react";

interface TextareaFormProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    isError: boolean;
    isSubmitted: boolean;
    isShowStatus?: boolean;
}

/**
 * Многострочное поле ввода формы с плавающим замещающим текстом и иконкой статуса валидации.
 *
 * @param isError - Флаг ошибки валидации.
 * @param isSubmitted - Была ли форма отправлена (управляет отображением статуса).
 * @param isShowStatus - Показывать ли иконку статуса валидации и изменение цвета границ.
 */
export const TextareaForm = ({
    value,
    className = "",
    onChange,
    isError = false,
    isSubmitted = false,
    isShowStatus = true,
    autoComplete = "on",
    id,
    placeholder = "",
    ...props
}: TextareaFormProps) => {
    return (
        <div className={c.wrapper}>
            <textarea
                id={id}
                onChange={onChange}
                className={clsx(
                    c.input,
                    className,
                    isShowStatus && isSubmitted && isError && c.error,
                    isShowStatus && isSubmitted && !isError && c.correct,
                    !isShowStatus && c.full
                )}
                autoComplete={autoComplete}
                aria-invalid={isError ? "true" : "false"}
                aria-label={placeholder}
                {...props}
            />
            <label className={clsx(c.placeholder, value && c.lift)} htmlFor={id}>{placeholder}</label>
            {isShowStatus && (
                isError
                    ? <CircleX aria-hidden="true" className={clsx(c.status_icon, isSubmitted && c.error_icon)} width="14" height="14" />
                    : <Check aria-hidden="true" className={clsx(c.status_icon, c.correct_icon)} width="14" height="14" />
            )}
        </div>
    )
}
