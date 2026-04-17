import c from "./transparentButton.module.scss";
import React from "react";

interface TransparentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ariaLabel?: string;
}

/** Вторичная кнопка с прозрачным фоном. */
export const TransparentButton = ({
    className,
    children,
    onClick = () => {},
    ariaLabel,
    ...props
}: TransparentButtonProps) => {
	return (
        <button onClick={onClick} className={`${c.button} ${className}`} aria-label={ariaLabel} {...props}>
            {children}
        </button>
	)
}
