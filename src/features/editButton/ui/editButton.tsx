import c from "./editButton.module.scss";
import {Pencil} from "lucide-react";
import React from "react";
import {Link, type LinkProps} from "react-router-dom";
import {clickHandler} from "../model/clickHandler";

interface EditButtonProps extends Omit<LinkProps, "to"> {
    ariaLabel?: string;
    onClick?: () => void;
    className?: string;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    ULID: string;
    type: "post" | "album"
}

/**
 * Кнопка-ссылка для перехода на страницу редактирования поста или альбома.
 *
 * @param ULID - Идентификатор редактируемой сущности.
 * @param type - Тип сущности: `"post"` или `"album"`.
 */
export const EditButton = ({
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    ariaLabel = "",
    onClick = () => {},
    className = "",
    ULID = "",
    type,
    ...props
}: EditButtonProps) => {
	return (
        <Link
            className={`${c.button} ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={(e) => clickHandler(onClick, onMouseLeave, e)}
            aria-label={ariaLabel}
            to={`/${type}/${ULID}/edit`}
            {...props}
        >
            <Pencil className={c.icon} />
        </Link>
	)
}
