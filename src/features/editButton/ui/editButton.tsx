import c from "./editButton.module.scss";
import { Pencil } from "lucide-react";
import React from "react";
import { Link, type LinkProps } from "react-router-dom";
import { clickHandler } from "../model/clickHandler";

/** Свойства компонента {@link EditButton}. */
interface EditButtonProps extends Omit<LinkProps, "to"> {
    /** Текстовое описание для программ чтения с экрана. */
    ariaLabel?: string;
    /** Дополнительный обработчик нажатия (например, для скрытия подсказки перед переходом). */
    onClick?: () => void;
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** Обработчик наведения курсора (используется для всплывающих подсказок). */
    onMouseEnter?: React.MouseEventHandler;
    /** Обработчик ухода курсора (используется для скрытия подсказок). */
    onMouseLeave?: React.MouseEventHandler;
    /** UUID редактируемой сущности для формирования ссылки `/:type/add?:type=:uuid`. */
    UUID: string;
    /** Тип редактируемой сущности. Определяет первый сегмент URL. */
    type: "post" | "album";
}

/**
 * Кнопка-ссылка для перехода на страницу редактирования поста или альбома.
 *
 * Формирует URL вида `/:type/add?:type=:uuid`. Перед переходом вызывает
 * `onClick` и `onMouseLeave` для корректного скрытия всплывающих подсказок.
 */
export const EditButton = ({
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    ariaLabel = "",
    onClick = () => {},
    className = "",
    UUID = "",
    type,
    ...props
}: EditButtonProps) => {
    return (
        <Link
            className={`${c.button} ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={e => clickHandler(onClick, onMouseLeave, e)}
            aria-label={ariaLabel}
            to={`/${type}/add?${type}=${UUID}`}
            {...props}
        >
            <Pencil className={c.icon} />
        </Link>
    );
};
