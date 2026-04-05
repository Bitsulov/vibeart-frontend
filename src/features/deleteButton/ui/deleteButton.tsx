import c from "./deleteButton.module.scss";
import {Trash2} from "lucide-react";
import React from "react";

interface DeleteButtonProps {
    ariaLabel?: string;
    onClick?: () => void;
    className?: string;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler
}

export const DeleteButton = ({
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    ariaLabel = "",
    onClick = () => {},
    className = "",
    ...props
}: DeleteButtonProps) => {
	return (
        <button
            className={`${c.button} ${className}`}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            aria-label={ariaLabel}
            {...props}
        >
            <Trash2 className={c.icon} />
        </button>
	)
}
