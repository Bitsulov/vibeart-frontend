import c from "./inputForm.module.scss";
import clsx from "clsx";
import React, {useState} from "react";
import {Check, CircleX, EyeClosed, EyeIcon} from "lucide-react";
import {toggleTypeHandler} from "../model/toggleTypeHandler";
import {useTranslation} from "react-i18next";

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
    isError: boolean;
    isSubmitted: boolean;
    isShowStatus?: boolean;
    type?: "text" | "email" | "password";
    placeholderClassName?: string;
}

/**
 * Поле ввода формы с плавающим плейсхолдером и переключателем видимости пароля.
 *
 * @param isError - Флаг ошибки валидации.
 * @param isSubmitted - Была ли форма отправлена (управляет отображением статуса).
 * @param isShowStatus - Показывать ли иконку статуса валидации и изменение цвета границ.
 */
export const InputForm = ({
    type = "text",
    value,
    className = "",
    onChange,
    isError = false,
    isSubmitted = false,
    isShowStatus = true,
    autoComplete = "on",
    id,
    placeholder = "",
    placeholderClassName = "",
    ...props
}: InputFormProps) => {
    const { t } = useTranslation();
    const [currentType, setCurrentType] = useState<"text" | "email" | "password">(type);

	return (
        <div className={c.wrapper}>
            <input
                id={id}
                onChange={onChange}
                type={currentType}
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
            <label className={clsx(c.placeholder, value && c.lift, placeholderClassName)} htmlFor={id}>{placeholder}</label>
            {type === "password" && (
                currentType === "password" ?
                    <button
                        aria-label={t("ariaLabel.showPassword")}
                        type="button"
                        onClick={() => toggleTypeHandler(currentType, setCurrentType)}
                        className={c.show_password}
                    >
                        <EyeIcon width="17" height="17" className={c.show_password_icon} />
                    </button>
                    :
                    <button
                        aria-label={t("ariaLabel.hidePassword")}
                        type="button"
                        onClick={() => toggleTypeHandler(currentType, setCurrentType)}
                        className={c.show_password}
                    >
                        <EyeClosed width="17" height="17" className={c.show_password_icon} />
                    </button>
            )}
            {isShowStatus && (
                isError
                    ? <CircleX aria-hidden="true" className={clsx(c.status_icon, isSubmitted && c.error_icon)} width="14" height="14" />
                    : <Check aria-hidden="true" className={clsx(c.status_icon, c.correct_icon)} width="14" height="14" />
            )}
        </div>
	)
}
