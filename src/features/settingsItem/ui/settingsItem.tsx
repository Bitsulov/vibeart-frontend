import c from "./settingsItem.module.scss";
import { Download, Trash2 } from "lucide-react";
import { InputForm } from "features/inputForm";
import { useTranslation } from "react-i18next";
import {
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
    useRef
} from "react";
import { TextareaForm } from "features/textareaForm";
import type { UseFormRegisterReturn } from "react-hook-form";
import clsx from "clsx";
import { loadButtonClickHandler } from "../model/loadButtonClickHandler";
import { onChangeLoadHandler } from "../model/onChangeLoadHandler";
import { deleteButtonClickHandler } from "../model/deleteButtonClickHandler";
import { StylizedButton } from "../../stylizedButton";
import { onChangeAvatarLoadHandler } from "../model/onChangeAvatarLoadHandler";
import { deleteAlbumButtonClickHandler } from "../model/deleteAlbumButtonClickHandler";

/** Свойства компонента {@link SettingsItem}. */
interface SettingsItemProps<T extends object> extends ComponentPropsWithoutRef<"div"> {
    /** Заголовок поля настроек, отображаемый над элементом управления. */
    title: string;
    /** Поясняющий текст под заголовком. */
    description: string;
    /** Текущее значение поля — используется счётчиком символов и плавающим плейсхолдером. */
    value?: string;
    /**
     * Тип содержимого:
     * - `"buttons"` — кнопки загрузки и удаления изображения.
     * - `"input"` — однострочное текстовое поле.
     * - `"textarea"` — многострочное текстовое поле.
     * - `"avatar"` — предпросмотр аватара с кнопками загрузки и удаления.
     * - `"id"` — поле имени пользователя с префиксом `@`.
     */
    type: "buttons" | "input" | "textarea" | "avatar" | "id";
    /** Признак ошибки валидации. Управляет цветом рамки и иконкой статуса. */
    isError: boolean;
    /** Признак того, что форма была отправлена. Статус валидации показывается только после первой отправки. */
    isSubmitted: boolean;
    /** Плавающий плейсхолдер поля ввода. */
    placeholder?: string;
    /** Максимальная допустимая длина текста. При наличии отображается счётчик символов. */
    maxLength?: number | null;
    /** Минимальная допустимая длина текста. При наличии счётчик сигнализирует о нехватке символов. */
    minLength?: number | null;
    /** Пропсы из `register()` библиотеки react-hook-form для привязки поля к форме. */
    registerProps?: UseFormRegisterReturn;
    /** Функция обновления частичного состояния сущности для предпросмотра изменений. */
    setEntityInfo: Dispatch<SetStateAction<T>>;
    /** Функция сохранения загруженного файла изображения для последующей отправки на сервер. */
    setLoadedFile?: Dispatch<SetStateAction<File | undefined>>;
    /** Дополнительный CSS-класс для плавающего плейсхолдера. */
    placeholderClassName?: string;
    /** Идентификатор поля ввода. Связывает `<label>` с элементом управления через `htmlFor`. */
    id: string;
    /** Альтернативный текст для изображения аватара (режим `"avatar"`). */
    avatarAlt?: string;
    /** URL текущего аватара для предпросмотра (режим `"avatar"`). */
    avatarUrl?: string;
    /** Имя поля сущности, в которое записывается URL аватара. По умолчанию `"avatarUrl"`. */
    avatarFieldName?: string;
    /** Callback, выполняемый после удаления файла аватара */
    onAvatarDelete?: () => void;
    /** Признак обязательности поля. Счётчик подсвечивается при пустом значении ниже минимума. */
    required?: boolean;
}

/**
 * Универсальный элемент настроек.
 *
 * Объединяет заголовок, описание и один из пяти видов элемента управления,
 * определяемых через `type`. При наличии ограничений длины отображает
 * счётчик символов, который подсвечивается красным после отправки формы.
 */
export const SettingsItem = <T extends object>({
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
    placeholderClassName = "",
    avatarAlt = "avatar",
    avatarUrl = "",
    avatarFieldName = "avatarUrl",
    onAvatarDelete = () => {},
    id,
    ...props
}: SettingsItemProps<T>) => {
    const { t } = useTranslation();

    const isText = type === "input" || type === "textarea" || type === "id";
    const isLimitOutMore = maxLength ? value?.length > maxLength : false;
    const isLimitOutLess = minLength
        ? value.length > 0 && value.length < minLength
        : false;

    const inputLoadRef = useRef<HTMLInputElement>(null);

    return (
        <div className={c.wrapper} {...props}>
            {isText && (
                <p
                    className={clsx(
                        c.limiter,
                        isSubmitted && (isLimitOutMore || isLimitOutLess) && c.error
                    )}
                >
                    {value?.length}/{maxLength}
                </p>
            )}
            <div className={c.info}>
                <h3 className={c.title}>{title}</h3>
                <p className={c.description}>{description}</p>
            </div>
            <div className={c.actions}>
                {type === "buttons" && (
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
                            onChange={e =>
                                onChangeLoadHandler(e, setEntityInfo, setLoadedFile)
                            }
                            ref={inputLoadRef}
                            style={{ display: "none" }}
                            type="file"
                            accept="image/*"
                        />
                        <button
                            onClick={() =>
                                deleteButtonClickHandler(
                                    inputLoadRef,
                                    setEntityInfo,
                                    setLoadedFile
                                )
                            }
                            aria-label={t("ariaLabel.deleteImg")}
                            type="button"
                            className={c.delete}
                        >
                            <Trash2 className={c.icon} width="38" height="38" />
                        </button>
                    </div>
                )}
                {type === "input" && (
                    <div className={c.input_wrapper}>
                        <InputForm
                            className={c.input}
                            isError={isError}
                            isSubmitted={isSubmitted}
                            placeholder={placeholder}
                            placeholderClassName={placeholderClassName}
                            value={value}
                            id={id}
                            {...registerProps}
                        />
                    </div>
                )}
                {type === "textarea" && (
                    <div className={c.textarea_wrapper}>
                        <TextareaForm
                            className={c.textarea}
                            placeholder={placeholder}
                            value={value}
                            isError={isError}
                            isSubmitted={isSubmitted}
                            placeholderClassName={placeholderClassName}
                            id={id}
                            {...registerProps}
                        />
                    </div>
                )}
                {type === "avatar" && (
                    <div className={c.avatar_wrapper}>
                        {avatarUrl ? (
                            <img
                                decoding="async"
                                width="140"
                                height="140"
                                src={avatarUrl}
                                alt={avatarAlt}
                                className={c.img}
                            />
                        ) : (
                            <span className={c.img}></span>
                        )}
                        <div className={c.avatar_buttons}>
                            <StylizedButton
                                onClick={() => loadButtonClickHandler(inputLoadRef)}
                                className={c.load}
                                type="button"
                            >
                                {t("Load")}
                            </StylizedButton>
                            <button
                                onClick={() =>
                                    deleteAlbumButtonClickHandler(
                                        inputLoadRef,
                                        setEntityInfo,
                                        setLoadedFile,
                                        avatarFieldName,
                                        onAvatarDelete
                                    )
                                }
                                type="button"
                                className={c.delete}
                            >
                                {t("Delete")}
                            </button>
                        </div>
                        <input
                            onChange={e =>
                                onChangeAvatarLoadHandler(
                                    e,
                                    setEntityInfo,
                                    setLoadedFile,
                                    avatarFieldName
                                )
                            }
                            ref={inputLoadRef}
                            style={{ display: "none" }}
                            type="file"
                            accept="image/*"
                        />
                    </div>
                )}
                {type === "id" && (
                    <div className={c.id_wrapper}>
                        <span className={c.text}>@</span>
                        <InputForm
                            className={c.input}
                            isError={isError}
                            isSubmitted={isSubmitted}
                            placeholder={placeholder}
                            placeholderClassName={placeholderClassName}
                            value={value}
                            id={id}
                            {...registerProps}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
