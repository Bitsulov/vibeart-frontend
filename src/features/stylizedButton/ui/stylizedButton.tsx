import c from "./stylizedButton.module.scss";
import React from "react";

interface StylizedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ariaLabel?: string;
}

/** Основная кнопка приложения с особым стилем. */
export const StylizedButton = ({
    className,
    onClick,
    children,
    ariaLabel,
    type = "button",
    ...props
}: StylizedButtonProps) => {
    const buttonClassName = className ? `${c.button} ${className}` : c.button;

	return (
		<button aria-label={ariaLabel} type={type} onClick={onClick} className={buttonClassName} {...props}>
            {children}
		</button>
	)
}
