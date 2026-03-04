import c from "./stylizedButton.module.scss";
import React from "react";

interface StylizedButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    children?: React.ReactNode;
    className?: string;
    ariaLabel?: string;
}

export const StylizedButton = ({
    className,
    onClick,
    children,
    ariaLabel,
    ...props
}: StylizedButtonProps) => {
    const buttonClassName = className ? `${c.button} ${className}` : c.button;

	return (
		<button onClick={onClick} className={buttonClassName} {...props}>
            {children}
		</button>
	)
}
