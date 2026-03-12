import c from "./stylizedButton.module.scss";
import React from "react";

interface StylizedButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
    className?: string;
    ariaLabel?: string;
    type?: "button" | "submit" | "reset";
}

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
		<button type={type} onClick={onClick} className={buttonClassName} {...props}>
            {children}
		</button>
	)
}
