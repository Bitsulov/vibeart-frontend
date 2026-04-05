import c from "./transparentButton.module.scss";
import React from "react";

interface TransparentButtonProps {
    ariaLabel?: string;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

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
