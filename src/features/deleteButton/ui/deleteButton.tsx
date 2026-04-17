import c from "./deleteButton.module.scss";
import {Trash2} from "lucide-react";
import React from "react";

interface DeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ariaLabel?: string;
}

/** Кнопка удаления с иконкой корзины. */
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
