import c from "./settingsItem.module.scss";
import {Download, Trash2} from "lucide-react";
import {InputForm} from "features/inputForm";
import {useTranslation} from "react-i18next";
import {type ComponentPropsWithoutRef, type Dispatch, type SetStateAction, useRef} from "react";
import {TextareaForm} from "features/textareaForm";
import type {UseFormRegisterReturn} from "react-hook-form";
import clsx from "clsx";
import {loadButtonClickHandler} from "../model/loadButtonClickHandler";
import {onChangeLoadHandler} from "../model/onChangeLoadHandler";
import {deleteButtonClickHandler} from "../model/deleteButtonClickHandler";
import type {PostType} from "entities/post";

interface SettingsItemProps extends ComponentPropsWithoutRef<"div"> {
    title: string;
    description: string;
    value?: string;
    type: "buttons" | "input" | "textarea";
    isError: boolean;
    isSubmitted: boolean;
    placeholder?: string;
    maxLength?: number | null;
    minLength?: number | null;
    registerProps?: UseFormRegisterReturn;
    setEntityInfo: Dispatch<SetStateAction<Partial<PostType>>>;
    setLoadedFile?: Dispatch<SetStateAction<File | undefined>>;
    id: string;
}

/**
 * Универсальный элемент настроек: кнопки загрузки изображения, текстовое поле или textarea
 * с заголовком, описанием и счётчиком символов.
 *
 * @param title - Заголовок поля.
 * @param description - Поясняющий текст под заголовком.
 * @param value - Текущее значение поля (для счётчика символов и плавающего замещаюшего текста).
 * @param type - Тип содержимого: "buttons" — загрузка изображения, "input" — текстовое поле, "textarea" — многострочное поле.
 * @param isError - Флаг ошибки валидации.
 * @param isSubmitted - Была ли форма отправлена (управляет отображением статуса).
 * @param placeholder - Замещающий текст поля ввода.
 * @param maxLength - Максимальная длина текста (показывает счётчик).
 * @param minLength - Минимальная длина текста (показывает счётчик).
 * @param registerProps - Пропсы из react-hook-form register.
 * @param setEntityInfo - Сеттер состояния сущности для обновления предпросмотра.
 * @param setLoadedFile - Сеттер загруженного файла изображения.
 * @param id - Связывает label с полем ввода.
 */
export const SettingsItem = ({
    title,
    description,
    value = "",
    type,
    isError,
    isSubmitted,
    placeholder = "",
    maxLength = null,
    minLength = null,
    registerProps,
    setEntityInfo,
    setLoadedFile,
    id,
    ...props
}: SettingsItemProps) => {
    const { t } = useTranslation();

    const isText = type === "input" || type === "textarea";
    const isLimitOutMore = maxLength ? value?.length > maxLength : false;
    const isLimitOutLess = minLength ?  value?.length < minLength : false;

    const inputLoadRef = useRef<HTMLInputElement>(null);

	return (
        <div className={c.wrapper} {...props}>
            {isText &&
                <p
                    className={clsx(c.limiter, (isSubmitted && (isLimitOutMore || isLimitOutLess)) && c.error)}
                >
                    {value?.length}/{maxLength}
                </p>
            }
            <div className={c.info}>
                <h3 className={c.title}>{title}</h3>
                <p className={c.description}>{description}</p>
            </div>
            <div className={c.actions}>
                {type === "buttons" &&
                    <div className={c.buttons}>
                        <button
                            onClick={() => loadButtonClickHandler(inputLoadRef)}
                            aria-label={t("ariaLabel.loadImg")}
                            type="button"
                            className={c.download}
                        >
                            <Download className={c.icon} width="38" height="38" />
                        </button>
                        <input
                            onChange={e => onChangeLoadHandler(e, setEntityInfo, setLoadedFile)}
                            ref={inputLoadRef}
                            style={{display: "none"}}
                            type="file"
                            accept="image/*"
                        />
                        <button
                            onClick={() => deleteButtonClickHandler(inputLoadRef, setEntityInfo, setLoadedFile)}
                            aria-label={t("ariaLabel.deleteImg")}
                            type="button"
                            className={c.delete}
                        >
                            <Trash2 className={c.icon} width="38" height="38" />
                        </button>
                    </div>
                }
                {type === "input" &&
                    <div className={c.input_wrapper}>
                        <InputForm
                            className={c.input}
                            isError={isError}
                            isSubmitted={isSubmitted}
                            placeholder={placeholder}
                            value={value}
                            id={id}
                            {...registerProps}
                        />
                    </div>
                }
                {type === "textarea" &&
                    <div className={c.textarea_wrapper}>
                        <TextareaForm
                            className={c.textarea}
                            placeholder={placeholder}
                            value={value}
                            isError={isError}
                            isSubmitted={isSubmitted}
                            id={id}
                            {...registerProps}
                        />
                    </div>
                }
            </div>
        </div>
	)
}
