import c from "./editButton.module.scss";
import {Pencil} from "lucide-react";
import React from "react";
import {Link} from "react-router-dom";
import {clickHandler} from "../model/clickHandler";

interface DeleteButtonProps {
    ariaLabel?: string;
    onClick?: () => void;
    className?: string;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    postULID: string;
}

export const EditButton = ({
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    ariaLabel = "",
    onClick = () => {},
    className = "",
    postULID = "",
    ...props
}: DeleteButtonProps) => {
	return (
        <Link
            className={`${c.button} ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={(e) => clickHandler(onClick, onMouseLeave, e)}
            aria-label={ariaLabel}
            to={`/post/${postULID}/edit`}
            {...props}
        >
            <Pencil className={c.icon} />
        </Link>
	)
}
